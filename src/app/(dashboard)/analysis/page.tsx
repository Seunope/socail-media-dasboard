import { NextResponse } from "next/server";
import { analyzeSentimentBatch } from "@/lib/sentiment";
import { generatePdfReport } from "@/lib/reporting";
import { jsonToCsv } from "@/lib/utils";

export async function POST(request: Request) {
  const { format } = await request.json();

  // In a real app, you would fetch actual data from your database
  const mockComments = [
    { id: 1, text: "Great product!", platform: "facebook" },
    { id: 2, text: "Not what I expected", platform: "instagram" },
    { id: 3, text: "Excellent customer service", platform: "twitter" },
  ];

  const sentimentResults = analyzeSentimentBatch(
    mockComments.map((c) => c.text)
  );

  if (format === "pdf") {
    const pdfBuffer = await generatePdfReport({
      title: "Social Media Comment Analysis",
      comments: mockComments,
      sentiment: sentimentResults,
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
  }

  return NextResponse.json({ error: "Invalid format" }, { status: 400 });
}
