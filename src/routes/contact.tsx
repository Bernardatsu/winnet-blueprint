import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone, MessageSquare } from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProjectEnquiryForm } from "@/components/enquiry/ProjectEnquiryForm";
import { company, images, mailHref, telHref } from "@/config/site";
import { whatsappUrl } from "@/lib/enquiry";
import { buildSeoMeta, contactSeoConfig } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () => buildSeoMeta(contactSeoConfig),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="flex flex-col pt-20">
      {/* Header with image behind text */}
      <PageHeader
        eyebrow="Get In Touch"
        title="Contact Winnet Construction"
        subtitle="Have an upcoming project or drawings ready for estimation? Reach out directly by phone, WhatsApp, or complete the project consultation form below."
        image={images.cta}
        imageAlt="Modern architectural construction planning and consultation"
      />

      {/* Main Content */}
      <section className="section-pad relative overflow-hidden bg-background">
        <div className="blueprint-grid absolute inset-0 opacity-40" aria-hidden="true" />
        <div className="shell relative z-10">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.8fr]">
            <div className="space-y-6">
              <div className="rounded-3xl glass-card p-6 shadow-xl sm:p-8">
                <h2 className="eyebrow text-gold-deep">Direct Contact</h2>
                <div className="mt-6 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-gold text-ink shadow-sm">
                      <Phone className="size-5" />
                    </div>
                    <div>
                      <p className="font-display text-xs uppercase tracking-[0.14em] text-muted-foreground font-semibold">
                        Phone (Ghana)
                      </p>
                      <a
                        href={telHref}
                        className="mt-1 block text-base font-bold text-foreground hover:text-gold-deep transition-colors"
                      >
                        {company.phoneLocal}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-gold text-ink shadow-sm">
                      <MessageSquare className="size-5" />
                    </div>
                    <div>
                      <p className="font-display text-xs uppercase tracking-[0.14em] text-muted-foreground font-semibold">
                        WhatsApp
                      </p>
                      <a
                        href={whatsappUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 block text-base font-bold text-foreground hover:text-gold-deep transition-colors"
                      >
                        +{company.phoneInternational}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-gold text-ink shadow-sm">
                      <Mail className="size-5" />
                    </div>
                    <div>
                      <p className="font-display text-xs uppercase tracking-[0.14em] text-muted-foreground font-semibold">
                        Email
                      </p>
                      <a
                        href={mailHref}
                        className="mt-1 block break-all text-sm font-semibold text-foreground hover:text-gold-deep transition-colors"
                      >
                        {company.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl glass-panel p-6 shadow-md">
                <h3 className="font-display text-xs uppercase tracking-[0.16em] text-foreground font-bold">
                  Location &amp; Service Coverage
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {company.addressFallback}
                </p>
              </div>
            </div>

            {/* Form Container */}
            <div className="rounded-3xl glass-card p-6 sm:p-10 shadow-2xl">
              <p className="eyebrow text-gold-deep">Online Consultation Form</p>
              <h2 className="font-display mt-2 text-2xl uppercase tracking-[0.04em] text-foreground sm:text-3xl font-bold">
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
