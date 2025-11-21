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

/**
 * Checks if a domain is available using Google's Public DNS API.
 * Status 3 (NXDOMAIN) means the domain does not exist, so it is likely available.
 * Status 0 (NOERROR) means the domain exists (has records), so it is taken.
 */
async function checkRealDNS(domain: string): Promise<boolean> {
  try {
    // Using Google Public DNS JSON API over HTTPS
    const response = await fetch(`https://dns.google/resolve?name=${domain}`);
    const data = await response.json();
    
    // Status 3 = NXDOMAIN (Non-Existent Domain) -> Available
    // Status 0 = NOERROR (Success) -> Taken
    // Any other status might indicate an error, but usually means taken or reserved.
    return data.Status === 3;
  } catch (error) {
    console.error("Real DNS check failed:", error);
    // If DNS check fails (e.g. network issue), default to false (Taken) to be safe
    return false; 
  }
}

export const checkDomainAvailability = async (domainName: string): Promise<DomainResult[]> => {
  // 1. Perform Real DNS Lookup first
  let isRealAvailable = false;
  let dnsCheckSuccess = false;
  
  try {
    isRealAvailable = await checkRealDNS(domainName);
    dnsCheckSuccess = true;
  } catch (e) {
    console.warn("Skipping DNS check due to error");
  }

  // Fallback if AI is not initialized
  if (!ai) {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
    return [
      { 
        name: domainName, 
        isAvailable: dnsCheckSuccess ? isRealAvailable : false, 
        price: isRealAvailable ? "৳1,200" : "N/A", 
        reasoning: dnsCheckSuccess 
            ? (isRealAvailable ? "Available (Verified via DNS)" : "Taken (Verified via DNS)") 
            : "API Key missing. Showing mock data." 
      },
      { name: `get${domainName}.com`, isAvailable: true, price: "৳1,200", reasoning: "Available alternative (Mock)" },
      { name: `${domainName}tech.bd`, isAvailable: true, price: "৳1,500", reasoning: "Great for local tech (Mock)" },
      { name: `${domainName}.xyz`, isAvailable: true, price: "৳500", reasoning: "Budget friendly (Mock)" },
    ];
  }

  try {
    const model = "gemini-2.5-flash";
    
    // 2. Feed the real DNS result into the AI Prompt
    const prompt = `
      Act as a professional Domain Registrar API for the Bangladeshi market.
      User Query: "${domainName}"
      
      REAL TIME DNS CHECK RESULT: ${dnsCheckSuccess ? (isRealAvailable ? "AVAILABLE (NXDOMAIN)" : "TAKEN (Domain Exists)") : "UNKNOWN (DNS Query Failed)"}

      Instructions:
      1. The first item in the JSON array MUST be the user's exact query "${domainName}".
         - isAvailable: Use the REAL TIME DNS CHECK RESULT above. Do not guess.
         - price: If available, provide realistic market price in BDT (e.g., .com ৳1200, .net ৳1400, .bd ৳1500, .xyz ৳500). If taken, price is "N/A".
         - reasoning: Explicitly state "Available for registration" or "Already Registered".

      2. Generate 4-5 smart, relevant alternatives.
         - Prioritize .bd, .com.bd, .xyz, .net extensions.
         - Use creative prefixes (get, my, the, go) or suffixes (bd, app, tech, hub).
         - Ensure suggestions are likely to be available (avoid very common words).
         - Price: Realistic BDT (৳) pricing for each.

      Return ONLY a JSON array matching the schema.
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
    console.error("Error processing domain check:", error);
    // Fallback to just the DNS result if AI fails
    return [
      { 
        name: domainName, 
        isAvailable: isRealAvailable, 
        price: isRealAvailable ? "৳1,200" : "N/A", 
        reasoning: isRealAvailable ? "Verified by DNS" : "Domain is registered" 
      },
      { name: `try-${domainName}.com`, isAvailable: true, price: "৳1,200", reasoning: "Suggestion" }
    ];
  }
};