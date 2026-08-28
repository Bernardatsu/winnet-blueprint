import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { Menu, Phone, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useEnquiry } from "@/components/enquiry/EnquiryProvider";
import { company, nav, phoneDisplay, telHref } from "@/config/site";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { openEnquiry } = useEnquiry();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const overHero = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const solid = scrolled || !overHero;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-300 ${
        solid
          ? "border-b border-on-ink/10 bg-ink/92 backdrop-blur-md supports-[backdrop-filter]:bg-ink/80"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="shell flex h-16 items-center justify-between gap-4 lg:h-20">
        <Link to="/" className="group flex items-center gap-3" aria-label={`${company.name} — home`}>
          <span className="flex h-9 w-9 items-center justify-center bg-gold">
            <span className="font-display text-lg font-black text-ink">W</span>
          </span>
          <span className="leading-none">
            <span className="font-display block text-sm font-black uppercase tracking-[0.16em] text-on-ink">
              Winnet
            </span>
            <span className="font-display block text-[0.5625rem] uppercase tracking-[0.3em] text-gold">
              Construction Ltd
            </span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="font-display px-3 py-2 text-[0.6875rem] uppercase tracking-[0.16em] text-on-ink-muted transition-colors hover:text-gold"
              activeProps={{ className: "text-gold" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <a
            href={telHref}
            className="font-display flex items-center gap-2 border border-on-ink/25 px-4 py-3 text-[0.6875rem] uppercase tracking-[0.14em] text-on-ink transition-colors hover:border-gold hover:text-gold"
          >
            <Phone className="size-3.5" aria-hidden="true" />
            Call Us
          </a>
          <Button variant="gold" size="cta" onClick={() => openEnquiry()}>
            Start a Project
          </Button>
        </div>

        <button
          type="button"
          className="flex size-11 items-center justify-center text-on-ink lg:hidden"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-on-ink/10 bg-ink lg:hidden"
          >
            <nav aria-label="Mobile" className="shell flex flex-col py-4">
              {nav.map((item, index) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * index, duration: 0.3 }}
                >
                  <Link
                    to={item.to}
                    className="font-display block border-b border-on-ink/10 py-4 text-sm uppercase tracking-[0.18em] text-on-ink"
                    activeProps={{ className: "text-gold" }}
                    activeOptions={{ exact: item.to === "/" }}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              <div className="mt-5 flex flex-col gap-3 pb-6">
                <Button
                  variant="gold"
                  size="cta"
                  onClick={() => {
                    setMenuOpen(false);
                    openEnquiry();
                  }}
                >
                  Start Your Project
                </Button>
                <Button variant="outlineLight" size="cta" asChild>
                  <a href={telHref}>
                    <Phone aria-hidden="true" />
                    Call {phoneDisplay}
                  </a>
                </Button>
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
