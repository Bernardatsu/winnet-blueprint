import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { useEnquiry } from "@/components/enquiry/EnquiryProvider";
import { company, services } from "@/config/site";
import { ServiceIcon } from "@/components/sections/ServiceIcon";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: `Construction Services | ${company.name}` },
      {
        name: "description",
        content: `Comprehensive construction services: residential builds, structural works, masonry, renovations, and finishes.`,
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const { openEnquiry } = useEnquiry();

  return (
    <div className="flex flex-col pt-20">
      {/* Header */}
      <section className="relative overflow-hidden bg-ink py-20 text-on-ink lg:py-28">
        <div className="blueprint-grid-dark absolute inset-0 opacity-30" aria-hidden="true" />
        <div className="shell relative">
          <p className="eyebrow text-gold">Our Capabilities</p>
          <h1 className="h-display mt-4 text-4xl sm:text-6xl lg:text-7xl">
            Construction Services &amp; Solutions
          </h1>
          <p className="mt-6 max-w-2xl text-base text-on-ink-muted sm:text-lg">
            From new residential construction and structural framing to commercial fit-outs and
            complete renovations.
          </p>
        </div>
      </section>

      {/* Detailed Services Grid */}
      <section className="section-pad bg-background">
        <div className="shell">
          <div className="space-y-16">
            {services.map((service, index) => {
              const isEven = index % 2 === 0;
              return (
                <Reveal key={service.slug}>
                  <div className="grid gap-8 overflow-hidden border border-border bg-card lg:grid-cols-2 lg:items-center">
                    <div
                      className={`relative aspect-[16/10] overflow-hidden bg-ink ${
                        isEven ? "" : "lg:order-2"
                      }`}
                    >
                      <img
                        src={service.image}
                        alt={service.title}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute left-4 top-4 flex size-12 items-center justify-center bg-gold text-ink">
                        <ServiceIcon name={service.icon} className="size-6" />
                      </div>
                    </div>

                    <div className="p-6 sm:p-10">
                      <p className="eyebrow text-gold-deep">Service {index + 1}</p>
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
    </div>
  );
}
