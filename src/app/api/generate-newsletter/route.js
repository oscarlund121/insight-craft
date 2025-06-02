import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const { prompt, tone, profile } = await req.json();

    const profileInfo = profile?.name
      ? `Virksomhed: ${profile.name}. Beskrivelse: ${profile.description || ""}. Speciale: ${profile.specialty || ""}. Ønsker: ${profile.goal || ""}.`
      : "";

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `Du er en hjælpsom assistent, der skriver professionelle og engagerende nyhedsbreve for selvstændige og små virksomheder. Brug følgende virksomhedsinfo hvis tilgængeligt: ${profileInfo}`,
        },
        {
          role: "user",
          content: `Tone: ${tone}. Lav et nyhedsbrev ud fra dette oplæg: ${prompt}`,
        },
      ],
      temperature: 0.7,
    });

    const message = response.choices[0]?.message?.content;
    return Response.json({ result: message });
  } catch (error) {
    console.error("Newsletter API error:", error);
    return Response.json({ error: "Noget gik galt." }, { status: 500 });
  }
}
