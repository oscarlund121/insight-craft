import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req) {
  try {
    const { prompt, tone, profile } = await req.json();

    const profileInfo = profile
      ? `Virksomhed: ${profile.company || "ukendt"}, Type: ${profile.type || "ukendt"}, Speciale: ${profile.specialty || "ukendt"}, Ønsker: ${profile.goal || "ukendt"}`
      : "";

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `Du er en hjælpsom assistent, der skriver professionelle og engagerende nyhedsbreve for små virksomheder. ${profileInfo && `Virksomhedsoplysninger: ${profileInfo}`}`,
        },
        {
          role: "user",
          content: `Tone: ${tone}. Lav et nyhedsbrev ud fra dette oplæg: ${prompt}`,
        },
      ],
      temperature: 0.7,
    });

    return Response.json({ result: response.choices[0]?.message?.content });
  } catch (error) {
    console.error("Newsletter API error:", error);
    return Response.json({ error: "Noget gik galt." }, { status: 500 });
  }
}
