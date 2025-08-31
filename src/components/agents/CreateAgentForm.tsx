"use client";

import { useTransition, forwardRef, useImperativeHandle } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

import { createAgent } from "@/app/(dashboard)/actions";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const agentSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long."),
  initial_prompt: z
    .string()
    .min(20, "The initial prompt must be at least 20 characters long to be effective."),
});

type AgentFormValues = z.infer<typeof agentSchema>;

interface CreateAgentFormProps {
  defaultValues?: Partial<AgentFormValues>;
  onSuccess: (agent: { id: string; name: string; }) => void;
  isPending: boolean;
}

export type CreateAgentFormHandle = {
  triggerSubmit: () => void;
};

const CreateAgentForm = forwardRef<CreateAgentFormHandle, CreateAgentFormProps>(
  ({ defaultValues, onSuccess, isPending }, ref) => {
    const [internalIsPending, startTransition] = useTransition();

    const form = useForm<AgentFormValues>({
      resolver: zodResolver(agentSchema),
      defaultValues: defaultValues || {
        name: "",
        initial_prompt:
          "You are a helpful and friendly customer service assistant. Your goal is to answer questions accurately and professionally.",
      },
    });

    useImperativeHandle(ref, () => ({
      triggerSubmit: () => form.handleSubmit(onSubmit)(),
    }));

    const onSubmit = (values: AgentFormValues) => {
      startTransition(async () => {
        const result = await createAgent(values);
        if (result?.error) {
          toast.error("Failed to create agent", { description: result.error });
        } else {
          toast.success("Agent configured successfully!");
          if (result.data) {
            onSuccess(result.data);
          }
        }
      });
    };

    return (
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
                    rows={6}
                  />
                </FormControl>
                <FormDescription>
                  This is the master instruction for your AI. Be as descriptive as possible.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* The submit button is now in the parent wizard component */}
        </form>
      </Form>
    );
  }
);

CreateAgentForm.displayName = "CreateAgentForm";

export default CreateAgentForm;
