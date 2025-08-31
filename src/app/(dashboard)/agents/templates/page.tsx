import { TemplateCard } from '@/components/agents/TemplateCard';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { notFound } from 'next/navigation';

// Expanded placeholder data with categories
const allTemplates = [
  // Support
  { id: 'sup-1', name: 'FAQ Responder', description: 'Answers common questions from a knowledge base.', tags: ['Support', 'E-commerce'], category: 'Support' },
  { id: 'sup-2', name: 'Ticket Triage Agent', description: 'Gathers initial details and routes tickets to the right team.', tags: ['Support', 'Services'], category: 'Support' },
  { id: 'sup-3', name: 'Order Status Checker', description: 'Provides real-time order updates for e-commerce stores.', tags: ['Support', 'E-commerce'], category: 'Support' },

  // Sales
  { id: 'sal-1', name: 'Lead Qualification Bot', description: 'Asks qualifying questions and captures contact information.', tags: ['Sales', 'Marketing'], category: 'Sales' },
  { id: 'sal-2', name: 'Appointment Booker', description: 'Integrates with your calendar to schedule demos.', tags: ['Sales', 'Scheduling'], category: 'Sales' },
  { id: 'sal-3', name: 'Real Estate Info Bot', description: 'Answers questions about property listings and captures leads.', tags: ['Sales', 'Real Estate'], category: 'Sales' },

  // Marketing
  { id: 'mkt-1', name: 'Ad Campaign Catcher', description: 'Engages users who click on an ad and guides them through a funnel.', tags: ['Marketing', 'Ads'], category: 'Marketing' },
  { id: 'mkt-2', name: 'Event Registration Bot', description: 'Registers attendees for webinars and events.', tags: ['Marketing', 'Events'], category: 'Marketing' },

  // Content
  { id: 'con-1', name: 'Article Idea Generator', description: 'Helps brainstorm and outline blog posts and articles.', tags: ['Content', 'Writing'], category: 'Content' },
  { id: 'con-2', name: 'SEO Keyword Helper', description: 'Suggests relevant keywords for your content.', tags: ['Content', 'SEO'], category: 'Content' },
];

const CATEGORIES = ['Support', 'Sales', 'Marketing', 'Content'];

export default function TemplatesPage({ searchParams }: { searchParams: { category?: string } }) {
  const { category } = searchParams;

  if (!category || !CATEGORIES.includes(category)) {
    // Or redirect to a default category page, e.g., redirect('/agents/templates?category=Support')
    notFound();
  }

  const templates = allTemplates.filter(t => t.category === category);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold">{category} Agent Templates</h1>
          <p className="text-muted-foreground mt-1">
            Select a starting point or build your own from scratch.
          </p>
        </div>
        <Link href={`/agents/build?category=${category}`}>
          <Button variant="outline" size="lg">Build From Scratch</Button>
        </Link>
      </div>

      {templates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map(template => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      ) : (
         <div className="text-center py-16 border-2 border-dashed rounded-lg">
            <h3 className="text-xl font-semibold">No templates found for {category}.</h3>
            <p className="text-muted-foreground mt-2">More templates are coming soon!</p>
        </div>
      )}
    </div>
  );
}
