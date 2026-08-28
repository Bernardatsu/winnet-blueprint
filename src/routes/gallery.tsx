import { useState, useEffect, useCallback } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Eye, Maximize2, Sparkles, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import { Reveal, SectionHeading } from "@/components/Reveal";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { useEnquiry } from "@/components/enquiry/EnquiryProvider";
import { company, gallery, images } from "@/config/site";
import { buildSeoMeta, gallerySeoConfig } from "@/lib/seo";

export const Route = createFileRoute("/gallery")({
  head: () => buildSeoMeta(gallerySeoConfig),
  component: GalleryPage,
});

const galleryCategories = [
  "All",
  "Masonry",
  "Structural",
  "Residential",
  "Steel",
  "Finishing",
  "Painting",
  "Design",
] as const;

type GalleryItem = {
  src: string;
  label: string;
  alt: string;
  category: (typeof galleryCategories)[number];
  description: string;
};

const fullGallery: GalleryItem[] = [
  {
    src: images.masonry,
    label: "Blockwork & Precision Masonry",
    alt: "Mason laying blocks with mortar",
    category: "Masonry",
    description:
      "Solid load-bearing blockwork aligned to millimeter precision with proper mortar jointing.",
  },
  {
    src: images.structural,
    label: "Reinforced Concrete Columns",
    alt: "Steel reinforcement in a concrete column",
    category: "Structural",
    description:
      "High-tensile rebar reinforcement tying and beam cast sequences per structural engineering drawings.",
  },
  {
    src: images.residential,
    label: "Multi-Storey Residential Build",
    alt: "Modern completed two-storey home",
    category: "Residential",
    description:
      "Complete residential construction from excavation and foundation to modern roof profile.",
  },
  {
    src: images.steel,
    label: "Steel Truss & Roofing Works",
    alt: "Worker welding a steel roof truss",
    category: "Steel",
    description:
      "Fabrication and on-site welding of heavy-gauge steel trusses for clear-span roofing stability.",
  },
  {
    src: images.finishing,
    label: "High-Standard Interior Finishing",
    alt: "Finished modern interior living area",
    category: "Finishing",
    description: "Precision screeding, smooth wall skimming, and premium tile alignments.",
  },
  {
    src: images.painting,
    label: "Protective & Decorative Painting",
    alt: "Paint roller applying finish to a wall",
    category: "Painting",
    description:
      "Multi-coat primer and durable acrylic emulsions resistant to weather and dampness.",
  },
  {
    src: images.blueprint,
    label: "Architectural Plans & Engineering Drawings",
    alt: "Architectural blueprints on a desk",
    category: "Design",
    description:
      "Comprehensive 2D working drawings and 3D elevations ready for permit submission and construction.",
  },
  {
    src: images.commercial,
    label: "Commercial Shell & Frontage",
    alt: "Commercial building construction",
    category: "Structural",
    description:
      "Multi-level commercial structure designed for high load capacity and flexible open spans.",
  },
  {
    src: images.renovation,
    label: "Structural Remodeling & Renovation",
    alt: "Interior room under renovation",
    category: "Residential",
    description:
      "Reconfiguration of load-bearing interior layouts and upgraded electrical/plumbing infrastructure.",
  },
];

