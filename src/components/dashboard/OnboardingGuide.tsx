// src/components/dashboard/OnboardingGuide.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle2, Circle, PlusCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

interface OnboardingGuideProps {
  chatbotCount: number;
}

export function OnboardingGuide({ chatbotCount }: OnboardingGuideProps) {
  const hasCreatedBot = chatbotCount > 0;

  // Don't show the guide if they've already completed the steps
  if (hasCreatedBot) {
    return null;
  }

  return (
    <Card className="mb-6 border-2 border-blue-200 bg-blue-50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-900">
          <CheckCircle2 className="h-5 w-5" />
          Welcome to Intaj! Let&apos;s Get Started.
        </CardTitle>
        <CardDescription className="text-blue-700">
          Follow these simple steps to launch your first AI assistant.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            {hasCreatedBot ? (
              <CheckCircle2 className="h-5 w-5 text-green-600" />
            ) : (
              <Circle className="h-5 w-5 text-blue-600" />
            )}
            <div className="flex-1">
              <h4 className="font-medium">Step 1: Create Your First Chatbot</h4>
              <p className="text-sm text-gray-600">Give your chatbot a name and a personality.</p>
            </div>
            {!hasCreatedBot && (
              <Link href="/chatbots/create">
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create Chatbot
                </Button>
              </Link>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Circle className="h-5 w-5 text-gray-400" />
            <div className="flex-1">
              <h4 className="font-medium text-gray-500">Step 2: Add Knowledge Base</h4>
              <p className="text-sm text-gray-500">Upload documents or create FAQs to train your bot.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Circle className="h-5 w-5 text-gray-400" />
            <div className="flex-1">
              <h4 className="font-medium text-gray-500">Step 3: Test Your Chatbot</h4>
              <p className="text-sm text-gray-500">Have a conversation and see how it responds.</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Circle className="h-5 w-5 text-gray-400" />
            <div className="flex-1">
              <h4 className="font-medium text-gray-500">Step 4: Share Your Bot</h4>
              <p className="text-sm text-gray-500">Embed it on your website or share the link.</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
