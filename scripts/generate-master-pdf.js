import fs from "node:fs";
import path from "node:path";
import PDFDocument from "pdfkit";

const OUTPUT_PATH = path.resolve("public/WINNET_MASTER_DOCUMENTATION.pdf");
const MD_OUTPUT_PATH = path.resolve("WINNET_MASTER_DOCUMENTATION.md");

// Create document with standard A4 margins
const doc = new PDFDocument({
  size: "A4",
  margins: { top: 50, bottom: 50, left: 50, right: 50 },
  bufferPages: true,
  info: {
    Title: "Winnet Construction Ltd — Master Architecture & Codebook",
    Author: "Winnet Construction Ltd Engineering",
    Subject: "Complete Project Architecture, File Analysis, and Customization Guide",
    Keywords: "Winnet Construction, React, TanStack Start, Tailwind CSS, TypeScript, SEO, Guide",
  },
});

const writeStream = fs.createWriteStream(OUTPUT_PATH);
doc.pipe(writeStream);

// Palette constants
const COLOR_GOLD = "#D4941E";
const COLOR_INK = "#0D0D0D";
const COLOR_CHARCOAL = "#222222";
const COLOR_MUTED = "#555555";
const COLOR_LIGHT_BG = "#F8F8F8";
const COLOR_BORDER = "#E0E0E0";
const COLOR_CODE_BG = "#F2F2F2";

// Helper utilities for layout
function checkPageBreak(neededHeight = 60) {
  if (doc.y + neededHeight > doc.page.height - doc.page.margins.bottom) {
    doc.addPage();
  }
}

function addSectionHeader(title, subtitle = null) {
  checkPageBreak(80);
  doc.moveDown(0.8);
  doc.rect(50, doc.y, doc.page.width - 100, 2).fill(COLOR_GOLD);
  doc.moveDown(0.4);
  doc
    .font("Helvetica-Bold")
    .fontSize(16)
    .fillColor(COLOR_INK)
    .text(title.toUpperCase(), { tracking: 0.5 });

  if (subtitle) {
    doc.font("Helvetica-Oblique").fontSize(9.5).fillColor(COLOR_MUTED).text(subtitle);
  }
  doc.moveDown(0.5);
}

function addSubHeader(title) {
  checkPageBreak(50);
  doc.moveDown(0.5);
  doc.font("Helvetica-Bold").fontSize(12).fillColor(COLOR_CHARCOAL).text(title);
  doc.moveDown(0.2);
}

function addParagraph(text) {
  checkPageBreak(30);
  doc
    .font("Helvetica")
    .fontSize(9.5)
    .fillColor(COLOR_CHARCOAL)
    .text(text, { lineGap: 3, align: "justify" });
  doc.moveDown(0.4);
}

function addBullet(title, description) {
  checkPageBreak(25);
  doc
    .font("Helvetica-Bold")
    .fontSize(9.5)
    .fillColor(COLOR_INK)
    .text(`•  ${title}: `, { continued: true, lineGap: 2.5 })
    .font("Helvetica")
    .fillColor(COLOR_CHARCOAL)
    .text(description);
  doc.moveDown(0.25);
}

function addCodeBlock(code) {
  const lines = code.split("\n");
  const blockHeight = lines.length * 12 + 14;
  checkPageBreak(blockHeight);

  const startY = doc.y;
  const blockWidth = doc.page.width - 100;

  doc.rect(50, startY, blockWidth, blockHeight).fillAndStroke(COLOR_CODE_BG, COLOR_BORDER);

  doc
    .font("Courier")
    .fontSize(8)
    .fillColor("#1A1A1A")
    .text(code, 60, startY + 7, {
      width: blockWidth - 20,
      lineGap: 1.5,
    });

  doc.y = startY + blockHeight + 6;
}

