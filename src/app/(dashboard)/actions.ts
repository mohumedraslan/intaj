"use server"

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import OpenAI from 'openai'
import Stripe from 'stripe'
import { type Message } from '@/lib/types'
import { redirect } from 'next/navigation'

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

// --- NEW: OpenRouter Client Initialization ---
const openrouter = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL, // Required for free models
    "X-Title": "Intaj AI", // Optional: Your app name
  },
})
const stripe = new Stripe(process.env.STRIPE_API_KEY as string)

// --- REAL AI IMPLEMENTATION (RAG UPGRADE) ---
export async function getAiResponse(values: {
  chatbotId: string;
  prompt: string | null;
  history: Message[];
}) {
  const { chatbotId, prompt, history } = values

  if (!process.env.OPENROUTER_API_KEY) {
    return { response: 'Error: OpenRouter API key is not configured on the server.' }
  }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    // This should ideally not happen if the page is protected, but as a safeguard:
    return { response: "Error: Unauthorized user." }
  }

  const lastUserMessage = history[history.length - 1]
  
  // --- NEW: LOG USER MESSAGE ---
  await supabase.from('messages').insert({
    chatbot_id: chatbotId,
    user_id: user.id,
    role: 'user',
    content: lastUserMessage.content,
  })

  // --- RETRIEVAL STEP ---
  // 1. Search for a direct match in the FAQs.
  const { data: matchedFaqs } = await supabase
    .from('faqs')
    .select('answer')
    .eq('chatbot_id', chatbotId)
    .textSearch('question', lastUserMessage.content, { type: 'websearch', config: 'english' } as { type: 'websearch'; config: string })

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

  const conversationHistory = history.map((msg: Message) => ({
    role: msg.role,
    content: msg.content,
  }))

  // --- GENERATION STEP ---
  try {
    // Fetch the chatbot's specific model if it exists
    const { data: chatbot } = await supabase
      .from('chatbots')
      .select('model')
      .eq('id', chatbotId)
      .single();
    
    const modelToUse = chatbot?.model || process.env.OPENROUTER_MODEL || 'mistralai/mistral-7b-instruct:free';
    
    const response = await openrouter.chat.completions.create({
      model: modelToUse,
      messages: [systemMessage, ...conversationHistory],
      temperature: 0.5,
      max_tokens: 250,
    })

    const aiResponse = response.choices?.[0]?.message?.content ||
      "Sorry, I couldn't generate a response."
    
    // --- NEW: LOG AI RESPONSE ---
    await supabase.from('messages').insert({
      chatbot_id: chatbotId,
      user_id: user.id,
      role: 'assistant',
      content: aiResponse,
    })
    
    return { response: aiResponse }
  } catch (error) {
    console.error('OpenRouter API Error:', error)
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
  
  // Validate price ID to prevent Stripe errors
  if (!priceId || priceId.startsWith('price_')) {
    throw new Error('Invalid Price ID configuration.')
  }
  
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

// --- NEW: MESSAGE FEEDBACK ACTION ---
export async function submitMessageFeedback(values: { messageId: string; feedback: 'good' | 'bad' }) {
  const { messageId, feedback } = values;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return { error: 'Unauthorized' };
  }
  
  // We need to ensure the user owns the message they are giving feedback on.
  // This is a simplified check. A full check would join through the chatbots table.
  const { error } = await supabase
    .from('messages')
    .update({ feedback })
    .eq('id', messageId)
    .eq('user_id', user.id); // RLS also protects this, but an explicit check is good.
  
  if (error) {
    return { error: error.message };
  }
  
  return { success: true };
}

// --- NEW: PLATFORM CONNECTION ACTIONS ---
export async function assignChatbotToConnection(formData: FormData) {
  const chatbotId = formData.get('chatbotId') as string;
  const connectionId = formData.get('connectionId') as string;
  const supabase = await createClient();
  
  await supabase
    .from('chatbots')
    .update({ connection_id: connectionId === 'null' ? null : connectionId })
    .eq('id', chatbotId);
  
  revalidatePath(`/chatbots/${chatbotId}/manage`);
}

export async function updateChatbotModel(formData: FormData) {
  const chatbotId = formData.get('chatbotId') as string;
  const model = formData.get('model') as string;
  const supabase = await createClient();
  
  await supabase
    .from('chatbots')
    .update({ model })
    .eq('id', chatbotId);
  
  revalidatePath(`/chatbots/${chatbotId}/manage`);
}

// --- NEW: FACEBOOK OAUTH ACTION ---
export async function initiateFacebookOAuth() {
  const clientId = process.env.FACEBOOK_APP_ID;
  const redirectUri = `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback/facebook`;
  const scope = 'pages_show_list,pages_messaging,instagram_basic,instagram_manage_messages';
  
  if (!clientId) {
    throw new Error('Facebook App ID is not configured.');
  }
  
  const authUrl = `https://www.facebook.com/v18.0/dialog/oauth?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&response_type=code`;
  
  redirect(authUrl);
}

// --- DASHBOARD DEMO AGENT ACTION ---
export async function getDashboardDemoResponse(values: { history: Message[] }) {
  if (!process.env.OPENROUTER_API_KEY) {
    return { response: "Sorry, our demo is currently offline. Please try again later." };
  }

  const openrouter = new OpenAI({
    baseURL: "https://openrouter.ai/api/v1",
    apiKey: process.env.OPENROUTER_API_KEY,
    defaultHeaders: {
      "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL,
      "X-Title": "Intaj AI",
    },
  });

  const demoBotPrompt = `You are a helpful and enthusiastic AI assistant for Intaj, an AI chatbot platform. Your goal is to guide new users and answer questions about the platform.

Key points about Intaj:
- It's an AI chatbot platform that allows users to create custom AI agents
- Users can train chatbots on their own data by uploading files or adding FAQs
- It supports multiple AI models including free options
- Users can connect chatbots to platforms like WhatsApp, Facebook, Instagram, and websites
- There's a free tier to get started

Keep your answers concise, friendly, and always helpful. Guide users toward creating their first chatbot or exploring the platform features.`;

  try {
    const response = await openrouter.chat.completions.create({
      model: process.env.OPENROUTER_MODEL || 'mistralai/mistral-7b-instruct:free',
      messages: [
        { role: 'system', content: demoBotPrompt },
        ...values.history
      ],
      temperature: 0.7,
      max_tokens: 200,
    });

    return { response: response.choices[0]?.message?.content || "Sorry, I couldn't generate a response." };
  } catch (error) {
    console.error("Dashboard Demo AI Error:", error);
    return { response: "Sorry, I encountered an error. Please try asking something else." };
  }
}

// --- DATA EXPORT ACTION ---
export async function requestDataExport() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    console.error('Unauthorized data export request');
    return;
  }
  
  console.log(`Data export requested for user: ${user.id}`);
  // In a real app, you would trigger a background job or send an email to your admin team here.
  // For now, we can just log the request.
  
  revalidatePath('/profile');
}
