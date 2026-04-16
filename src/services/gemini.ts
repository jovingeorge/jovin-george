import React from 'react';
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export async function askHealthAssistant(question: string, context?: string) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not configured');
  }

  const systemInstruction = `
    You are the J-Nexus Health AI Assistant. 
    A professional, empathetic, and knowledgeable digital health guide.
    Your owner is Jovin George.
    
    GUIDELINES:
    1. Provide clinical education based on standard medical knowledge.
    2. Suggest possible causes based on symptoms BUT always include a clear disclaimer.
    3. Encourage healthy lifestyle choices (diet, exercise, stress management).
    4. Mention herbal support where appropriate as a supportive (not primary) treatment.
    
    DISCLAIMER: Always end with: "This platform provides educational health information and does not replace professional medical advice. Please consult with a healthcare professional before making any medical decisions."
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp",
      contents: context ? [{ text: `Context: ${context}\n\nQuestion: ${question}` }] : [{ text: question }],
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return response.text || "I'm sorry, I couldn't generate a response at this time.";
  } catch (error) {
    console.error("AI Assistant Error:", error);
    return "I encountered an error while processing your request. Please try again later.";
  }
}
