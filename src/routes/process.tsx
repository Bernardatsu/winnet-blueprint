import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { useEnquiry } from "@/components/enquiry/EnquiryProvider";
import { company, processSteps, journeySteps } from "@/config/site";

export const Route = createFileRoute("/process")({
  head: () => ({
    meta: [
      { title: `Our Process & Methodology | ${company.name}` },
      {
        name: "description",
        content: `Learn how ${company.name} manages construction projects from initial consultation to final inspection and handover.`,
      },
    ],
  }),
  component: ProcessPage,
});

function ProcessPage() {
  const { openEnquiry } = useEnquiry();

  return (
    <div className="flex flex-col pt-20">
      {/* Header */}
      <section className="relative overflow-hidden bg-ink py-20 text-on-ink lg:py-28">
        <div className="blueprint-grid-dark absolute inset-0 opacity-30" aria-hidden="true" />
        <div className="shell relative">
          <p className="eyebrow text-gold">Structured Delivery</p>
          <h1 className="h-display mt-4 text-4xl sm:text-6xl lg:text-7xl">
            Our 6-Step Construction Process
          </h1>
          <p className="mt-6 max-w-2xl text-base text-on-ink-muted sm:text-lg">
            Every build follows a defined roadmap to eliminate surprises, control costs, and verify
            structural quality before progression.
          </p>
        </div>
      </section>

      {/* Steps List */}
      <section className="section-pad bg-background">
        <div className="shell max-w-5xl">
          <div className="space-y-8">
            {processSteps.map((step, idx) => (
              <Reveal key={step.number} delay={idx * 0.05}>
                <div className="flex flex-col gap-6 border border-border bg-card p-6 sm:flex-row sm:items-start sm:p-8">
                  <div className="flex size-14 shrink-0 items-center justify-center bg-gold text-2xl font-black text-ink">
                    {step.number}
                  </div>
                  <div className="flex-1">
                    <h2 className="font-display text-xl uppercase tracking-[0.06em] text-foreground sm:text-2xl">
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

          <div className="mt-14 border border-ink/10 bg-secondary p-8 text-center sm:p-12">
            <h3 className="font-display text-xl uppercase tracking-[0.08em] text-foreground sm:text-2xl">
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
