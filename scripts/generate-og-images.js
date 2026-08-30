import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

async function generateOgImages() {
  console.log("Generating professional 1200x630 Open Graph images...");

  const width = 1200;
  const height = 630;

  // 1. Master Default OG Image (public/og-image.jpg and public/og-image.png)
  // Background: hero-construction.jpg cropped & darkened with rich brand overlay
  const heroJpg = path.resolve("src/assets/hero-construction.jpg");
  const heroBuffer = fs.readFileSync(heroJpg);

  const heroResized = await sharp(heroBuffer)
    .resize(width, height, { fit: "cover", position: "center" })
    .toBuffer();

  // SVG Overlay with dark gradient, gold accents, brand badge, typography, and trust pills
  const masterSvgOverlay = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Dark rich gradient for readability -->
        <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0a0a0a" stop-opacity="0.88" />
          <stop offset="45%" stop-color="#111111" stop-opacity="0.85" />
          <stop offset="100%" stop-color="#0a0a0a" stop-opacity="0.94" />
        </linearGradient>

        <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#F2B23C" />
          <stop offset="50%" stop-color="#FBCD6E" />
          <stop offset="100%" stop-color="#C6871D" />
        </linearGradient>

        <linearGradient id="badgeBox" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#242424" />
          <stop offset="100%" stop-color="#0e0e0e" />
        </linearGradient>

        <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000000" flood-opacity="0.6" />
        </filter>
      </defs>

      <!-- Gradient scrim over hero photography -->
      <rect width="${width}" height="${height}" fill="url(#bgGrad)" />

      <!-- Decorative subtle blueprint grid lines -->
      <g stroke="#ffffff" stroke-opacity="0.04" stroke-width="1">
        <line x1="80" y1="0" x2="80" y2="630" />
        <line x1="280" y1="0" x2="280" y2="630" />
        <line x1="480" y1="0" x2="480" y2="630" />
        <line x1="680" y1="0" x2="680" y2="630" />
        <line x1="880" y1="0" x2="880" y2="630" />
        <line x1="1080" y1="0" x2="1080" y2="630" />
        <line x1="0" y1="80" x2="1200" y2="80" />
        <line x1="0" y1="230" x2="1200" y2="230" />
        <line x1="0" y1="380" x2="1200" y2="380" />
        <line x1="0" y1="530" x2="1200" y2="530" />
      </g>

      <!-- Golden Top Accent Line -->
      <rect x="0" y="0" width="${width}" height="6" fill="url(#goldGrad)" />

      <!-- Left Brand Badge / Emblem Box -->
      <g transform="translate(80, 80)" filter="url(#shadow)">
        <!-- Badge rounded box -->
        <rect x="0" y="0" width="104" height="104" rx="22" fill="url(#badgeBox)" stroke="#F2B23C" stroke-width="2" stroke-opacity="0.4" />
        
        <!-- Winnet 'W' Symbol -->
        <g transform="translate(4, 3) scale(0.46)">
          <path d="M 44 67 L 64 67 L 81 120 L 94 84 L 103 84 L 108 96 L 112 84 L 121 84 L 138 120 L 155 67 L 175 67 L 148 143 L 132 143 L 108 100 L 83 143 L 66 143 Z" fill="#F2B23C" />
          <path d="M 148 143 L 132 143 L 108 100 L 112 84 L 121 84 L 138 120 Z" fill="#C6871D"/>
          <path d="M 83 143 L 66 143 L 81 120 L 94 84 L 103 84 L 108 100 Z" fill="#C6871D"/>
          <path d="M 44 67 L 64 67 L 71 87 L 58 76 Z" fill="#FBCD6E"/>
          <path d="M 155 67 L 175 67 L 161 76 L 148 87 Z" fill="#FBCD6E"/>
          <rect x="44" y="143" width="131" height="7" rx="1.5" fill="#C6871D"/>
          <rect x="44" y="143" width="131" height="2.5" rx="1" fill="#F2B23C"/>
        </g>

        <!-- Company Name Header -->
        <text x="124" y="44" font-family="Arial, Helvetica, sans-serif" font-weight="900" font-size="34" letter-spacing="1.5" fill="#FFFFFF">WINNET</text>
        <text x="125" y="74" font-family="Arial, Helvetica, sans-serif" font-weight="800" font-size="16" letter-spacing="4" fill="#F2B23C">CONSTRUCTION LTD</text>
        <text x="126" y="98" font-family="Arial, Helvetica, sans-serif" font-weight="600" font-size="13" letter-spacing="1.5" fill="#999999">BUILDING &amp; CIVIL CONTRACTORS • GHANA</text>
      </g>

      <!-- Main Headline / Motto -->
      <g transform="translate(80, 240)">
        <text x="0" y="55" font-family="Arial, Helvetica, sans-serif" font-weight="800" font-size="52" fill="#FFFFFF" letter-spacing="-0.5">
          Building Your Vision.
        </text>
        <text x="0" y="118" font-family="Arial, Helvetica, sans-serif" font-weight="800" font-size="52" fill="url(#goldGrad)" letter-spacing="-0.5">
          Creating Your Future.
        </text>

        <text x="0" y="172" font-family="Arial, Helvetica, sans-serif" font-weight="500" font-size="22" fill="#DDDDDD">
          Premier Residential Villas • Commercial Developments • Structural Engineering
        </text>
      </g>

      <!-- Trust Badges & Contact Footer Bar -->
      <g transform="translate(80, 490)">
        <!-- Pill 1: Licensed & Supervised -->
        <rect x="0" y="0" width="260" height="48" rx="12" fill="#1C1C1C" stroke="#F2B23C" stroke-opacity="0.35" stroke-width="1.5" />
        <circle cx="24" cy="24" r="6" fill="#F2B23C" />
        <text x="42" y="29" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="14" fill="#FFFFFF" letter-spacing="0.5">DIRECT SITE SUPERVISION</text>

        <!-- Pill 2: Milestone Reporting -->
        <rect x="276" y="0" width="240" height="48" rx="12" fill="#1C1C1C" stroke="#F2B23C" stroke-opacity="0.35" stroke-width="1.5" />
        <circle cx="300" cy="24" r="6" fill="#F2B23C" />
        <text x="318" y="29" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="14" fill="#FFFFFF" letter-spacing="0.5">MILESTONE TRACKING</text>

        <!-- Pill 3: Transparent Estimation -->
        <rect x="532" y="0" width="240" height="48" rx="12" fill="#1C1C1C" stroke="#F2B23C" stroke-opacity="0.35" stroke-width="1.5" />
        <circle cx="556" cy="24" r="6" fill="#F2B23C" />
        <text x="574" y="29" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="14" fill="#FFFFFF" letter-spacing="0.5">COST CERTAINTY &amp; BOQ</text>

        <!-- Phone / WhatsApp Box right -->
        <rect x="800" y="0" width="240" height="48" rx="12" fill="url(#goldGrad)" />
        <text x="920" y="30" font-family="Arial, Helvetica, sans-serif" font-weight="800" font-size="15" fill="#0D0D0D" text-anchor="middle" letter-spacing="0.8">
          TEL: 0549074200
        </text>
      </g>
    </svg>
  `;

  // Composite Master OG Image
  const masterJpgBuffer = await sharp(heroResized)
    .composite([{ input: Buffer.from(masterSvgOverlay), top: 0, left: 0 }])
    .jpeg({ quality: 90, progressive: true })
    .toBuffer();

  fs.writeFileSync(path.resolve("public/og-image.jpg"), masterJpgBuffer);
  fs.writeFileSync(path.resolve("public/og-home.jpg"), masterJpgBuffer);

  const masterPngBuffer = await sharp(heroResized)
    .composite([{ input: Buffer.from(masterSvgOverlay), top: 0, left: 0 }])
    .png({ compressionLevel: 8 })
    .toBuffer();

  fs.writeFileSync(path.resolve("public/og-image.png"), masterPngBuffer);
  console.log("✓ Generated public/og-image.jpg and public/og-image.png (1200x630)");

  // 2. Projects OG Image (public/og-projects.jpg)
  const resJpg = path.resolve("src/assets/project-residential.jpg");
  const resBuffer = fs.readFileSync(resJpg);
  const resResized = await sharp(resBuffer)
    .resize(width, height, { fit: "cover", position: "center" })
    .toBuffer();

  const projectsSvgOverlay = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgGradP" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0a0a0a" stop-opacity="0.88" />
          <stop offset="100%" stop-color="#0a0a0a" stop-opacity="0.94" />
        </linearGradient>
        <linearGradient id="goldGradP" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#F2B23C" />
          <stop offset="100%" stop-color="#C6871D" />
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#bgGradP)" />
      <rect x="0" y="0" width="${width}" height="6" fill="url(#goldGradP)" />

      <!-- Brand Header -->
      <g transform="translate(80, 80)">
        <text x="0" y="32" font-family="Arial, Helvetica, sans-serif" font-weight="900" font-size="28" letter-spacing="1" fill="#FFFFFF">WINNET CONSTRUCTION LTD</text>
        <text x="0" y="60" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="14" letter-spacing="3" fill="#F2B23C">PROJECTS &amp; CONSTRUCTION PORTFOLIO</text>
      </g>

      <!-- Headline -->
      <g transform="translate(80, 240)">
        <text x="0" y="55" font-family="Arial, Helvetica, sans-serif" font-weight="800" font-size="48" fill="#FFFFFF">
          Custom Residential &amp;
        </text>
        <text x="0" y="115" font-family="Arial, Helvetica, sans-serif" font-weight="800" font-size="48" fill="url(#goldGradP)">
          Commercial Developments.
        </text>
        <text x="0" y="165" font-family="Arial, Helvetica, sans-serif" font-weight="500" font-size="22" fill="#CCCCCC">
          Explore ongoing and completed engineering builds across Greater Accra and Ghana.
        </text>
      </g>

      <!-- Footer Pills -->
      <g transform="translate(80, 490)">
        <rect x="0" y="0" width="220" height="46" rx="10" fill="#1C1C1C" stroke="#F2B23C" stroke-width="1.5" stroke-opacity="0.4"/>
        <text x="110" y="28" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="14" fill="#FFFFFF" text-anchor="middle">RESIDENTIAL VILLAS</text>

        <rect x="236" y="0" width="220" height="46" rx="10" fill="#1C1C1C" stroke="#F2B23C" stroke-width="1.5" stroke-opacity="0.4"/>
        <text x="346" y="28" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="14" fill="#FFFFFF" text-anchor="middle">COMMERCIAL SITES</text>

        <rect x="472" y="0" width="220" height="46" rx="10" fill="#1C1C1C" stroke="#F2B23C" stroke-width="1.5" stroke-opacity="0.4"/>
        <text x="582" y="28" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="14" fill="#FFFFFF" text-anchor="middle">STRUCTURAL WORKS</text>
      </g>
    </svg>
  `;

  const projectsJpgBuffer = await sharp(resResized)
    .composite([{ input: Buffer.from(projectsSvgOverlay), top: 0, left: 0 }])
    .jpeg({ quality: 90, progressive: true })
    .toBuffer();

  fs.writeFileSync(path.resolve("public/og-projects.jpg"), projectsJpgBuffer);
  console.log("✓ Generated public/og-projects.jpg (1200x630)");

  // 3. Services OG Image (public/og-services.jpg)
  const structJpg = path.resolve("src/assets/project-structural.jpg");
  const structBuffer = fs.readFileSync(structJpg);
  const structResized = await sharp(structBuffer)
    .resize(width, height, { fit: "cover", position: "center" })
    .toBuffer();

  const servicesSvgOverlay = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgGradS" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0a0a0a" stop-opacity="0.88" />
          <stop offset="100%" stop-color="#0a0a0a" stop-opacity="0.94" />
        </linearGradient>
        <linearGradient id="goldGradS" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#F2B23C" />
          <stop offset="100%" stop-color="#C6871D" />
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#bgGradS)" />
      <rect x="0" y="0" width="${width}" height="6" fill="url(#goldGradS)" />

      <!-- Brand Header -->
      <g transform="translate(80, 80)">
        <text x="0" y="32" font-family="Arial, Helvetica, sans-serif" font-weight="900" font-size="28" letter-spacing="1" fill="#FFFFFF">WINNET CONSTRUCTION LTD</text>
        <text x="0" y="60" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="14" letter-spacing="3" fill="#F2B23C">CONSTRUCTION &amp; ENGINEERING SERVICES</text>
      </g>

      <!-- Headline -->
      <g transform="translate(80, 240)">
        <text x="0" y="55" font-family="Arial, Helvetica, sans-serif" font-weight="800" font-size="48" fill="#FFFFFF">
          Full-Scope Building Solutions
        </text>
        <text x="0" y="115" font-family="Arial, Helvetica, sans-serif" font-weight="800" font-size="48" fill="url(#goldGradS)">
          From Foundation To Handover.
        </text>
        <text x="0" y="165" font-family="Arial, Helvetica, sans-serif" font-weight="500" font-size="22" fill="#CCCCCC">
          Residential • Commercial • Structural Reinforcement • Remodeling • Architectural Finishes
        </text>
      </g>
    </svg>
  `;

  const servicesJpgBuffer = await sharp(structResized)
    .composite([{ input: Buffer.from(servicesSvgOverlay), top: 0, left: 0 }])
    .jpeg({ quality: 90, progressive: true })
    .toBuffer();

  fs.writeFileSync(path.resolve("public/og-services.jpg"), servicesJpgBuffer);
  console.log("✓ Generated public/og-services.jpg (1200x630)");

  // 4. Contact & About OG Images (public/og-contact.jpg and public/og-about.jpg)
  const ctaJpg = path.resolve("src/assets/cta-architecture.jpg");
  const ctaBuffer = fs.readFileSync(ctaJpg);
  const ctaResized = await sharp(ctaBuffer)
    .resize(width, height, { fit: "cover", position: "center" })
    .toBuffer();

  const contactSvgOverlay = `
    <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgGradC" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#0a0a0a" stop-opacity="0.88" />
          <stop offset="100%" stop-color="#0a0a0a" stop-opacity="0.94" />
        </linearGradient>
        <linearGradient id="goldGradC" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#F2B23C" />
          <stop offset="100%" stop-color="#C6871D" />
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#bgGradC)" />
      <rect x="0" y="0" width="${width}" height="6" fill="url(#goldGradC)" />

      <!-- Brand Header -->
      <g transform="translate(80, 80)">
        <text x="0" y="32" font-family="Arial, Helvetica, sans-serif" font-weight="900" font-size="28" letter-spacing="1" fill="#FFFFFF">WINNET CONSTRUCTION LTD</text>
        <text x="0" y="60" font-family="Arial, Helvetica, sans-serif" font-weight="700" font-size="14" letter-spacing="3" fill="#F2B23C">PROJECT CONSULTATION &amp; ESTIMATION</text>
      </g>

      <!-- Headline -->
      <g transform="translate(80, 240)">
        <text x="0" y="55" font-family="Arial, Helvetica, sans-serif" font-weight="800" font-size="48" fill="#FFFFFF">
          Start Your Construction Project
        </text>
        <text x="0" y="115" font-family="Arial, Helvetica, sans-serif" font-weight="800" font-size="48" fill="url(#goldGradC)">
          Direct Builder Consultations.
        </text>
        <text x="0" y="165" font-family="Arial, Helvetica, sans-serif" font-weight="500" font-size="22" fill="#CCCCCC">
          Call: 0549074200 • WhatsApp: +233549074200 • Email: Fredmawuli123@gmail.com
        </text>
      </g>
    </svg>
  `;

  const contactJpgBuffer = await sharp(ctaResized)
    .composite([{ input: Buffer.from(contactSvgOverlay), top: 0, left: 0 }])
    .jpeg({ quality: 90, progressive: true })
    .toBuffer();

  fs.writeFileSync(path.resolve("public/og-contact.jpg"), contactJpgBuffer);
  fs.writeFileSync(path.resolve("public/og-about.jpg"), contactJpgBuffer);
  console.log("✓ Generated public/og-contact.jpg and public/og-about.jpg (1200x630)");

  console.log("All Open Graph social preview images generated successfully!");
}

generateOgImages().catch((err) => {
  console.error("Error generating OG images:", err);
  process.exit(1);
});
