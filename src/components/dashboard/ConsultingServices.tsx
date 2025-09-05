// src/components/dashboard/ConsultingServices.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Code, Search, MessageSquare } from "lucide-react";
import Link from "next/link";

export function ConsultingServices() {
  const services = [
    {
      title: "Machine Learning",
      description: "Custom ML models and predictive analytics solutions",
      icon: Brain,
      color: "text-blue-600"
    },
    {
      title: "Deep Learning",
      description: "Advanced neural networks and AI model development",
      icon: Code,
      color: "text-purple-600"
    },
    {
      title: "Natural Language Processing",
      description: "Text analysis, sentiment analysis, and language models",
      icon: MessageSquare,
      color: "text-green-600"
    },
    {
      title: "SEO & Digital Marketing",
      description: "Search engine optimization and digital presence enhancement",
      icon: Search,
      color: "text-orange-600"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Professional Consulting Services</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          {services.map((service, index) => (
            <button
              key={index}
              type="button"
              className={
                `flex items-center gap-3 p-5 rounded-xl bg-white border border-gray-100 shadow-sm transition-all duration-200 hover:bg-blue-50 hover:shadow-md hover:scale-[1.03] focus:outline-none`
              }
              style={{ cursor: 'pointer' }}
            >
              <span className={`p-2 rounded-lg ${service.color} bg-opacity-20 flex items-center justify-center`}>
                <service.icon className={`h-6 w-6 ${service.color}`} />
              </span>
              <span className="flex-1 text-left">
                <span className="font-semibold text-foreground text-base block mb-1">{service.title}</span>
                <span className="text-sm text-muted-foreground block">{service.description}</span>
              </span>
            </button>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link href="https://rabt.nabih.tech" target="_blank" rel="noopener noreferrer">
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full py-3 px-6 text-lg transition-transform duration-200 hover:scale-105 shadow-md"
              style={{ boxShadow: '0 4px 12px rgba(0, 123, 255, 0.12)' }}
            >
              Need Custom Work?
            </Button>
          </Link>
          <p className="text-xs text-muted-foreground mt-2">
            Custom solutions for your business needs
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
