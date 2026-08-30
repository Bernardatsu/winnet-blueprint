import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Mail,
  Phone,
  MessageSquare,
  CalendarCheck2,
  FileEdit,
  ShieldCheck,
  Clock,
} from "lucide-react";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProjectEnquiryForm } from "@/components/enquiry/ProjectEnquiryForm";
import { EnhancedBookingModal } from "@/components/booking/EnhancedBookingModal";
import { company, images, mailHref, telHref } from "@/config/site";
import { whatsappUrl } from "@/lib/enquiry";
import { buildSeoMeta, contactSeoConfig } from "@/lib/seo";

export const Route = createFileRoute("/contact")({
  head: () => buildSeoMeta(contactSeoConfig),
  component: ContactPage,
});

function ContactPage() {
  const [activeMode, setActiveMode] = useState<"booking" | "enquiry">("booking");

  return (
    <div className="flex flex-col pt-20">
      {/* Header with image behind text */}
      <PageHeader
        eyebrow="Get In Touch"
        title="Contact Winnet Construction"
        subtitle="Have an upcoming project or drawings ready for estimation? Reach out directly by phone, WhatsApp, or schedule a certified site inspection below."
        image={images.cta}
        imageAlt="Modern architectural construction planning and consultation"
      />

      {/* Main Content */}
      <section className="section-pad relative overflow-hidden bg-background">
        <div className="blueprint-grid absolute inset-0 opacity-40" aria-hidden="true" />
        <div className="shell relative z-10">
          <div className="grid gap-8 lg:gap-12 lg:grid-cols-[1fr_1.85fr]">
            {/* Left Column: Direct Contact & Coverage */}
            <div className="space-y-6">
              <div className="rounded-3xl glass-card p-6 shadow-xl sm:p-8">
                <h2 className="eyebrow text-gold-deep font-bold">Direct Channels</h2>
                <div className="mt-6 space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-gold text-ink shadow-sm">
                      <Phone className="size-5" />
                    </div>
                    <div>
                      <p className="font-display text-xs uppercase tracking-[0.14em] text-muted-foreground font-semibold">
                        Phone (Ghana Direct)
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
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-gold text-ink shadow-sm">
                      <MessageSquare className="size-5" />
                    </div>
                    <div>
                      <p className="font-display text-xs uppercase tracking-[0.14em] text-muted-foreground font-semibold">
                        WhatsApp (Instant Dispatch)
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
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-gold text-ink shadow-sm">
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

              <div className="rounded-3xl glass-panel p-6 shadow-md space-y-3">
                <h3 className="font-display text-xs uppercase tracking-[0.16em] text-foreground font-bold flex items-center gap-2">
                  <ShieldCheck className="size-4 text-gold-deep" />
                  Service Coverage &amp; Office
                </h3>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {company.addressFallback}
                </p>
                <div className="pt-2 border-t border-black/10 text-[0.6875rem] text-muted-foreground flex items-center gap-1.5">
                  <Clock className="size-3.5 text-gold-deep" />
                  <span>Mon – Sat: 08:00 to 18:00 GMT | Emergency Response Active</span>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Booking / Enquiry Workspace */}
            <div className="rounded-3xl glass-card p-5 sm:p-8 lg:p-10 shadow-2xl space-y-6">
              {/* Tab Switcher */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-black/10 pb-4">
                <div>
                  <p className="eyebrow text-gold-deep font-bold">Client Booking Desk</p>
                  <h2 className="font-display text-xl sm:text-2xl font-bold uppercase tracking-[0.03em] text-foreground mt-0.5">
                    {activeMode === "booking"
                      ? "Schedule Site Inspection & Review"
                      : "Quick Project Enquiry"}
                  </h2>
                </div>

                <div className="flex items-center rounded-2xl bg-black/5 p-1 border border-black/10 self-start sm:self-auto">
                  <button
                    type="button"
                    onClick={() => setActiveMode("booking")}
                    className={`font-display flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      activeMode === "booking"
                        ? "bg-gold text-ink shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <CalendarCheck2 className="size-3.5" />
                    Book Inspection
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveMode("enquiry")}
                    className={`font-display flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                      activeMode === "enquiry"
                        ? "bg-gold text-ink shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <FileEdit className="size-3.5" />
                    Quick Enquiry
                  </button>
                </div>
              </div>

              {/* Dynamic Content */}
              {activeMode === "booking" ? <EnhancedBookingModal /> : <ProjectEnquiryForm />}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
