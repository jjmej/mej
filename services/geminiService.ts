
'use server';

import { GoogleGenAI } from '@google/genai';

// Solo inicializar si la clave API existe.
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
} else {
  console.warn("GEMINI_API_KEY environment variable not set. AI features will be disabled.");
}

export async function getSimpleTextResponse(prompt: string): Promise<string> {
  if (!ai) {
    return "El servicio de IA no está configurado correctamente.";
  }
  
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
