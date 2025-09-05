// src/app/(dashboard)/pricing/page.tsx
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Check } from 'lucide-react'
import { createCheckoutSession } from '@/app/(dashboard)/actions'
import Link from 'next/link'
import './pricing.css'

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

      <div className="flex flex-col gap-6">
        {tiers.map((tier) => (
          <Card key={tier.name} className="pricing-card flex flex-col md:flex-row overflow-hidden">
            <CardHeader className="pricing-card-header md:w-1/4 md:border-r md:border-r-primary/10">
              <CardTitle className="text-2xl">{tier.name}</CardTitle>
              <div className="pricing-card-price mt-2">{tier.price}<span className="pricing-card-price-period">/month</span></div>
              <CardDescription className="mt-2">{tier.description}</CardDescription>
            </CardHeader>
            <CardContent className="md:w-2/4 flex flex-col justify-center">
              <ul className="space-y-2">
                {tier.features.map((feature) => (
                  <li key={feature} className="pricing-feature-item flex items-center gap-2">
                    <Check className="pricing-feature-icon h-4 w-4" />
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <div className="pricing-card-cta p-5 md:w-1/4 flex items-center justify-center md:border-l md:border-l-primary/10">
              {tier.isCustom ? (
                <Link href="https://rabt.nabih.tech" target="_blank" rel="noopener noreferrer">
                  <Button className="w-full" variant="default">
                    Contact Sales
                  </Button>
                </Link>
              ) : tier.priceId ? (
                <form action={createCheckoutSession} className="w-full">
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


