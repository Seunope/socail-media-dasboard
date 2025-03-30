import { Icons } from "@/components/ui/icons";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components//shared/Loading/Skeleton";

const metrics = [
  {
    title: "Total Comments",
    value: "2,749",
    change: "+12%",
    trend: "up",
    icon: <Icons.messageSquare className="h-4 w-4" />,
  },
  {
    title: "Positive Sentiment",
    value: "65%",
    change: "+5%",
    trend: "up",
    icon: <Icons.thumbsUp className="h-4 w-4" />,
  },
  {
    title: "Engagement Rate",
    value: "8.2%",
    change: "-1.2%",
    trend: "down",
    icon: <Icons.activity className="h-4 w-4" />,
  },
  {
    title: "Avg. Response Time",
    value: "2h 15m",
    change: "-30m",
    trend: "down",
    icon: <Icons.clock className="h-4 w-4" />,
  },
];

export default function EngagementMetrics() {
  return (
    <>
      {metrics.map((metric, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {metric.title}
            </CardTitle>
            <div className="h-4 w-4 text-muted-foreground">{metric.icon}</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <p
              className={`text-xs ${
                metric.trend === "up" ? "text-green-500" : "text-red-500"
              }`}
            >
              {metric.change} from last week
            </p>
          </CardContent>
        </Card>
      ))}
    </>
  );
}

EngagementMetrics.Skeleton = function EngagementMetricsSkeleton() {
  return (
    <>
      {[...Array(4)].map((_, i) => (
        <Card key={i}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-7 w-[80px] mb-1" />
            <Skeleton className="h-3 w-[120px]" />
          </CardContent>
        </Card>
      ))}
    </>
  );
};
