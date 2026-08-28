import type { ReactNode } from "react";

interface PageHeaderProps {
  eyebrow?: string;
  title: ReactNode | string;
  subtitle?: string;
  image: string;
  imageAlt?: string;
  children?: ReactNode;
  badge?: ReactNode;
  className?: string;
}

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  image,
  imageAlt = "Winnet Construction site record",
  children,
  badge,
  className = "",
}: PageHeaderProps) {
  return (
    <section
      className={`relative overflow-hidden bg-ink py-18 text-on-ink sm:py-24 lg:py-28 ${className}`}
    >
      {/* Background Image behind text - full clarity & vividness */}
      <img
        src={image}
        alt={imageAlt}
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-center brightness-[0.88] contrast-[1.05]"
      />
      {/* Balanced translucent gradient for clear image visibility + high text legibility */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/55 to-ink/25"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/20"
        aria-hidden="true"
      />
      <div className="blueprint-grid-dark absolute inset-0 opacity-15" aria-hidden="true" />

      {/* Content Container */}
      <div className="shell relative z-10">
        {badge ? <div className="mb-4">{badge}</div> : null}
        {eyebrow ? (
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-gold" aria-hidden="true" />
            <p className="eyebrow text-gold font-bold">{eyebrow}</p>
          </div>
        ) : null}
        <h1 className="h-display mt-3 text-3xl sm:text-5xl lg:text-6xl text-on-ink tracking-tight">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-on-ink-muted sm:text-lg">
            {subtitle}
          </p>
        ) : null}
        {children ? <div className="mt-6">{children}</div> : null}
      </div>
    </section>
  );
}
