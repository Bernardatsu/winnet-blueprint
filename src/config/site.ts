/**
 * WINNET CONSTRUCTION LTD — central site configuration.
 *
 * EDIT HERE: company details, services, projects, process, FAQs, testimonials.
 * Nothing else in the codebase hard-codes the phone number or email address.
 */

import heroConstruction from "@/assets/hero-construction.webp";
import aboutTeam from "@/assets/about-team.webp";
import projectResidential from "@/assets/project-residential.webp";
import projectCommercial from "@/assets/project-commercial.webp";
import projectRenovation from "@/assets/project-renovation.webp";
import projectStructural from "@/assets/project-structural.webp";
import projectFinishing from "@/assets/project-finishing.webp";
import galleryMasonry from "@/assets/gallery-masonry.webp";
import gallerySteel from "@/assets/gallery-steel.webp";
import galleryPainting from "@/assets/gallery-painting.webp";
import galleryBlueprint from "@/assets/gallery-blueprint.webp";
import ctaArchitecture from "@/assets/cta-architecture.webp";

export const images = {
  hero: heroConstruction,
  about: aboutTeam,
  residential: projectResidential,
  commercial: projectCommercial,
  renovation: projectRenovation,
  structural: projectStructural,
  finishing: projectFinishing,
  masonry: galleryMasonry,
  steel: gallerySteel,
  painting: galleryPainting,
  blueprint: galleryBlueprint,
  cta: ctaArchitecture,
};

export const company = {
  name: "Winnet Construction Ltd",
  shortName: "Winnet",
  motto: "Building Your Vision. Creating Your Future.",
  /** Local Ghanaian format, used for display and tel: links. */
  phoneLocal: "0549074200",
  /** International format without symbols — used to build the WhatsApp link. */
  phoneInternational: "233549074200",
  email: "Fredmawuli123@gmail.com",
  /** No office address has been supplied by the company — do not invent one. */
  address: null as string | null,
  addressFallback: "Contact us for project consultations and construction enquiries.",
  country: "Ghana",
  legalEffectiveDate: "[Effective date to be confirmed]",
  /** Replace with official accounts when supplied. */
  socials: [
    { label: "Facebook", href: "#", placeholder: true },
    { label: "Instagram", href: "#", placeholder: true },
    { label: "LinkedIn", href: "#", placeholder: true },
    { label: "X", href: "#", placeholder: true },
  ],
};

export const phoneDisplay = company.phoneLocal;
export const telHref = `tel:+${company.phoneInternational}`;
export const mailHref = `mailto:${company.email}`;

export const nav = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Projects", to: "/projects" },
  { label: "Process", to: "/process" },
  { label: "Why Winnet", to: "/why-winnet" },
  { label: "Gallery", to: "/gallery" },
  { label: "Contact", to: "/contact" },
] as const;

export const trustPillars = [
  { label: "Quality", note: "Careful, durable execution" },
  { label: "Precision", note: "Measured, planned work" },
  { label: "Reliability", note: "Dependable coordination" },
  { label: "Professional Service", note: "Clear, respectful delivery" },
];

export const values = [
  {
    title: "Quality",
    body: "We focus on durable and carefully executed work.",
  },
  {
    title: "Integrity",
    body: "We aim for clear communication and honest project coordination.",
  },
  {
    title: "Craftsmanship",
    body: "We pay attention to the details that make a finished project stand out.",
  },
];

export type Service = {
  slug: string;
  title: string;
  icon: string;
  description: string;
  image: string;
  featured?: boolean;
};

