import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  HardHat,
  MapPin,
  MessageCircle,
  Phone,
  Quote,
  ShieldCheck,
  Sparkles,
  Star,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import { Hero } from "@/components/sections/Hero";
import { TrustBar } from "@/components/sections/TrustBar";
import { AboutSection } from "@/components/sections/AboutSection";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { Reveal, SectionHeading } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { useEnquiry } from "@/components/enquiry/EnquiryProvider";
import { ProjectEnquiryForm } from "@/components/enquiry/ProjectEnquiryForm";
import {
  company,
  faqs,
  gallery,
  images,
  journeySteps,
  processSteps,
  projectCategories,
  projects,
  testimonials,
  whyPillars,
  type Project,
  telHref,
} from "@/config/site";
import { buildSeoMeta, homeSeoConfig } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => buildSeoMeta(homeSeoConfig),
  component: HomePage,
});

function HomePage() {
  const { openEnquiry } = useEnquiry();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  const [activeGalleryImg, setActiveGalleryImg] = useState<(typeof gallery)[number] | null>(null);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  const filteredProjects =
    selectedCategory === "All" ? projects : projects.filter((p) => p.category === selectedCategory);

  const nextTestimonial = () => {
    setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setTestimonialIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

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
              {projectCategories.map((cat) => {
                const active = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`font-display rounded-lg px-3.5 py-2 text-xs uppercase tracking-[0.14em] transition-all ${
                      active
                        ? "bg-gold text-ink font-bold shadow-md shadow-gold/20"
                        : "glass-panel text-muted-foreground hover:border-ink/40 hover:text-foreground"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProjects.map((project, idx) => (
              <Reveal key={project.slug} delay={idx * 0.06}>
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl glass-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-gold/50">
                  <div className="relative aspect-[16/10] overflow-hidden bg-ink">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute left-3 top-3">
                      <span className="font-display rounded-md glass-badge px-2.5 py-1 text-[0.625rem] uppercase tracking-[0.16em] text-gold font-bold">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="size-3 text-gold" />
                      <span>{project.location}</span>
                    </div>

                    <h3 className="font-display mt-2 text-lg uppercase tracking-[0.04em] text-foreground sm:text-xl">
                      {project.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                      {project.summary}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-1.5 border-t border-border/70 pt-4">
                      {project.scope.slice(0, 3).map((item) => (
                        <span
                          key={item}
                          className="rounded-md bg-secondary/80 px-2.5 py-0.5 text-[0.6875rem] font-semibold text-muted-foreground border border-border/40"
                        >
                          {item}
                        </span>
                      ))}
                      {project.scope.length > 3 ? (
                        <span className="rounded-md bg-secondary/80 px-2 py-0.5 text-[0.6875rem] font-semibold text-muted-foreground border border-border/40">
                          +{project.scope.length - 3} more
                        </span>
                      ) : null}
                    </div>

                    <div className="mt-5 flex items-center justify-between border-t border-border/70 pt-4">
                      <button
                        type="button"
                        onClick={() => setActiveProject(project)}
                        className="font-display inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.14em] text-ink transition-colors hover:text-gold font-bold"
                      >
                        <Eye className="size-3.5" aria-hidden="true" />
                        Quick View
                      </button>
                      <Link
                        to="/projects/$slug"
                        params={{ slug: project.slug }}
                        className="font-display inline-flex items-center gap-1 text-xs uppercase tracking-[0.14em] text-gold-deep hover:underline font-bold"
                      >
                        Case Study
                        <ArrowRight className="size-3.5" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Button variant="outlineInk" size="cta" asChild>
              <Link to="/projects">
                View All Projects &amp; Specs
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 6. Construction Process & Blueprint Journey */}
      <section id="process" className="section-pad relative overflow-hidden bg-ink text-on-ink">
        <img
          src={images.blueprint}
          alt="Architectural plan blueprint"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover brightness-[0.88] contrast-[1.05]"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/65 to-ink/40"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/20"
          aria-hidden="true"
        />
        <div className="blueprint-grid-dark absolute inset-0 opacity-15" aria-hidden="true" />
        <div className="shell relative z-10">
          <SectionHeading
            eyebrow="Our Process"
            tone="dark"
            title="How We Deliver Your Build"
            subtitle="A transparent, coordinated roadmap from the initial drawing review to key handover."
          />

          {/* Blueprint Journey Visual Pill Steps */}
          <div className="mt-10 overflow-x-auto pb-4">
            <div className="flex min-w-[600px] items-center justify-between rounded-2xl glass-card-dark p-4">
              {journeySteps.map((step, idx) => (
                <div key={step} className="flex items-center gap-3">
                  <span className="flex size-8 items-center justify-center rounded-full bg-gold text-xs font-black text-ink shadow-sm">
                    0{idx + 1}
                  </span>
                  <span className="font-display text-sm font-bold uppercase tracking-[0.16em] text-on-ink">
                    {step}
                  </span>
                  {idx < journeySteps.length - 1 ? (
                    <ArrowRight className="size-4 text-on-ink/30 mx-2" />
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          {/* 6 Detail Steps */}
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {processSteps.map((step, idx) => (
              <Reveal key={step.number} delay={idx * 0.06}>
                <div className="group relative flex h-full flex-col rounded-2xl glass-card-dark p-6 transition-all duration-300 hover:-translate-y-1 hover:border-gold hover:shadow-2xl">
                  <div className="flex items-center justify-between">
                    <span className="font-display text-2xl font-black text-gold">
                      {step.number}
                    </span>
                    <span
                      className="h-px w-12 bg-on-ink/20 group-hover:bg-gold transition-colors"
                      aria-hidden="true"
                    />
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
      <section id="why-winnet" className="section-pad bg-secondary/40">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <SectionHeading
                eyebrow="Why Winnet"
                title="Built With Integrity &amp; Engineered Precision"
                subtitle="We pride ourselves on disciplined project management, vetted tradesmen, and honest communication."
              />

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {whyPillars.map((pillar, idx) => (
                  <Reveal key={pillar.title} delay={idx * 0.06}>
                    <div className="rounded-xl glass-card p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/60 hover:shadow-lg">
                      <div className="flex size-9 items-center justify-center rounded-lg bg-gold text-ink shadow-xs">
                        <CheckCircle2 className="size-5" />
                      </div>
                      <h3 className="font-display mt-4 text-sm uppercase tracking-[0.12em] text-ink font-bold">
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
              <div className="rounded-3xl glass-card-dark p-8 text-white shadow-2xl">
                <p className="eyebrow text-gold font-bold">Direct Oversight</p>
                <h3 className="h-display mt-3 text-2xl text-white sm:text-3xl font-bold">
                  Every Site Supervised By Experienced Builders
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-white/95 font-medium">
                  We don't leave your investment to chance. From steel reinforcement binding to
                  mortar batch consistency and plumbing pressure tests, critical milestones are
                  supervised and signed off.
                </p>
                <div className="mt-6 flex flex-wrap gap-4 border-t border-white/20 pt-6">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-gold/20 text-gold border border-gold/40 shadow-sm">
                      <ShieldCheck className="size-6" />
                    </div>
                    <div>
                      <p className="font-display text-xs uppercase tracking-[0.14em] text-white font-bold">
                        Quality Checked
                      </p>
                      <p className="text-[0.6875rem] text-white/85 font-medium">
                        Standardized testing
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-xl bg-gold/20 text-gold border border-gold/40 shadow-sm">
                      <HardHat className="size-6" />
                    </div>
                    <div>
                      <p className="font-display text-xs uppercase tracking-[0.14em] text-white font-bold">
                        Clear Timeline
                      </p>
                      <p className="text-[0.6875rem] text-white/85 font-medium">
                        Milestone tracking
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl glass-card p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h4 className="font-display text-base uppercase tracking-[0.1em] text-ink font-bold">
                      Direct Builder Line
                    </h4>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Call or WhatsApp directly for active site inquiries: {company.phoneLocal}
                    </p>
                  </div>
                  <Button
                    variant="outlineInk"
                    size="sm"
                    asChild
                    className="shrink-0 bg-white/30 backdrop-blur-xs border-black/10"
                  >
                    <a href={telHref}>
                      <Phone className="size-3.5" />
                      Call Builder
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Gallery Highlights */}
      <section className="section-pad bg-background">
        <div className="shell">
          <div className="flex items-end justify-between">
            <SectionHeading
              eyebrow="On Site"
              title="Materials, Craftsmanship &amp; Blueprints"
              subtitle="A closer look at active construction stages, steel frames, masonry, and architectural plans."
            />
            <Button variant="outlineInk" size="sm" asChild className="hidden sm:inline-flex">
              <Link to="/gallery">
                View Full Gallery
                <ArrowRight className="size-3.5" />
              </Link>
            </Button>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {gallery.map((item, idx) => (
              <Reveal key={item.label} delay={idx * 0.04}>
                <button
                  type="button"
                  onClick={() => setActiveGalleryImg(item)}
                  className="group relative aspect-square w-full overflow-hidden rounded-2xl border border-border bg-ink text-left shadow-xs transition-shadow hover:shadow-lg"
                >
                  <img
                    src={item.src}
                    alt={item.alt}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover opacity-85 transition-[transform,opacity] duration-500 group-hover:scale-108 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute inset-x-0 bottom-0 p-3.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <p className="font-display text-xs uppercase tracking-[0.14em] text-gold font-bold">
                      {item.label}
                    </p>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Testimonials Carousel */}
      <section className="section-pad relative overflow-hidden bg-ink text-on-ink">
        <div className="blueprint-grid-dark absolute inset-0 opacity-20" aria-hidden="true" />
        <div className="shell relative z-10">
          <div className="flex flex-col items-center text-center">
            <p className="eyebrow text-gold font-bold">Client Experience</p>
            <h2 className="h-display mt-2 text-3xl sm:text-4xl lg:text-5xl text-white font-bold">
              Feedback &amp; Client Reputation
            </h2>
            <div className="mt-3 inline-flex items-center gap-2 rounded-full glass-badge px-4 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-gold">
              <Sparkles className="size-3.5" />
              Verified Client Reviews &amp; Project Handouts
            </div>
          </div>

          <div className="mx-auto mt-12 max-w-3xl">
            <div className="relative rounded-3xl glass-card-dark p-8 sm:p-12 text-center shadow-2xl backdrop-blur-3xl">
              <Quote className="mx-auto size-10 text-gold/60" />

              {/* Star Rating */}
              <div className="mt-4 flex items-center justify-center gap-1">
                {Array.from({ length: testimonials[testimonialIndex]?.rating || 5 }).map((_, i) => (
                  <Star key={i} className="size-4 fill-gold text-gold" />
                ))}
              </div>

              {/* Project Type Badge */}
              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 text-xs font-medium text-white backdrop-blur-xs">
                <span>{testimonials[testimonialIndex]?.projectType}</span>
                <span className="text-white/40">•</span>
                <span className="flex items-center gap-1 text-gold">
                  <MapPin className="size-3" />
                  {testimonials[testimonialIndex]?.location}
                </span>
              </div>

              <p className="mt-6 text-lg sm:text-2xl leading-relaxed text-white font-light italic">
                "{testimonials[testimonialIndex]?.quote}"
              </p>

              <div className="mt-8 border-t border-white/15 pt-6">
                <p className="font-display text-base uppercase tracking-[0.16em] text-gold font-bold">
                  {testimonials[testimonialIndex]?.name}
                </p>
                <p className="mt-0.5 text-xs text-white/80 font-medium">
                  {testimonials[testimonialIndex]?.role}
                </p>
              </div>

              {/* Prev / Next controls */}
              <div className="mt-8 flex items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={prevTestimonial}
                  className="flex size-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-gold hover:text-ink hover:border-gold transition-colors shadow-sm"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="size-5" />
                </button>

                <div className="flex items-center gap-2 px-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setTestimonialIndex(i)}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        testimonialIndex === i
                          ? "w-8 bg-gold shadow-xs"
                          : "w-2.5 bg-white/30 hover:bg-white/60"
                      }`}
                      aria-label={`Go to testimonial ${i + 1}`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={nextTestimonial}
                  className="flex size-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-gold hover:text-ink hover:border-gold transition-colors shadow-sm"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="size-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. FAQs Section */}
      <section id="faqs" className="section-pad bg-secondary/40">
        <div className="shell max-w-4xl">
          <SectionHeading
            eyebrow="FAQ"
            title="Frequently Asked Questions"
            subtitle="Answers to common questions regarding construction costs, project timelines, and planning."
            align="center"
          />

          <div className="mt-12 space-y-3.5">
            {faqs.map((faq, index) => {
              const isOpen = expandedFaq === index;
              return (
                <div
                  key={faq.q}
                  className="rounded-xl glass-card transition-all hover:border-ink/30 overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setExpandedFaq(isOpen ? null : index)}
                    className="flex w-full items-center justify-between p-5 text-left transition-colors sm:p-6"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display text-sm uppercase tracking-[0.06em] text-foreground sm:text-base font-bold">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`size-5 shrink-0 text-muted-foreground transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-gold-deep" : ""
                      }`}
                    />
                  </button>
                  {isOpen ? (
                    <div className="border-t border-border/70 px-5 pb-6 pt-4 text-sm leading-relaxed text-muted-foreground sm:px-6">
                      {faq.a}
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 11. Embedded Direct Contact / Consultation Section */}
      <section
        id="contact"
        className="section-pad relative overflow-hidden bg-background border-t border-border/60"
      >
        <div className="blueprint-grid absolute inset-0 opacity-40" aria-hidden="true" />
        <div className="shell relative z-10">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
            <div>
              <SectionHeading
                eyebrow="Get In Touch"
                title="Discuss Your Next Construction Project"
                subtitle="Share your site location, scope, or drawings. We review every request and respond with next practical steps."
              />

              <div className="mt-8 space-y-4">
                <div className="rounded-2xl glass-card p-5 shadow-lg">
                  <p className="eyebrow text-gold-deep">Direct Builder Line</p>
                  <a
                    href={telHref}
                    className="font-display mt-1 block text-lg font-bold uppercase text-ink hover:text-gold transition-colors"
                  >
                    {company.phoneDisplay}
                  </a>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Available for site assessments and urgent project inquiries.
                  </p>
                </div>

                <div className="rounded-2xl glass-card p-5 shadow-lg">
                  <p className="eyebrow text-gold-deep">Official Email</p>
                  <a
                    href={`mailto:${company.email}`}
                    className="font-display mt-1 block text-base font-bold text-ink hover:text-gold break-all transition-colors"
                  >
                    {company.email}
                  </a>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Send blueprints, CAD drawings, or bills of quantities.
                  </p>
                </div>
              </div>
            </div>

            {/* Embedded Form Container */}
            <div className="rounded-3xl glass-card p-6 sm:p-8 shadow-2xl">
              <h3 className="font-display text-xl uppercase tracking-[0.06em] text-foreground mb-6">
                Send Project Enquiry
              </h3>
              <ProjectEnquiryForm />
            </div>
          </div>
        </div>
      </section>

      {/* 12. Final Call to Action */}
      <section className="relative overflow-hidden bg-ink py-20 text-on-ink lg:py-28">
        <img
          src={images.cta}
          alt="Modern architectural construction development"
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover brightness-[0.88] contrast-[1.05]"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/60 to-ink/40"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-ink/20"
          aria-hidden="true"
        />
        <div className="blueprint-grid-dark absolute inset-0 opacity-15" aria-hidden="true" />
        <div className="shell relative z-10 text-center">
          <div className="mx-auto max-w-3xl rounded-3xl glass-card-dark p-8 sm:p-12 backdrop-blur-3xl shadow-[inset_0_1.5px_1px_rgba(255,255,255,0.4),0_30px_70px_rgba(0,0,0,0.6)]">
            <p className="eyebrow text-gold">Ready to build?</p>
            <h2 className="h-display mx-auto mt-4 text-3xl sm:text-5xl lg:text-6xl">
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
        </div>
      </section>

      {/* Modal: Project Detail Quick View */}
      <AnimatePresence>
        {activeProject ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveProject(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl glass-card p-6 shadow-2xl sm:p-8"
            >
              <button
                type="button"
                onClick={() => setActiveProject(null)}
                className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-xl bg-white/40 border border-black/10 text-muted-foreground hover:text-foreground hover:bg-white/70 transition-colors"
                aria-label="Close project modal"
              >
                <X className="size-5" />
              </button>

              <div className="flex items-center gap-2">
                <span className="font-display rounded-md bg-gold px-2.5 py-1 text-[0.625rem] uppercase tracking-[0.16em] text-ink font-bold shadow-xs">
                  {activeProject.category}
                </span>
                <span className="text-xs text-muted-foreground font-medium">
                  {activeProject.location}
                </span>
              </div>

              <h3 className="h-display mt-4 text-2xl text-foreground sm:text-3xl">
                {activeProject.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{activeProject.summary}</p>

              <div className="mt-6 aspect-[16/9] overflow-hidden rounded-2xl bg-ink shadow-md">
                <img
                  src={activeProject.image}
                  alt={activeProject.title}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground">
                <div>
                  <h4 className="font-display text-xs uppercase tracking-[0.16em] text-foreground font-bold">
                    Project Scope
                  </h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {activeProject.scope.map((s) => (
                      <span
                        key={s}
                        className="rounded-lg bg-white/40 backdrop-blur-xs px-3 py-1 text-xs font-semibold text-foreground border border-black/10"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl glass-panel p-4">
                    <h5 className="font-display text-xs uppercase tracking-[0.14em] text-foreground font-bold">
                      Overview &amp; Brief
                    </h5>
                    <p className="mt-1 text-xs text-muted-foreground">{activeProject.brief}</p>
                  </div>
                  <div className="rounded-2xl glass-panel p-4">
                    <h5 className="font-display text-xs uppercase tracking-[0.14em] text-foreground font-bold">
                      Execution &amp; Delivery
                    </h5>
                    <p className="mt-1 text-xs text-muted-foreground">{activeProject.work}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 border-t border-black/10 pt-6 sm:flex-row sm:justify-end">
                <Button
                  variant="outlineInk"
                  onClick={() => setActiveProject(null)}
                  className="bg-white/30 backdrop-blur-xs border-black/10"
                >
                  Close
                </Button>
                <Button
                  variant="gold"
                  className="shadow-md shadow-gold/25"
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
              className="absolute inset-0 bg-black/75 backdrop-blur-lg"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-h-[85vh] max-w-4xl overflow-hidden rounded-3xl glass-card-dark p-4 shadow-2xl"
            >
              <button
                type="button"
                onClick={() => setActiveGalleryImg(null)}
                className="absolute right-4 top-4 z-10 flex size-8 items-center justify-center rounded-xl bg-black/60 border border-white/20 text-on-ink hover:text-gold transition-colors"
                aria-label="Close image lightbox"
              >
                <X className="size-5" />
              </button>
              <img
                src={activeGalleryImg.src}
                alt={activeGalleryImg.alt}
                loading="lazy"
                decoding="async"
                className="max-h-[70vh] w-auto rounded-xl object-contain mx-auto"
              />
              <p className="font-display mt-3 text-center text-xs uppercase tracking-[0.16em] text-gold font-bold">
                {activeGalleryImg.label}
              </p>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
