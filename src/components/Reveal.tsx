import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "section" | "article" | "span";
};

/** Scroll-triggered fade/slide reveal that respects prefers-reduced-motion. */
export function Reveal({ children, delay = 0, y = 28, className, as = "div" }: RevealProps) {
  const reduced = useReducedMotion();
  const Comp = motion[as];

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </Comp>
  );
}

/** Section heading block with architectural eyebrow label. */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  tone = "light",
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
}) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow ? (
        <Reveal>
          <p
            className={`eyebrow flex items-center gap-3 ${
              align === "center" ? "justify-center" : ""
            } ${tone === "dark" ? "text-gold" : "text-gold-deep"}`}
          >
            <span className="h-px w-8 bg-current" aria-hidden="true" />
            {eyebrow}
          </p>
        </Reveal>
      ) : null}
      <Reveal delay={0.05}>
        <h2
          className={`h-display mt-4 text-3xl sm:text-4xl lg:text-5xl ${
            tone === "dark" ? "text-on-ink" : "text-ink"
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {subtitle ? (
        <Reveal delay={0.1}>
          <p
            className={`mt-4 text-base leading-relaxed sm:text-lg ${
              tone === "dark" ? "text-on-ink-muted" : "text-muted-foreground"
            }`}
          >
            {subtitle}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
