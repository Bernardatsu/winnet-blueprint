import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { MessageSquare, Mail, Calendar, Phone, CheckCircle2, Shield } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  budgetRanges,
  contactMethods,
  projectTypes,
  company,
  telHref,
  phoneDisplay,
} from "@/config/site";
import { buildEnquiryMessage, mailtoUrl, whatsappUrl, type EnquiryData } from "@/lib/enquiry";

const schema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name").max(100),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone or WhatsApp number")
    .max(24, "Phone number is too long")
    .regex(/^[0-9+\-\s()]+$/, "Use digits, spaces, + or - only"),
  email: z.string().trim().email("Please enter a valid email address").max(255),
  projectType: z.string().trim().min(1, "Please select a project or service type"),
  location: z.string().trim().min(2, "Please enter the site / town location in Ghana").max(120),
  contactMethod: z.string().trim().min(1, "Select preferred contact method"),
  consultationDate: z.string().trim().max(40).optional(),
  budget: z.string().trim().max(60).optional(),
  description: z
    .string()
    .trim()
    .min(10, "Please provide a brief note about your project")
    .max(1500, "Please keep notes under 1500 characters"),
});

type Errors = Partial<Record<keyof EnquiryData, string>>;

const emptyForm: EnquiryData = {
  fullName: "",
  phone: "",
  email: "",
  projectType: "",
  location: "",
  contactMethod: "WhatsApp",
  consultationDate: "",
  budget: "",
  description: "",
};

const inputClass =
  "w-full min-w-0 rounded-xl border border-black/10 bg-white/70 backdrop-blur-md px-3.5 py-3 text-base sm:text-sm text-foreground placeholder:text-muted-foreground/60 shadow-[inset_0_1px_2px_rgba(255,255,255,0.7),0_2px_8px_-2px_rgba(0,0,0,0.04)] transition-all duration-200 hover:border-gold/50 hover:bg-white/85 focus-visible:border-gold focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-gold/35 focus-visible:outline-none";

interface ProjectEnquiryFormProps {
  presetProjectType?: string;
  onSent?: () => void;
  title?: string;
  subtitle?: string;
}

