import { ArrowUpRight } from "lucide-react";

import { Reveal, SectionHeading } from "@/components/Reveal";
import { useEnquiry } from "@/components/enquiry/EnquiryProvider";
import { services, type Service } from "@/config/site";
import { ServiceIcon } from "@/components/sections/ServiceIcon";

export function ServicesGrid() {
  return (
    <section id="services" className="section-pad bg-ink">
      <div className="shell">
        <SectionHeading
          eyebrow="Services"
          tone="dark"
          title="What We Build"
          subtitle="Practical construction solutions from planning to finishing."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:mt-16">
          {services.map((service, index) => (
            <ServiceCard key={service.slug} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServiceCard({ service, index }: { service: Service; index: number }) {
  const { openEnquiry } = useEnquiry();
  const wide = service.featured;

  return (
    <Reveal
      delay={Math.min(index, 5) * 0.05}
      className={wide ? "sm:col-span-2 lg:col-span-2" : undefined}
    >
      <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl glass-card-dark transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:shadow-2xl">
        <div className={`relative overflow-hidden ${wide ? "aspect-[16/9]" : "aspect-[4/3]"}`}>
          <img
            src={service.image}
            alt={service.title}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover opacity-90 transition-[transform,opacity] duration-700 group-hover:scale-105 group-hover:opacity-100"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent"
            aria-hidden="true"
          />
          <span className="absolute left-5 top-5 flex size-11 items-center justify-center rounded-xl glass-badge text-gold transition-transform duration-500 group-hover:-translate-y-1">
            <ServiceIcon name={service.icon} />
          </span>
        </div>

        <div className="relative flex flex-1 flex-col p-5 sm:p-6">
          <span
            className="absolute left-0 top-0 h-px w-0 bg-gold transition-all duration-500 group-hover:w-full"
            aria-hidden="true"
          />
          <h3 className="font-display text-base uppercase tracking-[0.08em] text-on-ink sm:text-lg">
            {service.title}
          </h3>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-on-ink-muted">
            {service.description}
          </p>
          <button
            type="button"
            onClick={() => openEnquiry(service.title)}
            className="font-display mt-5 inline-flex w-fit items-center gap-2 rounded-lg glass-badge px-3.5 py-2 text-[0.6875rem] uppercase tracking-[0.16em] text-gold transition-all hover:bg-gold hover:text-ink font-bold"
          >
            Inquire For Service
            <ArrowUpRight
              className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </button>
        </div>
      </article>
    </Reveal>
  );
}
