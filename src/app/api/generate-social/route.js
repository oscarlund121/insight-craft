import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const { prompt } = await req.json();

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
     content: `Du er en ekspert i sociale medier og indholdsstrategi. Baseret på brugerens input, skal du generere:
- Et opslag til LinkedIn
- Et opslag til Instagram (inkl. emojis)
- Et opslag til Facebook

Svar altid på dansk, medmindre brugeren beder om et andet sprog.

Svar i dette format:
LinkedIn:
...
Instagram:
...
Facebook:
...`,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.7,
    });

    const result = response.choices[0].message.content;

    return Response.json({ result });
  } catch (error) {
    console.error("SoMe API ERROR:", error);
    return new Response(
      JSON.stringify({ error: "Noget gik galt. Prøv igen senere." }),
      { status: 500 }
    );
  }
}
