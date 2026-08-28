import { Reveal } from "@/components/Reveal";
import { trustPillars } from "@/config/site";

export function TrustBar() {
  return (
    <section
      aria-label="What we stand for"
      className="border-b border-border/60 bg-secondary/40 py-6"
    >
      <div className="shell">
        <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-4">
          {trustPillars.map((pillar, index) => (
            <Reveal key={pillar.label} delay={index * 0.06}>
              <div className="glass-card rounded-xl p-5 sm:p-6 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
                <p className="font-display text-xs uppercase tracking-[0.18em] text-ink sm:text-sm font-bold">
                  {pillar.label}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{pillar.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
