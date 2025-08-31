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
        <div className="grid gap-4 md:grid-cols-2">
          {services.map((service, index) => (
            <div key={index} className="p-4 border rounded-lg hover:bg-muted/30 transition-colors">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${service.color} bg-opacity-20`}>
                  <service.icon className={`h-5 w-5 ${service.color}`} />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-1">
                    {service.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <Link href="https://rabt.nabih.tech" target="_blank" rel="noopener noreferrer">
            <Button className="w-full">
              Book a Consultation
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
