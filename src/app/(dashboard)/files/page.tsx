// src/app/(dashboard)/files/page.tsx
import { getSession } from '@/app/auth/actions';
import { redirect } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FileIcon, UploadIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default async function FilesPage() {
  const { user } = await getSession();
  if (!user) redirect('/login');

  return (
    <div className="max-w-6xl mx-auto space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Files</h1>
        <Button className="flex items-center gap-2">
          <UploadIcon className="h-4 w-4" />
          Upload File
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Empty state */}
        <Card className="col-span-full flex flex-col items-center justify-center p-6 h-64">
          <FileIcon className="h-16 w-16 text-muted-foreground mb-4" />
          <CardTitle className="text-xl mb-2">No files uploaded yet</CardTitle>
          <CardDescription className="text-center mb-4">
            Upload files to use with your agents and workflows
          </CardDescription>
          <Button className="flex items-center gap-2">
            <UploadIcon className="h-4 w-4" />
            Upload your first file
          </Button>
        </Card>
      </div>
    </div>
  );
}