import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Building,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Eye,
  HardHat,
  MapPin,
  Maximize2,
  ShieldCheck,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import { Reveal, SectionHeading } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { useEnquiry } from "@/components/enquiry/EnquiryProvider";
import { company, projects, type Project } from "@/config/site";
import { buildSeoMeta, getProjectDetailSeo, getProjectSchema, projectsSeoConfig } from "@/lib/seo";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = projects.find((p) => p.slug === params.slug);
    if (!project) {
      throw notFound();
    }
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData?.project) {
      return buildSeoMeta(projectsSeoConfig);
    }
    const seo = buildSeoMeta(getProjectDetailSeo(loaderData.project));
    return {
      ...seo,
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(getProjectSchema(loaderData.project)),
        },
      ],
    };
  },
  component: ProjectDetailPage,
});

function ProjectDetailPage() {
  const { project } = Route.useLoaderData();
  const { openEnquiry } = useEnquiry();
  const [activePhoto, setActivePhoto] = useState<string | null>(null);

  const relatedProjects = projects.filter((p) => p.slug !== project.slug).slice(0, 3);

  return (
    <div className="flex flex-col pt-20">
      {/* Breadcrumb & Navigation */}
      <section className="border-b border-border bg-secondary/40 py-4">
        <div className="shell flex items-center justify-between">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs text-muted-foreground"
          >
            <Link to="/" className="hover:text-foreground">
              Home
            </Link>
            <ChevronRight className="size-3 text-muted-foreground/60" />
            <Link to="/projects" className="hover:text-foreground">
              Projects
            </Link>
            <ChevronRight className="size-3 text-muted-foreground/60" />
            <span className="font-semibold text-foreground truncate max-w-[200px] sm:max-w-none">
              {project.title}
            </span>
          </nav>
          <Button variant="outlineInk" size="sm" asChild>
            <Link to="/projects">
              <ArrowLeft className="size-3.5" />
              All Projects
            </Link>
          </Button>
        </div>
      </section>

      {/* Hero Header with background image behind text */}
      <section className="relative overflow-hidden bg-ink py-16 text-on-ink sm:py-24 lg:py-28">
        <img
          src={project.image}
          alt={project.title}
          loading="eager"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-center brightness-[0.88] contrast-[1.05]"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/55 to-ink/25"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-ink/20"
          aria-hidden="true"
        />
        <div className="blueprint-grid-dark absolute inset-0 opacity-15" aria-hidden="true" />
        <div className="shell relative z-10">
          <div className="rounded-3xl glass-card-dark p-8 sm:p-12">
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-display rounded-md bg-gold px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-ink">
                {project.category}
              </span>
              <span className="flex items-center gap-1 text-xs text-on-ink-muted">
                <MapPin className="size-3.5 text-gold" />
                {project.location}
              </span>
              <span className="rounded-md border border-on-ink/20 px-2.5 py-0.5 text-[0.6875rem] text-on-ink-muted">
                Status: {project.status}
              </span>
            </div>

            <h1 className="h-display mt-5 text-3xl sm:text-5xl lg:text-6xl text-on-ink">
              {project.title}
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-on-ink-muted sm:text-lg">
              {project.summary}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button variant="gold" size="cta" onClick={() => openEnquiry(project.category)}>
                Inquire About Similar Project
                <ArrowRight className="size-4" />
              </Button>
              <Button
                variant="outlineLight"
                size="cta"
                onClick={() => setActivePhoto(project.image)}
              >
                <Eye className="size-4" />
                View Full Imagery
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Project Content & Scope */}
      <section className="section-pad bg-background">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-[1.8fr_1fr]">
            <div className="space-y-10">
              {/* Featured Image */}
              <div className="group relative aspect-[16/10] overflow-hidden rounded-3xl border border-border bg-ink shadow-md">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-103"
                />
                <button
                  type="button"
                  onClick={() => setActivePhoto(project.image)}
                  className="absolute bottom-4 right-4 flex size-10 items-center justify-center rounded-xl glass-badge text-on-ink hover:bg-gold hover:text-ink transition-colors"
                  aria-label="Enlarge image"
                >
                  <Maximize2 className="size-4" />
                </button>
              </div>

              {/* Narrative Breakdown */}
              <div className="space-y-8">
                <div className="rounded-2xl glass-card p-6 sm:p-8">
                  <h2 className="font-display text-lg uppercase tracking-[0.08em] text-foreground sm:text-xl">
                    1. Project Brief &amp; Client Goals
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {project.brief}
                  </p>
                </div>

                <div className="rounded-2xl glass-card p-6 sm:p-8">
                  <h2 className="font-display text-lg uppercase tracking-[0.08em] text-foreground sm:text-xl">
                    2. Site Conditions &amp; Technical Challenges
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {project.challenge}
                  </p>
                </div>

                <div className="rounded-2xl glass-card p-6 sm:p-8">
                  <h2 className="font-display text-lg uppercase tracking-[0.08em] text-foreground sm:text-xl">
                    3. Construction Execution &amp; Methodology
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {project.work}
                  </p>
                </div>

                <div className="rounded-2xl glass-card p-6 sm:p-8">
                  <h2 className="font-display text-lg uppercase tracking-[0.08em] text-foreground sm:text-xl">
                    4. Inspection, Snagging &amp; Final Result
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {project.result}
                  </p>
                </div>
              </div>

              {/* Project Gallery */}
              {project.gallery && project.gallery.length > 0 ? (
                <div>
                  <h3 className="eyebrow text-gold-deep">Visual Records</h3>
                  <h2 className="font-display mt-2 text-2xl uppercase text-foreground">
                    Project Gallery
                  </h2>
                  <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
                    {project.gallery.map((imgUrl, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActivePhoto(imgUrl)}
                        className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-border bg-ink"
                      >
                        <img
                          src={imgUrl}
                          alt={`${project.title} detail photo ${idx + 1}`}
                          loading="lazy"
                          decoding="async"
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-ink/30 opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center">
                          <Eye className="size-6 text-gold" />
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>

            {/* Sidebar Specifications */}
            <aside className="space-y-6">
              <div className="rounded-3xl glass-card p-6 sm:p-8 shadow-sm">
                <h3 className="font-display text-base uppercase tracking-[0.1em] text-foreground">
                  Project Scope &amp; Specifications
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.scope.map((item) => (
                    <span
                      key={item}
                      className="rounded-lg bg-secondary/80 px-3 py-1.5 text-xs font-semibold text-foreground border border-border/80"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <div className="mt-6 space-y-4 border-t border-border pt-6 text-xs text-muted-foreground">
                  <div className="flex justify-between py-1 border-b border-border/50">
                    <span className="font-medium text-foreground">Category</span>
                    <span>{project.category}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border/50">
                    <span className="font-medium text-foreground">Location</span>
                    <span>{project.location}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-border/50">
                    <span className="font-medium text-foreground">Oversight</span>
                    <span>Direct Site Supervision</span>
                  </div>
                </div>

                <div className="mt-8">
                  <Button
                    variant="gold"
                    size="cta"
                    className="w-full"
                    onClick={() => openEnquiry(project.category)}
                  >
                    Start Similar Build
                    <ArrowRight className="size-4" />
                  </Button>
                </div>
              </div>

              {/* Consultation Card */}
              <div className="rounded-3xl glass-card-dark p-6 text-on-ink">
                <p className="eyebrow text-gold">Ready To Build?</p>
                <h4 className="font-display mt-2 text-xl text-on-ink">
                  Have Drawings Or A Concept In Mind?
                </h4>
                <p className="mt-3 text-xs leading-relaxed text-on-ink-muted">
                  Share your architectural drawings or sketch with {company.name} for an accurate
                  cost estimation and milestone schedule.
                </p>
                <div className="mt-6">
                  <Button
                    variant="outlineLight"
                    size="sm"
                    className="w-full"
                    onClick={() => openEnquiry()}
                  >
                    Request Free Consultation
                  </Button>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 ? (
        <section className="section-pad bg-secondary/40 border-t border-border">
          <div className="shell">
            <div className="flex items-end justify-between">
              <SectionHeading
                eyebrow="More Work"
                title="Other Featured Projects"
                subtitle="Explore more building and structural works executed across our core capabilities."
              />
              <Button variant="outlineInk" size="sm" asChild className="hidden sm:inline-flex">
                <Link to="/projects">
                  View All Projects
                  <ArrowRight className="size-3.5" />
                </Link>
              </Button>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {relatedProjects.map((rel) => (
                <article
                  key={rel.slug}
                  className="group flex flex-col overflow-hidden rounded-3xl glass-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-ink">
                    <img
                      src={rel.image}
                      alt={rel.title}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute left-3 top-3">
                      <span className="font-display rounded-lg glass-badge px-2.5 py-1 text-[0.625rem] uppercase tracking-[0.16em] text-gold font-bold">
                        {rel.category}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="font-display text-base uppercase text-foreground">
                      {rel.title}
                    </h3>
                    <p className="mt-2 flex-1 text-xs leading-relaxed text-muted-foreground line-clamp-2">
                      {rel.summary}
                    </p>
                    <div className="mt-4 border-t border-border/80 pt-4">
                      <Button variant="outlineInk" size="sm" className="w-full" asChild>
                        <Link to="/projects/$slug" params={{ slug: rel.slug }}>
                          View Case Study
                        </Link>
                      </Button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activePhoto ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActivePhoto(null)}
              className="absolute inset-0 bg-ink/90 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-h-[88vh] max-w-5xl overflow-hidden rounded-3xl glass-card-dark p-3 sm:p-4 shadow-2xl backdrop-blur-2xl"
            >
              <button
                type="button"
                onClick={() => setActivePhoto(null)}
                className="absolute right-4 top-4 z-10 flex size-9 items-center justify-center rounded-xl bg-ink/80 text-on-ink hover:text-gold transition-colors"
                aria-label="Close image lightbox"
              >
                <X className="size-5" />
              </button>
              <img
                src={activePhoto}
                alt={`${project.title} full view`}
                className="max-h-[75vh] w-auto rounded-2xl object-contain mx-auto"
              />
              <p className="font-display mt-3 text-center text-xs uppercase tracking-[0.16em] text-gold font-bold">
                {project.title} • {project.category}
              </p>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
