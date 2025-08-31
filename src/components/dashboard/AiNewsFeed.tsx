// src/components/dashboard/AiNewsFeed.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ExternalLink, TrendingUp } from "lucide-react";

async function getNews() {
  try {
    // Using a free RSS to JSON API for a popular AI newsletter
    const res = await fetch('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fthe-rundown-ai.beehiiv.com%2Ffeed', {
      next: { revalidate: 3600 } // Revalidate every hour
    });
    
    if (!res.ok) return [];
    
    const data = await res.json();
    return data.items?.slice(0, 3) || []; // Get the latest 3 articles
  } catch (error) {
    console.error("Failed to fetch AI news:", error);
    return [];
  }
}

export async function AiNewsFeed() {
  const articles = await getNews();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Latest AI News & Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        {articles.length > 0 ? (
          <div className="space-y-4">
            {articles.map((article: { title: string; link: string; pubDate: string }, index: number) => (
              <div key={index} className="p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                <Link 
                  href={article.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block"
                >
                  <h4 className="font-medium text-foreground hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h4>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-muted-foreground">
                      {new Date(article.pubDate).toLocaleDateString()}
                    </span>
                    <ExternalLink className="h-3 w-3 text-muted-foreground" />
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-6">
            <p className="text-muted-foreground">
              Could not load news feed.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
