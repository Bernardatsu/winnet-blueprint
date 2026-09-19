import { company, images, type Project } from "@/config/site";

export interface SeoOptions {
  title: string;
  description: string;
  keywords?: string[] | string;
  canonical?: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article" | "business.business";
  noIndex?: boolean;
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  section?: string;
  tags?: string[];
}

export type TanStackMetaTag =
  | { title: string }
  | { name: string; content: string }
  | { property: string; content: string }
  | { charSet: string }
  | { httpEquiv: string; content: string };

export type TanStackLinkTag = {
  rel: string;
  href: string;
  type?: string;
  sizes?: string;
  as?: string;
  crossOrigin?: string;
};

export const SITE_URL = "https://winnet-constructions.vercel.app";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;
export const DEFAULT_LOGO_ICON = `${SITE_URL}/icon-512x512.png`;

export const DEFAULT_KEYWORDS = [
  "Winnet Construction Ltd",
  "Winnet Construction",
  "Winnet Constructions",
  "construction company Ghana",
  "building contractors in Ghana",
  "construction companies in Accra",
  "civil engineering contractor Ghana",
  "residential builders Ghana",
  "commercial construction Accra",
  "building contractors Accra Ghana",
  "structural engineering Ghana",
  "renovations Accra",
  "building estimation Ghana",
  "building a house in Ghana",
  "diaspora building contractors Ghana",
  "architectural execution Ghana",
];

/**
 * Formats a clean SEO-optimized title tag with branding.
 */
export function formatTitle(title: string, includeMotto = false): string {
  if (title.includes(company.name)) {
    return title;
  }
  if (includeMotto) {
    return `${title} | ${company.name} — ${company.motto}`;
  }
  return `${title} | ${company.name}`;
}

/**
 * Builds TanStack Router head metadata for maximum search engine and social media visibility.
 */
export function buildSeoMeta(options: SeoOptions): {
  meta: TanStackMetaTag[];
  links?: TanStackLinkTag[];
} {
  const fullTitle = formatTitle(options.title);

  // Resolve an absolute, social-crawler friendly JPG/PNG image URL
  let ogImage = DEFAULT_OG_IMAGE;
  if (options.image) {
    if (options.image.startsWith("http://") || options.image.startsWith("https://")) {
      ogImage = options.image;
    } else if (options.image.startsWith("/")) {
      ogImage = `${SITE_URL}${options.image}`;
    } else if (
      options.image.startsWith("og-") ||
      options.image.endsWith(".jpg") ||
      options.image.endsWith(".png")
    ) {
      ogImage = `${SITE_URL}/${options.image}`;
    }
  }

  const imageAlt = options.imageAlt || `${company.name} — ${company.motto}`;
  const imageType = ogImage.endsWith(".png") ? "image/png" : "image/jpeg";

  const keywordsString = Array.isArray(options.keywords)
    ? options.keywords.join(", ")
    : options.keywords || DEFAULT_KEYWORDS.join(", ");

  const canonicalUrl = options.canonical
    ? options.canonical.startsWith("http")
      ? options.canonical
      : `${SITE_URL}${options.canonical.startsWith("/") ? "" : "/"}${options.canonical}`
    : SITE_URL;

  const meta: TanStackMetaTag[] = [
    // Google Search Console Verification
    { name: "google-site-verification", content: "Q-FhfSX0RwqoIq7hf77tFKXiJvHVyK0wDMJ4MjCEb7Y" },
    { name: "google-site-verification", content: "google2de381af7c64b3ae" },

    // Standard Meta
    { title: fullTitle },
    { name: "description", content: options.description },
    { name: "keywords", content: keywordsString },
    { name: "author", content: options.author || company.name },
    { name: "application-name", content: company.name },
    { name: "apple-mobile-web-app-title", content: company.name },
    { name: "theme-color", content: "#0d0d0d" },
    {
      name: "robots",
      content: options.noIndex
        ? "noindex, nofollow"
        : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    },

    // Open Graph (WhatsApp, iMessage, Facebook, Telegram, LinkedIn, Slack, Discord)
    { property: "og:site_name", content: company.name },
    { property: "og:title", content: fullTitle },
    { property: "og:description", content: options.description },
    { property: "og:type", content: options.type || "website" },
    { property: "og:url", content: canonicalUrl },
    { property: "og:locale", content: "en_GH" },
    { property: "og:image", content: ogImage },
    { property: "og:image:secure_url", content: ogImage },
    { property: "og:image:type", content: imageType },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:alt", content: imageAlt },

    // Twitter Card (Large rich card in chat feeds)
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: fullTitle },
    { name: "twitter:description", content: options.description },
    { name: "twitter:image", content: ogImage },
    { name: "twitter:image:alt", content: imageAlt },
  ];

  if (options.type === "article" && options.publishedTime) {
    meta.push({ property: "article:published_time", content: options.publishedTime });
  }

  if (options.type === "article" && options.section) {
    meta.push({ property: "article:section", content: options.section });
  }

  if (options.tags && options.tags.length > 0) {
    for (const tag of options.tags) {
      meta.push({ property: "article:tag", content: tag });
    }
  }

  const links: TanStackLinkTag[] = [{ rel: "canonical", href: canonicalUrl }];

  return { meta, links };
}

