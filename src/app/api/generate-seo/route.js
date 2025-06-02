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
          content: `Du er en erfaren SEO-specialist. Brug brugerens beskrivelse og virksomhedsinfo hvis tilgængeligt. Generér:
1. En engagerende sidetitel (max 60 tegn)
2. En optimeret metabeskrivelse (max 155 tegn)
3. 5 relevante SEO-nøgleord (kommasepareret)

Svar i dette format:
- Titel: ...
- Meta: ...
- Søgeord: ...`,
        },
        {
          role: "user",
          content: `${profileInfo}\nTone: ${tone}\n\n${prompt}`,
        },
      ],
      temperature: 0.7,
    });

    return new Response(JSON.stringify({ result: response.choices[0].message.content }), { status: 200 });
  } catch (error) {
    console.error("SEO API error:", error);
    return new Response(JSON.stringify({ error: "Noget gik galt." }), { status: 500 });
  }
}
