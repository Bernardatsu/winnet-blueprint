import { company } from "@/config/site";

export type EnquiryData = {
  fullName: string;
  phone: string;
  email: string;
  projectType: string;
  location: string;
  contactMethod: string;
  consultationDate?: string;
  budget?: string;
  description: string;
};

const dash = "—";

function line(label: string, value?: string) {
  return `${label}: ${value && value.trim() ? value.trim() : dash}`;
}

/** Human-readable enquiry summary shared by the WhatsApp and email flows. */
export function buildEnquiryMessage(data: EnquiryData) {
  return [
    `🏛️ *${company.name.toUpperCase()} — PROJECT ENQUIRY*`,
    `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    `👤 *CLIENT DETAILS*`,
    `• *Full Name:* ${data.fullName || dash}`,
    `• *Phone/WhatsApp:* ${data.phone || dash}`,
    `• *Email:* ${data.email || dash}`,
    `• *Preferred Contact:* ${data.contactMethod || dash}`,
    "",
    `📍 *PROJECT SPECIFICATIONS*`,
    `• *Project Scope:* ${data.projectType || dash}`,
    `• *Site Location:* ${data.location || dash}`,
    `• *Target Budget:* ${data.budget || "To be determined via BOQ"}`,
    `• *Preferred Date:* ${data.consultationDate || "Earliest available slot"}`,
    "",
    `📝 *PROJECT DESCRIPTION & NOTES*`,
    data.description && data.description.trim()
      ? data.description.trim()
      : "No additional description provided.",
    "",
    `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`,
    `_Please reply to schedule initial site review or video session._`,
  ].join("\n");
}

export const WHATSAPP_INTRO = `Hello ${company.name}, I would like to discuss a construction project.`;

export function whatsappUrl(message: string = WHATSAPP_INTRO) {
  return `https://wa.me/${company.phoneInternational}?text=${encodeURIComponent(message)}`;
}

export const ENQUIRY_SUBJECT = `New Construction Project Enquiry – ${company.name}`;

export function mailtoUrl(message?: string, subject: string = ENQUIRY_SUBJECT) {
  const query = new URLSearchParams({ subject });
  if (message) query.set("body", message);
  return `mailto:${company.email}?${query.toString().replace(/\+/g, "%20")}`;
}
