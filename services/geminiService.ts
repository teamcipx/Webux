import { GoogleGenAI, Type } from "@google/genai";
import { DomainResult } from "../types";

// Initialize Gemini Client
// API Key is assumed to be in process.env.API_KEY per instructions
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const checkDomainAvailability = async (domainName: string): Promise<DomainResult[]> => {
  try {
    const model = "gemini-2.5-flash";
    
    const prompt = `
      Act as a domain name registrar and branding expert.
      The user is interested in the domain name: "${domainName}".
      
      1. Analyze if this domain is likely premium, taken, or available based on common patterns (do not actually query a WHOIS database, just simulate based on likelihood).
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
    // Fallback mock data in case of API error to prevent app crash
    return [
      { name: domainName, isAvailable: false, price: "N/A", reasoning: "Service temporarily unavailable." },
      { name: `get${domainName}.com`, isAvailable: true, price: "$12.99", reasoning: "Try adding a verb prefix." },
      { name: `${domainName}app.io`, isAvailable: true, price: "$35.00", reasoning: "Great for tech startups." },
    ];
  }
};