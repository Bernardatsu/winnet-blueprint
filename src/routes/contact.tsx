import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone, MessageSquare } from "lucide-react";
import { ProjectEnquiryForm } from "@/components/enquiry/ProjectEnquiryForm";
import { company, mailHref, telHref } from "@/config/site";
import { whatsappUrl } from "@/lib/enquiry";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: `Contact & Enquiries | ${company.name}` },
      {
        name: "description",
        content: `Contact ${company.name} for construction estimates, on-site consultations, and project planning.`,
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="flex flex-col pt-20">
      {/* Header */}
      <section className="relative overflow-hidden bg-ink py-20 text-on-ink lg:py-28">
        <div className="blueprint-grid-dark absolute inset-0 opacity-30" aria-hidden="true" />
        <div className="shell relative">
          <p className="eyebrow text-gold">Get In Touch</p>
          <h1 className="h-display mt-4 text-4xl sm:text-6xl lg:text-7xl">Contact Winnet</h1>
          <p className="mt-6 max-w-2xl text-base text-on-ink-muted sm:text-lg">
            Have an upcoming project or drawings ready for estimation? Reach out directly by phone,
            WhatsApp, or complete the project enquiry form below.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-pad bg-background">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.8fr]">
            <div className="space-y-6">
              <div className="border border-border bg-card p-6 sm:p-8">
                <h2 className="eyebrow text-gold-deep">Direct Contact</h2>
                <div className="mt-6 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex size-10 items-center justify-center bg-gold text-ink">
                      <Phone className="size-5" />
                    </div>
                    <div>
                      <p className="font-display text-xs uppercase tracking-[0.14em] text-muted-foreground">
                        Phone (Ghana)
                      </p>
                      <a
                        href={telHref}
                        className="mt-1 block text-base font-bold text-foreground hover:text-gold-deep"
                      >
                        {company.phoneLocal}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex size-10 items-center justify-center bg-gold text-ink">
                      <MessageSquare className="size-5" />
                    </div>
                    <div>
                      <p className="font-display text-xs uppercase tracking-[0.14em] text-muted-foreground">
                        WhatsApp
                      </p>
                      <a
                        href={whatsappUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 block text-base font-bold text-foreground hover:text-gold-deep"
                      >
                        +{company.phoneInternational}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex size-10 items-center justify-center bg-gold text-ink">
                      <Mail className="size-5" />
                    </div>
                    <div>
                      <p className="font-display text-xs uppercase tracking-[0.14em] text-muted-foreground">
                        Email
                      </p>
                      <a
                        href={mailHref}
                        className="mt-1 block break-all text-sm font-semibold text-foreground hover:text-gold-deep"
                      >
                        {company.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border border-border bg-secondary p-6">
                <h3 className="font-display text-xs uppercase tracking-[0.16em] text-foreground">
                  Location &amp; Service Coverage
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {company.addressFallback}
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="border border-border bg-card p-6 sm:p-10">
              <p className="eyebrow text-gold-deep">Online Consultation Form</p>
              <h2 className="font-display mt-2 text-2xl uppercase tracking-[0.04em] text-foreground sm:text-3xl">
                Submit Project Details
              </h2>
              <p className="mb-8 mt-2 text-sm text-muted-foreground">
                Your details will be formatted and sent directly to {company.name}.
              </p>
              <ProjectEnquiryForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
