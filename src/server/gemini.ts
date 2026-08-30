import { GoogleGenAI } from "@google/genai";
import { company, contactMethods, projectTypes } from "../config/site";

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

const SYSTEM_INSTRUCTION = `You are "Kwesi" — the Lead AI Construction Advisor and Client Concierge at ${company.name}, Ghana's premier building and civil engineering contractor.

COMPANY BACKGROUND & EXPERTISE:
- Company: ${company.name} (${company.shortName})
- Motto: "${company.motto}"
- Location: Accra, Ghana (Managing active building projects across Greater Accra, Ashanti, Western, Central, and Eastern Regions).
- Core Specializations:
  1. Residential Construction: Custom luxury villas, multi-storey private residences, modern townhouses, and gated family compounds.
  2. Commercial & Civil Engineering: Modern corporate offices, retail plazas, light industrial warehouses, heavy structural reinforced concrete casting, and structural steel framing.
  3. Turnkey Finishing & Remodeling: Italian and Spanish porcelain tiling, architectural POP suspended ceilings, acoustic glazing, waterproof screeding, and zero-leak roof trussing.
  4. Diaspora Remote Project Management: Specialized oversight for Ghanaians living abroad (UK, USA, Canada, Germany, Italy, Australia, etc.) featuring weekly high-definition drone and video milestone reports, transparent Bills of Quantities (BOQ) with stage-by-stage payments, independent structural sign-offs, and zero material diversion.

ESTIMATION & PRICING GUIDANCE (GHANA BENCHMARKS):
- Typical residential construction in Ghana currently benchmarks roughly between:
  • Standard Finish: ~GH₵ 3,500 – GH₵ 4,800 per m²
  • Executive Modern Finish: ~GH₵ 5,000 – GH₵ 6,800 per m²
  • Bespoke Luxury Finish: ~GH₵ 7,000 – GH₵ 9,500+ per m²
- Always clarify that Winnet provides customized, fully transparent Bills of Quantities (BOQ) with zero hidden fees based on actual site topography, soil load-bearing capacity, and architectural blueprints.

BOOKING & CONSULTATION ASSISTANCE:
- Winnet provides three structured consultation formats:
  1. "On-Site Physical Inspection & Soil/Structure Assessment" (Accra, Kumasi, Takoradi & nationwide)
  2. "Virtual Diaspora Video Consultation" (Zoom / Google Meet / WhatsApp Video tailored to international time zones)
  3. "In-Office Architectural & BOQ Review" (at Winnet Accra Headquarters)
- Enthusiastically guide clients to use the interactive "Book Inspection" or "Start Project" booking tool on this website, or connect directly on WhatsApp with our lead engineers.

YOUR TONE & PERSONALITY:
- Warm, articulate, authoritative yet welcoming, polite, and deeply knowledgeable in civil and structural engineering standards in Ghana.
- Always introduce yourself as "Kwesi".
- Speak with clarity, use neat bullet points and bold highlights for numbers/milestones.
- Keep responses practical, concise, and focused on helping the client take confident, verified next steps.`;

export type ChatMessage = {
  role: "user" | "model" | "assistant";
  content: string;
};

export async function handleChatRequest(messages: ChatMessage[]): Promise<string> {
  const ai = getGenAI();

  // If no API key configured or fallback is needed, provide an intelligent rule-based response
  if (!ai) {
    const lastUserMsg = messages[messages.length - 1]?.content.toLowerCase() || "";
    return generateFallbackResponse(lastUserMsg);
  }

  try {
    const contents = messages.map((m) => ({
      role: m.role === "assistant" ? ("model" as const) : ("user" as const),
      parts: [{ text: m.content }],
    }));

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    return (
      response.text ||
      "Akwaaba! I am Kwesi from Winnet Construction Ltd. Our senior engineering team is ready to assist you. Would you like to schedule a site inspection or speak directly with us on WhatsApp?"
    );
  } catch (error) {
    console.error("Gemini API error in chat:", error);
    const lastUserMsg = messages[messages.length - 1]?.content.toLowerCase() || "";
    return generateFallbackResponse(lastUserMsg);
  }
}

