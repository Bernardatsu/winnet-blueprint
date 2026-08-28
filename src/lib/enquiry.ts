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
    `Hello ${company.name},`,
    "",
    "I would like to discuss a construction project.",
    "",
    line("Name", data.fullName),
    line("Phone", data.phone),
    line("Email", data.email),
    line("Project Type", data.projectType),
    line("Location", data.location),
    line("Preferred Contact Method", data.contactMethod),
    line("Preferred Consultation Date", data.consultationDate),
    line("Estimated Budget", data.budget),
    "",
    "Project Details:",
    data.description.trim(),
    "",
    "Please let me know how we can proceed.",
    "",
    "Thank you.",
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