function addCallout(title, text) {
  checkPageBreak(55);
  const startY = doc.y;
  const blockWidth = doc.page.width - 100;

  // Measure text height
  doc.font("Helvetica").fontSize(9);
  const textHeight = doc.heightOfString(text, { width: blockWidth - 30 });
  const totalHeight = textHeight + 28;

  doc.rect(50, startY, blockWidth, totalHeight).fillAndStroke("#FFFDF8", "#ECC878");

  doc.rect(50, startY, 4, totalHeight).fill(COLOR_GOLD);

  doc
    .font("Helvetica-Bold")
    .fontSize(9.5)
    .fillColor(COLOR_GOLD)
    .text(`📌  ${title}`, 62, startY + 6);

  doc
    .font("Helvetica")
    .fontSize(8.5)
    .fillColor(COLOR_CHARCOAL)
    .text(text, 62, startY + 19, { width: blockWidth - 25, lineGap: 2 });

  doc.y = startY + totalHeight + 8;
}

// ==========================================
// 1. COVER PAGE
// ==========================================
doc.rect(0, 0, doc.page.width, doc.page.height).fill(COLOR_INK);

doc.rect(40, 40, doc.page.width - 80, doc.page.height - 80).stroke(COLOR_GOLD);
doc.rect(44, 44, doc.page.width - 88, doc.page.height - 88).stroke("#333333");

doc.moveDown(5);

doc
  .font("Helvetica-Bold")
  .fontSize(11)
  .fillColor(COLOR_GOLD)
  .text("WINNET CONSTRUCTION LTD • GHANA", { align: "center", tracking: 3 });

doc.moveDown(1.5);

doc
  .font("Helvetica-Bold")
  .fontSize(24)
  .fillColor("#FFFFFF")
  .text("PROJECT ARCHITECTURE &", { align: "center" })
  .text("MASTER CODEBOOK", { align: "center" });

doc.moveDown(1);

doc
  .font("Helvetica")
  .fontSize(11)
  .fillColor("#CCCCCC")
  .text("Complete System Blueprint, File Breakdown, Component Reference,", { align: "center" })
  .text("and Developer Customization Handbook", { align: "center" });

doc.moveDown(3);

doc.rect(doc.page.width / 2 - 40, doc.y, 80, 2).fill(COLOR_GOLD);

doc.moveDown(4);

const infoBoxY = doc.y;
doc
  .font("Helvetica-Bold")
  .fontSize(9.5)
  .fillColor(COLOR_GOLD)
  .text("CORE SPECIFICATIONS", { align: "center" });

doc.moveDown(0.5);

const specItems = [
  "Frontend Framework: React 19 + TypeScript (Strict Type Safety)",
  "Full-Stack Engine: TanStack React Start (SSR + Client Routing)",
  "Styling & Design System: Tailwind CSS v4 + Motion Animations",
  "Component Architecture: Radix UI Headless Primitives + Lucide Icons",
  "SEO & Structured Data: Google JSON-LD GeneralContractor + PWA Manifest",
  "Target Market: Ghana (Accra, Tema, Kumasi, Takoradi, Diaspora)",
  "Version: 2.0.0 (Production Master)",
];

for (const item of specItems) {
  doc
    .font("Helvetica")
    .fontSize(8.5)
    .fillColor("#E0E0E0")
    .text(item, { align: "center", lineGap: 3 });
}

doc.y = doc.page.height - 90;
doc
  .font("Helvetica")
  .fontSize(8)
  .fillColor("#888888")
  .text("CONFIDENTIAL & PROPRIETARY — FOR WINNET CONSTRUCTION LTD INTERNAL USE", {
    align: "center",
  });

// ==========================================
// 2. TABLE OF CONTENTS
// ==========================================
doc.addPage();
addSectionHeader("TABLE OF CONTENTS", "Master Reference Index");

const toc = [
  { num: "01", title: "Executive Summary & Technology Stack", page: "3" },
  { num: "02", title: "Directory & File Structure Blueprint", page: "4" },
  { num: "03", title: "Central Configuration Hub (src/config/site.ts)", page: "5" },
  { num: "04", title: "Routing Architecture & Page Anatomy", page: "7" },
  { num: "05", title: "Component Hierarchy & Interactive Modules", page: "9" },
  { num: "06", title: "Design System, Colors & Typography (src/styles.css)", page: "11" },
  { num: "07", title: "SEO Engine, Structured Data & Favicon/PWA Setup", page: "13" },
  { num: "08", title: "Customization Recipes ('How to Change Anything')", page: "15" },
  { num: "09", title: "Build, Deployment & Server Operations", page: "18" },
];

