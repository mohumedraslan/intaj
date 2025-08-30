// src/app/(dashboard)/help/page.tsx
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Mail, MessageSquare, BookOpen, Settings } from "lucide-react";

const helpTopics = [
  {
    question: "How do I train my chatbot?",
    answer: "You can train your chatbot in two ways. Go to the &apos;Manage&apos; page for your chatbot. Use the &apos;Knowledge Base&apos; tab to upload files (like PDFs or text documents) containing your business information. Use the &apos;FAQs&apos; tab to add specific question-and-answer pairs for common queries."
  },
  {
    question: "How does the AI know what to say?",
    answer: "Our AI uses a technique called Retrieval-Augmented Generation (RAG). When a user asks a question, the system first searches your uploaded knowledge base and FAQs for relevant information. It then provides this information to a large language model (like GPT) as context, instructing it to base its answer on your specific data."
  },
  {
    question: "What is the difference between the Free and Pro plans?",
    answer: "The Free plan is great for getting started and allows you to create one chatbot with limited monthly messages. The Pro and Business plans offer more chatbots, a much higher message limit, priority support, and other advanced features. You can see all the details on our 'Pricing' page."
  },
  {
    question: "How do I manage my subscription?",
    answer: "You can manage your subscription at any time. Click on your email in the top-right corner of the dashboard and select 'Manage Billing'. This will take you to our secure customer portal where you can change your plan, update your payment method, or cancel your subscription."
  },
  {
    question: "Can I embed my chatbot on my website?",
    answer: "Yes! Once you've created and trained your chatbot, you can embed it on your website. We provide a simple JavaScript snippet that you can add to your website. The chatbot will appear as a chat widget that visitors can interact with."
  },
  {
    question: "How do I view analytics for my chatbot?",
    answer: "Navigate to your chatbot's page and click the 'Analytics' button. You'll see metrics like total messages, conversation history, and user feedback. This helps you understand how your chatbot is performing and identify areas for improvement."
  },
  {
    question: "What file types can I upload to train my chatbot?",
    answer: "Currently, we support PDF and text files. Make sure your files are clear and well-structured for the best results. The AI will extract and learn from the content in these files to provide accurate responses."
  },
  {
    question: "How do I provide feedback on AI responses?",
    answer: "In the Analytics section of your chatbot, you can review recent conversations and provide feedback on individual AI responses using the thumbs up/down buttons. This helps us improve the AI's performance for your specific use case."
  }
];

export default function HelpPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 p-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">Help & Documentation</h1>
        <p className="text-lg text-gray-600">
          Everything you need to know about using Intaj effectively.
        </p>
      </div>

      {/* Quick Start Guide */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Quick Start Guide
          </CardTitle>
          <CardDescription>
            Get up and running with your first AI chatbot in minutes.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                1
              </div>
              <h3 className="font-semibold">Create Your Chatbot</h3>
              <p className="text-sm text-gray-600">
                Go to your dashboard and click &quot;Create New Chatbot&quot;. Give it a name and define its personality.
              </p>
            </div>
            <div className="space-y-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                2
              </div>
              <h3 className="font-semibold">Train Your AI</h3>
              <p className="text-sm text-gray-600">
                Upload your business documents and create FAQs to teach your chatbot about your business.
              </p>
            </div>
            <div className="space-y-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                3
              </div>
              <h3 className="font-semibold">Test & Deploy</h3>
              <p className="text-sm text-gray-600">
                Have a conversation with your bot, review its performance, and embed it on your website.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Frequently Asked Questions
          </CardTitle>
          <CardDescription>
            Find answers to common questions about using Intaj.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {helpTopics.map((topic, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {topic.question}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-gray-600 leading-relaxed">{topic.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      {/* Contact Support */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Contact Support
          </CardTitle>
          <CardDescription>
            Can&apos;t find the answer you&apos;re looking for?
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <p className="text-gray-600">
              Our team is here to help. Please reach out to us via email and we&apos;ll get back to you as soon as possible.
            </p>
            <div className="flex items-center justify-center gap-2">
              <Mail className="h-4 w-4 text-gray-500" />
              <a 
                href="mailto:nabih.ai.agency@gmail.com" 
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                nabih.ai.agency@gmail.com
              </a>
            </div>
            <p className="text-sm text-gray-500">
              We typically respond within 24 hours during business days.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Additional Resources */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Additional Resources
          </CardTitle>
          <CardDescription>
            More ways to get the most out of Intaj.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Best Practices</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Upload clear, well-structured documents</li>
                <li>• Create specific FAQs for common questions</li>
                <li>• Regularly review and provide feedback</li>
                <li>• Test your chatbot thoroughly before deployment</li>
              </ul>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold mb-2">Tips for Success</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Start with a focused knowledge base</li>
                <li>• Monitor analytics to identify improvement areas</li>
                <li>• Update your content regularly</li>
                <li>• Use the feedback system to improve responses</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
