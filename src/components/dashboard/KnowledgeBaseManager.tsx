// src/components/dashboard/KnowledgeBaseManager.tsx
'use client'

import { useState, useTransition } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { Upload, Trash2 } from 'lucide-react'
import { addDataSource, deleteDataSource } from '@/app/(dashboard)/actions'
import { type DataSource } from '@/lib/types'

export function KnowledgeBaseManager({ chatbotId, initialDataSources }: { chatbotId: string; initialDataSources: DataSource[] }) {
  const [dataSources, setDataSources] = useState<DataSource[]>(initialDataSources)
  const [isPending, startTransition] = useTransition()

  const handleFileSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    formData.append('chatbotId', chatbotId)

    startTransition(async () => {
      const result = await addDataSource(formData)
      if (result?.error) {
        toast.error('Upload Failed', { description: result.error })
      } else {
        toast.success('File uploaded successfully!')
      }
    })
  }

  const handleDelete = (sourceId: string) => {
    startTransition(async () => {
      await deleteDataSource({ sourceId })
      setDataSources((prev) => prev.filter((s) => s.id !== sourceId))
      toast.success('Source deleted.')
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>File Upload</CardTitle>
        <CardDescription>
          Upload PDF or TXT files. The content will be processed and added to your bot&apos;s knowledge. (Processing logic will be added later).
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <form className="flex items-center gap-2" onSubmit={handleFileSubmit}>
          <Input type="file" name="file" accept=".pdf,.txt" />
          <Button type="submit" disabled={isPending}>
            <Upload className="mr-2 h-4 w-4" /> {isPending ? 'Uploading...' : 'Upload'}
          </Button>
        </form>

        <div className="space-y-2">
          <h3 className="font-semibold">Uploaded Sources</h3>
          {dataSources.length === 0 && (
            <div className="text-center py-6 border-2 border-dashed border-gray-200 rounded-lg">
              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-2" />
              <p className="text-sm text-gray-600">No files uploaded yet.</p>
              <p className="text-xs text-gray-500 mt-1">Upload PDF or TXT files to enhance your bot&apos;s knowledge base.</p>
            </div>
          )}
          {dataSources.map((source) => (
            <div key={source.id} className="flex items-center justify-between rounded-md border p-2">
              <div>
                <p className="font-medium">{source.file_name ?? 'Untitled file'}</p>
                <p className="text-xs text-muted-foreground">Status: {source.status}</p>
              </div>
              <Button variant="ghost" size="sm" onClick={() => handleDelete(source.id)} disabled={isPending}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}


