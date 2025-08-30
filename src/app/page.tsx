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
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">Intaj AI</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/pricing">
                <Button variant="ghost">Pricing</Button>
              </Link>
              <Link href="/login">
                <Button>Sign In</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Smart Automation Solutions for Businesses in Egypt
              </h1>
              <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed">
                Stop Losing Customers. Start Automating Conversations.
              </p>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">
                Companies lose over 40% of their customers due to slow response times. Intaj provides AI agents that engage every customer instantly, turning queries into conversions.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login">
                <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-4">
                  Get Started for Free
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg px-8 py-4">
                  Book a Free Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features/Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              The All-in-One AI Platform for Business Growth
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Go beyond simple chatbots. Build powerful AI agents for every part of your business.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="space-y-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Transform Every Customer Touchpoint
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From first contact to final sale, your AI agents work tirelessly to grow your business.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {useCases.map((useCase, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    {useCase.icon}
                  </div>
                  <CardTitle className="text-xl">{useCase.title}</CardTitle>
                  <p className="text-gray-600 text-sm">
                    {useCase.description}
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {useCase.benefits.map((benefit, benefitIndex) => (
                      <li key={benefitIndex} className="flex items-center space-x-2 text-sm text-gray-700">
                        <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Trusted by Leading Businesses in the MENA Region
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From e-commerce stores to healthcare providers, Intaj powers growth.
            </p>
          </div>

          {/* Placeholder for logos */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
            <div className="w-32 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 font-medium">
              Client Logo 1
            </div>
            <div className="w-32 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 font-medium">
              Client Logo 2
            </div>
            <div className="w-32 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 font-medium">
              Client Logo 3
            </div>
            <div className="w-32 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 font-medium">
              Client Logo 4
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-white">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-blue-100">
            Create your first AI agent in under 5 minutes. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto text-lg px-8 py-4 group">
                Start Your Free Trial Now
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
          <p className="text-blue-200 text-sm">
            ✓ Free forever plan • ✓ No setup fees • ✓ Cancel anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <MessageSquare className="h-6 w-6 text-blue-400" />
                <span className="text-lg font-bold">Intaj AI</span>
              </div>
              <p className="text-gray-400">
                Building the future of AI-powered business communication in the MENA region.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
                <li><Link href="/help" className="hover:text-white">Documentation</Link></li>
                <li><Link href="/login" className="hover:text-white">Sign In</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/about" className="hover:text-white">About</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
                <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help" className="hover:text-white">Help Center</Link></li>
                <li><Link href="/contact" className="hover:text-white">Contact Support</Link></li>
                <li><Link href="/status" className="hover:text-white">System Status</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Intaj AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
