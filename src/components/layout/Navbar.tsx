import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { Menu, Phone, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useEnquiry } from "@/components/enquiry/EnquiryProvider";
import { company, nav, phoneDisplay, telHref } from "@/config/site";
import { WinnetIcon } from "@/components/brand/WinnetBrand";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { openEnquiry } = useEnquiry();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const overHero = pathname === "/";

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
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
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50 pointer-events-none px-3 pt-3 sm:px-6 sm:pt-4 lg:pt-5"
    >
      <div
        className={`pointer-events-auto mx-auto flex items-center justify-between gap-3 sm:gap-4 rounded-full px-3.5 sm:px-5 py-2 sm:py-2.5 max-w-6xl transition-all duration-300 ${
          solid
            ? "bg-black/40 border border-white/20 backdrop-blur-2xl backdrop-saturate-150 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.35),0_12px_40px_rgba(0,0,0,0.5)] ring-1 ring-black/20"
            : "bg-white/[0.08] border border-white/25 backdrop-blur-xl backdrop-saturate-150 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.4),0_8px_32px_rgba(0,0,0,0.25)] hover:bg-white/[0.12] hover:border-gold/40"
        }`}
      >
        <Link
          to="/"
          className="group flex items-center gap-2.5 sm:gap-3 shrink-0"
          aria-label={`${company.name} — home`}
        >
          <div className="relative">
            <WinnetIcon className="size-8 sm:size-9 rounded-lg shadow-md transition-transform duration-300 group-hover:scale-105 group-hover:rotate-1" />
            <div className="absolute -inset-0.5 rounded-lg bg-gold/25 opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100 -z-10" />
          </div>
          <span className="leading-none">
            <span className="font-display block text-xs sm:text-sm font-black uppercase tracking-[0.16em] text-on-ink transition-colors group-hover:text-gold">
              Winnet
            </span>
            <span className="font-display block text-[0.5rem] sm:text-[0.5625rem] uppercase tracking-[0.3em] text-gold">
              Construction Ltd
            </span>
          </span>
        </Link>

        <nav
          aria-label="Main"
          className="hidden items-center gap-1 rounded-full border border-white/15 bg-white/[0.06] p-1 backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.2)] lg:flex"
        >
          {nav.map((item) => {
            const isActive = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`relative font-display rounded-full px-3.5 py-1.5 text-[0.6875rem] uppercase tracking-[0.16em] transition-colors duration-200 ${
                  isActive ? "text-gold font-bold" : "text-white/75 hover:text-white"
                }`}
                activeOptions={{ exact: item.to === "/" }}
              >
                {isActive && (
                  <motion.div
                    layoutId="floating-nav-pill"
                    className="absolute inset-0 rounded-full bg-white/15 border border-gold/40 shadow-[0_0_12px_rgba(242,178,60,0.2),inset_0_1px_0_rgba(255,255,255,0.35)] backdrop-blur-sm"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2.5 lg:flex shrink-0">
          <motion.a
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            href={telHref}
            className="font-display flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.08] px-3.5 py-2 text-[0.6875rem] uppercase tracking-[0.14em] text-on-ink backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)] transition-all hover:border-gold/60 hover:bg-gold/15 hover:text-gold hover:shadow-[0_0_20px_rgba(242,178,60,0.3)]"
          >
            <Phone className="size-3.5 text-gold" aria-hidden="true" />
            <span>Call Us</span>
          </motion.a>
          <motion.div whileHover={{ scale: 1.03, y: -1 }} whileTap={{ scale: 0.97 }}>
            <Button
              variant="gold"
              size="sm"
              className="rounded-full px-5 py-2 text-[0.6875rem] font-bold uppercase tracking-[0.14em] shadow-lg shadow-gold/25 transition-all hover:shadow-[0_0_24px_rgba(242,178,60,0.5)] cursor-pointer"
              onClick={() => openEnquiry()}
            >
              Start a Project
            </Button>
          </motion.div>
        </div>

        <motion.button
          whileTap={{ scale: 0.92 }}
          type="button"
          className="flex size-9 sm:size-10 items-center justify-center rounded-full border border-white/20 bg-white/[0.08] text-on-ink backdrop-blur-md shadow-[inset_0_1px_1px_rgba(255,255,255,0.3)] transition-all hover:border-gold/50 hover:bg-gold/15 hover:text-gold lg:hidden cursor-pointer"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <AnimatePresence mode="wait" initial={false}>
            {menuOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <X className="size-5" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <Menu className="size-5" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ opacity: 0, y: -10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.96 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto mx-auto mt-2 max-w-6xl rounded-3xl border border-white/25 bg-black/60 p-5 backdrop-blur-3xl backdrop-saturate-150 shadow-[inset_0_1px_1px_rgba(255,255,255,0.35),0_20px_50px_rgba(0,0,0,0.7)] ring-1 ring-white/10 lg:hidden"
          >
            <nav aria-label="Mobile" className="flex flex-col">
              {nav.map((item, index) => (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.03 * index, duration: 0.25 }}
                >
                  <Link
                    to={item.to}
                    className="font-display flex items-center justify-between border-b border-white/10 py-3.5 text-sm uppercase tracking-[0.18em] text-on-ink transition-colors hover:text-gold"
                    activeProps={{ className: "text-gold font-bold" }}
                    activeOptions={{ exact: item.to === "/" }}
                  >
                    <span>{item.label}</span>
                    <span className="text-gold/50 text-xs">→</span>
                  </Link>
                </motion.div>
              ))}
              <div className="mt-4 flex flex-col gap-2.5 pt-2">
                <Button
                  variant="gold"
                  size="cta"
                  className="rounded-full shadow-lg shadow-gold/20"
                  onClick={() => {
                    setMenuOpen(false);
                    openEnquiry();
                  }}
                >
                  Start Your Project
                </Button>
                <Button variant="outlineLight" size="cta" className="rounded-full" asChild>
                  <a href={telHref}>
                    <Phone className="size-4 text-gold" aria-hidden="true" />
                    Call {phoneDisplay}
                  </a>
                </Button>
              </div>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}
