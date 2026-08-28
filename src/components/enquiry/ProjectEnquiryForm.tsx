import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { MessageCircle, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { budgetRanges, contactMethods, projectTypes } from "@/config/site";
import { buildEnquiryMessage, mailtoUrl, whatsappUrl, type EnquiryData } from "@/lib/enquiry";

const schema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name").max(100),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number")
    .max(24, "Phone number is too long")
    .regex(/^[0-9+\-\s()]+$/, "Use digits, spaces, + or - only"),
  email: z.string().trim().email("Please enter a valid email address").max(255),
  projectType: z.string().trim().min(1, "Select a project type"),
  location: z.string().trim().min(2, "Please enter the project location").max(120),
  contactMethod: z.string().trim().min(1, "Select a preferred contact method"),
  consultationDate: z.string().trim().max(40).optional(),
  budget: z.string().trim().max(60).optional(),
  description: z
    .string()
    .trim()
    .min(15, "Please describe your project in a little more detail")
    .max(1500, "Please keep the description under 1500 characters"),
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

const fieldBase =
  "rounded-lg border-ink/20 bg-background focus-visible:border-gold focus-visible:ring-gold/40";

export function ProjectEnquiryForm({
  presetProjectType,
  onSent,
}: {
  presetProjectType?: string;
  onSent?: () => void;
}) {
  const [form, setForm] = useState<EnquiryData>({
    ...emptyForm,
    projectType:
      presetProjectType && projectTypes.includes(presetProjectType) ? presetProjectType : "",
  });
  const [errors, setErrors] = useState<Errors>({});

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
      toast.error("Please check the highlighted fields.");
      return null;
    }
    setErrors({});
    return result.data as EnquiryData;
  }

  function send(channel: "whatsapp" | "email") {
    const data = validate();
    if (!data) return;
    const message = buildEnquiryMessage(data);
    const url = channel === "whatsapp" ? whatsappUrl(message) : mailtoUrl(message);
    window.open(url, channel === "whatsapp" ? "_blank" : "_self", "noopener,noreferrer");
    toast.success(
      channel === "whatsapp"
        ? "Opening WhatsApp with your project details."
        : "Opening your email app with your project details.",
    );
    onSent?.();
  }

  return (
    <form
      className="space-y-5"
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        send("whatsapp");
      }}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="fullName" label="Full Name" required error={errors.fullName}>
          <Input
            id="fullName"
            className={fieldBase}
            value={form.fullName}
            autoComplete="name"
            onChange={(e) => set("fullName", e.target.value)}
            aria-invalid={!!errors.fullName}
          />
        </Field>

        <Field id="phone" label="Phone Number" required error={errors.phone}>
          <Input
            id="phone"
            type="tel"
            inputMode="tel"
            className={fieldBase}
            value={form.phone}
            autoComplete="tel"
            placeholder="e.g. 0244000000"
            onChange={(e) => set("phone", e.target.value)}
            aria-invalid={!!errors.phone}
          />
        </Field>

        <Field id="email" label="Email" required error={errors.email}>
          <Input
            id="email"
            type="email"
            className={fieldBase}
            value={form.email}
            autoComplete="email"
            onChange={(e) => set("email", e.target.value)}
            aria-invalid={!!errors.email}
          />
        </Field>

        <Field id="projectType" label="Project Type" required error={errors.projectType}>
          <select
            id="projectType"
            className={`flex h-10 w-full rounded-lg border border-ink/20 bg-background px-3 py-1 text-base shadow-xs transition-colors focus-visible:border-gold focus-visible:outline-none md:text-sm ${
              form.projectType ? "" : "text-muted-foreground"
            }`}
            value={form.projectType}
            onChange={(e) => set("projectType", e.target.value)}
            aria-invalid={!!errors.projectType}
          >
            <option value="">Select project type</option>
            {projectTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </Field>

        <Field id="location" label="Project Location" required error={errors.location}>
          <Input
            id="location"
            className={fieldBase}
            value={form.location}
            placeholder="Town / city / area"
            onChange={(e) => set("location", e.target.value)}
            aria-invalid={!!errors.location}
          />
        </Field>

        <Field
          id="contactMethod"
          label="Preferred Contact Method"
          required
          error={errors.contactMethod}
        >
          <div
            className="flex flex-wrap gap-2"
            role="radiogroup"
            aria-label="Preferred contact method"
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
                  className={`font-display cursor-pointer rounded-lg border px-3 py-2 text-[0.6875rem] uppercase tracking-[0.14em] transition-colors ${
                    active
                      ? "border-gold bg-gold text-ink font-bold"
                      : "border-ink/20 text-muted-foreground hover:border-ink/50 hover:text-ink"
                  }`}
                >
                  {method}
                </button>
              );
            })}
          </div>
        </Field>

        <Field
          id="consultationDate"
          label="Preferred Consultation Date"
          error={errors.consultationDate}
        >
          <Input
            id="consultationDate"
            type="date"
            className={fieldBase}
            value={form.consultationDate}
            onChange={(e) => set("consultationDate", e.target.value)}
          />
        </Field>

        <Field id="budget" label="Estimated Budget Range" error={errors.budget}>
          <select
            id="budget"
            className={`flex h-10 w-full rounded-lg border border-ink/20 bg-background px-3 py-1 text-base shadow-xs transition-colors focus-visible:border-gold focus-visible:outline-none md:text-sm ${
              form.budget ? "" : "text-muted-foreground"
            }`}
            value={form.budget}
            onChange={(e) => set("budget", e.target.value)}
          >
            <option value="">Select a range (optional)</option>
            {budgetRanges.map((range) => (
              <option key={range} value={range}>
                {range}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field id="description" label="Project Description" required error={errors.description}>
        <Textarea
          id="description"
          rows={5}
          className={fieldBase}
          value={form.description}
          maxLength={1500}
          placeholder="What do you want to build? Include the site, size, stage and anything already drawn or approved."
          onChange={(e) => set("description", e.target.value)}
          aria-invalid={!!errors.description}
        />
      </Field>

      <div className="flex flex-col gap-3 border-t border-border pt-5 sm:flex-row">
        <Button type="submit" variant="gold" size="cta" className="w-full sm:w-auto sm:flex-1">
          <MessageCircle aria-hidden="true" />
          Send Project Enquiry
        </Button>
        <Button
          type="button"
          variant="outlineInk"
          size="cta"
          className="w-full sm:w-auto"
          onClick={() => send("email")}
        >
          <Mail aria-hidden="true" />
          Email Us Instead
        </Button>
      </div>
      <p className="text-xs leading-relaxed text-muted-foreground">
        Submitting opens WhatsApp or your email app with your details pre-filled. An enquiry is not
        a quotation or a construction contract.
      </p>
    </form>
  );
}

function Field({
  id,
  label,
  required,
  error,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="eyebrow text-ink">
        {label}
        {required ? <span className="ml-1 text-gold-deep">*</span> : null}
      </Label>
      {children}
      {error ? (
        <p role="alert" className="text-xs font-medium text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}
