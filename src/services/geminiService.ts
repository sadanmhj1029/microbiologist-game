import { GoogleGenAI } from "@google/genai";
import type { Question } from "../types";


export const askTheExpert = async (question: Question): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_API_KEY });

    const prompt = `
You are a World-Class Microbiology Professor assisting a student on a high-stakes game show.

The Question is: "${question.question}"
The Options provided are:
A) ${question.options[0]}
B) ${question.options[1]}
C) ${question.options[2]}
D) ${question.options[3]}

The Correct Answer is: ${question.options[question.correctIndex]} (Index ${question.correctIndex}).

Provide a scientifically accurate hint explaining why this is correct.
Keep under 75 words.
`;

    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: {
        temperature: 0.8,
        thinkingConfig: { thinkingBudget: 2048 }
      }
    });

    return response.text?.trim() || "Expert hint unavailable.";
  } catch (error) {
    console.error("Expert AI Error:", error);
    return "Expert system temporarily unavailable.";
  }
};
