import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // --- API ROUTES ---

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // AI Suggestion Route
  app.post("/api/ai/suggest", async (req, res) => {
    const { messages, context } = req.body;
    
    // Mock Fallback for Presentation
    const mockResponse = {
      suggestion: "Sure! You can pay via MTN MoMo to 054XXXXXXX. Total is GHS 2,500 including delivery. Should I send the payment link now?",
      leadScore: 88,
      isUrgent: true,
      sentiment: "positive"
    };

    if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === "") {
      console.log("Using Mock AI Suggestion (No API Key)");
      return res.json(mockResponse);
    }

    try {
      const prompt = `
        You are LeadFlow AI, a sales assistant for an African SME business.
        Context: ${JSON.stringify(context)}
        Last Messages: ${JSON.stringify(messages.slice(-5))}
        
        Task: Suggest a professional yet friendly WhatsApp reply in the local business tone (African English/Slang where appropriate).
        Also provide:
        1. Lead Score (0-100) based on buying intent.
        2. Detection of urgency (true/false).
        3. Sentiment (positive/neutral/negative).
      `;

      const result = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              suggestion: { type: Type.STRING },
              leadScore: { type: Type.INTEGER },
              isUrgent: { type: Type.BOOLEAN },
              sentiment: { type: Type.STRING }
            }
          }
        }
      });

      res.json(JSON.parse(result.text));
    } catch (error) {
      console.error("AI Error, falling back to mock:", error);
      res.json(mockResponse);
    }
  });

  // AI Summarization Route
  app.post("/api/ai/summarize", async (req, res) => {
    const { messages } = req.body;
    const mockSummary = "Customer is a high-intent wholesale buyer from Accra interested in solar kits. They prefer mobile money payments and requested urgent Saturday delivery.";

    if (!process.env.GEMINI_API_KEY) {
      return res.json({ summary: mockSummary });
    }

    try {
      const prompt = `Summarize this customer conversation into a short 2-sentence sales profile: ${JSON.stringify(messages)}`;
      const result = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
      });
      res.json({ summary: result.text });
    } catch (error) {
      res.json({ summary: mockSummary });
    }
  });

  // Presentation Mock Data Endpoint
  app.get("/api/demo/leads", (req, res) => {
    res.json([
      { id: '1', name: 'James O.', value: 1200000, stage: 'new', source: 'Instagram', score: 45 },
      { id: '2', name: 'Retailer XYZ', value: 4500000, stage: 'interested', source: 'WhatsApp', score: 88 },
      { id: '3', name: 'Mary Wanjiku', value: 850000, stage: 'negotiation', source: 'Referral', score: 72 },
      { id: '4', name: 'Bakery Ltd', value: 12500000, stage: 'paid', source: 'WhatsApp', score: 100 },
      { id: '5', name: 'Thomas T.', value: 300000, stage: 'new', source: 'Facebook', score: 20 },
    ]);
  });

  // WhatsApp Webhook (Meta)
  app.get("/api/webhooks/whatsapp", (req, res) => {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode === "subscribe" && token === process.env.WHATSAPP_VERIFY_TOKEN) {
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  });

  app.post("/api/webhooks/whatsapp", (req, res) => {
    // Handle incoming WhatsApp messages from Meta
    console.log("Incoming WA msg:", JSON.stringify(req.body, null, 2));
    // In a real app, you'd push this to Firestore
    res.sendStatus(200);
  });

  // Zirzir Webhook
  app.post("/api/webhooks/zirzir", (req, res) => {
    // Handle payment confirmations via Zirzir
    console.log("Zirzir webhook:", req.body);
    res.sendStatus(200);
  });

  // --- VITE MIDDLEWARE ---
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`LeadFlow Africa Server running on http://localhost:${PORT}`);
  });
}

startServer();
