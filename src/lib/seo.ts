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
};

const SITE_URL = "https://winnetconstruction.com";
const DEFAULT_OG_IMAGE = "/winnet-logo-horizontal.svg";
const DEFAULT_KEYWORDS = [
  "Winnet Construction Ltd",
  "construction company Ghana",
  "building contractors in Ghana",
  "civil engineering contractor Accra",
  "residential construction Ghana",
  "commercial builder Ghana",
  "structural works Ghana",
  "renovations Accra",
  "building estimation Ghana",
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
  const ogImage = options.image || DEFAULT_OG_IMAGE;
  const imageAlt = options.imageAlt || `${company.name} — ${company.motto}`;

  const keywordsString = Array.isArray(options.keywords)
    ? options.keywords.join(", ")
    : options.keywords || DEFAULT_KEYWORDS.join(", ");

  const meta: TanStackMetaTag[] = [
    // Standard Meta
    { title: fullTitle },
    { name: "description", content: options.description },
    { name: "keywords", content: keywordsString },
    { name: "author", content: options.author || company.name },
    { name: "theme-color", content: "#0d0d0d" },
    {
      name: "robots",
      content: options.noIndex
        ? "noindex, nofollow"
        : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    },

    // Open Graph
    { property: "og:site_name", content: company.name },
    { property: "og:title", content: fullTitle },
    { property: "og:description", content: options.description },
    { property: "og:type", content: options.type || "website" },
    { property: "og:locale", content: "en_GH" },
    { property: "og:image", content: ogImage },
    { property: "og:image:alt", content: imageAlt },

    // Twitter Card
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: fullTitle },
    { name: "twitter:description", content: options.description },
    { name: "twitter:image", content: ogImage },
    { name: "twitter:image:alt", content: imageAlt },
  ];

  if (options.canonical) {
    const canonicalUrl = options.canonical.startsWith("http")
      ? options.canonical
      : `${SITE_URL}${options.canonical.startsWith("/") ? "" : "/"}${options.canonical}`;
    meta.push({ property: "og:url", content: canonicalUrl });
  }

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

  const links: TanStackLinkTag[] = [];
  if (options.canonical) {
    const canonicalUrl = options.canonical.startsWith("http")
      ? options.canonical
      : `${SITE_URL}${options.canonical.startsWith("/") ? "" : "/"}${options.canonical}`;
    links.push({ rel: "canonical", href: canonicalUrl });
  }

  return { meta, links: links.length > 0 ? links : undefined };
}

/**
 * Pre-configured SEO helper objects for primary pages
 */

export const homeSeoConfig: SeoOptions = {
  title: "Building Contractors & Civil Engineering in Ghana",
  description:
    "Winnet Construction Ltd is a premier building and civil engineering contractor in Ghana. Specializing in residential villas, commercial structures, structural reinforcement, and quality architectural finishes.",
  keywords: [
    "Winnet Construction Ltd",
    "construction company Ghana",
    "building contractors in Ghana",
    "civil engineering Accra",
    "residential building Ghana",
    "commercial construction contractor",
    "structural engineers Ghana",
    "building renovation Accra",
    "construction quotation Ghana",
  ],
  canonical: "/",
  image: images.hero,
  imageAlt: "Winnet Construction Ltd — active building project and engineering site in Ghana",
  type: "website",
};

export const projectsSeoConfig: SeoOptions = {
  title: "Projects & Construction Portfolio",
  description:
    "Explore completed and ongoing construction projects by Winnet Construction Ltd across Ghana: custom residential villas, multi-storey commercial developments, structural renovations, and architectural finishes.",
  keywords: [
    "construction projects Ghana",
    "residential villa construction Accra",
    "commercial building portfolio Ghana",
    "structural engineering case studies",
    "building contractors portfolio",
    "construction before after Ghana",
  ],
  canonical: "/projects",
  image: images.residential,
  imageAlt: "Winnet Construction Ltd modern residential and commercial portfolio",
  type: "website",
};

export function getProjectDetailSeo(project: Project): SeoOptions {
  return {
    title: `${project.title} | ${project.category} Project`,
    description: `${project.summary} Located in ${project.location}. Execution scope includes: ${project.scope.slice(0, 3).join(", ")}.`,
    keywords: [
      project.title,
      `${project.category} construction Ghana`,
      `building in ${project.location}`,
      ...project.scope,
      "Winnet Construction Ltd case study",
    ],
    canonical: `/projects/${project.slug}`,
    image: project.image,
    imageAlt: `${project.title} — ${project.category} construction project in ${project.location}`,
    type: "article",
    section: project.category,
    tags: [project.category, project.location, ...project.scope],
  };
}

