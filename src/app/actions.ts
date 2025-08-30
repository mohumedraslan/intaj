// src/app/actions.ts
'use server';

import OpenAI from 'openai';
import { type Message } from '@/lib/types';

const openrouter = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": process.env.NEXT_PUBLIC_SITE_URL, // Required for free models
    "X-Title": "Intaj AI", // Optional: Your app name
  },
});

const demoBotPrompt = `You are a helpful and enthusiastic sales assistant for a SaaS company called "Intaj". Your goal is to answer questions about Intaj and encourage users to sign up.

Intaj is an AI chatbot platform that allows users to:
- Create custom AI chatbots.
- Train them on their own data by uploading files or adding FAQs.
- Deploy them to their websites.
- It has a free tier to get started, and paid plans for more features.

Keep your answers concise, friendly, and always steer the conversation towards the benefits of signing up for a free trial.`;

export async function getPublicAiResponse(values: { history: Message[] }) {
  if (!process.env.OPENROUTER_API_KEY) {
    return { response: "Sorry, our demo is currently offline. Please try again later." };
  }

  try {
    const response = await openrouter.chat.completions.create({
      model: process.env.OPENROUTER_MODEL || 'mistralai/mistral-7b-instruct:free',
      messages: [
        { role: 'system', content: demoBotPrompt },
        ...values.history
      ],
      temperature: 0.7,
      max_tokens: 150,
    });

    return { response: response.choices[0]?.message?.content };
  } catch (error) {
    console.error("OpenRouter Public API Error:", error);
    return { response: "Sorry, I encountered an error. Please try asking something else." };
  }
}
