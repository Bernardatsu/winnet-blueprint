import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { useEnquiry } from "@/components/enquiry/EnquiryProvider";
import { company, whyPillars, values } from "@/config/site";

export const Route = createFileRoute("/why-winnet")({
  head: () => ({
    meta: [
      { title: `Why Choose Winnet | ${company.name}` },
      {
        name: "description",
        content: `Discover what sets ${company.name} apart: uncompromising quality, transparent communication, and experienced site supervision.`,
      },
    ],
  }),
  component: WhyWinnetPage,
});

function WhyWinnetPage() {
  const { openEnquiry } = useEnquiry();

  return (
    <div className="flex flex-col pt-20">
      {/* Header */}
      <section className="relative overflow-hidden bg-ink py-20 text-on-ink lg:py-28">
        <div className="blueprint-grid-dark absolute inset-0 opacity-30" aria-hidden="true" />
        <div className="shell relative">
          <p className="eyebrow text-gold">The Winnet Standard</p>
          <h1 className="h-display mt-4 text-4xl sm:text-6xl lg:text-7xl">
            Why Choose Winnet Construction
          </h1>
          <p className="mt-6 max-w-2xl text-base text-on-ink-muted sm:text-lg">
            We operate with clear contracts, structured milestones, and strict supervision so your
            building project is delivered right the first time.
          </p>
        </div>
      </section>

      {/* Pillars */}
      <section className="section-pad bg-background">
        <div className="shell">
          <SectionHeading
            eyebrow="Key Advantages"
            title="Engineered For Durability &amp; Trust"
            subtitle="How we ensure every client receives reliable service and high-standard craftsmanship."
          />

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {whyPillars.map((p, idx) => (
              <Reveal key={p.title} delay={idx * 0.08}>
                <div className="flex h-full flex-col border border-border bg-card p-6 sm:p-8">
                  <div className="flex size-12 items-center justify-center bg-gold text-ink">
                    <ShieldCheck className="size-6" />
                  </div>
                  <h3 className="font-display mt-6 text-xl uppercase tracking-[0.06em] text-foreground">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {p.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-16 border border-ink/10 bg-secondary p-8 text-center sm:p-12">
            <h3 className="font-display text-2xl uppercase tracking-[0.08em] text-foreground">
              Experience the Winnet difference on your next build
            </h3>
            <div className="mt-6 flex justify-center">
              <Button variant="gold" size="cta" onClick={() => openEnquiry()}>
                Get In Touch
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
