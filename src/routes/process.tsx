import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/Reveal";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { useEnquiry } from "@/components/enquiry/EnquiryProvider";
import { company, images, processSteps, journeySteps } from "@/config/site";
import { buildSeoMeta, processSeoConfig } from "@/lib/seo";

export const Route = createFileRoute("/process")({
  head: () => buildSeoMeta(processSeoConfig),
  component: ProcessPage,
});

function ProcessPage() {
  const { openEnquiry } = useEnquiry();

  return (
    <div className="flex flex-col pt-20">
      {/* Header with image behind text */}
      <PageHeader
        eyebrow="Structured Delivery"
        title="Our 6-Step Construction Process"
        subtitle="Every build follows a defined roadmap to eliminate surprises, control costs, and verify structural quality before progression."
        image={images.blueprint}
        imageAlt="Architectural blueprint and construction planning schematic"
      />

      {/* Steps List */}
      <section className="section-pad bg-background">
        <div className="shell max-w-5xl">
          {/* Blueprint Journey Pill */}
          <div className="mb-12 overflow-x-auto pb-2">
            <div className="flex min-w-[600px] items-center justify-between rounded-3xl glass-panel p-4 shadow-sm">
              {journeySteps.map((step, idx) => (
                <div key={step} className="flex items-center gap-2">
                  <span className="flex size-7 items-center justify-center rounded-full bg-gold text-[0.6875rem] font-black text-ink shadow-xs">
                    0{idx + 1}
                  </span>
                  <span className="font-display text-xs font-bold uppercase tracking-[0.14em] text-foreground">
                    {step}
                  </span>
                  {idx < journeySteps.length - 1 ? (
                    <ArrowRight className="size-3.5 text-muted-foreground/40 mx-1" />
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {processSteps.map((step, idx) => (
              <Reveal key={step.number} delay={idx * 0.05}>
                <div className="flex flex-col gap-6 rounded-3xl glass-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-xl sm:flex-row sm:items-start sm:p-8">
                  <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-gold text-2xl font-black text-ink shadow-sm">
                    {step.number}
                  </div>
                  <div className="flex-1">
                    <h2 className="font-display text-xl uppercase tracking-[0.06em] text-foreground sm:text-2xl font-bold">
                      {step.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {step.body}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-14 rounded-3xl glass-panel p-8 text-center sm:p-12 shadow-sm">
            <h3 className="font-display text-xl uppercase tracking-[0.08em] text-foreground sm:text-2xl font-bold">
              Ready to begin step 01?
            </h3>
            <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
              Book a consultation with our team to review your architectural plans and site details.
            </p>
            <div className="mt-6 flex justify-center">
              <Button variant="gold" size="cta" onClick={() => openEnquiry()}>
                Schedule Consultation
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
