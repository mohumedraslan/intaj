// src/app/(dashboard)/pricing/page.tsx
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Check } from 'lucide-react'
import { createCheckoutSession } from '@/app/(dashboard)/actions'

const tiers = [
  {
    name: 'Pro',
    priceId: 'price_...', // Replace with your real Stripe Price ID
    price: '$20',
    description: 'For power users and small teams.',
    features: ['5 Chatbots', '10,000 Messages/mo', 'File Upload & FAQ', 'Email Support'],
  },
  {
    name: 'Business',
    priceId: 'price_...', // Replace with your real Stripe Price ID
    price: '$75',
    description: 'For growing businesses.',
    features: ['Unlimited Chatbots', '50,000 Messages/mo', 'Priority Support', 'API Access'],
  },
]

export default function PricingPage() {
  return (
    <div className="mx-auto max-w-5xl space-y-6 p-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Pricing Plans</h1>
        <p className="text-muted-foreground">Choose the plan that's right for you.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
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
                    <Check className="h-4 w-4 text-green-600" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <form action={createCheckoutSession} className="w-full">
                <input type="hidden" name="priceId" value={tier.priceId} />
                <Button type="submit" className="w-full">Subscribe</Button>
              </form>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}


