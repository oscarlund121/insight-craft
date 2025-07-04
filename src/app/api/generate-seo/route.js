import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req) {
  try {
    const { prompt, tone, contentType, profile } = await req.json();

    let profileInfo = "";
    if (profile) {
      const specialty = Array.isArray(profile.specialty) ? profile.specialty.join(", ") : profile.specialty;
      const goal = Array.isArray(profile.goal) ? profile.goal.join(", ") : profile.goal;
      
      profileInfo = `Virksomhed: ${profile.company || "N/A"}. 
Type: ${profile.type || "N/A"}. 
Specialer: ${specialty || "N/A"}. 
Mål: ${goal || "N/A"}.
Målgruppe: ${profile.targetAudience || "N/A"}.
Værdier: ${profile.values || "N/A"}.`;
    }

    const contentTypeInstructions = {
      "meta-beskrivelse": "Generér kun en optimeret meta beskrivelse (max 155 tegn) der er fængende og inkluderer relevante keywords.",
      "titel-tags": "Generér kun optimerede H1, H2 og H3 titel tags der er SEO-venlige og strukturerede.",
      "heading-struktur": "Generér en komplet heading struktur (H1-H6) for siden med SEO-optimerede titler.",
      "keyword-optimering": "Analysér og foreslå primære og sekundære keywords samt deres placering i indholdet.",
      "alt-tekst": "Generér SEO-optimerede alt tekster til billeder baseret på beskrivelsen.",
      "url-struktur": "Foreslå en SEO-venlig URL struktur og URL slug for siden."
    };

    const instruction = contentTypeInstructions[contentType] || contentTypeInstructions["meta-beskrivelse"];

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `Du er en ekspert i danske søgemaskineoptimering og SEO med dyb viden om Google's algoritmer. 

ABSOLUTTE KRAV - INGEN UNDTAGELSER:
- Brug ALDRIG NOGENSINDE emojis (🚀💡❤️🎯✨🔥💪📈🌟 etc.) i det genererede indhold
- INGEN emojis overhovedet - kun 100% ren tekst
- Brug ALDRIG symboler som 🚀 💡 ❤️ 🎯 ✨ 🔥 💪 📈 🌟 💼 🎉 eller lignende
- Brug ALDRIG stjerner (*) til fremhævning eller formatering - ALDRIG ** for fed skrift
- Brug ALDRIG asterisker (*) af nogen art - hverken enkelt eller dobbelt
- Fokuser udelukkende på rent, professionelt SEO-indhold uden asterisker eller emojis
- Skriv kun på dansk medmindre andet er angivet
- Følg danske SEO best practices med ren tekst

TILLADT FORMATERING:
- Bindestreger (-) til punktopstillinger er OK
- Kolon (:) efter overskrifter er OK  
- Nummererede lister (1. 2. 3.) er OK
- Almindelige specialtegn som komma, punktum, spørgsmålstegn er OK
- Store bogstaver til overskrifter er OK

FORBUDTE SYMBOLER (ABSOLUT FORBUD):
- Ingen * (stjerner/asterisker) - ALDRIG
- Ingen ** (dobbelt asterisker) - ALDRIG 
- Ingen *** (tredobbelt asterisker) - ALDRIG
- Ingen emojis af nogen art - ALDRIG
- Ingen visuelle symboler som ✓ ✗ → ← etc. - ALDRIG
- Kun almindelig tekst med normal interpunktion - ALTID

Indholdstype: ${contentType}
Tone: ${tone}

${instruction}

Fokusér på:
- Dansk sprogbrug og søgeadfærd
- ${tone.toLowerCase()} tone uden emojis eller symboler
- Teknisk korrekt SEO med ren tekst
- Konkrete, anvendelige resultater
- Keywords der fungerer på det danske marked
- KUN ren tekst - ingen visuelle symboler

${profileInfo ? `Brug følgende virksomhedsinfo til at gøre indholdet mere specifikt og relevant: ${profileInfo}` : ""}

KRITISK: Generer kun ren tekst uden emojis eller asterisker (*/**). Brug bindestreger (-) til punkter eller numre (1. 2. 3.) til lister. ALDRIG asterisker!
Svar kun med det færdige SEO-indhold - ingen forklaringer eller overskrifter.`,
        },
        {
          role: "user",
          content: `Indholdstype: ${contentType}
Tone: ${tone}

${prompt}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 800,
    });

    let message = response.choices[0]?.message?.content;
    
    // POST-PROCESSING: Fjern kun problematiske markdown-symboler og meta-tekst
    if (message) {
      // Fjern kun fed skrift symboler og asterisker, bevar anden formatering
      message = message
        // Fjern fed skrift (**text** og *text*)
        .replace(/\*\*([^*]+)\*\*/g, '$1')
        .replace(/\*([^*]+)\*/g, '$1')
        // Fjern eventuelle resterende asterisker (men ikke andre symboler)
        .replace(/\*/g, '')
        // Fjern meta-tekst som "OVERSKRIFT:", "TITEL:", etc.
        .replace(/^(OVERSKRIFT|TITEL|HEADING|HEADER):\s*/gim, '')
        .replace(/^(OVERSKRIFT|TITEL|HEADING|HEADER)\s*-\s*/gim, '')
        // Ryd op i for mange linjeskift
        .replace(/\n{3,}/g, '\n\n')
        .trim();
    }

    return new Response(JSON.stringify({ result: message }), { status: 200 });
  } catch (error) {
    console.error("SEO API error:", error);
    return new Response(JSON.stringify({ error: "Noget gik galt med SEO optimeringen. Prøv igen." }), { status: 500 });
  }
}
