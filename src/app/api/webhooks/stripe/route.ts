// src/app/api/webhooks/stripe/route.ts
import Stripe from 'stripe'
import { headers } from 'next/headers'
import { createAdminClient } from '@/lib/supabase/admin'

export const dynamic = 'force-dynamic'

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string

export async function POST(req: Request) {
  const stripe = new Stripe(process.env.STRIPE_API_KEY as string)
  const body = await req.text()
  const headersList = await headers()
  const signature = headersList.get('Stripe-Signature') as string

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    return new Response(`Webhook Error: ${errorMessage}`, { status: 400 })
  }

  const session = event.data.object as Stripe.Checkout.Session
  const supabase = createAdminClient()

  if (event.type === 'checkout.session.completed') {
    const subscription = await stripe.subscriptions.retrieve(session.subscription as string)
    await supabase
      .from('profiles')
      .update({
        subscription_status: subscription.status,
        stripe_subscription_id: subscription.id,
        stripe_price_id: (subscription.items.data[0]?.price?.id as string) || null,
      })
      .eq('stripe_customer_id', session.customer as string)
  }

  if (event.type === 'invoice.payment_succeeded') {
    const subscription = await stripe.subscriptions.retrieve(session.subscription as string)
    await supabase
      .from('profiles')
      .update({ subscription_status: subscription.status })
      .eq('stripe_subscription_id', subscription.id)
  }

  return new Response(null, { status: 200 })
}
