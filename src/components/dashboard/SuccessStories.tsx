// src/components/dashboard/SuccessStories.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Users, TrendingUp } from "lucide-react";

export function SuccessStories() {
  const stories = [
    {
      company: "TechStart Egypt",
      industry: "E-commerce",
      result: "40% increase in customer engagement",
      description: "Automated customer support with AI agents, reducing response time from hours to seconds.",
      icon: TrendingUp
    },
    {
      company: "HealthCare Plus",
      industry: "Healthcare",
      result: "60% reduction in appointment scheduling time",
      description: "Intelligent appointment booking system that handles complex scheduling requirements.",
      icon: Users
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Star className="h-5 w-5 text-primary" />
          Success Stories
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {stories.map((story, index) => (
            <div key={index} className="p-4 border rounded-lg bg-white shadow-sm">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <story.icon className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-foreground">{story.company}</h4>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                      {story.industry}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    {story.description}
                  </p>
                  <div className="text-sm font-medium text-primary">
                    {story.result}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
  <div className="mt-4 p-3 bg-blue-50 rounded-lg text-center">
          <p className="text-sm text-primary font-medium">
            Ready to create your own success story?
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
