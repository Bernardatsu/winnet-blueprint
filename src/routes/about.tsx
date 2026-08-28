import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, ShieldCheck, Target, Users2 } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { useEnquiry } from "@/components/enquiry/EnquiryProvider";
import { company, images, values, trustPillars, telHref } from "@/config/site";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: `About Us | ${company.name}` },
      {
        name: "description",
        content: `Learn more about ${company.name}, our values, engineering philosophy, and construction team.`,
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { openEnquiry } = useEnquiry();

  return (
    <div className="flex flex-col pt-20">
      {/* Page Header */}
      <section className="relative overflow-hidden bg-ink py-20 text-on-ink lg:py-28">
        <div className="blueprint-grid-dark absolute inset-0 opacity-30" aria-hidden="true" />
        <div className="shell relative">
          <p className="eyebrow text-gold">About Our Company</p>
          <h1 className="h-display mt-4 text-4xl sm:text-6xl lg:text-7xl">
            Building With Integrity &amp; Precision
          </h1>
          <p className="mt-6 max-w-2xl text-base text-on-ink-muted sm:text-lg">
            {company.name} is dedicated to delivering durable, carefully executed residential,
            commercial, and civil construction projects across Ghana.
          </p>
        </div>
      </section>

      {/* Main Story & Image */}
      <section className="section-pad bg-background">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionHeading
                eyebrow="Our Story"
                title="A Commitment to Craftsmanship"
                subtitle="We bridge architectural design with disciplined on-site execution."
              />
              <div className="mt-8 space-y-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
                <p>
                  At {company.name}, we believe every structure should be built on a foundation of
                  thorough planning, transparent communication, and verified structural integrity.
                </p>
                <p>
                  Our team coordinates skilled masons, structural engineers, steel benders, and
                  finishing specialists under unified supervision, ensuring projects meet design
                  specifications on time and within agreed budget parameters.
                </p>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {trustPillars.map((p) => (
                  <div key={p.label} className="border border-border bg-card p-4">
                    <p className="font-display text-sm uppercase tracking-[0.14em] text-ink">
                      {p.label}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">{p.note}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="overflow-hidden border border-border bg-ink shadow-lg">
                <img
                  src={images.about}
                  alt="Winnet construction engineers reviewing blueprints on site"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
              <div className="mt-4 border-l-2 border-gold bg-secondary p-4 text-xs text-muted-foreground">
                Motto: <strong className="text-foreground">{company.motto}</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-pad bg-secondary/50">
        <div className="shell">
          <SectionHeading
            eyebrow="Values"
            title="What Guides Our Work"
            subtitle="The core tenets behind every foundation we lay and every finish we apply."
            align="center"
          />

          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {values.map((v, idx) => (
              <Reveal key={v.title} delay={idx * 0.08}>
                <div className="flex h-full flex-col border border-border bg-card p-6">
                  <div className="size-2 bg-gold" />
                  <h3 className="font-display mt-4 text-lg uppercase tracking-[0.1em] text-ink">
                    {v.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {v.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-ink py-16 text-on-ink">
        <div className="shell flex flex-col items-center justify-between gap-6 text-center lg:flex-row lg:text-left">
          <div>
            <h2 className="h-display text-2xl sm:text-3xl text-on-ink">
              Ready to Discuss Your Project?
            </h2>
            <p className="mt-2 text-sm text-on-ink-muted">
              Get in touch with our construction team for an initial consultation.
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="gold" size="cta" onClick={() => openEnquiry()}>
              Start Your Project
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
