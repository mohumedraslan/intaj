// src/app/(dashboard)/agents/templates/page.tsx
import { TemplateCard } from '@/components/agents/TemplateCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// Placeholder data
const templates = [
  { id: '1', name: 'Customer Support Agent', description: 'Answers common questions and hands off to a human when needed.', tags: ['Support', 'E-commerce'] },
  { id: '2', name: 'Lead Generation Agent', description: 'Asks qualifying questions and captures contact information.', tags: ['Sales', 'Marketing'] },
  { id: '3', name: 'Appointment Booker', description: 'Integrates with your calendar to schedule meetings.', tags: ['Scheduling', 'Services'] },
];

export default function TemplatesPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">Choose a Template</h1>
        <Link href="/agents/build?category=from-scratch">
          <Button variant="outline">Build From Scratch</Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map(template => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>
    </div>
  );
}
