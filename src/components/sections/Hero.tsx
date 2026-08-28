import { motion, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { useEnquiry } from "@/components/enquiry/EnquiryProvider";
import { company, images } from "@/config/site";
import { WinnetQualityBadge } from "@/components/brand/WinnetBrand";

const words = ["Building Your Vision.", "Creating Your Future."];

export function Hero() {
  const { openEnquiry } = useEnquiry();
  const reduced = useReducedMotion();

  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-ink pt-24">
      <motion.img
        src={images.hero}
        alt="Multi-storey concrete building under construction at golden hour with workers on site"
        width={1920}
        height={1280}
        loading="eager"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover brightness-[0.92] contrast-[1.05]"
        initial={reduced ? undefined : { scale: 1.12 }}
        animate={reduced ? undefined : { scale: 1 }}
        transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/50 to-ink/20"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-ink/70 via-transparent to-transparent"
        aria-hidden="true"
      />
      <div className="blueprint-grid-dark absolute inset-0 opacity-15" aria-hidden="true" />

      <div className="shell relative w-full pb-14 lg:pb-20">
        <motion.p
          className="eyebrow flex items-center gap-3 text-gold"
          initial={reduced ? undefined : { opacity: 0, y: 16 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <span className="h-px w-10 bg-gold" aria-hidden="true" />
          {company.name}
        </motion.p>

        <h1 className="h-display mt-5 max-w-4xl text-[2.5rem] leading-[0.94] text-on-ink sm:text-6xl lg:text-7xl xl:text-[5.25rem]">
          {words.map((word, index) => (
            <span key={word} className="block overflow-hidden">
              <motion.span
                className="block"
                initial={reduced ? undefined : { y: "110%" }}
                animate={reduced ? undefined : { y: 0 }}
                transition={{ duration: 0.9, delay: 0.25 + index * 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                {index === 1 ? (
                  <>
                    Creating Your <span className="text-gold">Future.</span>
                  </>
                ) : (
                  word
                )}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          className="mt-6 max-w-xl text-base leading-relaxed text-on-ink-muted sm:text-lg"
          initial={reduced ? undefined : { opacity: 0, y: 18 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
        >
          From the first plan to final handover, we deliver dependable construction solutions built
          around quality, precision and your vision.
        </motion.p>

        <motion.div
          className="mt-9 flex flex-col gap-3 sm:flex-row"
          initial={reduced ? undefined : { opacity: 0, y: 18 }}
          animate={reduced ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
        >
          <Button variant="gold" size="ctaLg" onClick={() => openEnquiry()}>
            Start Your Project
            <ArrowRight aria-hidden="true" />
          </Button>
          <Button variant="outlineLight" size="ctaLg" asChild>
            <Link to="/services">View Our Services</Link>
          </Button>
        </motion.div>

        <motion.div
          className="mt-12 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-on-ink/15 pt-6"
          initial={reduced ? undefined : { opacity: 0 }}
          animate={reduced ? undefined : { opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          {["Construction", "Renovation", "Finishing", "Building Solutions"].map((item, i) => (
            <span key={item} className="flex items-center gap-4">
              {i > 0 ? <span className="size-1 bg-gold" aria-hidden="true" /> : null}
              <span className="font-display text-[0.625rem] uppercase tracking-[0.2em] text-on-ink-muted sm:text-[0.6875rem]">
                {item}
              </span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* Quality built guarantee badge on desktop */}
      <motion.div
        className="absolute bottom-24 right-8 hidden lg:flex flex-col items-center gap-2 xl:right-16"
        initial={reduced ? undefined : { opacity: 0, scale: 0.8 }}
        animate={reduced ? undefined : { opacity: 1, scale: 1 }}
        transition={{ delay: 0.95, duration: 0.6 }}
      >
        <WinnetQualityBadge className="size-24 drop-shadow-2xl transition-transform duration-300 hover:scale-110" />
      </motion.div>

      <motion.div
        className="absolute bottom-5 right-4 hidden flex-col items-center gap-2 lg:flex xl:right-12"
        initial={reduced ? undefined : { opacity: 0 }}
        animate={reduced ? undefined : { opacity: 1 }}
        transition={{ delay: 1.2 }}
        aria-hidden="true"
      >
        <span className="font-display rotate-180 text-[0.625rem] uppercase tracking-[0.3em] text-on-ink-muted [writing-mode:vertical-rl]">
          Scroll
        </span>
        <motion.span
          animate={reduced ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="text-gold"
        >
          <ArrowDown className="size-4" />
        </motion.span>
      </motion.div>
    </section>
  );
}