function GalleryPage() {
  const [selectedCategory, setSelectedCategory] =
    useState<(typeof galleryCategories)[number]>("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const { openEnquiry } = useEnquiry();

  const filteredItems = fullGallery.filter(
    (item) => selectedCategory === "All" || item.category === selectedCategory,
  );

  const currentLightboxItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  const showNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredItems.length);
  }, [lightboxIndex, filteredItems.length]);

  const showPrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredItems.length) % filteredItems.length);
  }, [lightboxIndex, filteredItems.length]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") setLightboxIndex(null);
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, showNext, showPrev]);

  return (
    <div className="flex flex-col pt-20">
      {/* Page Header with background image behind text */}
      <PageHeader
        eyebrow="Visual Portfolio"
        title="Project Gallery & Site Records"
        subtitle="Explore photographs of active sites, structural steelwork, concrete frames, masonry details, and completed finishing works across Ghana."
        image={images.masonry}
        imageAlt="Masons constructing durable load-bearing blockwork on site"
      />

      {/* Category Filter & Gallery Grid */}
      <section className="section-pad bg-background">
        <div className="shell">
          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 p-2 rounded-2xl glass-panel pb-3 mb-10 max-w-fit mx-auto">
            {galleryCategories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(cat);
                    setLightboxIndex(null);
                  }}
                  className={`font-display rounded-xl px-4 py-2 text-xs uppercase tracking-[0.14em] transition-all ${
                    active
                      ? "bg-gold text-ink font-bold shadow-md shadow-gold/30"
                      : "text-muted-foreground hover:bg-card hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Grid */}
          <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence>
              {filteredItems.map((item, index) => (
                <motion.article
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  key={item.label + item.src}
                  className="group relative flex flex-col overflow-hidden rounded-3xl glass-card transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-gold/50"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-ink">
                    <img
                      src={item.src}
                      alt={item.alt}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-80" />

                    <button
                      type="button"
                      onClick={() => setLightboxIndex(index)}
                      className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-ink/40 backdrop-blur-xs text-on-ink"
                      aria-label={`Open ${item.label} in full screen`}
                    >
                      <span className="flex items-center gap-2 rounded-xl bg-gold px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-ink shadow-lg">
                        <Eye className="size-4" />
                        View High-Res
                      </span>
                    </button>

                    <div className="absolute left-3 top-3">
                      <span className="font-display rounded-lg glass-badge px-2.5 py-1 text-[0.625rem] uppercase tracking-[0.16em] text-gold font-bold">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-base uppercase tracking-[0.06em] text-foreground">
                      {item.label}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Consultation Banner */}
          <div className="mt-16 rounded-3xl glass-card-dark p-8 text-on-ink sm:p-12">
            <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr] lg:items-center">
              <div>
                <p className="eyebrow text-gold">High Standard Craftsmanship</p>
                <h2 className="h-display mt-2 text-2xl text-on-ink sm:text-3xl">
                  Require Similar Quality For Your Site?
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-on-ink-muted max-w-xl">
                  From foundation rebar to roof trusses and turnkey interiors, Winnet Construction
                  Ltd delivers planned, inspected building services across Ghana.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
                <Button variant="gold" size="cta" onClick={() => openEnquiry()}>
                  <Sparkles className="size-4" />
                  Start Your Project
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {currentLightboxItem ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setLightboxIndex(null)}
              className="absolute inset-0 bg-ink/95 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative flex flex-col max-h-[92vh] max-w-5xl overflow-hidden rounded-2xl border border-on-ink/20 bg-ink shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-on-ink/10 px-5 py-3 text-on-ink">
                <div>
                  <span className="font-display text-[0.6875rem] uppercase tracking-[0.18em] text-gold">
                    {currentLightboxItem.category} • Record {(lightboxIndex ?? 0) + 1} of{" "}
                    {filteredItems.length}
                  </span>
                  <h3 className="font-display text-sm uppercase text-on-ink">
                    {currentLightboxItem.label}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setLightboxIndex(null)}
                  className="flex size-9 items-center justify-center rounded-xl bg-on-ink/10 text-on-ink hover:bg-gold hover:text-ink transition-colors"
                  aria-label="Close lightbox"
                >
                  <X className="size-5" />
                </button>
              </div>

              {/* Photo View with Next/Prev Arrows */}
              <div className="relative flex items-center justify-center overflow-hidden bg-black/40 p-4">
                {filteredItems.length > 1 ? (
                  <button
                    type="button"
                    onClick={showPrev}
                    className="absolute left-4 z-10 flex size-10 items-center justify-center rounded-full bg-ink/80 text-on-ink hover:bg-gold hover:text-ink transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="size-6" />
                  </button>
                ) : null}

                <img
                  src={currentLightboxItem.src}
                  alt={currentLightboxItem.alt}
                  className="max-h-[65vh] w-auto rounded-xl object-contain shadow-lg"
                />

                {filteredItems.length > 1 ? (
                  <button
                    type="button"
                    onClick={showNext}
                    className="absolute right-4 z-10 flex size-10 items-center justify-center rounded-full bg-ink/80 text-on-ink hover:bg-gold hover:text-ink transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight className="size-6" />
                  </button>
                ) : null}
              </div>

              {/* Caption Footer */}
              <div className="border-t border-on-ink/10 bg-ink px-5 py-3 text-xs text-on-ink-muted">
                <p>{currentLightboxItem.description}</p>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
