import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Bot, LineChart, MessageCircle, PenSquare, Rocket, Wrench } from 'lucide-react';
import { cn } from '@/lib/utils';

const agentCategories = [
  {
    title: 'Customer Support',
    description: 'Automate responses to common questions.',
    href: '/agents/templates?category=Support',
    icon: MessageCircle,
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-800',
  },
  {
    title: 'Sales & Lead Gen',
    description: 'Qualify leads and book meetings.',
    href: '/agents/templates?category=Sales',
    icon: LineChart,
    bgColor: 'bg-green-100',
    textColor: 'text-green-800',
  },
  {
    title: 'Marketing & Ads',
    description: 'Engage prospects from campaigns.',
    href: '/agents/templates?category=Marketing',
    icon: Rocket,
    bgColor: 'bg-purple-100',
    textColor: 'text-purple-800',
  },
  {
    title: 'Content & SEO',
    description: 'Generate articles and optimize for search.',
    href: '/agents/templates?category=Content',
    icon: PenSquare,
    bgColor: 'bg-orange-100',
    textColor: 'text-orange-800',
  },
];

const customRequestCard = {
    title: 'Custom Workflow / Automation',
    description: 'Have a unique business need? Describe your ideal workflow, and our network of expert developers will build it for you.',
    href: '/agents/request',
    icon: Wrench,
    bgColor: 'bg-gray-100 dark:bg-gray-800',
    textColor: 'text-gray-800 dark:text-gray-200',
    isFeatured: true,
};

export default function ChooseAgentTypePage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight">What do you want to build?</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Select a category to see specialized templates or request a custom build.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {agentCategories.map((category) => (
          <Link key={category.title} href={category.href} className="block group">
            <Card className="h-full hover:shadow-lg transition-shadow duration-300 hover:border-primary">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className={`p-3 rounded-lg ${category.bgColor}`}>
                  <category.icon className={`w-6 h-6 ${category.textColor}`} />
                </div>
                <div>
                  <CardTitle className="text-base">{category.title}</CardTitle>
                  <CardDescription className="mt-1 text-xs">
                    {category.description}
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-8">
         <Link href={customRequestCard.href} className="block group">
            <Card className={cn(
                "h-full hover:shadow-lg transition-shadow duration-300 hover:border-primary",
                customRequestCard.bgColor
            )}>
              <CardHeader className="flex flex-row items-center gap-6 p-6">
                <div className={`p-4 rounded-lg bg-background/50`}>
                  <customRequestCard.icon className={`w-10 h-10 ${customRequestCard.textColor}`} />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-xl">{customRequestCard.title}</CardTitle>
                  <CardDescription className="mt-1 text-base">
                    {customRequestCard.description}
                  </CardDescription>
                </div>
              </CardHeader>
            </Card>
          </Link>
      </div>
    </div>
  );
}