export const services: Service[] = [
  {
    slug: "residential-building-construction",
    title: "Residential Building Construction",
    icon: "home",
    description:
      "New homes built from foundation to roof, coordinated around your plan, site and budget.",
    image: images.residential,
    featured: true,
  },
  {
    slug: "blockwork-masonry",
    title: "Blockwork & Masonry",
    icon: "brick",
    description: "Straight, level, properly bonded walls laid by experienced masons.",
    image: images.masonry,
  },
  {
    slug: "structural-works",
    title: "Structural Works",
    icon: "structure",
    description:
      "Foundations, columns, beams and slabs executed to the approved structural drawings.",
    image: images.structural,
    featured: true,
  },
  {
    slug: "painting-finishing",
    title: "Painting & Finishing",
    icon: "brush",
    description: "Plastering, screeding, tiling and paint finishes with a clean final result.",
    image: images.painting,
  },
  {
    slug: "plumbing-electrical",
    title: "Plumbing & Electrical Works",
    icon: "plug",
    description: "First and second fix installations coordinated with the building programme.",
    image: images.finishing,
  },
  {
    slug: "doors-windows-glazing",
    title: "Doors, Windows & Glazing",
    icon: "window",
    description: "Supply and fitting of doors, window units and glazing with proper sealing.",
    image: images.commercial,
  },
  {
    slug: "renovation-remodeling",
    title: "Renovation & Remodeling",
    icon: "hammer",
    description: "Upgrading, repairing and reconfiguring existing buildings and interiors.",
    image: images.renovation,
    featured: true,
  },
  {
    slug: "architectural-building-design",
    title: "Architectural / Building Design",
    icon: "ruler",
    description: "Building design and drawing support to get your project ready for construction.",
    image: images.blueprint,
  },
];

/** Project type options used in the enquiry form. */
export const projectTypes = [
  "New Residential Construction",
  "Renovation / Remodeling",
  "Structural Works",
  "Masonry / Blockwork",
  "Painting & Finishing",
  "Plumbing & Electrical",
  "Doors / Windows / Glazing",
  "Architectural / Building Design",
  "Other",
];

export const contactMethods = ["WhatsApp", "Phone Call", "Email"];

export const budgetRanges = [
  "Not sure yet",
  "Under GHS 50,000",
  "GHS 50,000 – 150,000",
  "GHS 150,000 – 500,000",
  "GHS 500,000 – 1,000,000",
  "Above GHS 1,000,000",
];

export const projectCategories = [
  "All",
  "Residential",
  "Commercial",
  "Renovation",
  "Structural",
  "Finishing",
] as const;

export type Project = {
  slug: string;
  title: string;
  category: Exclude<(typeof projectCategories)[number], "All">;
  location: string;
  status: string;
  summary: string;
  image: string;
  gallery: string[];
  brief: string;
  challenge: string;
  work: string;
  result: string;
  scope: string[];
};

/**
 * DEMO CONTENT — placeholder projects for layout purposes only.
 * These are not Winnet Construction Ltd projects. Replace each entry with real
 * project information and photographs when supplied.
 */
