// src/app/api/generate-seo/route.js
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return new Response(
        JSON.stringify({ error: "Prompt mangler." }),
        { status: 400 }
      );
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `Du er en erfaren SEO-specialist. Brug brugerens beskrivelse til at generere:
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
          content: prompt,
        },
      ],
      temperature: 0.7,
    });

    const result = response.choices[0].message.content;

    return new Response(JSON.stringify({ result }), { status: 200 });
  } catch (error) {
    console.error("SEO API ERROR:", error);
    return new Response(
      JSON.stringify({ error: "Noget gik galt. Prøv igen senere." }),
      { status: 500 }
    );
  }
}
