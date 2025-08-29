"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

import { createChatbot } from "@/app/(dashboard)/actions";
import { Button } from "@/components/ui/button";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const chatbotSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long."),
  initial_prompt: z
    .string()
    .min(20, "The initial prompt must be at least 20 characters long to be effective."),
});

type ChatbotFormValues = z.infer<typeof chatbotSchema>;

export default function CreateChatbotForm({ userId }: { userId: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<ChatbotFormValues>({
    resolver: zodResolver(chatbotSchema),
    defaultValues: {
      name: "",
      initial_prompt:
        "You are a helpful and friendly customer service assistant. Your goal is to answer questions accurately and professionally.",
    },
  });

  const onSubmit = (values: ChatbotFormValues) => {
    startTransition(async () => {
      const result = await createChatbot({ ...values, userId });
      if (result?.error) {
        toast.error("Failed to create chatbot", { description: result.error });
      } else {
        toast.success("Chatbot created successfully!");
        router.push("/dashboard");
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create a New AI Chatbot</CardTitle>
        <CardDescription>Define its name and core personality.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chatbot Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 'Support Bot for Nabih Tech'" {...field} />
                  </FormControl>
                  <FormDescription>A public name for your chatbot.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="initial_prompt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Initial Prompt / Personality</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Describe the assistant's tone, scope, and behavior." {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the master instruction for your AI. Be as descriptive as possible.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating..." : "Create Chatbot"}
            </Button>
          </form>
      </CardContent>
    </Card>
  );
}


