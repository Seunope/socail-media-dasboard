import { useMemo } from "react";
import { TagCloud } from "react-tagcloud";

interface KeywordCloudProps {
  keywords: string[];
}

export default function KeywordCloud({ keywords }: KeywordCloudProps) {
  const formattedKeywords = useMemo(() => {
    return keywords.map((keyword) => ({
      value: keyword,
      count: Math.floor(Math.random() * 10) + 5, // Random count for visualization
    }));
  }, [keywords]);

  return (
    <TagCloud
      minSize={12}
      maxSize={35}
      tags={formattedKeywords}
      colorOptions={{
        hue: "blue",
        luminosity: "light",
      }}
      className="w-full h-full flex items-center justify-center"
      randomSeed={42}
    />
  );
}