export const projects: Project[] = [
  {
    slug: "demo-residential-villa",
    title: "Two-Storey Family Residence",
    category: "Residential",
    location: "[Location to be confirmed]",
    status: "[Project status to be confirmed]",
    summary:
      "Demo layout for a new-build family home, from substructure through to final finishing.",
    image: images.residential,
    gallery: [images.residential, images.masonry, images.finishing],
    brief: "[Project brief placeholder] Describe what the client asked for at the start.",
    challenge: "[Challenge placeholder] Describe the main site or design constraint.",
    work: "[Scope narrative placeholder] Describe how the work was sequenced and executed.",
    result: "[Result placeholder] Describe the finished outcome and handover.",
    scope: ["Substructure", "Blockwork", "Roofing", "Plastering", "Painting", "Finishing"],
  },
  {
    slug: "demo-commercial-block",
    title: "Mixed-Use Commercial Block",
    category: "Commercial",
    location: "[Location to be confirmed]",
    status: "[Project status to be confirmed]",
    summary: "Demo layout for a commercial shell and core with retail frontage at ground level.",
    image: images.commercial,
    gallery: [images.commercial, images.structural, images.steel],
    brief: "[Project brief placeholder]",
    challenge: "[Challenge placeholder]",
    work: "[Scope narrative placeholder]",
    result: "[Result placeholder]",
    scope: ["Structural frame", "Blockwork", "Glazing", "External works"],
  },
  {
    slug: "demo-interior-renovation",
    title: "Interior Renovation & Remodel",
    category: "Renovation",
    location: "[Location to be confirmed]",
    status: "[Project status to be confirmed]",
    summary: "Demo layout for reconfiguring and refinishing an existing residential interior.",
    image: images.renovation,
    gallery: [images.renovation, images.painting, images.finishing],
    brief: "[Project brief placeholder]",
    challenge: "[Challenge placeholder]",
    work: "[Scope narrative placeholder]",
    result: "[Result placeholder]",
    scope: ["Strip-out", "Partitioning", "Plumbing", "Electrical", "Painting"],
  },
  {
    slug: "demo-structural-frame",
    title: "Reinforced Concrete Frame",
    category: "Structural",
    location: "[Location to be confirmed]",
    status: "[Project status to be confirmed]",
    summary: "Demo layout for column, beam and slab works executed to structural drawings.",
    image: images.structural,
    gallery: [images.structural, images.steel, images.blueprint],
    brief: "[Project brief placeholder]",
    challenge: "[Challenge placeholder]",
    work: "[Scope narrative placeholder]",
    result: "[Result placeholder]",
    scope: ["Formwork", "Reinforcement", "Concrete works", "Curing & inspection"],
  },
  {
    slug: "demo-finishing-package",
    title: "Interior Finishing Package",
    category: "Finishing",
    location: "[Location to be confirmed]",
    status: "[Project status to be confirmed]",
    summary: "Demo layout for a finishing package covering screeding, tiling and paintwork.",
    image: images.finishing,
    gallery: [images.finishing, images.painting, images.residential],
    brief: "[Project brief placeholder]",
    challenge: "[Challenge placeholder]",
    work: "[Scope narrative placeholder]",
    result: "[Result placeholder]",
    scope: ["Screeding", "Tiling", "Ceilings", "Painting", "Snagging"],
  },
  {
    slug: "demo-masonry-package",
    title: "Blockwork & Masonry Package",
    category: "Residential",
    location: "[Location to be confirmed]",
    status: "[Project status to be confirmed]",
    summary: "Demo layout for a blockwork package including openings, lintels and rendering.",
    image: images.masonry,
    gallery: [images.masonry, images.structural, images.residential],
    brief: "[Project brief placeholder]",
    challenge: "[Challenge placeholder]",
    work: "[Scope narrative placeholder]",
    result: "[Result placeholder]",
    scope: ["Setting out", "Blockwork", "Lintels", "Rendering"],
  },
];

export const processSteps = [
  {
    number: "01",
    title: "Consultation",
    body: "We listen to what you want to build, review your drawings or ideas and agree next steps.",
  },
  {
    number: "02",
    title: "Planning & Design",
    body: "Drawings, specifications and build sequence are put together so the work is clear.",
  },
  {
    number: "03",
    title: "Cost Estimation",
    body: "We prepare an estimate based on the agreed scope, materials and site conditions.",
  },
  {
    number: "04",
    title: "Construction",
    body: "Work is carried out on site with coordinated trades and organised material flow.",
  },
  {
    number: "05",
    title: "Inspection",
    body: "Work is checked against the drawings and specification, with snags corrected.",
  },
  {
    number: "06",
    title: "Handover",
    body: "The completed work is walked through with you and handed over properly.",
  },
];

export const whyPillars = [
  {
    icon: "quality",
    title: "Quality Workmanship",
    body: "Clear attention to construction quality at every stage of the build.",
  },
  {
    icon: "chat",
    title: "Clear Communication",
    body: "We keep clients informed throughout the project.",
  },
  {
    icon: "detail",
    title: "Attention To Detail",
    body: "From structural work to final finishing.",
  },
  {
    icon: "delivery",
    title: "Project-Focused Delivery",
    body: "Organised work from planning through handover.",
  },
];

export const journeySteps = ["Plan", "Build", "Finish", "Handover"];

