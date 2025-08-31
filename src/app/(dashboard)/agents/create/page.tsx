"use client";

import { useState, useMemo, useRef, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import CreateAgentForm, { CreateAgentFormHandle } from "@/components/agents/CreateAgentForm";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

// Placeholder template data (should match templates marketplace)
const templates = [
  {
    id: "1",
    name: "Customer Support Agent",
    description: "Answers common questions and hands off to a human when needed.",
    initial_prompt: "You are a helpful and friendly customer service assistant. Your goal is to answer questions accurately and professionally, providing clear and concise information. When a user seems frustrated or asks to speak to a human, offer to connect them with a support representative.",
  },
  {
    id: "2",
    name: "Lead Generation Agent",
    description: "Asks qualifying questions and captures contact information.",
    initial_prompt: "You are a friendly and proactive sales development representative. Your goal is to qualify leads by asking engaging questions about their needs and budget, and then to capture their contact information (name, email, phone number) to schedule a call with a sales executive.",
  },
  {
    id: "3",
    name: "Appointment Booker",
    description: "Integrates with your calendar to schedule meetings.",
    initial_prompt: "You are an efficient scheduling assistant. Your goal is to help users book appointments by asking for their preferred date and time, checking for availability, and confirming the booking. Be polite and clear in all your communications.",
  },
];

const STEPS = [
  { number: 1, title: "Configure your agent" },
  { number: 2, title: "Connect a channel" },
  { number: 3, title: "Publish your agent" },
];

export default function CreateAgentWizard() {
  const searchParams = useSearchParams();
  const templateId = searchParams.get("templateId");

  const [step, setStep] = useState(1);
  const [isPending, startTransition] = useTransition();
  const [newAgent, setNewAgent] =useState<{ id: string; name: string } | null>(null);

  const formRef = useRef<CreateAgentFormHandle>(null);

  const selectedTemplate = useMemo(() => {
    if (!templateId) return null;
    return templates.find(t => t.id === templateId);
  }, [templateId]);

  const handleNext = () => {
    if (step === 1) {
      formRef.current?.triggerSubmit();
    } else if (step < STEPS.length) {
      setStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
    }
  };

  const handleCreateSuccess = (agent: { id: string; name: string }) => {
    setNewAgent(agent);
    setStep(2);
  };

  const progress = (step / STEPS.length) * 100;

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <Card className="overflow-hidden">
        <CardHeader className="bg-muted/50 border-b">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <CardTitle>Setup Your Agent</CardTitle>
              <CardDescription>
                Step {step}: {STEPS[step - 1].title}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <div className="p-6">
          <Progress value={progress} className="mb-6" />
          <div className="min-h-[300px]">
            {step === 1 && (
              <div>
                {selectedTemplate && (
                  <div className="mb-6 p-4 rounded-lg bg-blue-50 border border-blue-200 text-blue-800">
                    <p className="font-semibold">Using Template: {selectedTemplate.name}</p>
                    <p className="text-sm">{selectedTemplate.description}</p>
                  </div>
                )}
                <CreateAgentForm
                  ref={formRef}
                  onSuccess={handleCreateSuccess}
                  isPending={isPending}
                  defaultValues={selectedTemplate ? {
                    name: selectedTemplate.name,
                    initial_prompt: selectedTemplate.initial_prompt,
                  } : undefined}
                />
              </div>
            )}
            {step === 2 && (
              <div className="space-y-4 text-center">
                <h3 className="text-xl font-semibold">Connect a Channel</h3>
                <p className="text-muted-foreground">
                  Choose where your agent will live. More channels coming soon!
                </p>
                <div className="p-8 bg-muted rounded-lg">
                  <p className="font-mono text-sm">Channel connection options will be available here.</p>
                </div>
              </div>
            )}
            {step === 3 && (
              <div className="space-y-4 text-center">
                <h3 className="text-xl font-semibold">Publish Your Agent</h3>
                <p className="text-muted-foreground">
                  Your agent, <span className="font-bold">{newAgent?.name || 'New Agent'}</span>, is ready to go live!
                </p>
                <div className="p-8 bg-muted rounded-lg">
                   <p className="font-mono text-sm">Publishing options will be available here.</p>
                </div>
                <Button size="lg" disabled>Publish Agent (Coming Soon)</Button>
              </div>
            )}
          </div>
        </div>
        <div className="bg-muted/50 border-t p-4 flex justify-between">
          <Button variant="outline" onClick={handleBack} disabled={step === 1}>
            Back
          </Button>
          <Button onClick={handleNext} disabled={isPending || (step === 3)}>
            {isPending ? 'Saving...' : (step === STEPS.length - 1 ? 'Next: Publish' : 'Next')}
          </Button>
        </div>
      </Card>
    </div>
  );
}
