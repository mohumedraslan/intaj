// src/app/(dashboard)/agents/create/page.tsx

"use client";
import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import CreateChatbotForm from "@/components/dashboard/CreateChatbotForm";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

// Placeholder template data (should match templates marketplace)
const templates = [
  {
    id: "1",
    name: "Customer Support Agent",
    description: "Answers common questions and hands off to a human when needed.",
    initial_prompt: "You are a helpful support agent.",
  },
  {
    id: "2",
    name: "Lead Generation Agent",
    description: "Asks qualifying questions and captures contact information.",
    initial_prompt: "You are a lead generation assistant.",
  },
  {
    id: "3",
    name: "Appointment Booker",
    description: "Integrates with your calendar to schedule meetings.",
    initial_prompt: "You help users book appointments.",
  },
];

export default function CreateAgentWizard() {
  const searchParams = useSearchParams();
  const templateId = searchParams.get("templateId");
  const [step, setStep] = useState(1);

  // Find template by ID
  const selectedTemplate = useMemo(() => {
    if (!templateId) return null;
    return templates.find(t => t.id === templateId);
  }, [templateId]);

  // Step 1: Configure
  // Step 2: Connect
  // Step 3: Publish

  return (
    <div className="max-w-2xl mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Setup Your Agent</CardTitle>
          <CardDescription>
            {step === 1 && "Step 1: Configure your agent"}
            {step === 2 && "Step 2: Connect a channel"}
            {step === 3 && "Step 3: Publish your agent"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <div>
              {selectedTemplate && (
                <div className="mb-4 p-3 rounded bg-muted">
                  <div className="font-semibold">Template: {selectedTemplate.name}</div>
                  <div className="text-sm text-muted-foreground">{selectedTemplate.description}</div>
                </div>
              )}
              {/* Pass default values from template if available */}
              <CreateChatbotForm
                defaultValues={selectedTemplate ? {
                  name: selectedTemplate.name,
                  initial_prompt: selectedTemplate.initial_prompt,
                } : undefined}
              />
              <div className="flex justify-end mt-6">
                <Button onClick={() => setStep(2)}>
                  Next: Connect Channel
                </Button>
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="space-y-4">
              <div className="mb-4">
                <div className="font-semibold">Connect a Channel</div>
                <div className="text-muted-foreground text-sm">Choose where your agent will be deployed (e.g., WhatsApp, Facebook, Website).</div>
              </div>
              {/* Placeholder for channel connection UI */}
              <div className="bg-muted p-4 rounded">Channel connection options coming soon.</div>
              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                <Button onClick={() => setStep(3)}>Next: Publish</Button>
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="space-y-4">
              <div className="mb-4">
                <div className="font-semibold">Publish Your Agent</div>
                <div className="text-muted-foreground text-sm">Your agent is ready! Click below to publish and go live.</div>
              </div>
              {/* Placeholder for publish action */}
              <div className="bg-muted p-4 rounded">Publishing options coming soon.</div>
              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
                <Button disabled>Publish (Coming Soon)</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
