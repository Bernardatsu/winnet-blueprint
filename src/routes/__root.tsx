import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { ArrowLeft, HardHat, Home, Sparkles } from "lucide-react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { EnquiryProvider, useEnquiry } from "@/components/enquiry/EnquiryProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { Toaster } from "@/components/ui/sonner";
import { Button } from "@/components/ui/button";
import { company, services } from "@/config/site";

function NotFoundComponent() {
  const { openEnquiry } = useEnquiry();

  return (
    <div className="relative flex min-h-[80vh] items-center justify-center overflow-hidden bg-ink px-4 py-24 text-on-ink">
      <div className="blueprint-grid-dark absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="shell relative max-w-xl text-center">
        <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-gold/15 border border-gold/30 text-gold shadow-lg shadow-gold/5">
          <HardHat className="size-8" />
        </div>
        <p className="eyebrow mt-6 text-gold">404 Error • Structure Not Found</p>
        <h1 className="h-display mt-3 text-3xl sm:text-5xl text-on-ink leading-tight">
          Looks Like This Page Wasn't Built Yet.
        </h1>
        <p className="mt-4 text-sm sm:text-base leading-relaxed text-on-ink-muted">
          The page or blueprint you are searching for might have been moved, removed, or is still in
          the planning phase.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button variant="outlineLight" size="cta" asChild>
            <Link to="/">
              <ArrowLeft className="size-4" />
              BACK HOME
            </Link>
          </Button>
          <Button variant="gold" size="cta" onClick={() => openEnquiry()}>
            <Sparkles className="size-4" />
            START A PROJECT
          </Button>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-lg bg-gold text-ink font-bold px-4 py-2 text-sm transition-colors hover:bg-gold-deep"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-lg border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

import { getGeneralContractorSchema } from "@/lib/seo";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "google-site-verification", content: "google4cfcc257bdd58937" },
      { title: `${company.name} | ${company.motto}` },
      {
        name: "description",
        content:
          "Professional residential, commercial, and civil construction services in Ghana. Quality workmanship, careful planning, and dependable project delivery.",
      },
      { name: "author", content: company.name },
      { name: "theme-color", content: "#0d0d0d" },
      { property: "og:site_name", content: company.name },
      { property: "og:title", content: `${company.name} | ${company.motto}` },
      {
        property: "og:description",
        content:
          "Professional residential, commercial, and civil construction services in Ghana. Quality workmanship, careful planning, and dependable project delivery.",
      },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_GH" },
      { property: "og:image", content: "/winnet-logo-horizontal.svg" },
      { property: "og:image:alt", content: `${company.name} — ${company.motto}` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: `${company.name} | ${company.motto}` },
      {
        name: "twitter:description",
        content:
          "Professional residential, commercial, and civil construction services in Ghana. Quality workmanship, careful planning, and dependable project delivery.",
      },
      { name: "twitter:image", content: "/winnet-logo-horizontal.svg" },
    ],
    links: [
      { rel: "preconnect", href: "https://images.unsplash.com" },
      { rel: "dns-prefetch", href: "https://images.unsplash.com" },
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "apple-touch-icon", href: "/winnet-icon-square-512.svg" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(getGeneralContractorSchema()),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <EnquiryProvider>
        <div className="flex min-h-screen flex-col bg-background text-foreground">
          <Navbar />
          <main className="flex-1">
            <Outlet />
          </main>
          <Footer />
          <WhatsAppButton />
          <Toaster />
        </div>
      </EnquiryProvider>
    </QueryClientProvider>
  );
}
