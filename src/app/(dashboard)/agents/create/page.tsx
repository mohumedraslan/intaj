import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LineChart, MessageCircle, PenSquare, Rocket, Wrench } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const agentCategories = [
  {
    title: 'Customer Support',
    description: 'Automate responses to common questions.',
    href: '#', // Disabled for now
    icon: MessageCircle,
    bgColor: 'bg-blue-100',
    textColor: 'text-blue-800',
    disabled: true,
  },
  {
    title: 'Sales & Lead Gen',
    description: 'Qualify leads and book meetings.',
    href: '#', // Disabled for now
    icon: LineChart,
    bgColor: 'bg-green-100',
    textColor: 'text-green-800',
    disabled: true,
  },
  {
    title: 'Marketing & Ads',
    description: 'Engage prospects from campaigns.',
    href: '#', // Disabled for now
    icon: Rocket,
    bgColor: 'bg-purple-100',
    textColor: 'text-purple-800',
    disabled: true,
  },
  {
    title: 'Content & SEO',
    description: 'Generate articles and optimize for search.',
    href: '#', // Disabled for now
    icon: PenSquare,
    bgColor: 'bg-orange-100',
    textColor: 'text-orange-800',
    disabled: true,
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
          Agent creation is temporarily disabled while we resolve some issues. Please check back soon.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {agentCategories.map((category) => (
          <div key={category.title} className="block group opacity-50 cursor-not-allowed">
            <Card className="h-full">
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
          </div>
        ))}
      </div>

      <div className="mt-8">
         <Card className={cn(
             "h-full bg-gray-100 dark:bg-gray-800 opacity-60 cursor-not-allowed"
         )}>
           <CardHeader className="flex flex-row items-center gap-6 p-6">
             <div className={`p-4 rounded-lg bg-background/50`}>
               <customRequestCard.icon className={`w-10 h-10 ${customRequestCard.textColor}`} />
             </div>
             <div className="flex-1">
               <div className="flex items-center justify-between">
                 <CardTitle className="text-xl">{customRequestCard.title}</CardTitle>
                 <Badge variant="outline">Coming Soon</Badge>
               </div>
               <CardDescription className="mt-1 text-base">
                 {customRequestCard.description}
               </CardDescription>
             </div>
           </CardHeader>
         </Card>
      </div>
    </div>
  );
}