for (const item of toc) {
  checkPageBreak(25);
  doc
    .font("Helvetica-Bold")
    .fontSize(10)
    .fillColor(COLOR_GOLD)
    .text(`${item.num}.  `, { continued: true })
    .font("Helvetica-Bold")
    .fillColor(COLOR_INK)
    .text(item.title, { continued: true })
    .font("Helvetica")
    .fillColor(COLOR_MUTED)
    .text(
      `  ......................................................................................  Page ${item.page}`,
      { align: "right" },
    );
  doc.moveDown(0.4);
}

doc.moveDown(1.5);
addCallout(
  "How to Use This Handbook",
  "This document serves as your ultimate guide to maintaining, editing, extending, and deploying the Winnet Construction website. Every file is explained with its exact location, function, and modification recipes. You do not need deep programming knowledge to make changes like phone numbers, project photos, or text — just follow Section 8!",
);

// ==========================================
// SECTION 1: TECH STACK
// ==========================================
doc.addPage();
addSectionHeader("1. Executive Summary & Tech Stack", "Modern high-performance web architecture");

addParagraph(
  "The Winnet Construction Ltd web application is engineered as an enterprise-grade digital platform designed to establish structural authority, showcase craftsmanship, and convert visitors into qualified project leads across Ghana and the diaspora.",
);

addSubHeader("Core Technologies Explained");

addBullet(
  "React 19 & TypeScript",
  "Provides component modularity, instant UI updates, and strict compile-time type safety to prevent runtime crashes.",
);

addBullet(
  "TanStack React Start & TanStack Router",
  "A modern, high-performance full-stack meta-framework providing Server-Side Rendering (SSR) for fast initial load times and client-side routing for instantaneous page transitions without full page reloads.",
);

addBullet(
  "Tailwind CSS v4",
  "Next-generation styling engine providing fluid responsive grids, dark blueprint aesthetics, and custom brand utility tokens.",
);

addBullet(
  "Motion (Framer Motion Engine)",
  "Smooth, hardware-accelerated scroll reveal animations (`<Reveal />`) that give the website a premium, tactile architectural feel.",
);

addBullet(
  "Lucide React Icons",
  "Over 40 crisp vector icons representing civil engineering, masonry, structural reinforcement, safety helmets, and communication channels.",
);

addBullet(
  "Sharp & Node Image Generation Pipeline",
  "Automated asset processing script (`scripts/generate-icons.js`) that produces multi-resolution favicon and PWA icons (16px, 32px, 48px, 180px, 192px, 512px) from vector source SVG.",
);

addBullet(
  "Google JSON-LD Structured Data",
  "Comprehensive Schema.org integration (`GeneralContractor`, `WebSite`, `BreadcrumbList`) ensuring Google recognizes the business name, logo, phone number, and service areas.",
);

// ==========================================
// SECTION 2: DIRECTORY STRUCTURE
// ==========================================
addSectionHeader("2. Directory & File Structure Blueprint", "Organization of the codebase");

addParagraph("Here is the architectural overview of the root and source directory tree:");

const treeCode = `winnet-construction-app/
├── public/                       # Static public assets served at root
│   ├── favicon-16x16.png         # 16x16 browser tab favicon
│   ├── favicon-32x32.png         # 32x32 standard browser favicon
│   ├── favicon-48x48.png         # 48x48 Windows shortcut icon
│   ├── apple-touch-icon.png      # 180x180 iOS home screen icon
│   ├── icon-192x192.png          # 192x192 Android PWA icon
│   ├── icon-512x512.png          # 512x512 Master high-res PWA icon
│   ├── favicon.ico               # Legacy multi-resolution favicon
│   ├── favicon.svg               # Modern vector SVG favicon
│   ├── site.webmanifest          # PWA installation manifest (iOS/Android/Desktop)
│   ├── sitemap.xml               # Search engine index catalog
│   ├── robots.txt                # Crawler indexing rules
│   └── google4cfcc257bdd58937.html # Google Search Console verification token
├── src/                          # Application source code
│   ├── config/
│   │   └── site.ts               # ⭐ THE CENTRAL DATA & CONTENT HUB
│   ├── lib/
│   │   ├── seo.ts                # SEO metadata & JSON-LD schema builder
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
│   └── generate-master-pdf.js    # Handbook generator script
├── package.json                  # Dependencies & npm build scripts
├── vite.config.ts                # Vite build and plugin pipeline
└── tsconfig.json                 # TypeScript compiler configuration`;

