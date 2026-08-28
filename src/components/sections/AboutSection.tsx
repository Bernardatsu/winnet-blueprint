import { motion, useReducedMotion } from "motion/react";

import { Reveal, SectionHeading } from "@/components/Reveal";
import { company, images, values } from "@/config/site";

export function AboutSection() {
  const reduced = useReducedMotion();

  return (
    <section id="about" className="section-pad relative overflow-hidden">
      <div className="blueprint-grid absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="shell relative">
        <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="About Winnet"
              title="Built Around Your Vision."
              subtitle={`${company.name} provides construction solutions focused on quality workmanship, careful planning and dependable project delivery.`}
            />
            <Reveal delay={0.15}>
              <div className="mt-8 space-y-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
                <p>
                  We work with clients who want their project handled properly — clear scope,
                  organised site work and a finish that holds up over time. Whether it is a new home,
                  a structural package or a renovation, the approach stays the same: plan it well,
                  build it carefully, check it honestly.
                </p>
                <p>
                  Every project is coordinated from the first consultation through to handover, so
                  you always know what stage the work is at and what comes next.
                </p>
              </div>
            </Reveal>

            <div className="mt-10 grid gap-px border border-border bg-border sm:grid-cols-3">
              {values.map((value, index) => (
                <Reveal key={value.title} delay={0.1 + index * 0.08}>
                  <div className="group h-full bg-card p-5 transition-colors hover:bg-ink">
                    <span
                      className="block h-1 w-8 bg-gold transition-all group-hover:w-14"
                      aria-hidden="true"
                    />
                    <h3 className="font-display mt-4 text-sm uppercase tracking-[0.16em] text-ink transition-colors group-hover:text-gold">
                      {value.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground transition-colors group-hover:text-on-ink-muted">
                      {value.body}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <motion.div
            className="relative"
            initial={reduced ? undefined : { opacity: 0, y: 40 }}
            whileInView={reduced ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative overflow-hidden">
              <img
                src={images.about}
                alt="Site engineer and mason reviewing building drawings on a residential construction site"
                loading="lazy"
                width={1200}
                height={1504}
                className="aspect-[4/5] w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 left-0 max-w-[15rem] bg-gold p-5 sm:-left-6">
              <p className="font-display text-xs uppercase tracking-[0.16em] text-ink">
                Planning first
              </p>
              <p className="mt-2 text-xs leading-relaxed text-ink/80">
                Drawings, sequence and materials agreed before work starts on site.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
