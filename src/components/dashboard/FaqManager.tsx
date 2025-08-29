// src/components/dashboard/FaqManager.tsx
'use client'

import { useState, useTransition } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { Plus, Trash2 } from 'lucide-react'
import { addFaq, deleteFaq } from '@/app/(dashboard)/actions'
import { type Faq } from '@/lib/types'

export function FaqManager({ chatbotId, initialFaqs }: { chatbotId: string; initialFaqs: Faq[] }) {
  const [faqs, setFaqs] = useState<Faq[]>(initialFaqs)
  const [isPending, startTransition] = useTransition()

  const handleFaqSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const question = formData.get('question') as string
    const answer = formData.get('answer') as string

    startTransition(async () => {
      const result = await addFaq({ chatbotId, question, answer })
      if (result?.error) {
        toast.error('Failed to add FAQ', { description: result.error })
      } else if (result?.newFaq) {
        toast.success('FAQ added!')
        setFaqs((prev) => [...prev, result.newFaq])
        ;(event.target as HTMLFormElement).reset()
      }
    })
  }

  const handleDelete = (faqId: string) => {
    startTransition(async () => {
      await deleteFaq({ faqId })
      setFaqs((prev) => prev.filter((f) => f.id !== faqId))
      toast.success('FAQ deleted.')
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Manage FAQs</CardTitle>
        <CardDescription>Add specific question-and-answer pairs for precise responses.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <form className="space-y-2" onSubmit={handleFaqSubmit}>
          <div className="space-y-1">
            <label className="text-sm font-medium">Question</label>
            <Input name="question" required />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium">Answer</label>
            <Textarea name="answer" required />
          </div>
          <Button type="submit" disabled={isPending}>
            <Plus className="mr-2 h-4 w-4" /> {isPending ? 'Adding...' : 'Add FAQ'}
          </Button>
        </form>

        <div className="space-y-2">
          <h3 className="font-semibold">Existing FAQs</h3>
          {faqs.length === 0 && <p className="text-sm text-muted-foreground">No FAQs added yet.</p>}
          {faqs.map((faq) => (
            <div key={faq.id} className="rounded-md border p-2">
              <div className="flex items-start justify-between">
                <p className="flex-1 font-bold">{faq.question}</p>
                <Button variant="ghost" size="sm" onClick={() => handleDelete(faq.id)} disabled={isPending}>
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
              <p className="text-muted-foreground">{faq.answer}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}


