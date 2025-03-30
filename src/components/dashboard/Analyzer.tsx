"use client";
import { useState } from "react";
import { analyzeWithFallback } from "@/lib/sentiment";

export function Analyzer() {
  const [text, setText] = useState("");
  const [result, setResult] = useState<{
    score: number;
    provider: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const analyzeText = async () => {
    setIsLoading(true);

    try {
      // First try the API route
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data);
      } else {
        // Fallback to client-side if API fails
        setResult(analyzeWithFallback(text));
      }
    } catch (error) {
      console.error("Analysis error:", error);
      setResult(analyzeWithFallback(text));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full p-2 border rounded"
        placeholder="Enter text to analyze..."
      />

      <button
        onClick={analyzeText}
        disabled={isLoading}
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
      >
        {isLoading ? "Analyzing..." : "Analyze Sentiment"}
      </button>

      {result && (
        <div
          className={`p-4 rounded ${
            result.score > 0
              ? "bg-green-100 text-green-800"
              : result.score < 0
              ? "bg-red-100 text-red-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          <p>
            Score: {result.score} (via {result.provider})
          </p>
          <p className="font-semibold">
            {result.score > 2
              ? "Very Positive"
              : result.score > 0
              ? "Positive"
              : result.score < -2
              ? "Very Negative"
              : result.score < 0
              ? "Negative"
              : "Neutral"}
          </p>
        </div>
      )}
    </div>
  );
}
