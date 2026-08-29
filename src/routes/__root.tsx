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

import { getRootSchemas, DEFAULT_KEYWORDS, SITE_URL } from "@/lib/seo";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "google-site-verification", content: "google4cfcc257bdd58937" },
      { title: `${company.name} | ${company.motto} - Building Contractors in Ghana` },
      {
        name: "description",
        content:
          "Winnet Construction Ltd is a premier building and civil engineering contractor in Ghana. Specializing in residential villas, commercial structures, structural reinforcement, and quality architectural finishes.",
      },
      { name: "keywords", content: DEFAULT_KEYWORDS.join(", ") },
      { name: "author", content: company.name },
      { name: "mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
      { name: "apple-mobile-web-app-title", content: "Winnet" },
      { name: "application-name", content: company.name },
      { name: "theme-color", content: "#0d0d0d" },
      { name: "msapplication-TileColor", content: "#0d0d0d" },
      { name: "msapplication-TileImage", content: "/icon-192x192.png" },
      {
        name: "robots",
        content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      },
      { property: "og:site_name", content: company.name },
      { property: "og:title", content: `${company.name} | ${company.motto}` },
      {
        property: "og:description",
        content:
          "Winnet Construction Ltd is a premier building and civil engineering contractor in Ghana. Specializing in residential villas, commercial structures, and quality architectural finishes.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/` },
      { property: "og:locale", content: "en_GH" },
      { property: "og:image", content: `${SITE_URL}/icon-512x512.png` },
      { property: "og:image:alt", content: `${company.name} — ${company.motto}` },
      { property: "og:image:width", content: "512" },
      { property: "og:image:height", content: "512" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: `${company.name} | ${company.motto}` },
      {
        name: "twitter:description",
        content:
          "Premier building and civil engineering contractor in Ghana. Residential, commercial, and structural works.",
      },
      { name: "twitter:image", content: `${SITE_URL}/winnet-logo-horizontal.svg` },
      { name: "twitter:image:alt", content: `${company.name} — ${company.motto}` },
    ],
    links: [
      { rel: "preconnect", href: "https://images.unsplash.com" },
      { rel: "dns-prefetch", href: "https://images.unsplash.com" },
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml", sizes: "any" },
      { rel: "icon", href: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { rel: "icon", href: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon", sizes: "48x48" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png", sizes: "180x180" },
      { rel: "apple-touch-icon", href: "/icon-192x192.png", sizes: "192x192" },
      { rel: "mask-icon", href: "/favicon.svg", color: "#F2B23C" },
      { rel: "manifest", href: "/site.webmanifest" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(getRootSchemas()),
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
