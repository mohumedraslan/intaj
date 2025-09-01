"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

import { createAgent } from "@/app/(dashboard)/actions";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const agentSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long."),
  initial_prompt: z
    .string()
    .min(20, "The initial prompt must be at least 20 characters long to be effective."),
  category: z.string(), // Add category to the schema
});

type AgentFormValues = z.infer<typeof agentSchema>;

interface CreateAgentFormProps {
  defaultValues?: Partial<AgentFormValues>;
  category: string;
}

export default function CreateAgentForm({ defaultValues, category }: CreateAgentFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const form = useForm<AgentFormValues>({
    resolver: zodResolver(agentSchema),
    defaultValues: {
      ...defaultValues,
      category: category,
    },
  });

  const onSubmit = (values: AgentFormValues) => {
    startTransition(async () => {
      const result = await createAgent(values);
      if (result?.error) {
        toast.error("Failed to create agent", { description: result.error });
      } else {
        toast.success("Agent created successfully!");
        router.push("/agents"); // Redirect to the agents list page
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Build a New {category} Agent</CardTitle>
        <CardDescription>
          Define the core details of your new AI agent. You can add more knowledge later.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Agent Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., 'Support Agent for Nabih Tech'" {...field} />
                  </FormControl>
                  <FormDescription>A public name for your agent.</FormDescription>
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
                    <Textarea
                      placeholder="Describe the assistant's tone, scope, and behavior."
                      {...field}
                      rows={8}
                    />
                  </FormControl>
                  <FormDescription>
                    This is the master instruction for your AI. Be as descriptive as possible.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <input type="hidden" {...form.register("category")} />

            <div className="flex justify-end">
              <Button type="submit" disabled={isPending}>
                {isPending ? "Creating..." : "Create Agent"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
