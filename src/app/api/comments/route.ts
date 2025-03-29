import { NextResponse } from "next/server";
import { analyzeSentimentBatch } from "@/lib/sentiment";
import { generatePdfReport } from "@/lib/reporting";
import { jsonToCsv } from "@/lib/utils";

export async function POST(request: Request) {
  const { format } = await request.json();

  // In a real app, you would fetch actual data from your database
  const mockComments = [
    {
      id: 1,
      text: "Great product!",
      platform: "facebook",
      timestamp: new Date().toISOString(),
    },
    {
      id: 2,
      text: "Not what I expected",
      platform: "instagram",
      timestamp: new Date().toISOString(),
    },
    {
      id: 3,
      text: "Excellent customer service",
      platform: "twitter",
      timestamp: new Date().toISOString(),
    },
    {
      id: 4,
      text: "Would buy again",
      platform: "facebook",
      timestamp: new Date().toISOString(),
    },
    {
      id: 5,
      text: "Poor quality materials",
      platform: "instagram",
      timestamp: new Date().toISOString(),
    },
  ];

  const sentimentResults = analyzeSentimentBatch(
    mockComments.map((c) => c.text)
  );

  try {
    if (format === "pdf") {
      const pdfBuffer = await generatePdfReport({
        title: "Social Media Comment Analysis Report",
        period: "Last 7 Days",
        comments: mockComments,
        sentiment: sentimentResults,
        generatedAt: new Date().toISOString(),
      });

      return new NextResponse(pdfBuffer, {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": 'attachment; filename="comment-analysis.pdf"',
        },
      });
    } else if (format === "csv") {
      const csvData = jsonToCsv(mockComments);

      return new NextResponse(csvData, {
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": 'attachment; filename="comment-analysis.csv"',
        },
      });
    } else if (format === "json") {
      return NextResponse.json({
        metadata: {
          generatedAt: new Date().toISOString(),
          commentCount: mockComments.length,
          period: "Last 7 Days",
        },
        sentimentAnalysis: sentimentResults,
        comments: mockComments,
      });
    }

    return NextResponse.json({ error: "Invalid format" }, { status: 400 });
  } catch (error) {
    console.error("Export failed:", error);
    return NextResponse.json({ error: "Export failed" }, { status: 500 });
  }
}