/**
 * Pre-configured SEO helper objects for primary pages
 */

export const homeSeoConfig: SeoOptions = {
  title: `${company.name} | Building Contractors & Civil Engineering in Ghana`,
  description:
    "Winnet Construction Ltd is a premier building and civil engineering contractor in Ghana. Specializing in residential villas, commercial structures, structural reinforcement, and quality architectural finishes.",
  keywords: [
    "Winnet Construction Ltd",
    "Winnet Construction",
    "Winnet Constructions",
    "construction company Ghana",
    "building contractors in Ghana",
    "civil engineering contractor Accra",
    "residential building Ghana",
    "commercial construction contractor Accra",
    "structural engineers Ghana",
    "building renovation Accra",
    "house building in Ghana",
    "diaspora construction Ghana",
    "construction quotation Ghana",
  ],
  canonical: "/",
  image: "/og-home.jpg",
  imageAlt: "Winnet Construction Ltd — active building project and engineering site in Ghana",
  type: "website",
};

export const projectsSeoConfig: SeoOptions = {
  title: `Projects & Construction Portfolio | ${company.name}`,
  description:
    "Explore completed and ongoing construction projects by Winnet Construction Ltd across Ghana: custom residential villas, multi-storey commercial developments, structural renovations, and architectural finishes.",
  keywords: [
    "construction projects Ghana",
    "residential villa construction Accra",
    "commercial building portfolio Ghana",
    "structural engineering case studies",
    "building contractors portfolio",
    "construction before after Ghana",
    "Winnet Construction projects",
  ],
  canonical: "/projects",
  image: "/og-projects.jpg",
  imageAlt: "Winnet Construction Ltd modern residential and commercial portfolio",
  type: "website",
};

export function getProjectDetailSeo(project: Project): SeoOptions {
  return {
    title: `${project.title} | Case Study | ${company.name}`,
    description: `${project.summary} Located in ${project.location}. Execution scope includes: ${project.scope.slice(0, 3).join(", ")}.`,
    keywords: [
      project.title,
      `${project.category} construction Ghana`,
      `building in ${project.location}`,
      ...project.scope,
      "Winnet Construction Ltd case study",
      "building contractor Ghana",
    ],
    canonical: `/projects/${project.slug}`,
    image: "/og-projects.jpg",
    imageAlt: `${project.title} — ${project.category} construction project in ${project.location}`,
    type: "article",
    section: project.category,
    tags: [project.category, project.location, ...project.scope],
  };
}

export const contactSeoConfig: SeoOptions = {
  title: `Contact & Project Consultation | ${company.name}`,
  description:
    "Contact Winnet Construction Ltd for construction estimates, on-site consultations, architectural drawing review, and project planning in Ghana. Phone: 0549074200 / WhatsApp: +233549074200.",
  keywords: [
    "contact Winnet Construction",
    "construction estimate Ghana",
    "building consultation Accra",
    "construction quotation Ghana",
    "construction WhatsApp Ghana",
    "building contractor phone number Ghana",
    "Winnet Construction address Accra",
  ],
  canonical: "/contact",
  image: "/og-contact.jpg",
  imageAlt: "Contact Winnet Construction Ltd for building consultation and estimation",
  type: "business.business",
};

export const aboutSeoConfig: SeoOptions = {
  title: `About Us | Our Philosophy & Engineering Craftsmanship | ${company.name}`,
  description:
    "Learn about Winnet Construction Ltd: our commitment to structural integrity, meticulous craftsmanship, honest pricing, and professional project delivery across Ghana.",
  keywords: [
    "About Winnet Construction",
    "construction team Ghana",
    "building contractor profile Accra",
    "civil engineering Ghana values",
    "structural engineers Accra",
  ],
  canonical: "/about",
  image: "/og-about.jpg",
  imageAlt: "Winnet Construction Ltd engineering and project management team",
  type: "website",
};

export const servicesSeoConfig: SeoOptions = {
  title: `Construction & Engineering Services | ${company.name}`,
  description:
    "Comprehensive building solutions in Ghana: residential home building, commercial developments, structural works, complete renovations, interior finishes, and consultation.",
  keywords: [
    "construction services Ghana",
    "residential construction Accra",
    "commercial builders Ghana",
    "structural framing concrete Ghana",
    "home renovation Accra",
    "architectural finishing Ghana",
  ],
  canonical: "/services",
  image: "/og-services.jpg",
  imageAlt: "Comprehensive construction and engineering services by Winnet Construction Ltd",
  type: "website",
};

export const processSeoConfig: SeoOptions = {
  title: `Our 6-Step Construction Process | ${company.name}`,
  description:
    "Understand how Winnet Construction Ltd takes your project from initial consultation and drawing review through structural framing, inspections, and final handover.",
  keywords: [
    "construction process Ghana",
    "building roadmap Ghana",
    "construction stages Accra",
    "architectural execution Ghana",
    "construction supervision Ghana",
  ],
  canonical: "/process",
  image: "/og-services.jpg",
  imageAlt: "Winnet Construction step-by-step building roadmap and architectural process",
  type: "website",
};

