import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/Reveal";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { useEnquiry } from "@/components/enquiry/EnquiryProvider";
import { company, images, services } from "@/config/site";
import { ServiceIcon } from "@/components/sections/ServiceIcon";
import { buildSeoMeta, servicesSeoConfig } from "@/lib/seo";

export const Route = createFileRoute("/services")({
  head: () => buildSeoMeta(servicesSeoConfig),
  component: ServicesPage,
});

function ServicesPage() {
  const { openEnquiry } = useEnquiry();

  return (
    <div className="flex flex-col pt-20">
      {/* Header with image behind text */}
      <PageHeader
        eyebrow="Our Capabilities"
        title="Construction Services & Solutions"
        subtitle="From new residential construction and structural framing to commercial fit-outs and complete renovations."
        image={images.structural}
        imageAlt="Reinforced concrete framing and structural engineering on active site"
      />

      {/* Detailed Services Grid */}
      <section className="section-pad bg-background">
        <div className="shell">
          <div className="space-y-16">
            {services.map((service, index) => {
              const isEven = index % 2 === 0;
              return (
                <Reveal key={service.slug}>
                  <div className="grid gap-8 overflow-hidden rounded-3xl glass-card transition-all duration-300 hover:shadow-2xl hover:border-gold/50 lg:grid-cols-2 lg:items-center">
                    <div
                      className={`relative aspect-[16/10] overflow-hidden bg-ink ${
                        isEven ? "" : "lg:order-2"
                      }`}
                    >
                      <img
                        src={service.image}
                        alt={service.title}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                      <div className="absolute left-4 top-4 flex size-12 items-center justify-center rounded-xl glass-badge text-gold shadow-md">
                        <ServiceIcon name={service.icon} className="size-6" />
                      </div>
                    </div>

                    <div className="p-6 sm:p-10">
                      <p className="eyebrow text-gold-deep">Service 0{index + 1}</p>
                      <h2 className="font-display mt-2 text-2xl uppercase tracking-[0.04em] text-foreground sm:text-3xl">
                        {service.title}
                      </h2>
                      <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                        {service.description}
                      </p>

                      <div className="mt-8 flex flex-wrap gap-3">
                        <Button
                          variant="gold"
                          size="cta"
                          onClick={() => openEnquiry(service.title)}
                        >
                          Inquire for {service.title}
                          <ArrowRight className="size-3.5" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA with image behind text */}
      <section className="relative overflow-hidden bg-ink py-16 text-on-ink">
        <img
          src={images.cta}
          alt="Modern construction development"
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
                Need a Custom Construction Solution?
              </h2>
              <p className="mt-2 text-sm text-on-ink-muted">
                We review architectural drawings and formulate itemized milestone schedules.
              </p>
            </div>
            <div className="flex gap-3">
              <Button variant="gold" size="cta" onClick={() => openEnquiry()}>
                Request A Quote
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
