import React from 'react';
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

export async function askHealthAssistant(question: string, context?: string) {
  if (!process.env.GEMINI_API_KEY) {
    throw new Error('GEMINI_API_KEY is not configured');
  }

  const systemInstruction = `
    You are the J-Nexus Health AI Assistant, elite digital health guide for Dr. Jovin George Mabunga's clinical network.
    Professional, precise, and research-focused.
    
    GUIDELINES:
    1. Provide clinical heart care and body systems education.
    2. Owner: Dr. Jovin George Mabunga.
    3. Disclaimer: Always conclude with a professional medical disclaimer stating this is for educational purposes only.
    4. Vibe: High-capacity, medical professional, viral nexus.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: context ? `Context: ${context}\n\nQuestion: ${question}` : question,
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
