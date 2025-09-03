// src/app/page.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Zap, BarChart, Plug, MessageSquare, Users, Globe, ArrowRight } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: <Zap className="h-6 w-6 text-blue-600" />,
    title: "Respond 3x Faster",
    description: "Instantly answer customer queries 24/7. Never miss a lead again because you were too slow to respond."
  },
  {
    icon: <BarChart className="h-6 w-6 text-green-600" />,
    title: "Save 40% on Costs",
    description: "Automate repetitive support and sales tasks, freeing up your human team for high-value work."
  },
  {
    icon: <Plug className="h-6 w-6 text-purple-600" />,
    title: "Integrate Everywhere",
    description: "Connect your AI agents to WhatsApp, Facebook, Instagram, and your own website with ease."
  }
];

const useCases = [
  {
    icon: <MessageSquare className="h-8 w-8 text-blue-600" />,
    title: "Customer Support",
    description: "24/7 automated support that never sleeps, handles common queries, and escalates complex issues to humans.",
    benefits: ["Instant responses", "Reduced wait times", "24/7 availability"]
  },
  {
    icon: <Users className="h-8 w-8 text-green-600" />,
    title: "Lead Generation",
    description: "Engage visitors with intelligent conversations that qualify leads and book appointments automatically.",
    benefits: ["Qualified leads", "Automated booking", "Higher conversion"]
  },
  {
    icon: <Globe className="h-8 w-8 text-purple-600" />,
    title: "E-commerce Assistant",
    description: "Help customers find products, answer questions about shipping, and process orders seamlessly.",
    benefits: ["Product recommendations", "Order assistance", "Shopping guidance"]
  }
];

export default function HighConversionPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section id="home" className="pt-24 md:pt-32 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground tracking-tight">
            The All-in-One AI Platform for Business Growth
          </h1>
          <p className="max-w-2xl mx-auto mt-6 text-lg text-muted-foreground">
            Stop Losing Customers. Start Automating Conversations.
          </p>

          <div className="mt-10">
            <h2 className="text-2xl font-bold text-foreground">Ready to Transform Your Business?</h2>
            <div className="flex justify-center mt-4">
              <Link href="/signup">
                <Button size="lg" className="group">
                  Create your first AI agent
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Create your first AI agent in under 5 minutes. No credit card required.
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              ✓ Free forever plan • ✓ No setup fees • ✓ Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* Key Benefits Section */}
      <section id="features" className="py-20 sm:py-32 bg-secondary/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Unlock Key Benefits for Your Business
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Go beyond simple chatbots. Build powerful AI agents for every part of your business.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center p-6 bg-background transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <CardContent className="space-y-4">
                  <div className="w-16 h-16 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Touchpoints Section */}
      <section id="solutions" className="py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Transform Every Customer Touchpoint
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              From first contact to final sale, your AI agents work tirelessly to grow your business.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <Card key={index} className="p-6 bg-secondary/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mb-4">
                    {useCase.icon}
                  </div>
                  <CardTitle className="text-xl">{useCase.title}</CardTitle>
                  <p className="text-muted-foreground text-sm">
                    {useCase.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-left">
                    {useCase.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-center space-x-3">
                        <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Credibility Section */}
      <section id="about" className="py-20 sm:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              Trusted by Leading Businesses in the MENA Region
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              From e-commerce stores to healthcare providers, Intaj powers growth.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-60">
            <div className="w-40 h-16 flex items-center justify-center text-muted-foreground font-semibold text-lg">
              Client Logo 1
            </div>
            <div className="w-40 h-16 flex items-center justify-center text-muted-foreground font-semibold text-lg">
              Client Logo 2
            </div>
            <div className="w-40 h-16 flex items-center justify-center text-muted-foreground font-semibold text-lg">
              Client Logo 3
            </div>
            <div className="w-40 h-16 flex items-center justify-center text-muted-foreground font-semibold text-lg">
              Client Logo 4
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 sm:py-32 bg-secondary/50">
        <div className="max-w-4xl mx-auto text-center space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">Contact Us</h2>
            <p className="text-lg text-muted-foreground">Have questions? We'd love to hear from you.</p>
            <Link href="mailto:contact@intaj.ai">
                <Button size="lg">
                    Get in Touch
                </Button>
            </Link>
        </div>
      </section>
    </div>
  );
}