function generateFallbackResponse(query: string): string {
  if (
    query.includes("cost") ||
    query.includes("price") ||
    query.includes("estimate") ||
    query.includes("budget") ||
    query.includes("how much")
  ) {
    return (
      "Hello! I am **Kwesi** from Winnet Construction Ltd.\n\n" +
      "In Ghana, our construction costs typically benchmark within these ranges:\n" +
      "• **Standard Quality**: GH₵ 3,500 – GH₵ 4,800 / m²\n" +
      "• **Executive Quality**: GH₵ 5,000 – GH₵ 6,800 / m²\n" +
      "• **Bespoke Luxury**: GH₵ 7,000 – GH₵ 9,500+ / m²\n\n" +
      "Exact pricing depends on your soil test, foundation requirements, and architectural finishes. We provide complete, transparent Bills of Quantities (BOQ) with zero hidden fees.\n\n" +
      "Would you like to use our **interactive Booking & Estimator tool** on this site or schedule an on-site inspection?"
    );
  }

  if (
    query.includes("diaspora") ||
    query.includes("abroad") ||
    query.includes("uk") ||
    query.includes("usa") ||
    query.includes("overseas") ||
    query.includes("remote")
  ) {
    return (
      "Akwaaba! I am **Kwesi**. At Winnet Construction Ltd, we manage projects for Ghanaians living in the diaspora (UK, USA, Canada, Germany, Italy, & worldwide) with complete peace of mind.\n\n" +
      "Here is our Diaspora Protection Framework:\n" +
      "• **Milestone-Based Billing**: You only pay for verified, completed building stages.\n" +
      "• **High-Definition Drone & Video Logs**: Weekly recorded inspections of your site.\n" +
      "• **Permit & Title Vetting**: Land verification with the Lands Commission & Local Assemblies.\n" +
      "• **Zero Material Diversion**: Digital inventory tracking and strict on-site storage controls.\n\n" +
      "You can book a virtual video consultation with our lead project manager directly on this site!"
    );
  }

  if (
    query.includes("book") ||
    query.includes("schedule") ||
    query.includes("inspect") ||
    query.includes("consult") ||
    query.includes("meet") ||
    query.includes("appointment")
  ) {
    return (
      "I would be glad to arrange a consultation for you! You can choose between:\n\n" +
      "1. **On-Site Physical Inspection** (Field soil & foundation assessment across Ghana)\n" +
      "2. **Virtual Diaspora Video Consultation** (Zoom / Google Meet for overseas clients)\n" +
      "3. **In-Office Architectural Review** (At our Accra Headquarters for blueprint analysis)\n\n" +
      "Click the **'Book Inspection / Consultation'** button on screen to select your preferred date and time, or let me know if you'd like our direct WhatsApp link!"
    );
  }

  if (query.includes("services") || query.includes("what do you do") || query.includes("build")) {
    return (
      "I am **Kwesi**, your Winnet guide. We deliver complete building and civil engineering services across Ghana:\n\n" +
      "• **Residential Construction**: Custom luxury villas, duplexes, multi-storey family homes.\n" +
      "• **Commercial & Institutional**: Modern corporate offices, retail plazas, and warehouses.\n" +
      "• **Civil & Structural Engineering**: High-tensile steel reinforcement, column & slab casting, deep foundations.\n" +
      "• **Turnkey Finishing & POP Ceilings**: Spanish/Italian tiling, drywall, modern glazing, and zero-leak roofing.\n\n" +
      "Where is your project located in Ghana? Tell me your ideas and I will guide you on the best path forward."
    );
  }

  return (
    "Akwaaba! I am **Kwesi**, your AI Construction Advisor at Winnet Construction Ltd.\n\n" +
    "How can I assist you today? I can help you with:\n" +
    "• Estimating your construction budget & project timelines in Ghana\n" +
    "• Explaining our diaspora milestone payment & live video reporting system\n" +
    "• Scheduling an on-site structural inspection or virtual video consultation\n" +
    "• Answering engineering, permit, or architectural finishing questions\n\n" +
    "Feel free to ask a question below or click to book a consultation!"
  );
}