export function ProjectEnquiryForm({
  presetProjectType,
  onSent,
  title,
  subtitle,
}: ProjectEnquiryFormProps) {
  const [form, setForm] = useState<EnquiryData>({
    ...emptyForm,
    projectType:
      presetProjectType && projectTypes.includes(presetProjectType) ? presetProjectType : "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  function set<K extends keyof EnquiryData>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function validate(): EnquiryData | null {
    const result = schema.safeParse(form);
    if (!result.success) {
      const next: Errors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof EnquiryData;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      toast.error("Please fill in the required fields highlighted below.");
      return null;
    }
    setErrors({});
    return result.data as EnquiryData;
  }

  function send(channel: "whatsapp" | "email") {
    const data = validate();
    if (!data) return;

    setIsSubmitting(true);
    const message = buildEnquiryMessage(data);
    const url = channel === "whatsapp" ? whatsappUrl(message) : mailtoUrl(message);

    try {
      window.open(url, channel === "whatsapp" ? "_blank" : "_self", "noopener,noreferrer");
      toast.success(
        channel === "whatsapp"
          ? "Opening WhatsApp with your booking details ready to send."
          : "Opening your email app with your booking details.",
      );
      onSent?.();
    } catch {
      window.location.href = url;
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full min-w-0 max-w-full">
      {title && (
        <div className="mb-6 space-y-1">
          <h2 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-wider text-foreground">
            {title}
          </h2>
          {subtitle && <p className="text-xs sm:text-sm text-muted-foreground">{subtitle}</p>}
        </div>
      )}

      <form
        className="w-full min-w-0 space-y-4 sm:space-y-5"
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          send("whatsapp");
        }}
      >
        <div className="grid gap-3.5 sm:gap-4 sm:grid-cols-2">
          {/* Full Name */}
          <Field id="fullName" label="Full Name" required error={errors.fullName}>
            <Input
              id="fullName"
              className={inputClass}
              value={form.fullName}
              autoComplete="name"
              placeholder="e.g. Kwame Mensah"
              onChange={(e) => set("fullName", e.target.value)}
              aria-invalid={!!errors.fullName}
            />
          </Field>

          {/* Phone / WhatsApp */}
          <Field
            id="phone"
            label="Phone / WhatsApp Number"
            required
            error={errors.phone}
            hint="Ghana format: 0549074200 or +233..."
          >
            <Input
              id="phone"
              type="tel"
              inputMode="tel"
              className={inputClass}
              value={form.phone}
              autoComplete="tel"
              placeholder="e.g. 054 907 4200"
              onChange={(e) => set("phone", e.target.value)}
              aria-invalid={!!errors.phone}
            />
          </Field>

          {/* Email Address */}
          <Field id="email" label="Email Address" required error={errors.email}>
            <Input
              id="email"
              type="email"
              inputMode="email"
              className={inputClass}
              value={form.email}
              autoComplete="email"
              placeholder="name@example.com"
              onChange={(e) => set("email", e.target.value)}
              aria-invalid={!!errors.email}
            />
          </Field>

          {/* Project / Service Type */}
          <Field
            id="projectType"
            label="Project / Service Type"
            required
            error={errors.projectType}
          >
            <select
              id="projectType"
              className={`${inputClass} h-11 sm:h-10 cursor-pointer ${
                form.projectType ? "text-foreground font-medium" : "text-muted-foreground/80"
              }`}
              value={form.projectType}
              onChange={(e) => set("projectType", e.target.value)}
              aria-invalid={!!errors.projectType}
            >
              <option value="" className="bg-background text-foreground">
                Select service or project type
              </option>
              {projectTypes.map((type) => (
                <option key={type} value={type} className="bg-background text-foreground">
                  {type}
                </option>
              ))}
            </select>
          </Field>

          {/* Site / Project Location */}
          <Field id="location" label="Site Location in Ghana" required error={errors.location}>
            <Input
              id="location"
              className={inputClass}
              value={form.location}
              placeholder="e.g. Cantonments, Tema Comm. 25, Kumasi..."
              onChange={(e) => set("location", e.target.value)}
              aria-invalid={!!errors.location}
            />
          </Field>

          {/* Preferred Consultation / Inspection Date */}
          <Field
            id="consultationDate"
            label="Preferred Date (Optional)"
            error={errors.consultationDate}
            hint="For physical on-site visit or review"
          >
            <Input
              id="consultationDate"
              type="date"
              className={inputClass}
              value={form.consultationDate}
              onChange={(e) => set("consultationDate", e.target.value)}
            />
          </Field>
        </div>

        {/* Budget Range & Contact Method */}
        <div className="grid gap-3.5 sm:gap-4 sm:grid-cols-2">
          <Field id="budget" label="Estimated Budget Range (Optional)" error={errors.budget}>
            <select
              id="budget"
              className={`${inputClass} h-11 sm:h-10 cursor-pointer ${
                form.budget ? "text-foreground font-medium" : "text-muted-foreground/80"
              }`}
              value={form.budget}
              onChange={(e) => set("budget", e.target.value)}
            >
              <option value="" className="bg-background text-foreground">
                Select estimated range (optional)
              </option>
              {budgetRanges.map((range) => (
                <option key={range} value={range} className="bg-background text-foreground">
                  {range}
                </option>
              ))}
            </select>
          </Field>

          <Field
            id="contactMethod"
            label="Preferred Reply Channel"
            required
            error={errors.contactMethod}
          >
            <div
              className="flex flex-wrap gap-1.5 sm:gap-2 pt-1"
              role="radiogroup"
              aria-label="Preferred reply channel"
            >
              {contactMethods.map((method) => {
                const active = form.contactMethod === method;
                return (
                  <button
                    key={method}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => set("contactMethod", method)}
                    className={`font-display cursor-pointer rounded-xl border px-3 py-2 text-[0.6875rem] uppercase tracking-wider transition-all min-h-[38px] flex items-center justify-center ${
                      active
                        ? "border-gold bg-gold text-ink font-bold shadow-sm"
                        : "border-black/10 bg-white/50 text-foreground/80 hover:bg-white hover:text-foreground"
                    }`}
                  >
                    {method}
                  </button>
                );
              })}
            </div>
          </Field>
        </div>

        {/* Project Description & Notes */}
        <Field
          id="description"
          label="Project Notes / Requirements"
          required
          error={errors.description}
          hint="Brief summary of what you want to build, drawings status, or key questions."
        >
          <Textarea
            id="description"
            rows={3}
            className={`${inputClass} resize-y min-h-[90px]`}
            value={form.description}
            maxLength={1500}
            placeholder="e.g. We have architectural drawings for a 4-bedroom storey house in East Legon and need a site inspection and detailed BOQ quote."
            onChange={(e) => set("description", e.target.value)}
            aria-invalid={!!errors.description}
          />
        </Field>

        {/* Action Buttons */}
        <div className="pt-2 sm:pt-3 space-y-3">
          <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
            <Button
              type="submit"
              variant="gold"
              size="cta"
              disabled={isSubmitting}
              className="w-full sm:flex-1 min-h-[48px] shadow-lg shadow-gold/25 hover:shadow-gold/40 text-sm font-bold uppercase tracking-wider"
            >
              <MessageSquare className="size-4 shrink-0" aria-hidden="true" />
              <span>Book via WhatsApp</span>
            </Button>
            <Button
              type="button"
              variant="outlineInk"
              size="cta"
              disabled={isSubmitting}
              className="w-full sm:w-auto min-h-[48px] bg-white/40 hover:bg-white border-black/15 text-sm font-bold uppercase tracking-wider"
              onClick={() => send("email")}
            >
              <Mail className="size-4 shrink-0" aria-hidden="true" />
              <span>Book via Email</span>
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 text-[0.6875rem] text-muted-foreground border-t border-black/8">
            <div className="flex items-center gap-1.5 text-center sm:text-left">
              <Shield className="size-3 text-gold-deep shrink-0" />
              <span>Direct engineer response within 2 hours. No obligation.</span>
            </div>
            <a
              href={telHref}
              className="font-semibold text-foreground hover:text-gold-deep transition-colors inline-flex items-center gap-1 shrink-0"
            >
              <Phone className="size-3 text-gold-deep" />
              <span>Urgent Call: {phoneDisplay}</span>
            </a>
          </div>
        </div>
      </form>
    </div>
  );
}

function Field({
  id,
  label,
  required,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="w-full min-w-0 space-y-1 sm:space-y-1.5">
      <div className="flex items-baseline justify-between gap-2">
        <Label htmlFor={id} className="eyebrow text-ink text-[0.6875rem] sm:text-xs">
          {label}
          {required ? <span className="ml-0.5 text-gold-deep">*</span> : null}
        </Label>
        {hint && (
          <span className="hidden sm:inline text-[0.625rem] text-muted-foreground truncate">
            {hint}
          </span>
        )}
      </div>
      {children}
      {hint && (
        <span className="sm:hidden block text-[0.625rem] text-muted-foreground">{hint}</span>
      )}
      {error ? (
        <p role="alert" className="text-xs font-semibold text-destructive break-words">
          {error}
        </p>
      ) : null}
    </div>
  );
}
