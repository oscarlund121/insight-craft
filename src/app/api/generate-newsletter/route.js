import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  const { prompt } = await req.json();

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",

    messages: [
      {
        role: "system",
        content:
          "Du er en hjælpsom assistent, der skriver professionelle og engagerende nyhedsbreve for selvstændige og små virksomheder.",
      },
      {
        role: "user",
        content: `Lav et nyhedsbrev ud fra dette oplæg: ${prompt}`,
      },
    ],
    temperature: 0.7,
  });

  const message = response.choices[0]?.message?.content;

  return Response.json({ result: message });
}
