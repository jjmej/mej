

'use server';

import { GoogleGenAI } from '@google/genai';

export async function getSimpleTextResponse(prompt: string): Promise<string> {
  // FIX: Per coding guidelines, API key must be obtained from process.env.API_KEY.
  if (!process.env.API_KEY) {
    console.warn("API_KEY environment variable not set. AI features will be disabled.");
    return "El servicio de IA no está configurado correctamente.";
  }
  
  // FIX: Initialize GoogleGenAI inside the function to align with guidelines.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    
    return response.text ?? "No se pudo obtener una respuesta del modelo.";
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Hubo un error al comunicarse con el servicio de IA.";
  }
}