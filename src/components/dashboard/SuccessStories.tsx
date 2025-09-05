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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stories.map((story, index) => (
            <div
              key={index}
              className="flex flex-col justify-between p-6 rounded-xl bg-white shadow-md border border-gray-100"
            >
              <div className="flex items-start gap-3 mb-2">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <story.icon className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-lg text-foreground mb-1">{story.company}</h4>
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded mb-2 inline-block">
                    {story.industry}
                  </span>
                  <p className="text-sm text-muted-foreground mb-3">
                    {story.description}
                  </p>
                </div>
              </div>
              <div className="text-base font-extrabold text-blue-600 mt-2">
                {story.result}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 p-3 bg-blue-50 rounded-lg text-center">
          <p className="text-sm text-primary font-medium">
            Ready to create your own success story?
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
