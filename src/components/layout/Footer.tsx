import { Link } from "@tanstack/react-router";
import { Mail, Phone } from "lucide-react";

import { company, mailHref, nav, phoneDisplay, services, telHref } from "@/config/site";
import { WinnetIcon, WinnetQualityBadge } from "@/components/brand/WinnetBrand";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-on-ink">
      <div className="blueprint-grid-dark absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="shell relative py-14 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1.2fr_1.2fr]">
          <div>
            <div className="flex items-center gap-3">
              <WinnetIcon className="size-10 rounded-md" />
              <span className="font-display text-sm font-black uppercase tracking-[0.16em]">
                {company.name}
              </span>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-on-ink-muted">
              {company.motto}
            </p>
            <div className="mt-6 flex items-center gap-4">
              <WinnetQualityBadge className="size-16 drop-shadow-md" />
              <div className="text-xs text-on-ink-muted leading-tight">
                <span className="block font-bold text-gold">Quality Built Guarantee</span>
                <span>Ghanaian Standard Compliant</span>
              </div>
            </div>
            <div className="measure-line mt-6 w-32 opacity-40" aria-hidden="true" />
          </div>

          <nav aria-label="Footer navigation">
            <h2 className="eyebrow text-gold">Navigate</h2>
            <ul className="mt-5 space-y-3">
              {nav.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-sm text-on-ink-muted transition-colors hover:text-gold"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="eyebrow text-gold">Services</h2>
            <ul className="mt-5 space-y-3">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    to="/services"
                    className="text-sm text-on-ink-muted transition-colors hover:text-gold"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="eyebrow text-gold">Contact</h2>
            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a
                  href={telHref}
                  className="flex items-center gap-2 text-on-ink-muted transition-colors hover:text-gold"
                >
                  <Phone className="size-4" aria-hidden="true" />
                  {phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={mailHref}
                  className="flex items-center gap-2 break-all text-on-ink-muted transition-colors hover:text-gold"
                >
                  <Mail className="size-4 shrink-0" aria-hidden="true" />
                  {company.email}
                </a>
              </li>
              <li className="pt-2 text-on-ink-muted/80">{company.addressFallback}</li>
            </ul>

            <h2 className="eyebrow mt-8 text-gold">Social</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {company.socials.map((social) => (
                <li key={social.label}>
                  <span
                    className="font-display block border border-on-ink/20 px-3 py-2 text-[0.625rem] uppercase tracking-[0.14em] text-on-ink-muted/70"
                    title="Official account to be supplied"
                  >
                    {social.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-on-ink/10 pt-6 text-xs text-on-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 {company.name}. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="transition-colors hover:text-gold">
              Privacy Policy
            </Link>
            <Link to="/terms" className="transition-colors hover:text-gold">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
