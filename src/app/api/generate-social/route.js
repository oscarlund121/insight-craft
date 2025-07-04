import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req) {
  try {
    const { prompt, tone, platform, contentType, profile, autoGenerate, includeHashtags } = await req.json();

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

    const platformInstructions = {
      "Facebook": "Skab detaljeret indhold med storytelling, der opfordrer til engagement. Brug 2-3 afsnit med emotionelle hook.",
      "Instagram": "Skab visuelt fokuseret indhold med relevante hashtags (#). Fokuser på stærk tekst og call-to-action.",
      "LinkedIn": "Skab professionelt netværksindhold der tilføjer værdi. Fokus på indsigter og brancheekspertise.",
      "Twitter": "Skab kort, kontant indhold (max 280 tegn) der er dele-venligt og relevant.",
      "TikTok": "Skab trendy, ungdommeligt indhold med hooks der fanger opmærksomhed med det samme.",
      "Generisk": "Skab alsidigt indhold der fungerer på tværs af platforme."
    };

    const contentTypeInstructions = {
      "opslag": "Standard sociale medie opslag med ren tekst",
      "story": "Story-format med korte, fængende beskeder",
      "reel": "Korte, fængende beskrivelser til video indhold",
      "hashtags": "Liste med relevante hashtags (#) - 10-20 forslag",
      "caption": "Engagerende billedtekster til visuelle opslag",
      "bio": "Kort, slagkraftig profil beskrivelse (max 150 tegn) - INGEN hashtags"
    };

    const platformInstruction = platformInstructions[platform] || platformInstructions["Generisk"];
    const contentTypeInstruction = contentTypeInstructions[contentType] || contentTypeInstructions["opslag"];

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `Du er en ekspert i sociale medier og dansk indholdsstrategi. 

ABSOLUTTE KRAV - INGEN UNDTAGELSER:
- Brug ALDRIG NOGENSINDE emojis (🚀💡❤️🎯✨ etc.) i det genererede indhold
- INGEN emojis overhovedet - kun 100% ren tekst
- Brug ALDRIG symboler som 🚀 💡 ❤️ 🎯 ✨ 🔥 💪 📈 🌟 eller lignende
- Brug ALDRIG stjerner (*) til fremhævning eller formatering - ALDRIG ** for fed skrift
- Brug ALDRIG asterisker (*) af nogen art - hverken enkelt eller dobbelt
- Fokuser udelukkende på rent, professionelt tekstindhold
- Skriv kun på dansk medmindre andet er angivet
- Skab engagerende indhold kun gennem stærk tekstformulering

TILLADT FORMATERING:
- Bindestreger (-) til punktopstillinger er OK
- Kolon (:) efter overskrifter er OK  
- Nummererede lister (1. 2. 3.) er OK
- Hashtags (#) er OK hvis brugeren har valgt det
- Almindelige specialtegn som komma, punktum, spørgsmålstegn er OK
- Store bogstaver til overskrifter er OK

FORBUDTE SYMBOLER (ABSOLUT FORBUD):
- Ingen * (stjerner/asterisker) - ALDRIG
- Ingen ** (dobbelt asterisker) - ALDRIG 
- Ingen *** (tredobbelt asterisker) - ALDRIG
- Ingen emojis af nogen art - ALDRIG
- Ingen visuelle symboler som ✓ ✗ → ← etc. - ALDRIG
- Kun almindelig tekst med normal interpunktion - ALTID

Platform: ${platform}
Indholdstype: ${contentType}
Tone: ${tone}
Hashtags: ${includeHashtags ? 'Inkluder relevante hashtags' : 'INGEN hashtags - kun ren tekst'}

${platformInstruction}
${contentTypeInstruction}

Fokusér på:
- Dansk sprogbrug og kultur
- ${tone.toLowerCase()} tone uden emojis eller symboler
- Engagement og interaktion gennem stærk tekst alene
- ${includeHashtags && contentType !== 'bio' ? 'Relevante hashtags hvor passende' : 'INGEN hashtags overhovedet'}
- Call-to-action hvor relevant
- Autenticitet og værdi for målgruppen
- KUN ren tekst - ingen visuelle symboler
- Hvis indholdstype er "bio": Ingen hashtags overhovedet - kun ren beskrivende tekst

${profileInfo ? `Brug følgende virksomhedsinfo til at gøre indholdet mere specifikt og relevant: ${profileInfo}` : ""}

${autoGenerate ? `VIGTIG: Dette er auto-generering baseret KUN på virksomhedsprofilen. Ignorer det brugerskrevne prompt og fokuser udelukkende på at skabe relevant indhold baseret på virksomhedens specialer, mål, målgruppe og værdier. Skab naturligt indhold der passer til virksomheden uden at referere direkte til at det er auto-genereret.` : ""}

KRITISK: Generer kun ren tekst uden emojis eller asterisker (*/**). Brug bindestreger (-) til punkter eller numre (1. 2. 3.) til lister. ALDRIG asterisker!
Svar kun med det færdige indhold - ingen forklaringer eller overskrifter.`,
        },
        {
          role: "user",
          content: `Platform: ${platform}
Indholdstype: ${contentType}
Tone: ${tone}

${prompt}`,
        },
      ],
      temperature: 0.8,
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

    return Response.json({ result: message });
  } catch (error) {
    console.error("Social Media API error:", error);
    return Response.json({ error: "Noget gik galt med indholdsgenereringen. Prøv igen." }, { status: 500 });
  }
}
