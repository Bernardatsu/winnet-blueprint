import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Building,
  HardHat,
  ShieldCheck,
  CalendarCheck,
  Eye,
  X,
  Phone,
  MessageCircle,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { AboutSection } from "@/components/sections/AboutSection";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { Reveal, SectionHeading } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { useEnquiry } from "@/components/enquiry/EnquiryProvider";
import {
  company,
  faqs,
  gallery,
  processSteps,
  projectCategories,
  projects,
  whyPillars,
  type Project,
  telHref,
} from "@/config/site";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const { openEnquiry } = useEnquiry();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  const [activeGalleryImg, setActiveGalleryImg] = useState<(typeof gallery)[number] | null>(null);

  const filteredProjects =
    selectedCategory === "All" ? projects : projects.filter((p) => p.category === selectedCategory);

  return (
    <div className="flex flex-col">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Trust Bar */}
      <TrustBar />

      {/* 3. About Section */}
      <AboutSection />

      {/* 4. Services Grid */}
      <ServicesGrid />

      {/* 5. Projects Showcase */}
      <section id="projects" className="section-pad bg-background">
        <div className="shell">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Portfolio"
              title="Featured Construction Projects"
              subtitle="Explore residential, commercial, structural, and finishing work executed to the highest standards."
            />
            <div className="flex flex-wrap gap-2">
              {projectCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`font-display border px-3.5 py-2 text-xs uppercase tracking-[0.14em] transition-colors ${
                    selectedCategory === cat
                      ? "border-ink bg-ink text-gold"
                      : "border-border bg-card text-muted-foreground hover:border-ink/40 hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project, idx) => (
              <Reveal key={project.slug} delay={idx * 0.08}>
                <article className="group flex h-full flex-col overflow-hidden border border-border bg-card transition-shadow hover:shadow-lg">
                  <div className="relative aspect-[16/10] overflow-hidden bg-ink/10">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute left-3 top-3">
                      <span className="font-display bg-ink/90 px-2.5 py-1 text-[0.625rem] uppercase tracking-[0.16em] text-gold backdrop-blur-xs">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <h3 className="font-display text-lg uppercase tracking-[0.04em] text-foreground sm:text-xl">
                      {project.title}
                    </h3>
                    <p className="mt-2.5 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {project.summary}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-1.5 border-t border-border pt-4">
                      {project.scope.slice(0, 3).map((item) => (
                        <span
                          key={item}
                          className="bg-secondary px-2 py-0.5 text-[0.6875rem] font-medium text-muted-foreground"
                        >
                          {item}
                        </span>
                      ))}
                      {project.scope.length > 3 ? (
                        <span className="bg-secondary px-2 py-0.5 text-[0.6875rem] font-medium text-muted-foreground">
                          +{project.scope.length - 3} more
                        </span>
                      ) : null}
                    </div>

                    <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
                      <button
                        type="button"
                        onClick={() => setActiveProject(project)}
                        className="font-display inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.16em] text-ink transition-colors hover:text-gold-deep"
                      >
                        <Eye className="size-3.5" aria-hidden="true" />
                        View Details
                      </button>
                      <button
                        type="button"
                        onClick={() => openEnquiry(project.category)}
                        className="font-display inline-flex items-center gap-1 text-xs uppercase tracking-[0.16em] text-gold-deep hover:underline"
                      >
                        Inquire
                        <ArrowRight className="size-3.5" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Construction Process Section */}
      <section id="process" className="section-pad bg-ink text-on-ink">
        <div className="blueprint-grid-dark absolute inset-0 opacity-20" aria-hidden="true" />
        <div className="shell relative">
          <SectionHeading
            eyebrow="Our Process"
            tone="dark"
            title="How We Deliver Your Build"
            subtitle="A transparent, coordinated roadmap from the initial drawing review to key handover."
          />

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {processSteps.map((step, idx) => (
              <Reveal key={step.number} delay={idx * 0.08}>
                <div className="relative flex h-full flex-col border border-on-ink/15 bg-ink-soft/60 p-6 backdrop-blur-xs transition-colors hover:border-gold/60">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-2xl font-black text-gold">
                      {step.number}
                    </span>
                    <span className="h-px w-12 bg-on-ink/20" aria-hidden="true" />
                  </div>
                  <h3 className="font-display mt-5 text-lg uppercase tracking-[0.06em] text-on-ink">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-on-ink-muted">{step.body}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Button variant="gold" size="ctaLg" onClick={() => openEnquiry()}>
              Book A Free Project Consultation
              <ArrowRight aria-hidden="true" />
            </Button>
          </div>
        </div>
      </section>

      {/* 7. Why Winnet Section */}
      <section id="why-winnet" className="section-pad bg-secondary/50">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionHeading
                eyebrow="Why Winnet"
                title="Built With Integrity & Engineered Precision"
                subtitle="We pride ourselves on disciplined project management, vetted tradesmen, and honest communication."
              />

              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                {whyPillars.map((pillar, idx) => (
                  <Reveal key={pillar.title} delay={idx * 0.06}>
                    <div className="border border-border bg-card p-5">
                      <div className="flex size-9 items-center justify-center bg-gold text-ink">
                        <CheckCircle2 className="size-5" />
                      </div>
                      <h3 className="font-display mt-4 text-sm uppercase tracking-[0.12em] text-ink">
                        {pillar.title}
                      </h3>
                      <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                        {pillar.body}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="border border-ink/10 bg-ink p-8 text-on-ink">
                <p className="eyebrow text-gold">Direct Oversight</p>
                <h3 className="h-display mt-3 text-2xl text-on-ink">
                  Every Site Supervised By Experienced Builders
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-on-ink-muted">
                  We don't leave your investment to chance. From steel reinforcement binding to
                  mortar batch consistency and plumbing pressure tests, critical milestones are
                  supervised and signed off.
                </p>
                <div className="mt-6 flex flex-wrap gap-4 border-t border-on-ink/15 pt-6">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="size-6 text-gold" />
                    <div>
                      <p className="font-display text-xs uppercase tracking-[0.14em] text-on-ink">
                        Quality Checked
                      </p>
                      <p className="text-[0.6875rem] text-on-ink-muted">Standardized testing</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <CalendarCheck className="size-6 text-gold" />
                    <div>
                      <p className="font-display text-xs uppercase tracking-[0.14em] text-on-ink">
                        Clear Timeline
                      </p>
                      <p className="text-[0.6875rem] text-on-ink-muted">Milestone tracking</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border border-border bg-card p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-display text-base uppercase tracking-[0.1em] text-ink">
                      Direct Builder Line
                    </h4>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Call or WhatsApp directly for active site inquiries: {company.phoneLocal}
                    </p>
                  </div>
                  <Button variant="outlineInk" size="sm" asChild>
                    <a href={telHref}>
                      <Phone className="size-3.5" />
                      Call
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Gallery / On-Site Highlights */}
      <section className="section-pad bg-background">
        <div className="shell">
          <SectionHeading
            eyebrow="On Site"
            title="Materials, Craftsmanship & Blueprints"
            subtitle="A closer look at active construction stages, steel frames, masonry, and architectural plans."
          />

          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {gallery.map((item, idx) => (
              <Reveal key={item.label} delay={idx * 0.05}>
                <button
                  type="button"
                  onClick={() => setActiveGalleryImg(item)}
                  className="group relative aspect-square w-full overflow-hidden border border-border bg-ink text-left"
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    className="h-full w-full object-cover opacity-85 transition-[transform,opacity] duration-500 group-hover:scale-108 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute inset-x-0 bottom-0 p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <p className="font-display text-xs uppercase tracking-[0.14em] text-gold">
                      {item.label}
                    </p>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FAQs Section */}
      <section id="faqs" className="section-pad bg-secondary/60">
        <div className="shell max-w-4xl">
          <SectionHeading
            eyebrow="FAQ"
            title="Frequently Asked Questions"
            subtitle="Answers to common questions regarding construction costs, project timelines, and planning."
            align="center"
          />

          <div className="mt-12 space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = expandedFaq === index;
              return (
                <div
                  key={faq.q}
                  className="border border-border bg-card transition-colors hover:border-ink/30"
                >
                  <button
                    type="button"
                    onClick={() => setExpandedFaq(isOpen ? null : index)}
                    className="flex w-full items-center justify-between p-5 text-left transition-colors sm:p-6"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display text-sm uppercase tracking-[0.06em] text-foreground sm:text-base">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`size-5 shrink-0 text-muted-foreground transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-gold-deep" : ""
                      }`}
                    />
                  </button>
                  {isOpen ? (
                    <div className="border-t border-border/80 px-5 pb-6 pt-4 text-sm leading-relaxed text-muted-foreground sm:px-6">
                      {faq.a}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 10. Final Call to Action */}
      <section className="relative overflow-hidden bg-ink py-20 text-on-ink lg:py-28">
        <div className="blueprint-grid-dark absolute inset-0 opacity-30" aria-hidden="true" />
        <div className="shell relative text-center">
          <p className="eyebrow text-gold">Ready to build?</p>
          <h2 className="h-display mx-auto mt-4 max-w-3xl text-3xl sm:text-5xl lg:text-6xl">
            Let's Bring Your Construction Vision To Life.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base text-on-ink-muted sm:text-lg">
            Reach out for a detailed estimate, drawing review, or on-site consultation in Ghana.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Button variant="gold" size="ctaLg" onClick={() => openEnquiry()}>
              Start Your Project Today
              <ArrowRight aria-hidden="true" />
            </Button>
            <Button variant="outlineLight" size="ctaLg" asChild>
              <a href={telHref}>
                <Phone aria-hidden="true" />
                Call {company.phoneLocal}
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Modal: Project Detail View */}
      <AnimatePresence>
        {activeProject ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveProject(null)}
              className="absolute inset-0 bg-ink/80 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto border border-border bg-card p-6 shadow-2xl sm:p-8"
            >
              <button
                type="button"
                onClick={() => setActiveProject(null)}
                className="absolute right-4 top-4 flex size-8 items-center justify-center border border-border text-muted-foreground hover:text-foreground"
                aria-label="Close project modal"
              >
                <X className="size-5" />
              </button>

              <div className="flex items-center gap-2">
                <span className="font-display bg-gold px-2.5 py-1 text-[0.625rem] uppercase tracking-[0.16em] text-ink">
                  {activeProject.category}
                </span>
                <span className="text-xs text-muted-foreground">{activeProject.location}</span>
              </div>

              <h3 className="h-display mt-4 text-2xl text-foreground sm:text-3xl">
                {activeProject.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{activeProject.summary}</p>

              <div className="mt-6 aspect-[16/9] overflow-hidden bg-ink/10">
                <img
                  src={activeProject.image}
                  alt={activeProject.title}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground">
                <div>
                  <h4 className="font-display text-xs uppercase tracking-[0.16em] text-foreground">
                    Project Scope
                  </h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {activeProject.scope.map((s) => (
                      <span
                        key={s}
                        className="bg-secondary px-3 py-1 text-xs font-medium text-foreground"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="border border-border p-4">
                    <h5 className="font-display text-xs uppercase tracking-[0.14em] text-foreground">
                      Overview &amp; Brief
                    </h5>
                    <p className="mt-1 text-xs text-muted-foreground">{activeProject.brief}</p>
                  </div>
                  <div className="border border-border p-4">
                    <h5 className="font-display text-xs uppercase tracking-[0.14em] text-foreground">
                      Execution &amp; Delivery
                    </h5>
                    <p className="mt-1 text-xs text-muted-foreground">{activeProject.work}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:justify-end">
                <Button variant="outlineInk" onClick={() => setActiveProject(null)}>
                  Close
                </Button>
                <Button
                  variant="gold"
                  onClick={() => {
                    const cat = activeProject.category;
                    setActiveProject(null);
                    openEnquiry(cat);
                  }}
                >
                  Inquire About Similar Project
                </Button>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      {/* Modal: Lightbox Gallery View */}
      <AnimatePresence>
        {activeGalleryImg ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveGalleryImg(null)}
              className="absolute inset-0 bg-ink/90 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-h-[85vh] max-w-4xl overflow-hidden border border-on-ink/20 bg-ink p-4"
            >
              <button
                type="button"
                onClick={() => setActiveGalleryImg(null)}
                className="absolute right-4 top-4 z-10 flex size-8 items-center justify-center bg-ink/80 text-on-ink hover:text-gold"
                aria-label="Close image lightbox"
              >
                <X className="size-5" />
              </button>
              <img
                src={activeGalleryImg.src}
                alt={activeGalleryImg.alt}
                className="max-h-[70vh] w-auto object-contain"
              />
              <p className="font-display mt-3 text-center text-xs uppercase tracking-[0.16em] text-gold">
                {activeGalleryImg.label}
              </p>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
