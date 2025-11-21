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
      { name: `get${domainName}.com`, isAvailable: true, price: "$12.99", reasoning: "Available alternative (Mock)" },
      { name: `${domainName}tech.bd`, isAvailable: true, price: "৳1,500", reasoning: "Great for local tech (Mock)" },
      { name: `${domainName}.io`, isAvailable: true, price: "$35.00", reasoning: "Popular for startups (Mock)" },
    ];
  }

  try {
    const model = "gemini-2.5-flash";
    
    const prompt = `
      Act as a domain name registrar and branding expert.
      The user is interested in the domain name: "${domainName}".
      
      1. Analyze if this domain is likely premium, taken, or available based on common patterns.
      2. Suggest 4 creative, modern alternatives relevant to web development, tech, or the specific keywords in the input.
      3. Assign realistic simulated pricing.

      Return the response in strictly JSON format adhering to the schema.
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
      { name: `try${domainName}.com`, isAvailable: true, price: "$12.99", reasoning: "Try adding a verb prefix." },
      { name: `${domainName}app.io`, isAvailable: true, price: "$35.00", reasoning: "Great for tech startups." },
    ];
  }
};