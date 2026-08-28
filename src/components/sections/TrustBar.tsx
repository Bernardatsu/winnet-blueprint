import { Reveal } from "@/components/Reveal";
import { trustPillars } from "@/config/site";

export function TrustBar() {
  return (
    <section aria-label="What we stand for" className="border-b border-border bg-secondary">
      <div className="shell grid grid-cols-2 divide-x divide-y divide-border/70 border-x border-border/70 sm:grid-cols-4 sm:divide-y-0">
        {trustPillars.map((pillar, index) => (
          <Reveal key={pillar.label} delay={index * 0.06}>
            <div className="px-4 py-7 sm:px-6 sm:py-9">
              <p className="font-display text-xs uppercase tracking-[0.18em] text-ink sm:text-sm">
                {pillar.label}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{pillar.note}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
