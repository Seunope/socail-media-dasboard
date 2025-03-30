import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

export async function generatePdfReport(data: {
  title: string;
  period: string;
  comments: { text: string; platform: string; timestamp: string }[];
  sentiment: { positive: number; neutral: number; negative: number };
  generatedAt: string;
}) {
  // Create a new PDF document
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([600, 800]);

  // Set up fonts
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

  // Draw title
  page.drawText(data.title, {
    x: 50,
    y: 750,
    size: 20,
    font: boldFont,
    color: rgb(0, 0, 0),
  });

  // Draw metadata
  page.drawText(`Report Period: ${data.period}`, {
    x: 50,
    y: 720,
    size: 12,
    font: font,
    color: rgb(0, 0, 0),
  });

  page.drawText(`Generated: ${new Date(data.generatedAt).toLocaleString()}`, {
    x: 50,
    y: 700,
    size: 12,
    font: font,
    color: rgb(0, 0, 0),
  });

  // Draw sentiment summary
  page.drawText("Sentiment Analysis Summary", {
    x: 50,
    y: 670,
    size: 14,
    font: boldFont,
    color: rgb(0, 0, 0),
  });

  page.drawText(`Positive: ${data.sentiment.positive}%`, {
    x: 50,
    y: 650,
    size: 12,
    font: font,
    color: rgb(0, 0.5, 0),
  });

  page.drawText(`Neutral: ${data.sentiment.neutral}%`, {
    x: 50,
    y: 630,
    size: 12,
    font: font,
    color: rgb(0, 0, 0),
  });

  page.drawText(`Negative: ${data.sentiment.negative}%`, {
    x: 50,
    y: 610,
    size: 12,
    font: font,
    color: rgb(0.8, 0, 0),
  });

  // Draw sample comments header
  page.drawText("Sample Comments", {
    x: 50,
    y: 580,
    size: 14,
    font: boldFont,
    color: rgb(0, 0, 0),
  });

  // Draw sample comments
  let yPosition = 560;
  data.comments.slice(0, 10).forEach((comment) => {
    const lines = wrapText(comment.text, 80);
    lines.forEach((line) => {
      if (yPosition < 50) {
        // Add new page if we run out of space
        yPosition = 750;
        // const newPage = pdfDoc.addPage([600, 800]);
        page.drawText("...continued", {
          x: 50,
          y: yPosition,
          size: 12,
          font: font,
          color: rgb(0, 0, 0),
        });
        yPosition -= 20;
      }

      page.drawText(line, {
        x: 50,
        y: yPosition,
        size: 10,
        font: font,
        color: rgb(0, 0, 0),
      });
      yPosition -= 15;
    });

    // Add comment metadata
    page.drawText(
      `- ${comment.platform}, ${new Date(
        comment.timestamp
      ).toLocaleDateString()}`,
      {
        x: 50,
        y: yPosition,
        size: 8,
        font: font,
        color: rgb(0.5, 0.5, 0.5),
      }
    );
    yPosition -= 20;
  });

  // Finalize PDF
  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}

function wrapText(text: string, maxLength: number): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let currentLine = "";

  words.forEach((word) => {
    if (currentLine.length + word.length + 1 <= maxLength) {
      currentLine += (currentLine.length === 0 ? "" : " ") + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  });

  if (currentLine.length > 0) {
    lines.push(currentLine);
  }

  return lines;
}
