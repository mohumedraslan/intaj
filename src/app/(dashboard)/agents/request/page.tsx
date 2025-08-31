"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { postCustomRequest } from "@/app/(dashboard)/actions";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTransition } from "react";

const requestSchema = z.object({
  title: z.string().min(10, "Title must be at least 10 characters long."),
  description: z.string().min(50, "Please provide a detailed description of at least 50 characters."),
  platforms: z.array(z.string()).refine(value => value.some(item => item), {
    message: "You have to select at least one platform.",
  }),
  budget: z.string({
    required_error: "Please select a budget range.",
  }),
});

type RequestFormValues = z.infer<typeof requestSchema>;

const platforms = [
  { id: "whatsapp", label: "WhatsApp" },
  { id: "instagram", label: "Instagram" },
  { id: "facebook", label: "Facebook Messenger" },
  { id: "website", label: "Website Chat Widget" },
  { id: "hubspot", label: "HubSpot" },
  { id: "zendesk", label: "Zendesk" },
  { id: "other", label: "Other / API" },
];

export default function RequestCustomAgentPage() {
  const [isPending, startTransition] = useTransition();

  const form = useForm<RequestFormValues>({
    resolver: zodResolver(requestSchema),
    defaultValues: {
      title: "",
      description: "",
      platforms: [],
    },
  });

  function onSubmit(data: RequestFormValues) {
    startTransition(async () => {
      const result = await postCustomRequest(data);
      if (result?.error) {
        toast.error("Submission Failed", { description: result.error });
      } else {
        toast.success("Request Submitted!", {
          description: "Our team will review your request and get back to you shortly.",
        });
        form.reset();
      }
    });
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Request a Custom Workflow</CardTitle>
          <CardDescription>
            Describe your ideal automation, and our network of expert developers will build it for you.
            This request will be posted to our developer marketplace.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Title</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., Automate order confirmations via WhatsApp" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Detailed Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Describe your business process, what should trigger the workflow, and what the AI should do..." {...field} rows={10} />
                    </FormControl>
                     <FormDescription>
                        Be as specific as possible. Include examples if you can.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="platforms"
                render={() => (
                  <FormItem>
                    <div className="mb-4">
                      <FormLabel>Platforms to Integrate</FormLabel>
                      <FormDescription>
                        Select all platforms that this workflow will need to connect to.
                      </FormDescription>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {platforms.map((item) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name="platforms"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={item.id}
                              className="flex flex-row items-start space-x-3 space-y-0"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(item.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...(field.value || []), item.id])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== item.id
                                          )
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {item.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Budget Range</FormLabel>
                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select an estimated budget..." />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="<500">Under $500</SelectItem>
                          <SelectItem value="500-2000">$500 - $2,000</SelectItem>
                          <SelectItem value="2000-5000">$2,000 - $5,000</SelectItem>
                          <SelectItem value=">5000">Over $5,000</SelectItem>
                          <SelectItem value="not-sure">Not Sure</SelectItem>
                        </SelectContent>
                      </Select>
                    <FormDescription>
                      This helps our developers gauge the complexity of the project.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isPending}>
                {isPending ? "Submitting..." : "Submit Request"}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