addCodeBlock(treeCode);

// ==========================================
// SECTION 3: CENTRAL CONFIG HUB
// ==========================================
doc.addPage();
addSectionHeader(
  "3. Central Configuration Hub",
  "File: src/config/site.ts — The Most Important File",
);

addParagraph(
  "`src/config/site.ts` is the single source of truth for all business information, contacts, projects, services, statistics, and FAQs. Changing data in this file automatically updates the entire website, including navigation, footers, JSON-LD schemas, and contact forms.",
);

addSubHeader("1. Company Information Object (`company`)");
addParagraph("Contains core business identity, phone numbers, email, and motto:");

const companyCode = `export const company = {
  name: "Winnet Construction Ltd",
  shortName: "Winnet",
  tagline: "Building with Integrity, Precision, and Purpose.",
  motto: "Quality Built, Value Delivered",
  phone: "0549074200",                    // Local Ghanaian dial format
  phoneInternational: "233549074200",     // International dial format (no leading +)
  phoneFormatted: "+233 54 907 4200",     // Display formatted phone string
  whatsapp: "233549074200",               // WhatsApp target number
  whatsappPrefill: "Hello Winnet Construction...", // Default chat message
  email: "Fredmawuli123@gmail.com",       // Primary enquiry & lead inbox
  officeAddress: "Accra, Ghana",
  serviceAreas: ["Accra", "Tema", "Kumasi", "Takoradi", "Eastern Region", "Diaspora"],
  workingHours: "Monday – Saturday: 8:00 AM – 6:00 PM",
};`;
addCodeBlock(companyCode);

addSubHeader("2. Portfolio Projects Collection (`projects`)");
addParagraph(
  "An array of project objects powering `/projects` and dynamic `/projects/$slug` case studies. Each project has:",
);
addBullet(
  "id & slug",
  "Unique URL identifier (e.g. `villa-east-legon` -> `/projects/villa-east-legon`)",
);
addBullet(
  "title & category",
  "Project heading and category (`Residential`, `Commercial`, `Structural`, `Renovation`)",
);
addBullet("location & duration", "Geographic location in Ghana and construction timeline");
addBullet("summary & scope", "Executive summary and array of structural deliverables");
addBullet("beforeAfter", "Optional before/after comparison imagery");

addSubHeader("3. Construction Services (`services`)");
addParagraph(
  "Defines all 6 specialized service categories (Residential Building, Commercial Complexes, Structural Framing, Modern Renovations, Architectural Finishes, Construction Consultation & BOQ) with icon keys, deliverables, and summaries.",
);

addSubHeader("4. Value Metrics (`stats`) & FAQs (`faqs`)");
addParagraph(
  "Contains key social proof numbers (Projects Completed, Client Satisfaction, Active Sites) and structured accordion Q&As addressing common questions from local and diaspora clients.",
);

// ==========================================
// SECTION 4: ROUTING & PAGES
// ==========================================
doc.addPage();
addSectionHeader("4. Routing Architecture & Page Anatomy", "TanStack Router File-System Routing");

addParagraph(
  "The routing system in `src/routes/` is file-based and type-safe. Every page exports a TanStack `Route` created with `createFileRoute('/path')`.",
);

addSubHeader("Summary of Application Routes:");

