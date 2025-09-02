// src/app/page.tsx
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HighConversionPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-card to-muted">
        <div className="max-w-7xl mx-auto text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                Smart Automation Solutions for Businesses in Egypt
              </h1>
              <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed">
                Stop Losing Customers. Start Automating Conversations.
              </p>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                Companies lose over 40% of their customers due to slow response
                times. Intaj provides AI agents that engage every customer
                instantly, turning queries into conversions.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup">
                <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-4">
                  Get Started for Free
                </Button>
              </Link>
              <Link href="/signup">
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto text-lg px-8 py-4"
                >
                  Book a Free Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
            More Features Coming Soon!
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mt-4">
            We are working hard to bring you more exciting features. Stay
            tuned!
          </p>
        </div>
      </section>
    </>
  );
}
