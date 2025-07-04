import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const { prompt, tone, newsletterType, contentStructure, profile, autoGenerate, quickStart, smartSetup, surpriseMe } = await req.json();

    // Initialize final values
    let finalPrompt = prompt;
    let finalTone = tone;
    let finalNewsletterType = newsletterType;
    let finalContentStructure = contentStructure;
    let returnSettings = null;

    const toneOptions = ["Venlig", "Professionel", "Kreativ", "Formel", "Entusiastisk", "Personlig", "Humoristisk", "Ekspert", "Inspirerende", "Casual"];
    const newsletterTypes = ["standard", "produktlancering", "kundehistorier", "tips-guide", "brandhygge", "seasonal", "trendspotting", "ekspertinterview", "problemløsning"];
    const contentStructures = ["klassisk", "listicle", "storytelling", "qa", "sammenligning", "casestudy", "howto", "roundup"];
    const inspirationPrompts = [
      "Skriv om de 5 største udfordringer din branche står overfor i 2024",
      "Del en kundes transformation fra problem til succes",
      "Sammenlign din løsning med traditonelle metoder - hvad er anderledes?",
      "Fortæl historien bag dit nyeste produkt eller feature",
      "Giv læserne 7 konkrete tips de kan bruge i dag",
      "Interview en ekspert om fremtidens trends i jeres branche",
      "Afslør 3 myter der holder folk tilbage fra at nå deres mål",
      "Del behind-the-scenes fra jeres seneste projekt eller event",
      "Lav en guide til at komme i gang med [dit speciale]",
      "Analyser en aktuel trend og hvad den betyder for din målgruppe",
      "Fortæl om en fejl I lærte meget af, og hvad andre kan tage med",
      "Sammenlign før og efter resultater fra en af jeres cases"
    ];

    // Setup-only functions - returnerer kun indstillinger, genererer IKKE indhold
    if (surpriseMe) {
      finalNewsletterType = newsletterTypes[Math.floor(Math.random() * newsletterTypes.length)];
      finalContentStructure = contentStructures[Math.floor(Math.random() * contentStructures.length)];
      finalTone = toneOptions[Math.floor(Math.random() * toneOptions.length)];
      finalPrompt = inspirationPrompts[Math.floor(Math.random() * inspirationPrompts.length)];
      
      // Returnér kun indstillinger, ingen AI-generering
      return Response.json({
        settings: {
          newsletterType: finalNewsletterType,
          tone: finalTone,
          contentStructure: finalContentStructure,
          prompt: finalPrompt
        }
      });
    }
    
    // Quick Start Logic - kun setup med variation og koordinerede prompts
    if (quickStart) {
      // Koordinerede kombinationer hvor type, tone, struktur og prompt matcher
      const quickCombinations = [
        { 
          type: "standard", 
          tone: "Venlig", 
          structure: "klassisk",
          prompts: [
            "Skriv et nyhedsbrev med opdateringer fra din virksomhed og branche",
            "Del nyheder og indsigter på en varm og tilgængelig måde",
            "Fortæl om seneste udvikling og hvad det betyder for dine læsere"
          ]
        },
        { 
          type: "tips-guide", 
          tone: "Professionel", 
          structure: "listicle",
          prompts: [
            "Giv læserne 7 praktiske tips de kan implementere med det samme",
            "Lav en guide med konkrete trin til at løse et almindeligt problem",
            "Del ekspertviden gennem nummererede råd og anbefalinger"
          ]
        },
        { 
          type: "kundehistorier", 
          tone: "Inspirerende", 
          structure: "storytelling",
          prompts: [
            "Fortæl historien om en kundes transformation fra udfordring til succes",
            "Del et inspirerende eksempel på hvordan jeres løsning skabte resultater",
            "Beskriv en kundes rejse og de læringer andre kan tage med"
          ]
        },
        { 
          type: "produktlancering", 
          tone: "Entusiastisk", 
          structure: "howto",
          prompts: [
            "Præsenter jeres nye produkt og guide læserne i at komme i gang",
            "Fortæl om det nye feature og hvordan det kan forbedre deres hverdag",
            "Introducer jeres seneste løsning med step-by-step instruktioner"
          ]
        },
        { 
          type: "brandhygge", 
          tone: "Personlig", 
          structure: "storytelling",
          prompts: [
            "Tag læserne med behind-the-scenes og del teamets historie",
            "Fortæl om virksomhedens værdier gennem personlige anekdoter",
            "Del en historie fra hverdagen der viser jeres kultur og mission"
          ]
        },
        { 
          type: "problemløsning", 
          tone: "Ekspert", 
          structure: "casestudy",
          prompts: [
            "Analyser et almindeligt brancheproblem og præsenter jeres løsning",
            "Beskriv en konkret udfordring og hvordan I hjalp med at løse den",
            "Del en dybdegående case study der viser jeres ekspertise"
          ]
        },
        { 
          type: "trendspotting", 
          tone: "Kreativ", 
          structure: "roundup",
          prompts: [
            "Saml de vigtigste trends i branchen og analyser deres betydning",
            "Giv et kreativt overblik over hvad der sker lige nu i jeres område",
            "Sammenfat årets mest interessante udviklinger og tendenser"
          ]
        },
        { 
          type: "tips-guide", 
          tone: "Casual", 
          structure: "howto",
          prompts: [
            "Lav en afslappet guide til at forbedre hverdagen på simple måder",
            "Del praktiske lifehacks på en uformel og tilgængelig måde",
            "Giv enkle råd der gør komplekse ting lettere at forstå"
          ]
        },
        { 
          type: "ekspertinterview", 
          tone: "Formel", 
          structure: "qa",
          prompts: [
            "Interview en brancheekspert om fremtidens trends og udviklinger",
            "Stil de vigtige spørgsmål som dine læsere gerne vil have svar på",
            "Få ekspertviden gennem strukturerede spørgsmål og professionelle svar"
          ]
        },
        { 
          type: "standard", 
          tone: "Humoristisk", 
          structure: "klassisk",
          prompts: [
            "Skriv et underholdende nyhedsbrev der får læserne til at smile",
            "Del nyheder og opdateringer på en let og morsom måde",
            "Kombiner information med humor for at engagere dine læsere"
          ]
        }
      ];
      
      const randomCombo = quickCombinations[Math.floor(Math.random() * quickCombinations.length)];
      finalNewsletterType = randomCombo.type;
      finalTone = randomCombo.tone;
      finalContentStructure = randomCombo.structure;
      finalPrompt = randomCombo.prompts[Math.floor(Math.random() * randomCombo.prompts.length)];
      
      // Returnér kun indstillinger, ingen AI-generering
      return Response.json({
        settings: {
          newsletterType: finalNewsletterType,
          tone: finalTone,
          contentStructure: finalContentStructure,
          prompt: finalPrompt
        }
      });
    }

    // Smart Setup Logic - koordineret med type, tone, struktur og prompt
    if (smartSetup && profile && profile.company) {
      console.log('Smart Setup triggered with profile:', profile);
      
      // Industry-specific setup based on profile
      const industry = (profile.industry || '').toLowerCase();
      const type = (profile.type || '').toLowerCase();
      const businessType = (profile.businessType || '').toLowerCase();
      
      // Kombiner alle relevante felter for bedre matching
      const allTypes = `${industry} ${type} ${businessType}`.toLowerCase();
      
      console.log('Detected industry:', industry);
      console.log('Detected type:', type);
      console.log('Detected businessType:', businessType);
      console.log('Combined for matching:', allTypes);
      
      const companyName = profile.company;
      const targetAudience = profile.targetAudience || 'vores kunder';
      const specialties = Array.isArray(profile.specialty) ? profile.specialty : [];
      const randomSpecialty = specialties.length > 0 ? specialties[Math.floor(Math.random() * specialties.length)] : 'vores specialer';
      
      let matched = false;
      let smartCombinations = [];
      
      // Branchespecifikke koordinerede kombinationer
      if (allTypes.includes('fitness') || allTypes.includes('sundhed') || allTypes.includes('træning') || allTypes.includes('sport') || allTypes.includes('wellness')) {
        smartCombinations = [
          { 
            type: "tips-guide", 
            tone: "Inspirerende", 
            structure: "howto",
            prompts: [
              `5 træningsøvelser ${targetAudience} kan lave hjemmefra - guide fra ${companyName}`,
              `Sådan forbedrer du din ${randomSpecialty} på 30 dage - ekspertråd fra ${companyName}`,
              `${companyName}s step-by-step guide til at komme i gang med ${randomSpecialty}`
            ]
          },
          { 
            type: "kundehistorier", 
            tone: "Entusiastisk", 
            structure: "storytelling",
            prompts: [
              `Fantastisk transformation: Hvordan ${companyName} hjalp ${targetAudience} med at revolutionere deres ${randomSpecialty}`,
              `Utrolig succes: En kundes energiske rejse med ${randomSpecialty} og ${companyName}`,
              `Inspirerende gennemslag: Hvordan ${companyName} skabte fantastiske resultater med ${randomSpecialty}`
            ]
          },
          { 
            type: "problemløsning", 
            tone: "Ekspert", 
            structure: "casestudy",
            prompts: [
              `Ekspertanalyse: Hvordan ${companyName} løste ${targetAudience}s største ${randomSpecialty}-udfordring`,
              `Professionel tilgang: De 3 største myter om ${randomSpecialty} - sandheden fra ${companyName}`,
              `Videnskabelig metode: ${companyName}s ekspertløsning til ${randomSpecialty}-problemer`
            ]
          },
          { 
            type: "standard", 
            tone: "Venlig", 
            structure: "listicle",
            prompts: [
              `${companyName}s 7 venlige tips til ${targetAudience} der vil forbedre deres ${randomSpecialty}`,
              `Hjælpsomme råd: Alt hvad ${targetAudience} skal vide om ${randomSpecialty} fra ${companyName}`,
              `Varme anbefalinger: ${companyName} deler enkle måder at optimere din ${randomSpecialty}`
            ]
          },
          { 
            type: "brandhygge", 
            tone: "Personlig", 
            structure: "storytelling",
            prompts: [
              `Behind the scenes: Den personlige historie bag ${companyName}s passion for ${randomSpecialty}`,
              `Vores rejse: Hvordan ${companyName}s team fandt deres kærlighed til ${randomSpecialty}`,
              `Intimt indblik: De personlige oplevelser der former ${companyName}s tilgang til ${randomSpecialty}`
            ]
          }
        ];
        matched = true;
        console.log('Matched: Fitness/Health industry with coordinated combinations');
      } else if (allTypes.includes('teknologi') || allTypes.includes('software') || allTypes.includes('it') || allTypes.includes('tech') || allTypes.includes('digital') || allTypes.includes('udvikling')) {
        smartCombinations = [
          { 
            type: "trendspotting", 
            tone: "Ekspert", 
            structure: "listicle",
            prompts: [
              `5 teknologi-trends der vil påvirke ${targetAudience} i 2024 - indsigt fra ${companyName}`,
              `Fremtidens ${randomSpecialty}: Hvad ${targetAudience} skal vide - ekspertanalyse fra ${companyName}`,
              `${companyName}s 2024 trendrapport: Vigtige udviklinger inden for ${randomSpecialty}`
            ]
          },
          { 
            type: "produktlancering", 
            tone: "Entusiastisk", 
            structure: "howto",
            prompts: [
              `Introduktion til ${companyName}s nye ${randomSpecialty}-løsning - sådan kommer du i gang`,
              `Ny feature fra ${companyName}: Revolutioner din ${randomSpecialty} med denne guide`,
              `${companyName} lancerer: Din komplette guide til at mestre vores nye ${randomSpecialty}-værktøj`
            ]
          },
          { 
            type: "ekspertinterview", 
            tone: "Professionel", 
            structure: "qa",
            prompts: [
              `Ekspertinterview: ${companyName}s CTO om fremtidens ${randomSpecialty}`,
              `Q&A med ${companyName}: Alt om ${randomSpecialty} og hvad ${targetAudience} skal vide`,
              `${companyName}s eksperter svarer: 7 vigtige spørgsmål om ${randomSpecialty}`
            ]
          },
          { 
            type: "problemløsning", 
            tone: "Kreativ", 
            structure: "casestudy",
            prompts: [
              `Kreativ problemløsning: Hvordan ${companyName} revolutionerede ${randomSpecialty} for en kunde`,
              `Innovation i praksis: ${companyName}s unikke tilgang til ${randomSpecialty}-udfordringer`,
              `Case study: ${companyName}s kreative løsning på ${targetAudience}s ${randomSpecialty}-problemer`
            ]
          }
        ];
        matched = true;
        console.log('Matched: Technology industry with coordinated combinations');
      } else if (allTypes.includes('finans') || allTypes.includes('regnskab') || allTypes.includes('økonomi') || allTypes.includes('bank') || allTypes.includes('forsikring') || allTypes.includes('investering')) {
        smartCombinations = [
          { 
            type: "standard", 
            tone: "Professionel", 
            structure: "klassisk",
            prompts: [
              `${companyName}s månedlige økonomiske opdatering for ${targetAudience}`,
              `Vigtige nyheder inden for ${randomSpecialty} - analyse fra ${companyName}`,
              `${companyName}s professionelle vurdering af aktuelle ${randomSpecialty}-trends`
            ]
          },
          { 
            type: "tips-guide", 
            tone: "Ekspert", 
            structure: "listicle",
            prompts: [
              `${companyName}s 7 eksperttips til bedre ${randomSpecialty} for ${targetAudience}`,
              `Sådan optimerer ${targetAudience} deres ${randomSpecialty} - ekspertråd fra ${companyName}`,
              `${companyName}s ultimative tjekliste til ${randomSpecialty}-succes`
            ]
          },
          { 
            type: "problemløsning", 
            tone: "Formel", 
            structure: "casestudy",
            prompts: [
              `Case study: Hvordan ${companyName} løste en kompleks ${randomSpecialty}-udfordring`,
              `Dybdegående analyse: ${companyName}s tilgang til ${randomSpecialty}-optimering`,
              `Problemløsning i praksis: ${companyName}s metode til bedre ${randomSpecialty}`
            ]
          },
          { 
            type: "ekspertinterview", 
            tone: "Professionel", 
            structure: "qa",
            prompts: [
              `Ekspertinterview: ${companyName}s partner om ${randomSpecialty}-strategier`,
              `Q&A med ${companyName}: Svar på ${targetAudience}s hyppigste ${randomSpecialty}-spørgsmål`,
              `${companyName}s eksperter forklarer: Hvad ${targetAudience} skal vide om ${randomSpecialty}`
            ]
          }
        ];
        matched = true;
        console.log('Matched: Finance industry with coordinated combinations');
      } else if (allTypes.includes('markedsføring') || allTypes.includes('marketing') || allTypes.includes('kreativ') || allTypes.includes('reklame') || allTypes.includes('branding') || allTypes.includes('kommunikation')) {
        smartCombinations = [
          { 
            type: "kundehistorier", 
            tone: "Kreativ", 
            structure: "storytelling",
            prompts: [
              `Kreativ succes: Hvordan ${companyName}s ${randomSpecialty} øgede en kundes salg med 200%`,
              `Inspirerende case: ${companyName}s innovative tilgang til ${randomSpecialty} skabte resultater`,
              `Fra vision til virkelighed: En kundes kreative rejse med ${companyName} og ${randomSpecialty}`
            ]
          },
          { 
            type: "brandhygge", 
            tone: "Personlig", 
            structure: "storytelling",
            prompts: [
              `Behind the scenes hos ${companyName}: Sådan skaber vi vindende ${randomSpecialty}-kampagner`,
              `Den personlige historie bag ${companyName}s tilgang til ${randomSpecialty}`,
              `Mød teamet: Hvordan ${companyName}s kreative proces former vores ${randomSpecialty}`
            ]
          },
          { 
            type: "trendspotting", 
            tone: "Inspirerende", 
            structure: "roundup",
            prompts: [
              `${companyName}s 2024 trendrapport: Hvad der driver ${randomSpecialty} fremad`,
              `Inspirerende trends: ${companyName}s perspektiv på fremtidens ${randomSpecialty}`,
              `Trendspotting fra ${companyName}: 5 ${randomSpecialty}-trends ${targetAudience} skal kende`
            ]
          },
          { 
            type: "problemløsning", 
            tone: "Entusiastisk", 
            structure: "casestudy",
            prompts: [
              `Fantastisk resultat: Hvordan ${companyName}s ${randomSpecialty} løste ${targetAudience}s største udfordring`,
              `Succes-case: ${companyName}s entusiastiske tilgang til ${randomSpecialty} skabte gennemslag`,
              `Game-changer: ${companyName}s innovative ${randomSpecialty}-løsning der forandrede alt`
            ]
          }
        ];
        matched = true;
        console.log('Matched: Marketing/Creative industry with coordinated combinations');
      } else if (allTypes.includes('konsulentvirksomhed') || allTypes.includes('rådgivning') || allTypes.includes('konsulent') || allTypes.includes('advisory') || allTypes.includes('coaching')) {
        smartCombinations = [
          { 
            type: "ekspertinterview", 
            tone: "Ekspert", 
            structure: "qa",
            prompts: [
              `Ekspertinterview: ${companyName}s seniorkonsulent om ${randomSpecialty}-strategier`,
              `Q&A med ${companyName}: Ekspertsvar på ${targetAudience}s ${randomSpecialty}-udfordringer`,
              `${companyName}s topleder deler: Vigtig viden om ${randomSpecialty} for ${targetAudience}`
            ]
          },
          { 
            type: "tips-guide", 
            tone: "Professionel", 
            structure: "howto",
            prompts: [
              `${companyName}s professionelle guide til at mestre ${randomSpecialty}`,
              `Step-by-step: ${companyName}s metode til succesfuld ${randomSpecialty}`,
              `Konsulentens guide: ${companyName}s bedste råd til ${randomSpecialty}-optimering`
            ]
          },
          { 
            type: "problemløsning", 
            tone: "Ekspert", 
            structure: "casestudy",
            prompts: [
              `Konsulent-case: Hvordan ${companyName} løste en kompleks ${randomSpecialty}-udfordring`,
              `Ekspertløsning: ${companyName}s tilgang til ${targetAudience}s ${randomSpecialty}-problemer`,
              `Case study: ${companyName}s dybdegående analyse og løsning af ${randomSpecialty}`
            ]
          },
          { 
            type: "tips-guide", 
            tone: "Inspirerende", 
            structure: "listicle",
            prompts: [
              `${companyName}s 7 inspirerende råd til bedre ${randomSpecialty} for ${targetAudience}`,
              `Konsulentens hemmeligheder: ${companyName}s top tips til ${randomSpecialty}-succes`,
              `Motivation og metode: ${companyName}s inspirerende tilgang til ${randomSpecialty}`
            ]
          }
        ];
        matched = true;
        console.log('Matched: Consulting industry with coordinated combinations');
      } else {
        // Default koordinerede kombinationer hvis ingen branche-match
        smartCombinations = [
          { 
            type: "tips-guide", 
            tone: "Professionel", 
            structure: "listicle",
            prompts: [
              `${companyName}s 7 bedste tips til ${targetAudience}`,
              `Ekspertråd fra ${companyName}: Sådan optimerer ${targetAudience} deres ${randomSpecialty}`,
              `${companyName}s professionelle guide til bedre resultater for ${targetAudience}`
            ]
          },
          { 
            type: "standard", 
            tone: "Venlig", 
            structure: "klassisk",
            prompts: [
              `Nyheder fra ${companyName}: Hvad ${targetAudience} skal vide denne måned`,
              `${companyName}s opdatering til ${targetAudience} om ${randomSpecialty}`,
              `Månedlige indsigter fra ${companyName} til vores ${targetAudience}`
            ]
          },
          { 
            type: "kundehistorier", 
            tone: "Inspirerende", 
            structure: "storytelling",
            prompts: [
              `Succeshistorie: Hvordan ${companyName} hjalp en kunde med at nå deres mål`,
              `Inspirerende case: En kundes rejse med ${companyName} og ${randomSpecialty}`,
              `Fra udfordring til succes: ${companyName}s rolle i en kundes transformation`
            ]
          },
          { 
            type: "problemløsning", 
            tone: "Ekspert", 
            structure: "howto",
            prompts: [
              `Sådan løser ${companyName} ${targetAudience}s mest almindelige udfordringer`,
              `Ekspertguide: ${companyName}s metode til at tackle ${randomSpecialty}-problemer`,
              `Problemløsning step-by-step: ${companyName}s tilgang til bedre resultater`
            ]
          }
        ];
        console.log('No industry match - using default coordinated combinations');
      }
      
      // Vælg en tilfældig koordineret kombination
      const selectedCombo = smartCombinations[Math.floor(Math.random() * smartCombinations.length)];
      finalNewsletterType = selectedCombo.type;
      finalTone = selectedCombo.tone;
      finalContentStructure = selectedCombo.structure;
      finalPrompt = selectedCombo.prompts[Math.floor(Math.random() * selectedCombo.prompts.length)];

      console.log('Selected coordinated combination:', selectedCombo);

      // Returnér kun indstillinger, ingen AI-generering
      return Response.json({
        settings: {
          newsletterType: finalNewsletterType,
          tone: finalTone,
          contentStructure: finalContentStructure,
          prompt: finalPrompt
        }
      });
    }

    const profileInfo = profile?.company
      ? `Virksomhed: ${profile.company}. Type: ${profile.type || ""}. Specialer: ${Array.isArray(profile.specialty) ? profile.specialty.join(", ") : profile.specialty || ""}. Mål: ${Array.isArray(profile.goal) ? profile.goal.join(", ") : profile.goal || ""}. Målgruppe: ${profile.targetAudience || ""}.`
      : "";

    const typeInstructions = {
      "standard": "Opret et dynamisk og engagerende nyhedsbrev med aktuelle nyheder, værdifulde opdateringer og relevant information. Bland fakta med historier og gør det interessant at læse.",
      "produktlancering": "Skab spændende og overbevisende indhold der præsenterer nye produkter eller tjenester. Brug storytelling, kundefordele og unikke salgspunkter. Fokuser på værdi og løsninger.",
      "kundehistorier": "Fortæl inspirerende og autentiske kundesucceshistorier med konkrete resultater. Inkluder udfordringer, løsninger og transformation. Gør det relaterbart og motiverende.",
      "tips-guide": "Lav actionable og praktisk uddannelsesindhold med konkrete tips, step-by-step guides og brugbare råd. Gør det nemt at implementere og værdifuldt.",
      "brandhygge": "Del personlige og autentiske indblik i virksomheden, teamet og processer. Byg forbindelse og tillid ved at vise den menneskelige side og værdierne.",
      "seasonal": "Skab relevant og timet indhold tilpasset aktuelle årstider, helligdage eller begivenheder. Kombiner sæsonens stemning med virksomhedens budskab.",
      "trendspotting": "Analyser og forklar aktuelle trends, markedsudvikling og fremtidige muligheder. Giv indsigt og perspektiv som positionerer virksomheden som thought leader.",
      "ekspertinterview": "Presenter spændende Q&A med brancheeksperter, ledere eller nøglepersoner. Grav dybere og stil de spørgsmål læserne gerne vil have svar på.",
      "problemløsning": "Identificer konkrete udfordringer din målgruppe står overfor og præsenter praktiske, implementerbare løsninger. Fokuser på værdi og resultater."
    };

    const structureInstructions = {
      "klassisk": "Opret en traditionel nyhedsbrevsstruktur med: 1) En fængslende introduktion der sætter scenen, 2) Hovedindhold opdelt i 2-3 klare sektioner med beskrivende overskrifter, 3) En stærk call-to-action afslutning der motiverer til handling. Brug naturlige overgange mellem sektionerne.",
      "listicle": "Organiser HELE indholdet som en nummereret liste med mindst 5-7 konkrete punkter (f.eks. '7 essentielle tips til...'). Start med en kort introduktion, derefter præsentér hvert punkt som: '1. [Titel]' efterfulgt af en forklaring. Gør hvert punkt actionable og værdifuldt med konkrete eksempler.",
      "storytelling": "Fortæl en sammenhængende og fængslende historie fra start til slut. Brug klassisk narrativ struktur: 1) Sæt scenen og introducer hovedpersonen/situation, 2) Præsentér udfordringen eller konflikten, 3) Vis rejsen og løsningsprocessen, 4) Afslør resultatet og transformationen. Gør det personligt og relaterbart.",
      "qa": "Strukturér HELE nyhedsbrevet som naturlige spørgsmål og svar. Start med en kort introduktion, derefter præsentér 4-6 relevante spørgsmål som: 'Spørgsmål: [spørgsmål]' efterfulgt af 'Svar: [detaljeret svar]'. Anticiper læserens spørgsmål og giv fyldestgørende, værdifulde svar.",
      "sammenligning": "Skab detaljerede sammenligninger gennem hele nyhedsbrevet. Sammenlign enten før/efter situationer, fordele vs. ulemper, eller forskellige løsninger/produkter. Brug klare strukturer som 'Før/Nu', 'Option A vs Option B', eller 'Traditionel tilgang vs Ny tilgang'. Gør sammenligningerne konkrete og objektive.",
      "casestudy": "Strukturér nyhedsbrevet som en grundig case study med: 1) Baggrund - præsentér situationen og konteksten, 2) Udfordring - beskriv problemet detaljeret, 3) Løsning - forklar tilgangen og implementering, 4) Resultater - vis konkrete målbare resultater, 5) Læringer - hvad kan andre lære af dette. Inkluder relevante detaljer og data.",
      "howto": "Opret step-by-step instruktioner og tutorials gennem hele nyhedsbrevet. Brug nummererede trin som '1. Første skridt', '2. Andet skridt', osv. Gør hvert trin konkret, actionable og let at følge. Inkluder tips og potentielle faldgruber for hvert trin. Start med en oversigt og afslut med næste skridt.",
      "roundup": "Giv en omfattende oversigt over flere relaterede emner, trends eller resources. Organiser indholdet i kategorier eller temaer. Præsentér 3-5 forskellige emner/trends, hver med sin egen sektion. Forklar relevansen og give konkrete eksempler eller resources for hvert punkt. Gør det scanbart og let at navigere."
    };

    const typeInstruction = typeInstructions[newsletterType] || typeInstructions["standard"];
    const structureInstruction = structureInstructions[contentStructure] || structureInstructions["klassisk"];

    // Dynamic temperature based on tone and type
    let temperature = 0.7;
    if (tone === "Kreativ" || tone === "Entusiastisk" || tone === "Humoristisk" || tone === "Inspirerende") {
      temperature = 0.8;
    } else if (tone === "Casual" || newsletterType === "storytelling" || newsletterType === "brandhygge") {
      temperature = 0.75;
    } else if (tone === "Formel" || tone === "Professionel" || tone === "Ekspert") {
      temperature = 0.6;
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `Du er en ekspert copywriter og marketing specialist der skaber ekstraordinære nyhedsbreve for danske virksomheder. Du kombinerer kreativ storytelling med strategisk marketing for at skabe indhold der fanger opmærksomhed og driver handling.

ABSOLUTTE KRAV - INGEN UNDTAGELSER:
- Brug ALDRIG NOGENSINDE emojis (🚀💡❤️🎯✨🔥💪📈🌟 etc.) i det genererede indhold
- INGEN emojis overhovedet - kun 100% ren tekst
- Brug ALDRIG symboler som 🚀 💡 ❤️ 🎯 ✨ 🔥 💪 📈 🌟 💼 🎉 eller lignende
- Brug ALDRIG stjerner (*) til fremhævning eller formatering - ALDRIG ** for fed skrift
- Brug ALDRIG asterisker (*) af nogen art - hverken enkelt eller dobbelt
- Fokuser udelukkende på rent, professionelt tekstindhold uden asterisker eller emojis
- Skriv kun på dansk medmindre andet er angivet

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

SPECIALISERING OG VARIATION:
NYHEDSBREVSTYPE: ${typeInstruction}
INDHOLDSSTRUKTUR (FØLG DENNE NØJAGTIGT): ${structureInstruction}

VIGTIGT: Du SKAL følge den valgte indholdsstruktur præcist. Dette er ikke bare et forslag - det er et krav for hvordan nyhedsbrevet skal struktureres.

KREATIVITET OG ENGAGEMENT:
- Skab fængslende overskrifter der fanger læserens opmærksomhed øjeblikkeligt
- Brug varierede sætningslængder og rytme for at holde læseren engageret
- Inkluder konkrete eksempler, statistikker eller casestudier når relevant
- Skriv i den angivne tone (${tone}), men tilføj personlighed og autenticitet
- Inkluder subtile call-to-actions der føles naturlige, ikke påtrængende
- Gør indholdet scanbart med gode overskrifter og struktur
- FREMHÆVNING: Brug ord som "vigtigt", "bemærk", "særligt", "nøgle-punkt" i stedet for symboler
- ALDRIG brug *, **, eller andre symboler til fremhævning

PROFESSIONEL COPYWRITING:
- Start med en hook der øjeblikkeligt fanger opmærksomhed
- Brug AIDA-princippet (Attention, Interest, Desire, Action) subtilt
- Fokuser på læserens fordele og værdi, ikke kun virksomhedens produkter
- Skab en naturlig flow fra start til slut
- Afslut med en klar, men ikke aggressiv call-to-action
- ALTID afslut med personlig hilsen: "Med venlig hilsen, [Virksomhedsnavn] Teamet"${profileInfo ? ` hvor [Virksomhedsnavn] skal være "${profile.company}"` : ''}

${profileInfo ? `VIRKSOMHEDSKONTEKST (brug dette til at personalisere indholdet): ${profileInfo}` : ""}

${autoGenerate ? `AUTO-GENERERING: Dette er en auto-generering baseret udelukkende på virksomhedsprofilen. Skab relevant nyhedsbrevsindhold der naturligt passer til virksomhedens profil, specialer, målgruppe og værdier. Gør det engagerende og værdifuldt for deres specifikke målgruppe.` : ""}

OUTPUTKRAV:
- Levér et komplet, publiceringsklart nyhedsbrev
- Skriv naturlige overskrifter uden meta-ord som "OVERSKRIFT:", "TITEL:" eller lignende
- Sørg for at indholdet er værdifuldt og læseværdigt
- Gør det til noget læseren faktisk vil læse, ikke bare skanne
- ABSOLUT INGEN stjerner (*), dobbelt asterisker (**), emojis, eller formatering
- Afslut ALTID med en personlig hilsen og virksomhedsnavn${profileInfo ? ` (${profile.company})` : ' (brug virksomhedens navn hvis tilgængeligt)'}
- Brug format: "Med venlig hilsen, [Virksomhedsnavn] Teamet"${profileInfo ? ` hvor [Virksomhedsnavn] erstattes med "${profile.company}"` : ''}
- Skriv som et færdigt nyhedsbrev, ikke som en manual eller instruktion

EKSEMPEL PÅ KORREKT FORMATERING:
FORKERT: **Vigtigt**: Dette er *meget* vigtigt!
KORREKT: VIGTIGT: Dette er meget vigtigt!

FORKERT: OVERSKRIFT: Sommernyheder 2024
KORREKT: SOMMERNYHEDER 2024

FORKERT: *Punkt 1*
KORREKT: - Punkt 1 ELLER 1. Punkt 1

VIGTIGT: Skriv naturlige overskrifter som "KÆRE INSIGHT CRAFT-NETVÆRK" eller "SENESTE NYHEDER" - IKKE meta-beskrivelser som "OVERSKRIFT:" eller "TITEL:"

STRUKTUR-EKSEMPLER:
LISTICLE: "5 tips til bedre SEO" -> "1. Optimer dine overskrifter", "2. Brug relevante keywords", osv.
Q&A: "Spørgsmål: Hvordan forbedrer jeg min SEO?" -> "Svar: Start med keyword research..."
CASE STUDY: "Baggrund: Virksomhed X havde problem Y" -> "Løsning: Vi implementerede Z" -> "Resultater: 50% forbedring"
HOW-TO: "1. Download værktøjet" -> "2. Installer det" -> "3. Konfigurer indstillingerne"

HUSK: Kun almindelig tekst med normal interpunktion - ALDRIG asterisker (*/**) eller emojis! Skriv som et færdigt, naturligt nyhedsbrev!`,
        },
        {
          role: "user",
          content: `NYHEDSBREV SPECIFIKATIONER:
- Emne/Indhold: ${prompt}
- Tone: ${tone}
- Type: ${newsletterType}
- Struktur: ${contentStructure}
${profileInfo ? `- Virksomhed: ${profile.company} (brug dette navn i afslutningen)` : ''}

${autoGenerate ? `VIGTIG: Dette er auto-generering baseret KUN på virksomhedsprofilen. Ignorer det brugerskrevne prompt og fokuser udelukkende på at skabe relevant nyhedsbrevsindhold baseret på virksomhedens specialer, mål, målgruppe og værdier. Skab naturligt indhold der passer til virksomheden uden at referere direkte til at det er auto-genereret.` : quickStart ? `QUICK START: Dette er en quick start anmodning med optimerede standardindstillinger. Skab et professionelt og engagerende nyhedsbrev der følger bedste praksis for nyhedsbreve. Fokuser på værdi og læsbarhed.` : smartSetup && profile ? `SMART SETUP: Dette er en intelligent opsætning baseret på virksomhedens branche og profil. Skab branchespecifikt indhold der er højt relevant for ${profile.industry || 'denne type virksomhed'} og deres målgruppe (${profile.targetAudience || 'deres kunder'}).` : 'Opret nu et professionelt, engagerende nyhedsbrev baseret på ovenstående specifikationer. Sørg for at det er varieret, interessant og værdifuldt for læseren.'}

KRITISK: Følg NØJAGTIGT den valgte indholdsstruktur (${contentStructure}). Dette er ikke valgfrit - nyhedsbrevet SKAL følge denne struktur præcist.

STRUKTURKRAV FOR ${contentStructure.toUpperCase()}:
${structureInstruction}

KRITISK PÅMINDELSE: BRUG ALDRIG *, ** eller andre asterisker. Brug bindestreger (-) til punkter eller numre (1. 2. 3.) til lister. Skriv naturlige overskrifter uden meta-ord som "OVERSKRIFT:" eller "TITEL:". Kun almindelig tekst med normal interpunktion!

VIGTIG AFSLUTNING: ${profileInfo ? `Afslut nyhedsbrevet med: "Med venlig hilsen, ${profile.company} Teamet"` : 'Afslut nyhedsbrevet med: "Med venlig hilsen, [Virksomhedsnavn] Teamet"'}`,
        },
      ],
      temperature: temperature,
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
    
    // Returnér både result og settings (for Smart Setup)
    const apiResponse = { result: message };
    if (returnSettings) {
      apiResponse.settings = returnSettings;
    }
    
    return Response.json(apiResponse);
  } catch (error) {
    console.error("Newsletter API error:", error);
    return Response.json({ error: "Noget gik galt." }, { status: 500 });
  }
}
