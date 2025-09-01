// src/app/(dashboard)/pricing/page.tsx
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Check } from 'lucide-react'
import { createCheckoutSession } from '@/app/(dashboard)/actions'
import Link from 'next/link'

const tiers = [
  {
    name: 'Free',
    priceId: null, // No price ID for the free plan
    price: '$0',
    description: 'Perfect for getting started and personal projects.',
    features: ['1 Agent', '100 Messages/mo', 'Limited Knowledge Base'],
  },
  {
    name: 'Pro',
    priceId: 'price_1OqR2XKqR2XKqR2XKqR2XKqR2', // TODO: Replace with your actual Stripe Price ID
    price: '$20',
    description: 'For power users and small teams.',
    features: ['5 Agents', '10,000 Messages/mo', 'File Upload & FAQ', 'Email Support'],
  },
  {
    name: 'Business',
    priceId: 'price_2OqR2XKqR2XKqR2XKqR2XKqR2', // TODO: Replace with your actual Stripe Price ID
    price: '$75',
    description: 'For growing businesses.',
    features: ['Unlimited Agents', '50,000 Messages/mo', 'Priority Support', 'API Access'],
  },
  {
    name: 'Enterprise',
    priceId: null, // This will not use Stripe Checkout
    price: 'Custom',
    description: 'For businesses with unique needs, we offer custom-built AI agents and end-to-end workflow automation.',
    features: ['Dedicated Project Manager', 'Custom Integrations', 'Advanced Analytics & Reporting', 'Posted to rabt.nabih.tech for development'],
    isCustom: true, // Add a flag to identify this tier
  },
]

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-6 p-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold text-text">Pricing Plans</h1>
        <p className="text-muted">Choose the plan that&apos;s right for you.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {tiers.map((tier) => (
          <Card key={tier.name}>
            <CardHeader>
              <CardTitle>{tier.name}</CardTitle>
              <CardDescription>{tier.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4 text-3xl font-bold">{tier.price}<span className="text-base font-normal">/month</span></div>
              <ul className="space-y-2">
                {tier.features.map((feature) => (
                                   <li key={feature} className="flex items-center gap-2">
                   <Check className="h-4 w-4 text-primary" />
                   <span>{feature}</span>
                 </li>
                ))}
              </ul>
            </CardContent>
            <div className="p-5 border-t border-border">
              {tier.isCustom ? (
                <Link href="https://rabt.nabih.tech" target="_blank" rel="noopener noreferrer">
                  <Button className="w-full" variant="default">
                    Contact Sales
                  </Button>
                </Link>
              ) : tier.priceId ? (
                <form action={async (formData) => {
                  'use server';
                  const result = await createCheckoutSession(formData);
                  if (result?.error) {
                    // Handle error - you could add toast notification here
                    console.error(result.error);
                  }
                }} className="w-full">
                  <input type="hidden" name="priceId" value={tier.priceId} />
                  <Button type="submit" className="w-full">Subscribe</Button>
                </form>
              ) : (
                <Button className="w-full" variant="outline" disabled>
                  Your Current Plan
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}