addBullet(
  "`__root.tsx`",
  "Global root layout. Injects `<HeadContent />`, SEO schemas, Google site verification, `<Navbar />`, `<EnquiryProvider />`, `<WhatsAppButton />`, `<Footer />`, and global `<Toaster />`.",
);
addBullet(
  "`index.tsx` (/)",
  "Homepage. Features high-impact Hero, Trust Bar, Core Services grid, Featured Projects showcase, Why Choose Winnet grid, Process overview, and Lead Enquiry CTA.",
);
addBullet(
  "`about.tsx` (/about)",
  "Company story, core engineering values (Honesty, Structural Durability, Quality Control, Timeliness), team philosophy, and on-site standards.",
);
addBullet(
  "`services.tsx` (/services)",
  "Full catalog of building services with scope checklists, process steps, and direct quote request triggers.",
);
addBullet(
  "`projects.tsx` (/projects)",
  "Portfolio page featuring category filter tabs (All, Residential, Commercial, Structural, Renovation) and interactive project cards.",
);
addBullet(
  "`projects.$slug.tsx` (/projects/:slug)",
  "Deep-dive case study page dynamically loaded by URL slug. Displays high-resolution gallery, project timeline, location, structural scope checklist, and inquiry box.",
);
addBullet(
  "`process.tsx` (/process)",
  "Explains the 6-step building roadmap: 1. Consultation -> 2. BOQ & Estimation -> 3. Architectural Planning -> 4. Foundation & Structure -> 5. Finishing -> 6. Handover.",
);
addBullet(
  "`why-winnet.tsx` (/why-winnet)",
  "Details the Winnet Advantage: Certified engineers, diaspora remote project tracking, transparent material sourcing, and zero hidden costs.",
);
addBullet(
  "`gallery.tsx` (/gallery)",
  "Visual on-site photography grid categorized by masonry, rebar reinforcement, concrete pours, and architectural interior finishes with interactive image lightbox.",
);
addBullet(
  "`contact.tsx` (/contact)",
  "Full contact desk featuring phone, email, WhatsApp, office hours, location map placeholder, and the interactive Project Estimation & Quote Form.",
);

// ==========================================
// SECTION 5: COMPONENTS & INTERACTIVE MODULES
// ==========================================
doc.addPage();
addSectionHeader("5. Component Hierarchy & Interactive Modules", "Reusable building blocks");

addSubHeader("1. Layout Components (`src/components/layout/`)");
addBullet(
  "`Navbar.tsx`",
  "Sticky header with animated blur backdrop, desktop navigation links, mobile hamburger drawer, direct phone click-to-call button, and 'Get a Quote' CTA button.",
);
addBullet(
  "`Footer.tsx`",
  "Comprehensive footer containing company overview, quick links, service catalog links, direct WhatsApp click, business hours, and copyright disclaimer.",
);
addBullet(
  "`WhatsAppButton.tsx`",
  "Floating bottom-right WhatsApp launcher with glowing pulse animation, opening an instant pre-filled chat with Winnet's official WhatsApp number.",
);
addBullet(
  "`PageHeader.tsx`",
  "Standardized dark blueprint hero banner for inner pages with breadcrumb navigation and subtle grid overlay.",
);

addSubHeader("2. Project Enquiry System (`src/components/enquiry/`)");
addBullet(
  "`EnquiryProvider.tsx`",
  "React Context provider allowing any button on any page to trigger the quote modal using `const { openEnquiry } = useEnquiry();`.",
);
addBullet(
  "`ProjectEnquiryForm.tsx`",
  "Interactive multi-field estimation form with project type selection (Residential, Commercial, Renovation, Structural), location input, budget range, drawing attachment note, and automatic WhatsApp/Email routing.",
);

addSubHeader("3. Visual & Animation Components");
addBullet(
  "`Reveal.tsx`",
  "Lightweight animation wrapper using Motion. Fades and slides elements into view smoothly as the user scrolls down the page.",
);
addBullet(
  "`WinnetBrand.tsx`",
  "Crisp vector SVG logos including horizontal header lockup, square gold monogram badge, and footer marks.",
);

// ==========================================
// SECTION 6: DESIGN SYSTEM & STYLING
// ==========================================
addSectionHeader("6. Design System, Colors & Typography", "File: src/styles.css — Visual Identity");

addParagraph("The visual identity combines industrial durability with luxury architectural craft:");

const paletteCode = `/* Core Color Tokens */
--color-gold: #F2B23C;        /* Signature Construction Gold Accent */
--color-gold-dark: #C98E20;   /* Deep Gold for hover states */
--color-gold-light: #FDE8B3;  /* Subtle Gold Tint for badge backgrounds */
--color-ink: #0D0D0D;         /* Deep Architectural Blueprint Charcoal/Black */
--color-ink-muted: #1A1A1A;   /* Elevated Dark Card Surface */
--color-ink-subtle: #2A2A2A;  /* Card Border & Divider Lines */
--color-bone: #F7F5F0;        /* Warm Off-White Light Section Background */
--color-steel: #71717A;       /* Secondary Text / Engineering Zinc Gray */`;
addCodeBlock(paletteCode);

