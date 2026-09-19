import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, ShieldCheck, Target, Users2 } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/Reveal";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { useEnquiry } from "@/components/enquiry/EnquiryProvider";
import { company, images, values, trustPillars, telHref } from "@/config/site";
import { aboutSeoConfig, buildSeoMeta } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () => buildSeoMeta(aboutSeoConfig),
  component: AboutPage,
});

function AboutPage() {
  const { openEnquiry } = useEnquiry();

  return (
    <div className="flex flex-col pt-20">
      {/* Page Header with background image */}
      <PageHeader
        eyebrow="About Our Company"
        title="Building With Integrity & Precision !!"
        subtitle={`${company.name} is dedicated to delivering durable, carefully executed residential, commercial, and civil construction projects across Ghana.`}
        image={images.about}
        imageAlt="Winnet Construction team and engineers reviewing structural blueprints on site"
      />

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
                  <div
                    key={p.label}
                    className="rounded-xl glass-card p-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <p className="font-display text-sm uppercase tracking-[0.14em] text-ink font-bold">
                      {p.label}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">{p.note}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="overflow-hidden rounded-2xl border border-border bg-ink shadow-lg">
                <img
                  src={images.about}
                  alt="Winnet construction engineers reviewing blueprints on site"
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full object-cover"
                />
              </div>
              <div className="mt-4 rounded-xl glass-panel p-5 text-xs text-muted-foreground shadow-sm">
                Motto: <strong className="text-foreground">{company.motto}</strong>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="section-pad bg-secondary/40">
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
                <div className="flex h-full flex-col rounded-2xl glass-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-gold/50">
                  <div className="size-2 rounded-full bg-gold" />
                  <h3 className="font-display mt-4 text-lg uppercase tracking-[0.1em] text-ink font-bold">
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

      {/* CTA Section with image behind text */}
      <section className="relative overflow-hidden bg-ink py-16 text-on-ink">
        <img
          src={images.cta}
          alt="Modern architectural structure"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover brightness-[0.88] contrast-[1.05]"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/65 to-ink/40"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-ink/20"
          aria-hidden="true"
        />
        <div className="blueprint-grid-dark absolute inset-0 opacity-15" aria-hidden="true" />
        <div className="shell relative z-10">
          <div className="rounded-3xl glass-card-dark p-8 sm:p-10 flex flex-col items-center justify-between gap-6 text-center lg:flex-row lg:text-left">
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
        </div>
      </section>
    </div>
  );
}