export const contactSeoConfig: SeoOptions = {
  title: "Contact & Project Consultation",
  description:
    "Contact Winnet Construction Ltd for construction estimates, on-site consultations, architectural drawing review, and project planning in Ghana. Phone: 0549074200 / WhatsApp: +233549074200.",
  keywords: [
    "contact Winnet Construction",
    "construction estimate Ghana",
    "building consultation Accra",
    "construction quotation Ghana",
    "construction WhatsApp Ghana",
    "building contractor phone number Ghana",
  ],
  canonical: "/contact",
  image: images.cta,
  imageAlt: "Contact Winnet Construction Ltd for building consultation and estimation",
  type: "business.business",
};

export const aboutSeoConfig: SeoOptions = {
  title: "About Us | Our Philosophy & Craftsmanship",
  description:
    "Learn about Winnet Construction Ltd: our commitment to structural integrity, meticulous craftsmanship, honest pricing, and professional project delivery across Ghana.",
  canonical: "/about",
  image: images.about,
  imageAlt: "Winnet Construction Ltd engineering and project management team",
  type: "website",
};

export const servicesSeoConfig: SeoOptions = {
  title: "Construction & Engineering Services",
  description:
    "Comprehensive building solutions in Ghana: residential home building, commercial developments, structural works, complete renovations, interior finishes, and consultation.",
  canonical: "/services",
  image: images.structural,
  imageAlt: "Comprehensive construction and engineering services by Winnet Construction Ltd",
  type: "website",
};

export const processSeoConfig: SeoOptions = {
  title: "Our Construction Process | Step-by-Step Delivery",
  description:
    "Understand how Winnet Construction Ltd takes your project from initial consultation and drawing review through structural framing, inspections, and final handover.",
  canonical: "/process",
  image: images.blueprint,
  imageAlt: "Winnet Construction step-by-step building roadmap and architectural process",
  type: "website",
};

export const whyWinnetSeoConfig: SeoOptions = {
  title: "Why Winnet | The Quality Built Advantage",
  description:
    "Discover why homeowners and developers trust Winnet Construction Ltd for structural durability, transparent cost reporting, experienced supervision, and on-time completion.",
  canonical: "/why-winnet",
  image: images.hero,
  imageAlt: "Why choose Winnet Construction Ltd for your building project",
  type: "website",
};

export const gallerySeoConfig: SeoOptions = {
  title: "Visual Gallery & On-Site Craftsmanship",
  description:
    "High-resolution on-site photography documenting our masonry, structural reinforcement, steel framing, interior plastering, and fine architectural finishes.",
  canonical: "/gallery",
  image: images.masonry,
  imageAlt: "On-site masonry and structural construction photography by Winnet Construction Ltd",
  type: "website",
};

/**
 * Structured Data (JSON-LD) Generators for Schema.org SEO compliance
 */

export function getGeneralContractorSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    name: company.name,
    legalName: "Winnet Construction Ltd",
    alternateName: ["Winnet", "Winnet Construction"],
    description:
      "Premier residential, commercial, and civil construction contractor in Ghana. Specializing in durable structures, villas, and architectural finishes.",
    url: SITE_URL,
    logo: `${SITE_URL}/winnet-logo-horizontal.svg`,
    image: `${SITE_URL}/winnet-icon-square-512.svg`,
    telephone: `+${company.phoneInternational}`,
    email: company.email,
    slogan: company.motto,
    priceRange: "$$",
    openingHours: "Mo-Sa 08:00-18:00",
    address: {
      "@type": "PostalAddress",
      addressCountry: "GH",
      addressRegion: "Ghana",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "5.6037",
      longitude: "-0.1870",
    },
    areaServed: {
      "@type": "Country",
      name: "Ghana",
    },
    knowsAbout: [
      "Residential Building Construction",
      "Commercial Building Construction",
      "Civil Engineering",
      "Structural Concrete and Reinforcement",
      "Building Renovation & Remodeling",
      "Architectural Finishing & Plastering",
      "Bill of Quantities & Construction Estimation",
    ],
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
      item: item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}
