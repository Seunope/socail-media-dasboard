import Sentiment from "sentiment";
import { OpenAI } from "openai";

// Configure sentiment analyzer with custom terms
const sentiment = new Sentiment({
  extras: {
    amazing: 5,
    terrible: -5,
    hate: -4,
    love: 4,
    worst: -5,
    best: 5,
    poor: -3,
    great: 4,
    excellent: 5,
    awful: -5,
    disappointed: -3,
    fantastic: 5,
    rubbish: -4,
    perfect: 5,
    broken: -4,
    awesome: 5,
    horrible: -5,
  },
});

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY || "",
//   dangerouslyAllowBrowser: true,
// });

export function analyzeSentiment(text: string) {
  return sentiment.analyze(text);
}

export async function analyzeSentimentBatch(comments: string[]) {
  const results = comments.map((comment) => sentiment.analyze(comment));

  const positive = results.filter((r) => r.score > 0).length;
  const neutral = results.filter((r) => r.score === 0).length;
  const negative = results.filter((r) => r.score < 0).length;

  return {
    positive: Math.round((positive / results.length) * 100),
    neutral: Math.round((neutral / results.length) * 100),
    negative: Math.round((negative / results.length) * 100),
    comparative: parseFloat(
      (
        results.reduce((sum, r) => sum + r.comparative, 0) / results.length
      ).toFixed(2)
    ),
    scores: results.map((r) => r.score),
    tokens: results.reduce((sum, r) => sum + r.tokens.length, 0),
  };
}

// export async function getAISentimentInsights(comments: string[]) {
//   if (!process.env.OPENAI_API_KEY) {
//     console.warn("OpenAI API key missing - skipping AI analysis");
//     return "AI analysis unavailable (API key missing)";
//   }

//   try {
//     const prompt = `
//       Analyze these social media comments and provide concise insights:
//       ${comments.slice(0, 50).join("\n")}

//       Provide in this exact format:
//       1. Overall sentiment summary (1-2 sentences)
//       2. Key positive themes (bulleted list)
//       3. Key negative themes (bulleted list)
//       4. Recommendations (numbered list)
//     `;

//     const response = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       messages: [
//         {
//           role: "system",
//           content:
//             "You are a social media analyst. Provide clear, actionable insights about comment sentiment in the requested format.",
//         },
//         {
//           role: "user",
//           content: prompt,
//         },
//       ],
//       temperature: 0.7,
//       max_tokens: 500,
//     });

//     return response.choices[0]?.message?.content || "No AI insights available";
//   } catch (error) {
//     console.error("AI analysis failed:", error);
//     return "AI analysis unavailable (error occurred)";
//   }
// }

export function getSentimentLabel(score: number) {
  if (score > 0.5) return "Very Positive";
  if (score > 0.1) return "Positive";
  if (score < -0.5) return "Very Negative";
  if (score < -0.1) return "Negative";
  return "Neutral";
}

// Client-side safe utilities
export function analyzeWithFallback(text: string) {
  // Simple regex-based analysis as fallback
  const positiveMatches =
    text.match(/\b(awesome|great|love|happy|good)\b/gi) || [];
  const negativeMatches =
    text.match(/\b(bad|terrible|hate|awful|worst)\b/gi) || [];

  return {
    score: Math.min(
      Math.max(positiveMatches.length - negativeMatches.length, -5),
      5
    ),
    provider: "fallback",
  };
}
