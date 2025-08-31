"use client";

import { useSearchParams } from 'next/navigation';
import CreateAgentForm from '@/components/agents/CreateAgentForm';
import { useMemo } from 'react';

// This placeholder data should ideally be fetched from a database
// or a centralized config file. It must match the data in templates/page.tsx
const allTemplates = [
    // Support
    { id: 'sup-1', name: 'FAQ Responder', description: 'Answers common questions from a knowledge base.', tags: ['Support', 'E-commerce'], category: 'Support', initial_prompt: 'You are an expert FAQ responder. You will be given a question and a knowledge base. Answer the question based *only* on the provided information. If the answer is not in the knowledge base, say "I do not have enough information to answer that question."' },
    { id: 'sup-2', name: 'Ticket Triage Agent', description: 'Gathers initial details and routes tickets to the right team.', tags: ['Support', 'Services'], category: 'Support', initial_prompt: 'You are a ticket triage agent. Ask the user for their name, email, and a detailed description of their issue. Confirm the details back to them and let them know a support agent will be in touch shortly.' },
    { id: 'sup-3', name: 'Order Status Checker', description: 'Provides real-time order updates for e-commerce stores.', tags: ['Support', 'E-commerce'], category: 'Support', initial_prompt: 'You are an order status checker. Ask the user for their order number. Then, tell them you are looking it up. (This is a template; the real lookup logic will be added later). Finally, provide a sample status like "Your order # a public.is on its way and should arrive in 3-5 business days."' },

    // Sales
    { id: 'sal-1', name: 'Lead Qualification Bot', description: 'Asks qualifying questions and captures contact information.', tags: ['Sales', 'Marketing'], category: 'Sales', initial_prompt: 'You are a lead qualification bot for a B2B SaaS company. Ask the user about their company size, their role, and their budget. After gathering this information, ask for their work email to send them a case study.' },
    { id: 'sal-2', name: 'Appointment Booker', description: 'Integrates with your calendar to schedule demos.', tags: ['Sales', 'Scheduling'], category: 'Sales', initial_prompt: 'You are a sales appointment booker. Your goal is to schedule a 30-minute demo. Ask the user for their availability for the upcoming week and provide three available slots. Once they choose, confirm the time and ask for their email to send a calendar invite.' },
    { id: 'sal-3', name: 'Real Estate Info Bot', description: 'Answers questions about property listings and captures leads.', tags: ['Sales', 'Real Estate'], category: 'Sales', initial_prompt: 'You are a real estate assistant. When a user asks about a property, provide details like price, square footage, and number of bedrooms. Then, ask if they would like to schedule a viewing and request their phone number.' },

    // Marketing, Content, etc. would go here...
];

export default function BuildAgentPage() {
  const searchParams = useSearchParams();
  const templateId = searchParams.get('templateId');
  const category = searchParams.get('category');

  const selectedTemplate = useMemo(() => {
    if (!templateId) return null;
    return allTemplates.find(t => t.id === templateId);
  }, [templateId]);

  if (!category) {
    // A category is required to build an agent.
    // In a real app, you might redirect to the 'create' page.
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold">Missing Category</h1>
        <p className="text-muted-foreground">
          A category is required to build a new agent. Please start from the beginning.
        </p>
      </div>
    );
  }

  const defaultValues = selectedTemplate
    ? { name: selectedTemplate.name, initial_prompt: selectedTemplate.initial_prompt }
    : { name: `${category} Agent`, initial_prompt: `You are a helpful ${category} agent.` };

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      <CreateAgentForm
        defaultValues={defaultValues}
        category={category}
      />
    </div>
  );
}