addParagraph(
  "Custom CSS utility classes in `src/styles.css` include `.shell` (centered max-width container with responsive padding), `.h-display` (bold display typography), `.eyebrow` (tracked uppercase section labels), and `.blueprint-grid-dark` (subtle structural grid pattern).",
);

// ==========================================
// SECTION 7: SEO & FAVICONS
// ==========================================
doc.addPage();
addSectionHeader(
  "7. SEO Engine, Structured Data & Favicons",
  "Maximum Google visibility & PWA support",
);

addSubHeader("1. Schema.org JSON-LD Structured Data (`src/lib/seo.ts`)");
addParagraph(
  "Injected into the `<head>` of the root layout to inform search engines of your business credentials:",
);
addBullet(
  "`WebSite` Schema",
  "Declares the official site name 'Winnet Construction Ltd' and alternate brand names for Google search snippet headers.",
);
addBullet(
  "`GeneralContractor` Schema",
  "Provides official address (Accra, Ghana), phone (+233549074200), opening hours, geographic coordinates, service catalog, and logo URLs.",
);
addBullet(
  "`BreadcrumbList` Schema",
  "Provides clean breadcrumb navigation paths in Google search results.",
);

addSubHeader("2. Multi-Platform Favicon & App Icon Matrix");
addParagraph(
  "When users open the site in a browser, bookmark it, or add it to their phone's home screen, the browser loads the appropriate asset from `/public`:",
);
addBullet(
  "Browser Tab Favicon",
  "Loads `favicon-32x32.png`, `favicon-16x16.png`, and `favicon.svg`.",
);
addBullet(
  "iOS Home Screen App",
  'Loads `apple-touch-icon.png` (180x180) configured via `<meta name="apple-mobile-web-app-title" content="Winnet">`.',
);
addBullet(
  "Android & Desktop PWA",
  "Loads `icon-192x192.png` and `icon-512x512.png` defined in `site.webmanifest` and `manifest.json`.",
);

// ==========================================
// SECTION 8: HOW TO CHANGE ANYTHING
// ==========================================
doc.addPage();
addSectionHeader(
  "8. Customization Recipes ('How to Change Anything')",
  "Step-by-step developer cheat sheet",
);

addSubHeader("Recipe 1: How to Change Phone Number, Email, or WhatsApp");
addParagraph(
  "Open `src/config/site.ts` and locate the `company` object around line 10. Update the values:",
);
const recipe1Code = `export const company = {
  // Update your display phone number
  phone: "0549074200",
  // Update international dial (no + or leading zero)
  phoneInternational: "233549074200",
  // Update email where quotes and contact forms will be sent
  email: "your-new-email@gmail.com",
  // Update WhatsApp recipient number
  whatsapp: "233549074200",
};`;
addCodeBlock(recipe1Code);

addSubHeader("Recipe 2: How to Add a New Project to Portfolio");
addParagraph("Open `src/config/site.ts`, find the `projects` array, and add a new project object:");
const recipe2Code = `// Add to the projects array in src/config/site.ts:
{
  id: "luxury-residence-cantonments",
  slug: "luxury-residence-cantonments",
  title: "Modern 5-Bedroom Executive Villa",
  category: "Residential",
  location: "Cantonments, Accra",
  year: "2025",
  duration: "10 Months",
  summary: "Turnkey luxury residential development featuring reinforced concrete framing and custom glass finishes.",
  scope: ["Reinforced Foundation", "Blockwork & Plastering", "Porcelain Tiling", "Swimming Pool"],
  image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
  featured: true,
},`;
addCodeBlock(recipe2Code);

