import { GoogleGenAI } from "@google/genai";

export type ChatMessage = {
  role: "user" | "model" | "assistant";
  content: string;
};

const SYSTEM_INSTRUCTION = `You are the official Project Consultant for Winnet Construction Ltd in Ghana.
Company details:
- Name: Winnet Construction Ltd
- Founder & Managing Director: Mr. Winfred Kwesi Agbenyo
- Motto: "Building Your Vision. Creating Your Future."
- Contact Phone: 0549074200 (International / WhatsApp: +233549074200)
- Official Email: Fredmawuli123@gmail.com
- Coverage: Greater Accra, Volta Region, and nationwide across Ghana.
- Core Services:
  1. Residential Construction (Bespoke houses, multi-family homes, private villas)
  2. Commercial Construction (Offices, warehouses, retail centers, business spaces)
  3. Building Renovations & Upgrades (Full remodels, structural retrofits, spatial overhauls)
  4. Structural & Civil Engineering (Reinforced concrete, foundations, earthworks, drainage systems)
  5. Architectural Finishing (POP ceilings, masonry, tiling, premium paint finishing)
  6. Project Management & Supervision (Turnkey delivery, strict cost control, site safety, on-time execution)
- Work Process:
  1. Initial Consultation & Site Scope Review
  2. Architectural / Engineering Feasibility & Design Planning
  3. Transparent Cost Estimation & Bill of Quantities (BOQ)
  4. Phased Construction Execution with Milestone Verification
  5. Rigorous Quality Inspection & Final Client Handover

Your mission:
- Answer questions accurately, concisely, and professionally about construction in Ghana, building materials, budgeting considerations, permits, and Winnet Construction's services.
- Emphasize safety, durability, high-standard workmanship, and honest communication.
- Always be polite, warm, and encourage prospective clients to reach out for a consultation or quote.
- Suggest contacting Mr. Winfred Kwesi Agbenyo at 0549074200 or via WhatsApp (+233549074200), or clicking "Start a Project" on the website.
- Keep answers formatted with clean paragraphs or bullet points where helpful.`;

let aiClient: GoogleGenAI | null = null;

function getGenAI(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

export async function handleChatRequest(messages: ChatMessage[]): Promise<string> {
  const genAI = getGenAI();

  if (!messages || messages.length === 0) {
    return "Hello! I am your Winnet Construction consultant. How can I assist you with your building or renovation plans today?";
  }

  // Format messages into Gemini contents format
  const contents = messages
    .filter((m) => m && m.content && m.content.trim().length > 0)
    .map((m) => ({
      role: m.role === "assistant" ? ("model" as const) : ("user" as const),
      parts: [{ text: m.content.trim() }],
    }));

  if (contents.length === 0) {
    return "Welcome to Winnet Construction Ltd! Please feel free to ask about our residential, commercial, or renovation services.";
  }

  if (!genAI) {
    // Graceful helpful fallback if GEMINI_API_KEY is not yet provisioned in environment
    const lastUserMsg = messages[messages.length - 1]?.content.toLowerCase() || "";
    if (
      lastUserMsg.includes("cost") ||
      lastUserMsg.includes("price") ||
      lastUserMsg.includes("quote") ||
      lastUserMsg.includes("estimate")
    ) {
      return "Every construction project is unique depending on location, topography, materials, and architectural design. At Winnet Construction Ltd, we prepare customized, transparent Bills of Quantities (BOQ) to guarantee fair pricing. Please call or WhatsApp Mr. Winfred Kwesi Agbenyo at 0549074200 (+233549074200) or click 'Start a Project' to receive a tailored estimate!";
    }
    if (
      lastUserMsg.includes("contact") ||
      lastUserMsg.includes("phone") ||
      lastUserMsg.includes("number") ||
      lastUserMsg.includes("call") ||
      lastUserMsg.includes("whatsapp")
    ) {
      return "You can reach Winnet Construction Ltd directly:\n• Phone: 0549074200\n• WhatsApp: +233549074200\n• Email: Fredmawuli123@gmail.com\n• Director: Mr. Winfred Kwesi Agbenyo\n\nWe look forward to discussing your project!";
    }
    if (
      lastUserMsg.includes("service") ||
      lastUserMsg.includes("build") ||
      lastUserMsg.includes("renovate") ||
      lastUserMsg.includes("residential") ||
      lastUserMsg.includes("commercial")
    ) {
      return "Winnet Construction Ltd provides comprehensive construction solutions across Ghana, including:\n1. Residential Construction (Custom homes & villas)\n2. Commercial Buildings (Offices & retail)\n3. Complete Renovations & Structural Upgrades\n4. Civil & Structural Engineering\n5. Interior & Exterior Architectural Finishes\n\nLet us know what you would like to build!";
    }
    return "Welcome to Winnet Construction Ltd! We are dedicated to 'Building Your Vision. Creating Your Future.' You can ask me about our residential & commercial construction, building timelines, or reach out to Mr. Winfred Kwesi Agbenyo directly at 0549074200 / WhatsApp +233549074200.";
  }

  try {
    const response = await genAI.models.generateContent({
      model: "gemini-3.8-flash",
      contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });

    const reply = response.text;
    if (reply && reply.trim().length > 0) {
      return reply.trim();
    }

    return "Thank you for your enquiry. For immediate technical consultations and project estimates, please call or WhatsApp Mr. Winfred Kwesi Agbenyo at 0549074200.";
  } catch (error) {
    console.error("Gemini API chat error:", error);
    return "Thank you for reaching out to Winnet Construction Ltd. For immediate assistance with your building project or to get a detailed quote, please reach Mr. Winfred Kwesi Agbenyo directly at 0549074200 or via WhatsApp at +233549074200.";
  }
}
