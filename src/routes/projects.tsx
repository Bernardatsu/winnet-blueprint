import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Eye, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Reveal, SectionHeading } from "@/components/Reveal";
import { Button } from "@/components/ui/button";
import { useEnquiry } from "@/components/enquiry/EnquiryProvider";
import { company, projects, projectCategories, type Project } from "@/config/site";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: `Projects & Portfolio | ${company.name}` },
      {
        name: "description",
        content: `Explore completed and active construction projects by ${company.name}.`,
      },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const { openEnquiry } = useEnquiry();
  const [category, setCategory] = useState<string>("All");
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  const filtered = category === "All" ? projects : projects.filter((p) => p.category === category);

  return (
    <div className="flex flex-col pt-20">
      {/* Header */}
      <section className="relative overflow-hidden bg-ink py-20 text-on-ink lg:py-28">
        <div className="blueprint-grid-dark absolute inset-0 opacity-30" aria-hidden="true" />
        <div className="shell relative">
          <p className="eyebrow text-gold">Portfolio</p>
          <h1 className="h-display mt-4 text-4xl sm:text-6xl lg:text-7xl">
            Our Construction Projects
          </h1>
          <p className="mt-6 max-w-2xl text-base text-on-ink-muted sm:text-lg">
            A showcase of residential structures, commercial developments, structural works, and
            specialized finishes.
          </p>
        </div>
      </section>

      {/* Grid with Filter */}
      <section className="section-pad bg-background">
        <div className="shell">
          <div className="flex flex-wrap gap-2 border-b border-border pb-6">
            {projectCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`font-display border px-4 py-2 text-xs uppercase tracking-[0.14em] transition-colors ${
                  category === cat
                    ? "border-ink bg-ink text-gold"
                    : "border-border bg-card text-muted-foreground hover:border-ink/40 hover:text-foreground"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project, idx) => (
              <Reveal key={project.slug} delay={idx * 0.06}>
                <article className="group flex h-full flex-col overflow-hidden border border-border bg-card transition-shadow hover:shadow-lg">
                  <div className="relative aspect-[16/10] overflow-hidden bg-ink/10">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute left-3 top-3">
                      <span className="font-display bg-ink/90 px-2.5 py-1 text-[0.625rem] uppercase tracking-[0.16em] text-gold">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-lg uppercase tracking-[0.04em] text-foreground sm:text-xl">
                      {project.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {project.summary}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-1.5 border-t border-border pt-4">
                      {project.scope.map((s) => (
                        <span
                          key={s}
                          className="bg-secondary px-2 py-0.5 text-[0.6875rem] font-medium text-muted-foreground"
                        >
                          {s}
                        </span>
                      ))}
                    </div>

                    <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                      <button
                        type="button"
                        onClick={() => setActiveProject(project)}
                        className="font-display inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.16em] text-ink hover:text-gold-deep"
                      >
                        <Eye className="size-3.5" />
                        Details
                      </button>
                      <button
                        type="button"
                        onClick={() => openEnquiry(project.category)}
                        className="font-display inline-flex items-center gap-1 text-xs uppercase tracking-[0.16em] text-gold-deep hover:underline"
                      >
                        Inquire
                        <ArrowRight className="size-3.5" />
                      </button>
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
              className="absolute inset-0 bg-ink/80 backdrop-blur-xs"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto border border-border bg-card p-6 shadow-2xl sm:p-8"
            >
              <button
                type="button"
                onClick={() => setActiveProject(null)}
                className="absolute right-4 top-4 flex size-8 items-center justify-center border border-border text-muted-foreground hover:text-foreground"
              >
                <X className="size-5" />
              </button>

              <span className="font-display bg-gold px-2.5 py-1 text-[0.625rem] uppercase tracking-[0.16em] text-ink">
                {activeProject.category}
              </span>
              <h3 className="h-display mt-3 text-2xl text-foreground sm:text-3xl">
                {activeProject.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">{activeProject.summary}</p>

              <div className="mt-5 aspect-[16/9] overflow-hidden bg-ink/10">
                <img
                  src={activeProject.image}
                  alt={activeProject.title}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="mt-6 space-y-3 text-sm text-muted-foreground">
                <p>
                  <strong className="text-foreground">Scope:</strong>{" "}
                  {activeProject.scope.join(", ")}
                </p>
                <p>
                  <strong className="text-foreground">Brief:</strong> {activeProject.brief}
                </p>
                <p>
                  <strong className="text-foreground">Delivery:</strong> {activeProject.work}
                </p>
              </div>

              <div className="mt-6 flex justify-end gap-3 border-t border-border pt-4">
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
                  Inquire Now
                </Button>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