addSubHeader("Recipe 3: How to Edit or Add a Construction Service");
addParagraph(
  "Open `src/config/site.ts`, find the `services` array, and edit the deliverables, description, or title:",
);
const recipe3Code = `// Edit items in the services array in src/config/site.ts:
{
  id: "residential-construction",
  title: "Residential Building Construction",
  shortTitle: "Residential",
  icon: "home",
  summary: "Custom residential villas, duplexes, and family homes built to international structural standards.",
  deliverables: [
    "Architectural drawing review & structural optimization",
    "Reinforced concrete slab and column construction",
    "Precision masonry and premium interior plastering",
  ],
},`;
addCodeBlock(recipe3Code);

addSubHeader("Recipe 4: How to Change Hero Banners or Homepage Taglines");
addParagraph("Open `src/config/site.ts` and modify `hero` or `images`:");
const recipe4Code = `export const hero = {
  eyebrow: "PREMIER BUILDING CONTRACTORS • GHANA",
  title: "Structural Integrity. Architectural Precision.",
  subtitle: "Winnet Construction Ltd delivers residential villas, commercial structures...",
  stats: [
    { value: "100%", label: "Structural Compliance" },
    { value: "15+", label: "Completed Projects" },
  ],
};`;
addCodeBlock(recipe4Code);

// ==========================================
// SECTION 9: BUILD & DEPLOYMENT
// ==========================================
doc.addPage();
addSectionHeader(
  "9. Build, Deployment & Server Operations",
  "Deploying to production environments",
);

addSubHeader("Local Development Commands");
const buildCmds = `# 1. Install all dependencies
npm install

# 2. Start local development server (http://localhost:3000)
npm run dev

# 3. Regenerate all PNG favicons & app icons
node scripts/generate-icons.js

# 4. Re-compile this master PDF documentation
node scripts/generate-master-pdf.js

# 5. Build for production
npm run build

# 6. Preview production build locally
npm run preview`;
addCodeBlock(buildCmds);

addSubHeader("Deployment Instructions");
addBullet(
  "Deploying to Vercel",
  "Import your GitHub repository into Vercel. Framework preset is automatically detected. Set build command to `npm run build` and output directory to default.",
);
addBullet(
  "Deploying to Cloudflare Pages",
  "Connect repository to Cloudflare Pages, select Vite / TanStack Start preset, set build command `npm run build`.",
);
addBullet(
  "Deploying to Custom Linux VPS (Ubuntu/Debian)",
  "Run `npm run build` followed by process manager like PM2 (`pm2 start npm --name 'winnet' -- run start`).",
);

doc.moveDown(1.5);
addCallout(
  "Google Search Console Verification",
  "The site includes `/google4cfcc257bdd58937.html` and matching `<meta name=\"google-site-verification\" ...>` tags in `src/routes/__root.tsx`. Once deployed to your domain, visit Google Search Console and click 'Verify' to instantly claim your domain and submit your sitemap (`/sitemap.xml`).",
);

// ==========================================
// PAGE NUMBERING & FOOTERS
// ==========================================
const totalPages = doc.bufferedPageRange().count;
for (let i = 0; i < totalPages; i++) {
  doc.switchToPage(i);
  if (i === 0) continue; // Skip cover page

  // Header
  doc
    .font("Helvetica")
    .fontSize(7.5)
    .fillColor("#999999")
    .text("WINNET CONSTRUCTION LTD  •  PROJECT MASTER CODEBOOK & BLUEPRINT", 50, 25, {
      align: "left",
    });

  doc.rect(50, 36, doc.page.width - 100, 0.5).fill("#E5E5E5");

  // Footer
  doc.rect(50, doc.page.height - 36, doc.page.width - 100, 0.5).fill("#E5E5E5");

  doc
    .font("Helvetica")
    .fontSize(7.5)
    .fillColor("#999999")
    .text("CONFIDENTIAL — FOR INTERNAL DEVELOPER USE ONLY", 50, doc.page.height - 28, {
      align: "left",
    });

  doc
    .font("Helvetica-Bold")
    .fontSize(8)
    .fillColor(COLOR_GOLD)
    .text(`Page ${i + 1} of ${totalPages}`, doc.page.width - 120, doc.page.height - 28, {
      align: "right",
    });
}

doc.end();

writeStream.on("finish", () => {
  console.log(`Master PDF documentation generated successfully at: ${OUTPUT_PATH}`);
});
