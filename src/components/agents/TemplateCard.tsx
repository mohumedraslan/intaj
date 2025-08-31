import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

interface Template {
  id: string;
  name: string;
  description: string;
  tags: string[];
  category: string; // Add category to the type definition
}

export function TemplateCard({ template }: { template: Template }) {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle>{template.name}</CardTitle>
        <CardDescription>{template.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex flex-wrap gap-2">
          {template.tags.map(tag => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Link
          href={`/agents/build?templateId=${template.id}&category=${template.category}`}
          className="w-full"
        >
          <Button className="w-full">
            Use Template
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
