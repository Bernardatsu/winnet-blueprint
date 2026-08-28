import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Eye, MapPin, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Reveal, SectionHeading } from "@/components/Reveal";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { useEnquiry } from "@/components/enquiry/EnquiryProvider";
import { company, images, projects, projectCategories, type Project } from "@/config/site";
import { buildSeoMeta, projectsSeoConfig } from "@/lib/seo";

export const Route = createFileRoute("/projects")({
  head: () => buildSeoMeta(projectsSeoConfig),
  component: ProjectsPage,
});

function ProjectsPage() {
  const { openEnquiry } = useEnquiry();
  const [category, setCategory] = useState<string>("All");
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const filtered = category === "All" ? projects : projects.filter((p) => p.category === category);

  return (
    <div className="flex flex-col pt-20">
      {/* Header with image behind text */}
      <PageHeader
        eyebrow="Portfolio"
        title="Our Construction Projects"
        subtitle="A showcase of residential structures, commercial developments, structural works, and specialized finishes across Ghana."
        image={images.residential}
        imageAlt="Modern residential architectural building project"
      />

      {/* Grid with Filter */}
      <section className="section-pad bg-background">
        <div className="shell">
          <div className="flex flex-wrap gap-2 p-2 rounded-2xl glass-panel pb-3 mb-6">
            {projectCategories.map((cat) => {
              const active = category === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
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

          <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project, idx) => (
              <Reveal key={project.slug} delay={idx * 0.06}>
                <article className="group flex h-full flex-col overflow-hidden rounded-3xl glass-card transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-gold/50">
                  <div className="relative aspect-[16/10] overflow-hidden bg-ink">
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute left-3 top-3">
                      <span className="font-display rounded-lg glass-badge px-2.5 py-1 text-[0.625rem] uppercase tracking-[0.16em] text-gold font-bold">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
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

                    <div className="mt-4 flex flex-wrap gap-1.5 border-t border-border/80 pt-4">
                      {project.scope.slice(0, 4).map((s) => (
                        <span
                          key={s}
                          className="rounded-md bg-secondary/80 px-2.5 py-0.5 text-[0.6875rem] font-semibold text-muted-foreground"
                        >
                          {s}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-border/80 pt-4">
                      <button
                        type="button"
                        onClick={() => setActiveProject(project)}
                        className="font-display inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.14em] text-ink hover:text-gold font-bold transition-colors"
                      >
                        <Eye className="size-3.5" />
                        Quick View
                      </button>
                      <Link
                        to="/projects/$slug"
                        params={{ slug: project.slug }}
                        className="font-display inline-flex items-center gap-1 text-xs uppercase tracking-[0.14em] text-gold-deep hover:underline font-bold"
                      >
                        Full Case Study
                        <ArrowRight className="size-3.5" />
                      </Link>
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {activeProject ? (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveProject(null)}
              className="absolute inset-0 bg-ink/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl border border-border/80 bg-card/95 backdrop-blur-2xl p-6 shadow-2xl sm:p-8"
            >
              <button
                type="button"
                onClick={() => setActiveProject(null)}
                className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground"
                aria-label="Close project modal"
              >
                <X className="size-5" />
              </button>

              <div className="flex items-center gap-2">
                <span className="font-display rounded-md bg-gold px-2.5 py-1 text-[0.625rem] uppercase tracking-[0.16em] text-ink font-bold">
                  {activeProject.category}
                </span>
                <span className="text-xs text-muted-foreground">{activeProject.location}</span>
              </div>

              <h3 className="h-display mt-4 text-2xl text-foreground sm:text-3xl">
                {activeProject.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{activeProject.summary}</p>

              <div className="mt-6 aspect-[16/9] overflow-hidden rounded-2xl bg-ink">
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
                        className="rounded-lg bg-secondary px-3 py-1 text-xs font-semibold text-foreground border border-border/60"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-xl glass-panel p-4">
                    <h5 className="font-display text-xs uppercase tracking-[0.14em] text-foreground font-bold">
                      Overview &amp; Brief
                    </h5>
                    <p className="mt-1 text-xs text-muted-foreground">{activeProject.brief}</p>
                  </div>
                  <div className="rounded-xl glass-panel p-4">
                    <h5 className="font-display text-xs uppercase tracking-[0.14em] text-foreground font-bold">
                      Execution &amp; Delivery
                    </h5>
                    <p className="mt-1 text-xs text-muted-foreground">{activeProject.work}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:justify-between sm:items-center">
                <Button variant="outlineInk" size="sm" asChild>
                  <Link to="/projects/$slug" params={{ slug: activeProject.slug }}>
                    Open Full Case Study Page
                    <ArrowRight className="size-3.5" />
                  </Link>
                </Button>
                <div className="flex gap-3">
                  <Button variant="outlineInk" size="sm" onClick={() => setActiveProject(null)}>
                    Close
                  </Button>
                  <Button
                    variant="gold"
                    size="sm"
                    onClick={() => {
                      const cat = activeProject.category;
                      setActiveProject(null);
                      openEnquiry(cat);
                    }}
                  >
                    Inquire For Project
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
