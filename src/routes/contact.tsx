import { createFileRoute } from "@tanstack/react-router";
import {
  Mail,
  Phone,
  MessageSquare,
  ShieldCheck,
  Clock,
  MapPin,
  CalendarCheck,
} from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProjectEnquiryForm } from "@/components/enquiry/ProjectEnquiryForm";
import { FAQSection } from "@/components/sections/FAQSection";
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
        eyebrow="Direct Project Booking & Desk"
        title="Book Consultation & Contact"
        subtitle="Schedule an on-site physical inspection, architectural drawing review, or discuss construction scope directly with Winnet Construction engineers."
        image={images.cta}
        imageAlt="Modern architectural construction planning and consultation"
      />

      {/* Main Booking & Contact Section */}
      <section className="section-pad relative overflow-hidden bg-background">
        <div className="blueprint-grid absolute inset-0 opacity-40" aria-hidden="true" />
        <div className="shell relative z-10 w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:gap-8 lg:gap-12 lg:grid-cols-[1fr_1.85fr]">
            {/* Left Column: Direct Contact & Coverage */}
            <div className="space-y-4 sm:space-y-6 w-full min-w-0">
              <div className="rounded-2xl sm:rounded-3xl glass-card p-4 sm:p-7 shadow-xl">
                <p className="eyebrow text-gold-deep font-bold text-xs uppercase tracking-wider">
                  Direct Channels
                </p>
                <h3 className="font-display text-lg sm:text-xl font-bold uppercase tracking-wide text-foreground mt-1 mb-5">
                  Reach Our Team
                </h3>

                <div className="space-y-4 sm:space-y-5">
                  {/* Phone */}
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="flex size-10 sm:size-11 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-gold text-ink shadow-sm">
                      <Phone className="size-4 sm:size-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-display text-[0.6875rem] sm:text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                        Call (Ghana Direct)
                      </p>
                      <a
                        href={telHref}
                        className="mt-0.5 block text-sm sm:text-base font-bold text-foreground hover:text-gold-deep transition-colors truncate"
                      >
                        {company.phoneLocal}
                      </a>
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="flex size-10 sm:size-11 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-gold text-ink shadow-sm">
                      <MessageSquare className="size-4 sm:size-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-display text-[0.6875rem] sm:text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                        WhatsApp (Instant)
                      </p>
                      <a
                        href={whatsappUrl()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-0.5 block text-sm sm:text-base font-bold text-foreground hover:text-gold-deep transition-colors truncate"
                      >
                        +{company.phoneInternational}
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="flex size-10 sm:size-11 shrink-0 items-center justify-center rounded-xl sm:rounded-2xl bg-gold text-ink shadow-sm">
                      <Mail className="size-4 sm:size-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-display text-[0.6875rem] sm:text-xs uppercase tracking-wider text-muted-foreground font-semibold">
                        Email Address
                      </p>
                      <a
                        href={mailHref}
                        className="mt-0.5 block break-all text-xs sm:text-sm font-semibold text-foreground hover:text-gold-deep transition-colors"
                      >
                        {company.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service & Operational Details */}
              <div className="rounded-2xl sm:rounded-3xl glass-panel p-4 sm:p-6 shadow-md space-y-3">
                <h3 className="font-display text-xs uppercase tracking-wider text-foreground font-bold flex items-center gap-2">
                  <ShieldCheck className="size-4 text-gold-deep shrink-0" />
                  <span>Licensed General Contractor</span>
                </h3>
                <p className="text-xs leading-relaxed text-muted-foreground break-words">
                  {company.addressFallback}
                </p>
                <div className="pt-2 border-t border-black/8 text-[0.6875rem] text-muted-foreground flex items-center gap-1.5">
                  <Clock className="size-3.5 text-gold-deep shrink-0" />
                  <span>Mon – Sat: 08:00 to 18:00 GMT</span>
                </div>
              </div>

              {/* Diaspora Quick Highlight */}
              <div className="rounded-2xl sm:rounded-3xl glass-panel p-4 sm:p-6 shadow-md border-l-4 border-gold space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-foreground uppercase tracking-wide">
                  <MapPin className="size-3.5 text-gold-deep" />
                  <span>Diaspora Clients Welcome</span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Building from UK, US, Canada, or Europe? We provide regular video calls, milestone
                  records, and verified photographic reporting for peace of mind.
                </p>
              </div>
            </div>

            {/* Right Column: Simple & Direct Booking Workspace */}
            <div className="rounded-2xl sm:rounded-3xl glass-card p-4 sm:p-7 lg:p-9 shadow-2xl space-y-5 w-full min-w-0 max-w-full">
              <div className="border-b border-black/10 pb-4">
                <div className="flex items-center gap-2 text-gold-deep font-bold text-xs uppercase tracking-wider mb-1">
                  <CalendarCheck className="size-4" />
                  <span>Direct Booking Desk</span>
                </div>
                <h2 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-wide text-foreground">
                  Book A Consultation or Inspection
                </h2>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                  Complete the short details below. Our team reviews drawings and responds promptly
                  via WhatsApp or email.
                </p>
              </div>

              {/* Direct Booking Form */}
              <ProjectEnquiryForm />
            </div>
          </div>
        </div>
      </section>

      {/* Embedded FAQ Section to Boost SEO and answer key questions */}
      <FAQSection
        eyebrow="Common Questions"
        title="Frequently Asked Questions"
        subtitle="Key information regarding ownership, project booking, pricing estimates, and building in Ghana."
        className="bg-secondary/40 border-t border-black/8"
      />
    </div>
  );
}
