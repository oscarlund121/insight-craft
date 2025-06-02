import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req) {
  try {
    const { prompt, tone, profile } = await req.json();

    const profileInfo = profile
      ? `Virksomhed: ${profile.company}. Type: ${profile.type}. Speciale: ${profile.specialty}. Ønsker: ${profile.goal}.`
      : "";

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `Du er en ekspert i sociale medier og indholdsstrategi. Baseret på brugerens input og evt. virksomhedsinfo, generér indhold til tre platforme:

LinkedIn:
...
Instagram:
...
Facebook:
...

Svar altid på dansk, medmindre brugeren beder om andet.`,
        },
        {
          role: "user",
          content: `${profileInfo}\nTone: ${tone}\n\n${prompt}`,
        },
      ],
      temperature: 0.7,
    });

    return Response.json({ result: response.choices[0].message.content });
  } catch (error) {
    console.error("SoMe API error:", error);
    return Response.json({ error: "Noget gik galt." }, { status: 500 });
  }
}
