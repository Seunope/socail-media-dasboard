import { OpenAI } from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "Analyze sentiment and return ONLY a JSON object with {score: number, provider: string}",
        },
        { role: "user", content: `Analyze: "${text}"` },
      ],
      response_format: { type: "json_object" },
    });

    const result = JSON.parse(response.choices[0]?.message?.content || "{}");
    return NextResponse.json(result);
  } catch (error) {
    console.error("OpenAI error:", error);
    return NextResponse.json({ error: "Analysis failed" }, { status: 500 });
  }
}