export const whyWinnetSeoConfig: SeoOptions = {
  title: `Why Choose Winnet | The Quality Built Advantage | ${company.name}`,
  description:
    "Discover why homeowners and developers trust Winnet Construction Ltd for structural durability, transparent cost reporting, experienced supervision, and on-time completion.",
  keywords: [
    "why choose Winnet Construction",
    "trusted building contractor Ghana",
    "quality construction Accra",
    "reliable builder Ghana",
    "structural durability",
  ],
  canonical: "/why-winnet",
  image: "/og-home.jpg",
  imageAlt: "Why choose Winnet Construction Ltd for your building project",
  type: "website",
};

export const gallerySeoConfig: SeoOptions = {
  title: `Visual Gallery & On-Site Construction Records | ${company.name}`,
  description:
    "High-resolution on-site photography documenting our masonry, structural reinforcement, steel framing, interior plastering, and fine architectural finishes in Ghana.",
  keywords: [
    "construction gallery Ghana",
    "building photos Accra",
    "masonry photos Ghana",
    "structural rebar photos",
    "finishing work Ghana",
  ],
  canonical: "/gallery",
  image: "/og-projects.jpg",
  imageAlt: "On-site masonry and structural construction photography by Winnet Construction Ltd",
  type: "website",
};

/**
 * Structured Data (JSON-LD) Generators for Schema.org SEO compliance
 */

export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: `${SITE_URL}/`,
    name: "Winnet Construction Ltd",
    alternateName: [
      "Winnet Construction",
      "Winnet Constructions",
      "Winnet",
      "Winnet Construction Ghana",
    ],
    description: company.motto,
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    inLanguage: "en-GH",
  };
}

export function getGeneralContractorSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    "@id": `${SITE_URL}/#organization`,
    name: company.name,
    legalName: "Winnet Construction Ltd",
    alternateName: [
      "Winnet",
      "Winnet Construction",
      "Winnet Constructions",
      "Winnet Construction Ghana",
    ],
    description:
      "Winnet Construction Ltd is a premier residential, commercial, and civil construction contractor in Ghana. Specializing in durable structures, villas, and architectural finishes.",
    url: `${SITE_URL}/`,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/winnet-icon-square-512.svg`,
      width: 512,
      height: 512,
      caption: "Winnet Construction Ltd Official Logo",
    },
    image: [
      `${SITE_URL}/winnet-icon-square-512.svg`,
      `${SITE_URL}/winnet-logo-horizontal.svg`,
      images.hero,
    ],
    telephone: `+${company.phoneInternational}`,
    email: company.email,
    slogan: company.motto,
    priceRange: "$$",
    openingHours: "Mo-Sa 08:00-18:00",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Accra",
      addressRegion: "Greater Accra Region",
      addressCountry: "GH",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "5.6037",
      longitude: "-0.1870",
    },
    areaServed: [
      { "@type": "Country", name: "Ghana" },
      { "@type": "City", name: "Accra" },
      { "@type": "City", name: "Tema" },
      { "@type": "City", name: "Kumasi" },
      { "@type": "City", name: "Takoradi" },
      { "@type": "City", name: "East Legon" },
      { "@type": "City", name: "Airport Residential" },
      { "@type": "City", name: "Cantonments" },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: `+${company.phoneInternational}`,
      contactType: "customer service",
      areaServed: "GH",
      availableLanguage: ["en"],
    },
    knowsAbout: [
      "Residential Building Construction",
      "Commercial Building Construction",
      "Civil Engineering",
      "Structural Concrete and Reinforcement",
      "Building Renovation & Remodeling",
      "Architectural Finishing & Plastering",
      "Bill of Quantities & Construction Estimation",
      "Roofing and Steel Framing",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Construction Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Residential Villa & Home Construction",
            description:
              "End-to-end residential construction with structural integrity and custom finishes.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Commercial Building & Retail Complexes",
            description: "Multi-storey commercial structures, offices, and warehouses.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Structural Framing & Civil Engineering",
            description: "Reinforced concrete, foundations, columns, beams, and civil earthworks.",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Full Building Renovations & Modernization",
            description:
              "Structural retrofitting, space reconfiguration, and premium architectural upgrades.",
          },
        },
      ],
    },
  };
}

/**
 * Returns composite JSON-LD schema array for the site root (WebSite + Organization/GeneralContractor)
 */
export function getRootSchemas() {
  return {
    "@context": "https://schema.org",
    "@graph": [getWebSiteSchema(), getGeneralContractorSchema()],
  };
}

export function getProjectSchema(project: Project) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    headline: project.title,
    description: project.summary,
    image: project.image,
    creator: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: company.name,
    },
    locationCreated: {
      "@type": "Place",
      name: project.location,
    },
    about: project.category,
    keywords: project.scope.join(", "),
  };
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: item.name,
      item: item.url.startsWith("http")
        ? item.url
        : `${SITE_URL}${item.url.startsWith("/") ? "" : "/"}${item.url}`,
    })),
  };
}
