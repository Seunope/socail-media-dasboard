"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/shared/Loading/Skeleton";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface SentimentChartProps {
  detailed?: boolean;
  className?: string;
}

export default function SentimentChart({
  detailed,
  className,
}: SentimentChartProps) {
  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const data = {
    labels,
    datasets: [
      {
        label: "Comments",
        data: [12, 19, 15, 27, 22, 18, 24],
        borderColor: "rgb(59, 130, 246)",
        backgroundColor: "rgba(59, 130, 246, 0.1)",
        tension: 0.3,
        fill: true,
        pointBackgroundColor: "rgb(59, 130, 246)",
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      ...(detailed
        ? [
            {
              label: "Positive",
              data: [8, 12, 10, 18, 15, 12, 16],
              borderColor: "rgb(16, 185, 129)",
              backgroundColor: "rgba(16, 185, 129, 0.1)",
              tension: 0.3,
              fill: false,
              pointRadius: 4,
              pointHoverRadius: 6,
            },
            {
              label: "Negative",
              data: [2, 3, 2, 4, 3, 2, 3],
              borderColor: "rgb(239, 68, 68)",
              backgroundColor: "rgba(239, 68, 68, 0.1)",
              tension: 0.3,
              fill: false,
              pointRadius: 4,
              pointHoverRadius: 6,
            },
          ]
        : []),
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
      },
    },
    hover: {
      mode: "nearest" as const,
      intersect: true,
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className={className}>
      <Line options={options} data={data} />
    </div>
  );
}

SentimentChart.Skeleton = function SentimentChartSkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-6 w-[200px]" />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-[300px] w-full" />
      </CardContent>
    </Card>
  );
};
