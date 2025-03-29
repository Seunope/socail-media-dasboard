"use client";

import { TagCloud } from "react-tagcloud";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/shared/Loading/Skeleton";

interface KeywordCloudProps {
  sentimentBased?: boolean;
  className?: string;
}

const data = [
  { value: "love", count: 38 },
  { value: "great", count: 30 },
  { value: "amazing", count: 28 },
  { value: "recommend", count: 25 },
  { value: "best", count: 22 },
  { value: "service", count: 18 },
  { value: "quality", count: 15 },
  { value: "price", count: 12 },
  { value: "worst", count: 10 },
  { value: "disappointed", count: 8 },
  { value: "broken", count: 5 },
  { value: "poor", count: 3 },
];

const sentimentColors = {
  positive: "#10b981",
  neutral: "#3b82f6",
  negative: "#ef4444",
};

export default function KeywordCloud({
  sentimentBased,
  className,
}: KeywordCloudProps) {
  const getColor = (tag: { value: string }) => {
    if (!sentimentBased) return "#3b82f6";

    const positiveWords = ["love", "great", "amazing", "recommend", "best"];
    const negativeWords = ["worst", "disappointed", "broken", "poor"];

    if (positiveWords.includes(tag.value)) return sentimentColors.positive;
    if (negativeWords.includes(tag.value)) return sentimentColors.negative;
    return sentimentColors.neutral;
  };

  return (
    <div className={className}>
      <TagCloud
        minSize={12}
        maxSize={35}
        tags={data}
        colorOptions={{ luminosity: "light" }}
        disableRandomColor={sentimentBased}
        renderer={(tag, size, color) => (
          <span
            key={tag.value}
            style={{
              fontSize: `${size}px`,
              color: getColor(tag),
              margin: "3px",
              display: "inline-block",
              transition: "all 0.3s",
            }}
          >
            {tag.value}
          </span>
        )}
      />
    </div>
  );
}

KeywordCloud.Skeleton = function KeywordCloudSkeleton() {
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
