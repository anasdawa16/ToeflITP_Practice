import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.warn("GEMINI_API_KEY is not set. AI assistant will not work.");
}

/**
 * Singleton Gemini client for server-side use only.
 * Model: gemini-1.5-flash (free tier — 15 RPM, 1M TPM, 1500 RPD)
 */
export const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export const GEMINI_MODEL = "gemini-1.5-flash";

export function getGeminiModel() {
  if (!genAI) throw new Error("Gemini API key not configured");
  return genAI.getGenerativeModel({
    model: GEMINI_MODEL,
    generationConfig: {
      temperature: 0.7,
      topP: 0.9,
      maxOutputTokens: 1024,
    },
  });
}
