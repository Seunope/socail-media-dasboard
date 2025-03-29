"use client";

import dynamic from "next/dynamic";
import { FaUserCircle } from "react-icons/fa";
import { Suspense, useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { ScrollArea } from "@/components/ui/scroll-area";
import RealTimeActivity from "@/components/dashboard/RealTimeActivity";
import EngagementMetrics from "@/components/dashboard/EngagementMetrics";
import CommentList from "@/components/dashboard/CommentList";
import CommentTrendChart from "@/components/dashboard/CommentTrendChart";
import { Skeleton } from "@/components/shared/Loading/Skeleton";
import { toast } from "sonner";
import ThemeToggle from "@/components/shared/ThemeToggle";
import { Analyzer } from "@/components/dashboard/Analyzer";
import ToxicityIndicator from "@/components/dashboard/ToxicityIndicator";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { redirect } from "next/navigation";

const SentimentChart = dynamic(
  () => import("@/components/shared/Charts/SentimentChart"),
  {
    ssr: false,
    loading: () => <Skeleton className="h-[300px] w-full" />,
  }
);

const KeywordCloud = dynamic(
  () => import("@/components/shared/Charts/KeywordCloud"),
  {
    ssr: false,
    loading: () => <Skeleton className="h-[300px] w-full" />,
  }
);

export default function DashboardPage() {
  const { user, logout } = useAuth();

  const handleExport = async (format: "pdf" | "csv" | "json") => {
    toast.promise(
      fetch("/api/export", {
        method: "POST",
        body: JSON.stringify({ format }),
      }).then((res) => {
        if (format === "json") return res.json();
        return res.blob();
      }),
      {
        loading: `Generating ${format.toUpperCase()}...`,
        success: (data) => {
          if (format === "json") {
            console.log("Exported data:", data);
            return "Data prepared in console";
          }

          const url = window.URL.createObjectURL(data);
          const a = document.createElement("a");
          a.href = url;
          a.download = `comment-analysis.${format}`;
          a.click();
          return `Exported as ${format.toUpperCase()}`;
        },
        error: "Failed to export",
      }
    );
  };

  const fetchAIAnalysis = async () => {
    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "summary",
          comments: [], // You would pass actual comments here
        }),
      });
      return await response.json();
    } catch (error) {
      console.error("Failed to fetch AI analysis:", error);
      return null;
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Social Media Analytics
          </h2>
          <p className="text-sm text-muted-foreground">
            Real-time sentiment analysis across platforms
          </p>
        </div>

        <div className="flex gap-2 max-sm:hidden">
          <ThemeToggle />
          <Button variant="outline" onClick={() => handleExport("csv")}>
            <Icons.download className="mr-2 h-4 w-4" />
            CSV
          </Button>
          <Button variant="outline" onClick={() => handleExport("pdf")}>
            <Icons.download className="mr-2 h-4 w-4" />
            PDF
          </Button>
          <Button variant="outline" onClick={() => handleExport("json")}>
            <Icons.code className="mr-2 h-4 w-4" />
            JSON
          </Button>
        </div>
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <FaUserCircle className="text-2xl text-gray-700" />
              </Avatar>
              <div className="text-sm text-right">
                <div className="font-medium">{user.name}</div>
                <div className="text-xs text-muted-foreground capitalize">
                  {user.role}
                </div>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem onClick={() => redirect("/settings")}>
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sentiment">Sentiment</TabsTrigger>
          <TabsTrigger value="comments">Comments</TabsTrigger>
          <TabsTrigger value="realtime">Real-time</TabsTrigger>

          <TabsTrigger value="analysis" className=" max-sm:hidden">
            AI Analysis
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <EngagementMetrics />
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Engagement Trends</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <Suspense fallback={<Skeleton className="h-[350px] w-full" />}>
                  <SentimentChart />
                </Suspense>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Top Keywords</CardTitle>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<Skeleton className="h-[350px] w-full" />}>
                  <KeywordCloud />
                </Suspense>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sentiment">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Sentiment Over Time</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <Suspense fallback={<Skeleton className="h-[350px] w-full" />}>
                  <SentimentChart detailed />
                </Suspense>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Sentiment Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<Skeleton className="h-[350px] w-full" />}>
                  <KeywordCloud sentimentBased />
                </Suspense>
              </CardContent>
            </Card>
          </div>
          {/* <div className="h-64">
            <ToxicityIndicator
              levels={[72, 18, 10]}
              scores={[0.92, 0.85, 0.8]}
            />
          </div> */}
        </TabsContent>

        <TabsContent value="comments">
          <Card>
            <CardHeader>
              <CardTitle>Comment Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[180px]">
                <Suspense fallback={<CommentList.Skeleton />}>
                  <CommentTrendChart
                    darkMode={true}
                    data={[10, 5, 12, 19, 26, 24, 31]}
                  />
                </Suspense>
              </ScrollArea>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Comments</CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px]">
                <Suspense fallback={<CommentList.Skeleton />}>
                  <CommentList />
                </Suspense>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="realtime">
          <Card>
            <CardHeader>
              <CardTitle>Real-time Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<Skeleton className="h-[600px] w-full" />}>
                <RealTimeActivity />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analysis">
          <Card>
            <CardHeader>
              <CardTitle>AI-Powered Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <Suspense fallback={<Skeleton className="h-[300px] w-full" />}>
                {/* <AIAnalysis fetchAnalysis={fetchAIAnalysis} /> */}
                <Analyzer />
              </Suspense>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function AIAnalysis({ fetchAnalysis }: { fetchAnalysis: () => Promise<any> }) {
  const [analysis, setAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalysis().then((data) => {
      setAnalysis(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading analysis...</div>;
  if (!analysis) return <div>Analysis unavailable</div>;

  return (
    <div className="prose dark:prose-invert max-w-none">
      <h3 className="text-lg font-medium">Overall Sentiment Summary</h3>
      <p>{analysis.summary || "No summary available"}</p>

      <h3 className="text-lg font-medium mt-4">Key Positive Themes</h3>
      <ul>
        {analysis.positiveThemes?.map((theme: string) => (
          <li key={theme}>{theme}</li>
        ))}
      </ul>

      <h3 className="text-lg font-medium mt-4">Key Negative Themes</h3>
      <ul>
        {analysis.negativeThemes?.map((theme: string) => (
          <li key={theme}>{theme}</li>
        ))}
      </ul>

      <h3 className="text-lg font-medium mt-4">Recommendations</h3>
      <ol>
        {analysis.recommendations?.map((rec: string) => (
          <li key={rec}>{rec}</li>
        ))}
      </ol>
    </div>
  );
}

// function AIAnalysis() {
//   // In a real implementation, you would fetch AI analysis from your API
//   return (
//     <div className="prose dark:prose-invert max-w-none">
//       <h3 className="text-lg font-medium">Overall Sentiment Summary</h3>
//       <p>
//         The majority of comments (65%) express positive sentiment, with 25%
//         neutral and 10% negative. The overall comparative score is 1.2,
//         indicating slightly positive sentiment.
//       </p>

//       <h3 className="text-lg font-medium mt-4">Key Positive Themes</h3>
//       <ul>
//         <li>Product quality and performance</li>
//         <li>Excellent customer service experiences</li>
//         <li>Good value for money</li>
//       </ul>

//       <h3 className="text-lg font-medium mt-4">Key Negative Themes</h3>
//       <ul>
//         <li>Shipping and delivery issues</li>
//         <li>Product not meeting expectations</li>
//         <li>Price/value concerns</li>
//       </ul>

//       <h3 className="text-lg font-medium mt-4">Recommendations</h3>
//       <ol>
//         <li>Address shipping complaints with logistics team</li>
//         <li>Highlight positive service experiences in marketing</li>
//         <li>Consider product education to manage expectations</li>
//       </ol>
//     </div>
//   );
// }

// import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Icons } from "@/components/ui/icons";

// export default function DashboardPage() {
//   return (
//     <div className="container mx-auto p-6">
//       <div className="flex items-center justify-between mb-6">
//         <h1 className="text-2xl font-bold">Dashboard</h1>
//         <Button>
//           <Icons.download className="mr-2 h-4 w-4" />
//           Export
//         </Button>
//       </div>

//       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
//         <Card>
//           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
//             <CardTitle className="text-sm font-medium">
//               Total Comments
//             </CardTitle>
//             <Icons.messageSquare className="h-4 w-4 text-muted-foreground" />
//           </CardHeader>
//           <CardContent>
//             <div className="text-2xl font-bold">2,749</div>
//             <p className="text-xs text-muted-foreground">
//               +12% from last month
//             </p>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   );
// }
