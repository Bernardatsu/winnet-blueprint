import { useState } from "react";
import { ChevronDown, HelpCircle, Phone, MessageSquare } from "lucide-react";
import { SectionHeading } from "@/components/Reveal";
import { faqs, company, phoneDisplay, telHref } from "@/config/site";
import { whatsappUrl } from "@/lib/enquiry";
import { Button } from "@/components/ui/button";

interface FAQSectionProps {
  id?: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  className?: string;
  showContactCta?: boolean;
}

export function FAQSection({
  id = "faqs",
  eyebrow = "FAQ & Company Knowledge",
  title = "Frequently Asked Questions",
  subtitle = "Direct answers regarding ownership, project booking, pricing estimates, and building in Ghana.",
  className = "bg-secondary/40",
  showContactCta = true,
}: FAQSectionProps) {
  // Default first FAQ (Owner question) open for immediate SEO visibility and clarity
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  return (
    <section id={id} className={`section-pad relative overflow-hidden ${className}`}>
      <div className="shell max-w-4xl">
        <SectionHeading eyebrow={eyebrow} title={title} subtitle={subtitle} align="center" />

        <div className="mt-10 sm:mt-12 space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = expandedIndex === index;
            const isOwnerQuestion =
              faq.q.toLowerCase().includes("owner") || faq.q.toLowerCase().includes("who is");

            return (
              <div
                key={faq.q}
                className={`rounded-2xl transition-all duration-200 overflow-hidden border ${
                  isOpen
                    ? "glass-card border-gold/40 shadow-md ring-1 ring-gold/20"
                    : "glass-card border-black/8 hover:border-black/20"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setExpandedIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between p-4 sm:p-6 text-left transition-colors cursor-pointer gap-3"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >
                  <div className="flex items-start sm:items-center gap-2.5 sm:gap-3 min-w-0 flex-1">
                    <span
                      className={`flex size-6 sm:size-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold transition-colors ${
                        isOwnerQuestion
                          ? "bg-gold text-ink"
                          : isOpen
                            ? "bg-gold/20 text-gold-deep"
                            : "bg-black/5 text-muted-foreground"
                      }`}
                      aria-hidden="true"
                    >
                      {index + 1}
                    </span>
                    <span className="font-display text-xs sm:text-sm md:text-base uppercase tracking-[0.04em] text-foreground font-bold break-words leading-snug">
                      {faq.q}
                    </span>
                  </div>
                  <ChevronDown
                    className={`size-4 sm:size-5 shrink-0 text-muted-foreground transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-gold-deep" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>
                {isOpen ? (
                  <div
                    id={`faq-answer-${index}`}
                    className="border-t border-black/8 px-4 pb-5 pt-3.5 sm:px-6 sm:pb-6 text-xs sm:text-sm leading-relaxed text-muted-foreground break-words"
                  >
                    <p>{faq.a}</p>
                    {isOwnerQuestion && (
                      <div className="mt-3.5 pt-3 border-t border-black/10 flex flex-wrap items-center gap-2 text-xs font-semibold text-foreground">
                        <span className="text-gold-deep">Official Company Principal:</span>
                        <span>{company.owner}</span>
                        <span className="text-muted-foreground text-[0.6875rem]">
                          (Founder &amp; Managing Director)
                        </span>
                      </div>
                    )}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>

        {showContactCta && (
          <div className="mt-10 sm:mt-12 rounded-2xl glass-card p-5 sm:p-7 border border-black/10 text-center space-y-4">
            <div className="flex justify-center">
              <div className="flex size-10 items-center justify-center rounded-full bg-gold/20 text-gold-deep">
                <HelpCircle className="size-5" />
              </div>
            </div>
            <div>
              <h3 className="font-display text-base sm:text-lg uppercase tracking-wider font-bold text-foreground">
                Have a specific question about your site or project?
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto mt-1">
                Speak directly with Mr. Winfred Kwesi Agbenyo and our project estimation team.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
              <Button asChild variant="gold" size="cta" className="w-full sm:w-auto">
                <a
                  href={whatsappUrl(
                    "Hello Mr. Winfred Kwesi Agbenyo and Winnet Construction team, I have a question regarding a project.",
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageSquare className="size-4" />
                  Ask on WhatsApp
                </a>
              </Button>
              <Button asChild variant="outlineInk" size="cta" className="w-full sm:w-auto">
                <a href={telHref}>
                  <Phone className="size-4" />
                  Call {phoneDisplay}
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
