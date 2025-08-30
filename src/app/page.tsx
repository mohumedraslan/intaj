// src/app/page.tsx
import { PublicChatInterface } from "@/components/landing/PublicChatInterface";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MessageSquare, Zap, Shield, Users, CheckCircle } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">Intaj</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/login">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Build an AI Assistant for Your Business in Minutes
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Train a custom chatbot on your own data, answer customer questions instantly, and automate your support. No coding required.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/login">
                  <Button size="lg" className="w-full sm:w-auto">
                    Get Started for Free
                  </Button>
                </Link>
                <Link href="#demo">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Try the Demo
                  </Button>
                </Link>
              </div>

              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Setup in 5 minutes</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span>Free tier available</span>
                </div>
              </div>
            </div>

            {/* Right Column - Demo Chat */}
            <div id="demo" className="flex justify-center">
              <PublicChatInterface />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-gray-900">
              Everything You Need to Build AI Chatbots
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From simple FAQ bots to complex customer support systems, Intaj gives you the tools to create intelligent conversational AI.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <Zap className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Lightning Fast Setup</h3>
              <p className="text-gray-600">
                Create your first chatbot in under 5 minutes. No technical knowledge required.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Enterprise Security</h3>
              <p className="text-gray-600">
                Your data is protected with enterprise-grade security and privacy controls.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900">Scale with Confidence</h3>
              <p className="text-gray-600">
                Handle thousands of conversations simultaneously with our scalable infrastructure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl font-bold text-white">
            Ready to Transform Your Customer Support?
          </h2>
          <p className="text-xl text-blue-100">
            Join thousands of businesses using Intaj to provide instant, intelligent customer support 24/7.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/login">
              <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                Start Building Today
              </Button>
            </Link>
            <Link href="/pricing">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-blue-600">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <MessageSquare className="h-6 w-6 text-blue-400" />
                <span className="text-xl font-bold">Intaj</span>
              </div>
              <p className="text-gray-400">
                Transform your customer interactions with AI-powered chatbots.
              </p>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
                <li><Link href="/login" className="hover:text-white">Sign Up</Link></li>
                <li><Link href="/login" className="hover:text-white">Sign In</Link></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Documentation</a></li>
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-semibold">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Blog</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Intaj. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
