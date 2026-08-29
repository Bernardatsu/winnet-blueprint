# Winnet Construction Ltd — Master Architecture & Codebook

> **Confidential & Proprietary Handbook**  
> Complete Architectural Blueprint, File-by-File Analysis, Component Breakdown, and Developer Customization Guide.

---

## 📑 Table of Contents

1. [Executive Summary & Technology Stack](#1-executive-summary--technology-stack)
2. [Full Directory & File Tree Blueprint](#2-full-directory--file-tree-blueprint)
3. [Central Configuration Hub (`src/config/site.ts`)](#3-central-configuration-hub-srcconfigsitets)
4. [Routing Architecture & Page Breakdown](#4-routing-architecture--page-breakdown)
5. [Component Hierarchy & Interactive Modules](#5-component-hierarchy--interactive-modules)
6. [Design System, Colors & Typography (`src/styles.css`)](#6-design-system-colors--typography-srcstylescss)
7. [SEO Engine, Structured Data & Favicon / PWA Setup](#7-seo-engine-structured-data--favicon--pwa-setup)
8. [Customization Recipes ("How to Change Anything")](#8-customization-recipes-how-to-change-anything)
9. [Build, Deployment & Server Operations](#9-build-deployment--server-operations)

---

## 1. Executive Summary & Technology Stack

The **Winnet Construction Ltd** web application is built as a high-performance web platform tailored for the Ghanaian building industry and diaspora clients.

### Core Technologies
* **React 19 & TypeScript**: Provides modular component architecture and compile-time type safety.
* **TanStack React Start & TanStack Router**: Full-stack framework offering Server-Side Rendering (SSR) for high SEO performance and client routing for instantaneous transitions.
* **Tailwind CSS v4**: Utility-first CSS engine with dark blueprint styling, gold accenting, and responsive breakpoints.
* **Motion (`motion/react`)**: Scroll animations (`<Reveal />`) for a refined architectural feel.
* **Lucide React**: Vector icons for civil engineering, masonry, structural reinforcement, safety, and contacts.
* **Sharp Pipeline (`scripts/generate-icons.js`)**: Generates multi-platform icons (16px, 32px, 48px, 180px, 192px, 512px) from vector SVG sources.
* **Schema.org Structured Data (`src/lib/seo.ts`)**: Injects `GeneralContractor`, `WebSite`, and `BreadcrumbList` schemas for Google Search and rich snippets.

---

## 2. Full Directory & File Tree Blueprint

```text
winnet-construction-app/
├── public/                       # Static public assets
│   ├── favicon-16x16.png         # 16x16 browser tab favicon
│   ├── favicon-32x32.png         # 32x32 standard browser favicon
│   ├── favicon-48x48.png         # 48x48 desktop shortcut icon
│   ├── apple-touch-icon.png      # 180x180 iOS home screen icon
│   ├── icon-192x192.png          # 192x192 Android PWA icon
│   ├── icon-512x512.png          # 512x512 Master high-res PWA icon
│   ├── favicon.ico               # Legacy multi-resolution favicon
│   ├── favicon.svg               # Modern vector SVG favicon
│   ├── site.webmanifest          # PWA installation manifest (iOS/Android/Desktop)
│   ├── sitemap.xml               # Search engine index catalog
│   ├── robots.txt                # Crawler indexing rules
│   ├── google4cfcc257bdd58937.html # Google Search Console verification token
│   └── WINNET_MASTER_DOCUMENTATION.pdf # Downloadable master PDF manual
├── src/                          # Application source code
│   ├── config/
│   │   └── site.ts               # ⭐ THE CENTRAL CONTENT & DATA HUB
│   ├── lib/
│   │   ├── seo.ts                # SEO metadata & JSON-LD schema generator
│   │   └── utils.ts              # Class name merging utility (cn)
│   ├── components/
│   │   ├── brand/WinnetBrand.tsx # SVG Brand Logos & Gold Monograms
│   │   ├── layout/               # Header, Footer, PageHeader, WhatsApp
│   │   ├── enquiry/              # Interactive Modal & Multi-step Quote Form
│   │   ├── sections/             # Hero, TrustBar, ServicesGrid, AboutSection
│   │   └── ui/                   # Buttons, Badges, Modals, Inputs, Sliders
│   ├── routes/                   # File-system route handlers (10 pages)
│   │   ├── __root.tsx            # Global layout shell, Head tags, Navbar, Footer
│   │   ├── index.tsx             # Homepage
│   │   ├── about.tsx             # About Us / Company Philosophy
│   │   ├── services.tsx          # Full Services Catalog
│   │   ├── projects.tsx          # Portfolio Directory with Filter
│   │   ├── projects.$slug.tsx    # Dynamic Case Study Detail View
│   │   ├── process.tsx           # 6-Step Construction Roadmap
│   │   ├── why-winnet.tsx        # Competitive Advantages & Standards
│   │   ├── gallery.tsx           # High-Res On-Site Construction Photography
│   │   ├── contact.tsx           # Contact & Project Estimation Desk
│   │   ├── privacy.tsx           # Privacy Policy
│   │   └── terms.tsx             # Terms of Service
│   ├── router.tsx                # TanStack Router initialization
│   ├── server.ts                 # Production SSR server entry
│   ├── start.ts                  # Application runtime bootstrapper
│   └── styles.css                # Global CSS, Theme Variables & Tailwind imports
├── scripts/
│   ├── generate-icons.js         # Multi-platform PNG favicon generator
│   └── generate-master-pdf.js    # Master PDF handbook generator
├── package.json                  # Dependencies & npm build scripts
├── vite.config.ts                # Vite build and plugin pipeline
└── tsconfig.json                 # TypeScript compiler configuration
```

---

## 3. Central Configuration Hub (`src/config/site.ts`)

`src/config/site.ts` is the single source of truth. Every contact number, email, project, service, and testimonial is configured here.

### 1. Company Information
```ts
export const company = {
  name: "Winnet Construction Ltd",
  shortName: "Winnet",
  tagline: "Building with Integrity, Precision, and Purpose.",
  motto: "Quality Built, Value Delivered",
  phone: "0549074200",                    // Local Ghanaian dial format
  phoneInternational: "233549074200",     // International dial format (no +)
  phoneFormatted: "+233 54 907 4200",     // Formatted display string
  whatsapp: "233549074200",               // WhatsApp target number
  whatsappPrefill: "Hello Winnet Construction, I would like to enquire about a building project.",
  email: "Fredmawuli123@gmail.com",       // Primary enquiry & quote inbox
  officeAddress: "Accra, Ghana",
  serviceAreas: ["Accra", "Tema", "Kumasi", "Takoradi", "Eastern Region", "Diaspora"],
  workingHours: "Monday – Saturday: 8:00 AM – 6:00 PM",
};
```

### 2. Portfolio Projects
Contains all residential, commercial, structural, and renovation case studies with image URLs, location, scope tags, and timeline.

### 3. Services Catalog
Contains all 6 service categories, summaries, and structural deliverables.

---

## 4. Routing Architecture & Page Breakdown

| Route | File Path | Description |
| :--- | :--- | :--- |
| `/` | `src/routes/index.tsx` | High-impact homepage with Hero, Trust Bar, Services, Featured Projects, Process, and Lead CTA. |
| `/about` | `src/routes/about.tsx` | Company history, engineering values, on-site safety standards, and team. |
| `/services` | `src/routes/services.tsx` | Comprehensive building services catalog with deliverables and quote buttons. |
| `/projects` | `src/routes/projects.tsx` | Portfolio directory with interactive category filter tabs. |
| `/projects/:slug` | `src/routes/projects.$slug.tsx` | Dynamic deep-dive case studies with high-res galleries and structural scope. |
| `/process` | `src/routes/process.tsx` | 6-Step Construction Roadmap from Consultation to Handover. |
| `/why-winnet` | `src/routes/why-winnet.tsx` | Competitive advantages: diaspora tracking, certified engineers, honest BOQ pricing. |
| `/gallery` | `src/routes/gallery.tsx` | High-resolution on-site photography grid with lightbox modal. |
| `/contact` | `src/routes/contact.tsx` | Direct contact numbers, WhatsApp launcher, and Project Estimation form. |
| Root Shell | `src/routes/__root.tsx` | Injects global Navbar, Footer, WhatsApp floating launcher, Toaster, and JSON-LD SEO schemas. |

---

## 5. Component Hierarchy & Interactive Modules

### Layout Components (`src/components/layout/`)
* **`Navbar.tsx`**: Sticky header with blur backdrop, responsive drawer, phone call action, and 'Get a Quote' button.
* **`Footer.tsx`**: Multi-column footer with quick links, service links, company contact, and business hours.
* **`WhatsAppButton.tsx`**: Floating bottom-right WhatsApp action with pulsing animation.
* **`PageHeader.tsx`**: Standardized blueprint hero header for inner pages with breadcrumbs.

### Project Enquiry System (`src/components/enquiry/`)
* **`EnquiryProvider.tsx`**: Global React Context enabling any button to trigger the quote modal via `useEnquiry()`.
* **`ProjectEnquiryForm.tsx`**: Multi-field estimation form with project type selection, location, budget range, and automatic WhatsApp/Email routing.

---

## 6. Design System, Colors & Typography (`src/styles.css`)

```css
--color-gold: #F2B23C;        /* Signature Construction Gold Accent */
--color-gold-dark: #C98E20;   /* Deep Gold for hover states */
--color-gold-light: #FDE8B3;  /* Subtle Gold Tint for badge backgrounds */
--color-ink: #0D0D0D;         /* Deep Architectural Blueprint Charcoal/Black */
--color-ink-muted: #1A1A1A;   /* Elevated Dark Card Surface */
--color-ink-subtle: #2A2A2A;  /* Card Border & Divider Lines */
--color-bone: #F7F5F0;        /* Warm Off-White Light Section Background */
--color-steel: #71717A;       /* Secondary Text / Engineering Zinc Gray */
```

---

## 7. SEO Engine, Structured Data & Favicon / PWA Setup

### 1. Schema.org JSON-LD Structured Data (`src/lib/seo.ts`)
* **`WebSite` Schema**: Informs Google of the official name *"Winnet Construction Ltd"* and alternate names for search snippets.
* **`GeneralContractor` Schema**: Includes Accra, Ghana address, phone number (`+233549074200`), logo URLs, opening hours, and service catalog.

### 2. Multi-Resolution App Icons Matrix
* **Browser Tab Favicon**: `favicon-32x32.png`, `favicon-16x16.png`, and `favicon.svg`.
* **iOS Home Screen**: `apple-touch-icon.png` (180x180) with `apple-mobile-web-app-capable`.
* **Android & Desktop PWA**: `icon-192x192.png` and `icon-512x512.png` in `site.webmanifest`.

---

## 8. Customization Recipes ("How to Change Anything")

### Recipe 1: Change Phone Number, Email, or WhatsApp
Open `src/config/site.ts` and modify the `company` object:
```ts
export const company = {
  phone: "0549074200",
  phoneInternational: "233549074200",
  email: "your-new-email@gmail.com",
  whatsapp: "233549074200",
};
```

### Recipe 2: Add a New Portfolio Project
Open `src/config/site.ts` and append to the `projects` array:
```ts
{
  id: "executive-villa-airport-residential",
  slug: "executive-villa-airport-residential",
  title: "Modern Executive Villa",
  category: "Residential",
  location: "Airport Residential, Accra",
  year: "2025",
  duration: "12 Months",
  summary: "Turnkey luxury residential villa with reinforced concrete foundation.",
  scope: ["Reinforced Foundation", "Plastering", "Porcelain Tiling", "Swimming Pool"],
  image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
  featured: true,
},
```

### Recipe 3: Edit Services
Open `src/config/site.ts` and edit the `services` array items.

---

## 9. Build, Deployment & Server Operations

```sh
# 1. Install all dependencies
npm install

# 2. Start local development server (http://localhost:3000)
npm run dev

# 3. Regenerate all PNG favicons & app icons
node scripts/generate-icons.js

# 4. Regenerate this master PDF documentation
node scripts/generate-master-pdf.js

# 5. Build for production
npm run build

# 6. Preview production build locally
npm run preview
```
