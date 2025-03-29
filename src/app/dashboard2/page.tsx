"use client";
import Head from "next/head";
import { useState, useEffect } from "react";
import AnalyticsCard from "@/components/ui/AnalyticsCard";
import CommentTrendChart from "@/components/ui/CommentTrendChart";
import KeywordCloud from "@/components/ui/KeywordCloud";
import SentimentMeter from "@/components/ui/SentimentMeter";
import ToxicityIndicator from "@/components/ui/ToxicityIndicator";
import ExportButton from "@/components/ui/ExportButton";
import LoadingSkeleton from "@/components/ui/LoadingSkeleton";

export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock data
        const mockData = {
          facebookComments: 1532,
          instagramComments: 1217,
          keywords: [
            "love",
            "great",
            "amazing",
            "price",
            "customer",
            "recommend",
            "support",
            "service",
            "best",
            "worst",
          ],
          sentiment: {
            positive: 65,
            neutral: 25,
            negative: 10,
          },
          trends: [10, 5, 12, 19, 26, 24, 31],
          toxicity: {
            scores: [0.92, 0.85, 0.8],
            levels: [72, 18, 10],
          },
        };

        setData(mockData);
        setIsLoading(false);
      } catch (err) {
        setError("Failed to load data. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Social Media Comment Analyzer</title>
        <meta name="description" content="Analyze social media comments" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Social Media Comment Analyzer
          </h1>
          <div className="flex justify-between items-center mt-4">
            <p className="text-gray-600">
              Real-time analysis of social media engagement
            </p>
            <ExportButton />
          </div>
        </header>

        {isLoading ? (
          <LoadingSkeleton />
        ) : (
          <>
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <AnalyticsCard
                title="FACEBOOK COMMENTS"
                value={data.facebookComments.toLocaleString()}
                trend="up"
                trendValue="12%"
              />
              <AnalyticsCard
                title="INSTAGRAM COMMENTS"
                value={data.instagramComments.toLocaleString()}
                trend="down"
                trendValue="5%"
              />
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-md p-6 lg:col-span-2">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">
                  Comment Trends
                </h2>
                <div className="h-64">
                  <CommentTrendChart data={data.trends} />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">
                  Sentiment Analysis
                </h2>
                <div className="h-64">
                  <SentimentMeter
                    positive={data.sentiment.positive}
                    neutral={data.sentiment.neutral}
                    negative={data.sentiment.negative}
                  />
                </div>
              </div>
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">
                  Keyword Analysis
                </h2>
                <div className="h-64">
                  <KeywordCloud keywords={data.keywords} />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">
                  Toxicity Detection
                </h2>
                <div className="h-64">
                  <ToxicityIndicator
                    levels={data.toxicity.levels}
                    scores={data.toxicity.scores}
                  />
                </div>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
