import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export function TemplateCard({ template }: { template: { id: string; name: string; description: string; tags: string[] } }) {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle>{template.name}</CardTitle>
        <CardDescription>{template.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2 mb-4">
        {template.tags.map(tag => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </CardContent>
      <CardFooter className="mt-auto">
        <Link href={`/agents/create?templateId=${template.id}`}>
          <Button>Use Template</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
