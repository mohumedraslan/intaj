// src/components/agents/TemplateCard.tsx
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export function TemplateCard({ template }: { template: { id: string; name: string; description: string; tags: string[] } }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{template.name}</CardTitle>
        <CardDescription>{template.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          {template.tags.map(tag => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/agents/create?templateId=${template.id}`} className="w-full">
          <Button className="w-full">
            Use Template
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