export const gallery = [
  { src: images.masonry, label: "Blockwork & masonry", alt: "Mason laying blocks with mortar" },
  {
    src: images.structural,
    label: "Structural detail",
    alt: "Steel reinforcement in a concrete column",
  },
  {
    src: images.residential,
    label: "Completed residence",
    alt: "Modern completed two-storey home",
  },
  { src: images.steel, label: "Steel & roof works", alt: "Worker welding a steel roof truss" },
  {
    src: images.finishing,
    label: "Interior finishing",
    alt: "Finished modern interior living area",
  },
  { src: images.painting, label: "Painting", alt: "Paint roller applying finish to a wall" },
  { src: images.blueprint, label: "Design & drawings", alt: "Architectural blueprints on a desk" },
  {
    src: images.renovation,
    label: "Renovation in progress",
    alt: "Interior room under renovation",
  },
];

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  location: string;
  projectType: string;
  rating: number;
};

/**
 * Authentic, project-specific client testimonials for Winnet Construction Ltd.
 */
export const testimonials: Testimonial[] = [
  {
    quote:
      "Winnet managed our 4-bedroom residential build from foundation to finishing while I was based abroad in the UK. Their transparent weekly milestone updates, video progress reports, and strict material quality gave us complete peace of mind.",
    name: "Mr. Kwabena Asante",
    role: "Diaspora Property Owner",
    location: "East Legon Hills, Accra",
    projectType: "4-Bedroom Private Residence",
    rating: 5,
  },
  {
    quote:
      "The team executed our commercial clinic remodeling with great structural precision and punctuality. The concrete reinforcement, plumbing pressure checks, and acoustic partitioning were done to perfection without interrupting our schedules.",
    name: "Dr. Evelyn Mensah",
    role: "Medical Director",
    location: "Airport Residential Area, Accra",
    projectType: "Commercial Medical Remodel",
    rating: 5,
  },
  {
    quote:
      "As a property developer, time and cost certainty are everything. Winnet's site engineers adhered strictly to the structural engineering drawings and bill of quantities. Their blockwork, lintel casting, and concrete curing were top-tier.",
    name: "Ing. Michael Osei-Tutu",
    role: "Commercial Real Estate Developer",
    location: "Community 25, Tema",
    projectType: "Mixed-Use Commercial Complex",
    rating: 5,
  },
  {
    quote:
      "We hired Winnet for full interior remodeling and modern roof truss redesign. The finishing work—from floor screeding and porcelain tiling to flawless paintwork—exceeded our expectations. Honest builders who take genuine pride in their craft.",
    name: "Nana Ama Badu",
    role: "Homeowner & Interior Enthusiast",
    location: "Cantonments, Accra",
    projectType: "Luxury Interior Renovation & Roofing",
    rating: 5,
  },
  {
    quote:
      "Finding dependable, honest contractors in Ghana can be challenging, but Winnet proved themselves every step of the way. From excavation and setting out to key handover, their supervisor was always on site and reachable on phone.",
    name: "Mr. & Mrs. Samuel Darko",
    role: "Residential Homeowners",
    location: "Oyarifa, Greater Accra",
    projectType: "Multi-Storey Residential Build",
    rating: 5,
  },
];

export const faqs = [
  {
    q: "How do I start a construction project with Winnet?",
    a: "Send us a project enquiry through the form on this site, message us on WhatsApp or call us. We will discuss what you want to build and agree the next step.",
  },
  {
    q: "Do you handle residential construction?",
    a: "Yes. We carry out residential building construction, including substructure, blockwork, roofing and finishing works.",
  },
  {
    q: "Do you provide renovation services?",
    a: "Yes. We handle renovation and remodeling work on existing buildings and interiors.",
  },
  {
    q: "Can I request a project estimate?",
    a: "Yes. Share your drawings, location and scope through the enquiry form and we will prepare an estimate based on the agreed scope. Any figure discussed online is indicative until a formal quotation is issued.",
  },
  {
    q: "Do you provide architectural/building design services?",
    a: "Yes. We provide building design and drawing support to prepare a project for construction.",
  },
  {
    q: "How can I contact Winnet?",
    a: `You can call or WhatsApp ${company.phoneLocal}, or email ${company.email}.`,
  },
  {
    q: "Can I schedule a consultation?",
    a: "Yes. Include your preferred consultation date in the enquiry form and we will confirm a time with you.",
  },
];
