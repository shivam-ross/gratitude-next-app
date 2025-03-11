'use server'

import { GoogleGenerativeAI } from "@google/generative-ai";


export async function generatePrompt() {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const prompt = `Generate a gratitude prompt in around 15 - 20 words.`;
    const result = await model.generateContent(prompt);
    return (result.response.text());
}



