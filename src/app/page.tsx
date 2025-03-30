import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Icons } from "@/components/ui/icons";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <header className="container mx-auto py-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Icons.logo className="h-8 w-8" />
            <span className="text-xl font-bold">SocialSentinel</span>
          </div>
          <div className="flex gap-4">
            <Button variant="outline" asChild>
              <Link href="/login">Login</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-12">
        <section className="flex flex-col md:flex-row gap-8 items-center">
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Analyze Social Media Sentiment with AI
            </h1>
            <p className="text-lg text-muted-foreground">
              Get real-time insights from customer feedback across all platforms
              with our powerful sentiment analysis dashboard.
            </p>
            <div className="flex gap-4">
              <Button asChild>
                <Link href="/signup">Get Started</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="#features">Learn More</Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="bg-white p-2 rounded-xl shadow-xl border">
              {/* Placeholder for dashboard screenshot */}
              <div className="bg-gray-100 rounded-lg h-80 flex items-center justify-center">
                <span className="text-gray-400">Dashboard Preview</span>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="mt-24">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Real-time Analysis",
                icon: <Icons.bolt className="h-6 w-6" />,
                description: "Process comments and feedback as they come in",
              },
              {
                title: "Multi-platform",
                icon: <Icons.layers className="h-6 w-6" />,
                description: "Supports Facebook, Twitter, Instagram and more",
              },
              {
                title: "Role-based Access",
                icon: <Icons.shield className="h-6 w-6" />,
                description: "Secure access control for your team",
              },
            ].map((feature, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                      {feature.icon}
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-white border-t py-8 mt-12">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} SocialSentinel. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
