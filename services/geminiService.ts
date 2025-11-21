import { GoogleGenAI, Type } from "@google/genai";
import { DomainResult } from "../types";

// Initialize Gemini Client safely
// If API_KEY is missing, the app will not crash but will return mock data
let ai: GoogleGenAI | null = null;

try {
  // Check if process.env exists and has API_KEY
  // In Vite build, this string is replaced, but safely accessing it prevents runtime reference errors
  const apiKey = typeof process !== 'undefined' && process.env ? process.env.API_KEY : null;
  if (apiKey) {
    ai = new GoogleGenAI({ apiKey });
  } else {
    console.warn("Gemini API Key missing. Using mock data.");
  }
} catch (error) {
  console.warn("Error initializing Gemini client:", error);
}

export const checkDomainAvailability = async (domainName: string): Promise<DomainResult[]> => {
  // Fallback if AI is not initialized
  if (!ai) {
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate delay
    return [
      { name: domainName, isAvailable: false, price: "N/A", reasoning: "API Key missing. Showing mock data." },
      { name: `get${domainName}.com`, isAvailable: true, price: "৳1,200", reasoning: "Available alternative (Mock)" },
      { name: `${domainName}tech.bd`, isAvailable: true, price: "৳1,500", reasoning: "Great for local tech (Mock)" },
      { name: `${domainName}.io`, isAvailable: true, price: "৳3,500", reasoning: "Popular for startups (Mock)" },
    ];
  }

  try {
    const model = "gemini-2.5-flash";
    
    const prompt = `
      Act as a smart domain availability API for the Bangladeshi market.
      User Query: "${domainName}"

      Task:
      1. Analyze the domain name. If it is a common dictionary word, a famous brand, or very short (3-4 letters), mark 'isAvailable' as false. Otherwise, bias towards true (simulate real availability).
      2. Generate 5 intelligent alternatives using AI logic:
         - If user queried .com, suggest .net, .org, .io, or .xyz.
         - Suggest local domains ending in .bd or .com.bd.
         - Add smart prefixes (e.g., 'get', 'my', 'go') or suffixes (e.g., 'app', 'tech', 'hub').
         - Suggest brandable misspellings or synonyms.
      3. Price in Bangladeshi Taka (৳).
         - .com ~ ৳1200
         - .xyz ~ ৳500
         - .io ~ ৳4500
         - .bd ~ ৳1500

      Return a JSON array where the first object is the exact query result, and the rest are high-quality suggestions.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              name: { type: Type.STRING },
              isAvailable: { type: Type.BOOLEAN },
              price: { type: Type.STRING },
              reasoning: { type: Type.STRING },
            },
            required: ["name", "isAvailable", "price", "reasoning"],
          },
        },
      },
    });

    const jsonText = response.text;
    if (!jsonText) return [];
    
    return JSON.parse(jsonText) as DomainResult[];

  } catch (error) {
    console.error("Error checking domain:", error);
    // Fallback mock data in case of API error
    return [
      { name: domainName, isAvailable: false, price: "N/A", reasoning: "Service temporarily unavailable." },
      { name: `try${domainName}.com`, isAvailable: true, price: "৳1,200", reasoning: "Alternative" },
    ];
  }
};