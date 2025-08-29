"use server"

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import OpenAI from 'openai'
import Stripe from 'stripe'

// --- REAL CREATE-CHATBOT IMPLEMENTATION ---
export async function createChatbot(values: {
  name: string
  initial_prompt: string
  userId: string
}) {
  const supabase = await createClient()
  const { name, initial_prompt, userId } = values

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('status')
    .eq('id', userId)
    .single()

  if (profileError || !profile) {
    return { error: 'Could not verify user profile. ' + (profileError?.message || '') }
  }

  if (profile.status !== 'approved') {
    return { error: 'Unauthorized: Your account is not approved to create chatbots.' }
  }

  const { error: insertError } = await supabase
    .from('chatbots')
    .insert({ user_id: userId, name, initial_prompt })

  if (insertError) {
    return { error: 'Database error: ' + insertError.message }
  }

  revalidatePath('/dashboard')
  return { success: true }
}

// --- NEW: OpenAI Client Initialization ---
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
const stripe = new Stripe(process.env.STRIPE_API_KEY as string)

// --- REAL AI IMPLEMENTATION (RAG UPGRADE) ---
export async function getAiResponse(values: {
  chatbotId: string;
  prompt: string | null;
  history: any[];
}) {
  const { chatbotId, prompt, history } = values

  if (!process.env.OPENAI_API_KEY) {
    return { response: 'Error: OpenAI API key is not configured on the server.' }
  }

  const supabase = await createClient()
  const lastUserMessage = history[history.length - 1]?.content || ''

  // --- RETRIEVAL STEP ---
  // 1. Search for a direct match in the FAQs.
  const { data: matchedFaqs } = await supabase
    .from('faqs')
    .select('answer')
    .eq('chatbot_id', chatbotId)
    .textSearch('question', lastUserMessage, { type: 'websearch', config: 'english' } as any)

  if (matchedFaqs && matchedFaqs.length > 0) {
    // If we find a direct FAQ match, return the first answer.
    return { response: matchedFaqs[0].answer as string }
  }

  // 2. (Simplified) If no FAQ match, prepare a context string.
  // A real app would search vectorized file content here. For now, we'll just remind the AI of its purpose.
  const context = "Remember to answer based on the user's provided knowledge if available."

  // --- AUGMENTATION STEP ---
  const augmentedPrompt = ` ${prompt || 'You are a helpful assistant.'} --- Context from knowledge base: ${context} --- `
  const systemMessage = { role: 'system' as const, content: augmentedPrompt }

  const conversationHistory = history.map((msg: any) => ({
    role: msg.role,
    content: msg.content,
  }))

  // --- GENERATION STEP ---
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [systemMessage, ...conversationHistory],
      temperature: 0.5,
      max_tokens: 250,
    })

    const aiResponse = (response as any).choices?.[0]?.message?.content ||
      "Sorry, I couldn't generate a response."
    return { response: aiResponse }
  } catch (error) {
    console.error('OpenAI API Error:', error)
    return { response: 'An error occurred while contacting the AI. Please check the server logs.' }
  }
}

// --- DATA SOURCES & FAQ MANAGEMENT ---
export async function addDataSource(formData: FormData) {
  const file = formData.get('file') as File
  const chatbotId = formData.get('chatbotId') as string
  if (!file || !chatbotId) return { error: 'Missing file or chatbot ID.' }

  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized' }

  const { error } = await supabase.from('data_sources').insert({
    chatbot_id: chatbotId,
    user_id: user.id,
    file_name: file.name,
    status: 'pending',
  })
  if (error) return { error: error.message }
  revalidatePath(`/chatbots/${chatbotId}/manage`)
  return { success: true }
}

export async function deleteDataSource(values: { sourceId: string }) {
  const supabase = await createClient()
  await supabase.from('data_sources').delete().eq('id', values.sourceId)
  return { success: true }
}

export async function addFaq(values: { chatbotId: string; question: string; answer: string }) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized' }

  const { data, error } = await supabase
    .from('faqs')
    .insert({
      chatbot_id: values.chatbotId,
      user_id: user.id,
      question: values.question,
      answer: values.answer,
    })
    .select()
    .single()

  if (error) return { error: error.message }
  revalidatePath(`/chatbots/${values.chatbotId}/manage`)
  return { newFaq: data }
}

export async function deleteFaq(values: { faqId: string }) {
  const supabase = await createClient()
  await supabase.from('faqs').delete().eq('id', values.faqId)
  return { success: true }
}

// --- STRIPE CHECKOUT & PORTAL ACTIONS ---
export async function createCheckoutSession(formData: FormData) {
  const priceId = formData.get('priceId') as string
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    return redirect('/login')
  }

  // Check if user is already a Stripe customer in our DB
  const { data: profile } = await supabase
    .from('profiles')
    .select('stripe_customer_id')
    .eq('id', user.id)
    .single()

  let customerId = profile?.stripe_customer_id as string | undefined

  // If not a customer, create one in Stripe
  if (!customerId) {
    const customer = await stripe.customers.create({ email: user.email || undefined })
    customerId = customer.id
    await supabase
      .from('profiles')
      .update({ stripe_customer_id: customerId })
      .eq('id', user.id)
  }

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'subscription',
    customer: customerId,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/pricing`,
  })

  if (session.url) {
    return redirect(session.url)
  }
}

export async function createCustomerPortalSession() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) return redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('stripe_customer_id')
    .eq('id', user.id)
    .single()

  if (!profile?.stripe_customer_id) return

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: profile.stripe_customer_id,
    return_url: `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`,
  })

  return redirect(portalSession.url)
}
