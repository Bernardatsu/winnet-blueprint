import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/Reveal";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { useEnquiry } from "@/components/enquiry/EnquiryProvider";
import { company, images, whyPillars, values } from "@/config/site";
import { buildSeoMeta, whyWinnetSeoConfig } from "@/lib/seo";

export const Route = createFileRoute("/why-winnet")({
  head: () => buildSeoMeta(whyWinnetSeoConfig),
  component: WhyWinnetPage,
});

function WhyWinnetPage() {
  const { openEnquiry } = useEnquiry();

  return (
    <div className="flex flex-col pt-20">
      {/* Header with image behind text */}
      <PageHeader
        eyebrow="The Winnet Standard"
        title="Why Choose Winnet Construction"
        subtitle="We operate with clear contracts, structured milestones, and strict supervision so your building project is delivered right the first time."
        image={images.steel}
        imageAlt="Structural steel frame installation and heavy roof beam alignment"
      />

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
                <div className="flex h-full flex-col rounded-3xl glass-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-gold/50 sm:p-8">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-gold text-ink shadow-sm">
                    <ShieldCheck className="size-6" />
                  </div>
                  <h3 className="font-display mt-6 text-xl uppercase tracking-[0.06em] text-foreground font-bold">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {p.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-16 rounded-3xl glass-panel p-8 text-center sm:p-12 shadow-sm">
            <h3 className="font-display text-2xl uppercase tracking-[0.08em] text-foreground font-bold">
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
