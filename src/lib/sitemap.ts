export const SITE_URL = "https://winnet-constructions.vercel.app";

export const SITEMAP_PAGES = [
  {
    loc: `${SITE_URL}/`,
    changefreq: "weekly",
    priority: "1.0",
    images: [
      {
        loc: `${SITE_URL}/og-home.jpg`,
        title: "Winnet Construction Ltd - Building Contractors in Ghana",
      },
      {
        loc: `${SITE_URL}/winnet-icon-square-512.svg`,
        title: "Winnet Construction Ltd Brand Emblem",
      },
    ],
  },
  {
    loc: `${SITE_URL}/about`,
    changefreq: "monthly",
    priority: "0.8",
    images: [
      {
        loc: `${SITE_URL}/og-about.jpg`,
        title: "About Winnet Construction Ltd Team and History",
      },
    ],
  },
  {
    loc: `${SITE_URL}/services`,
    changefreq: "weekly",
    priority: "0.9",
    images: [
      {
        loc: `${SITE_URL}/og-services.jpg`,
        title: "Winnet Construction Ltd Professional Building Services in Ghana",
      },
    ],
  },
  {
    loc: `${SITE_URL}/projects`,
    changefreq: "weekly",
    priority: "0.9",
    images: [
      {
        loc: `${SITE_URL}/og-projects.jpg`,
        title: "Winnet Construction Ltd Portfolio & Building Projects",
      },
    ],
  },
  {
    loc: `${SITE_URL}/process`,
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    loc: `${SITE_URL}/why-winnet`,
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    loc: `${SITE_URL}/gallery`,
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    loc: `${SITE_URL}/contact`,
    changefreq: "monthly",
    priority: "0.8",
    images: [
      {
        loc: `${SITE_URL}/og-contact.jpg`,
        title: "Contact Winnet Construction Ltd in Accra Ghana",
      },
    ],
  },
  {
    loc: `${SITE_URL}/privacy`,
    changefreq: "yearly",
    priority: "0.3",
  },
  {
    loc: `${SITE_URL}/terms`,
    changefreq: "yearly",
    priority: "0.3",
  },
  // Projects
  {
    loc: `${SITE_URL}/projects/demo-residential-villa`,
    changefreq: "monthly",
    priority: "0.7",
  },
  {
    loc: `${SITE_URL}/projects/demo-commercial-block`,
    changefreq: "monthly",
    priority: "0.7",
  },
  {
    loc: `${SITE_URL}/projects/demo-interior-renovation`,
    changefreq: "monthly",
    priority: "0.7",
  },
  {
    loc: `${SITE_URL}/projects/demo-structural-frame`,
    changefreq: "monthly",
    priority: "0.7",
  },
  {
    loc: `${SITE_URL}/projects/demo-finishing-package`,
    changefreq: "monthly",
    priority: "0.7",
  },
  {
    loc: `${SITE_URL}/projects/demo-masonry-package`,
    changefreq: "monthly",
    priority: "0.7",
  },
];

export function getSitemapXml(dateStr = new Date().toISOString().split("T")[0]): string {
  const urlEntries = SITEMAP_PAGES.map((page) => {
    let imagesXml = "";
    if (page.images && page.images.length > 0) {
      imagesXml = page.images
        .map(
          (img) => `
    <image:image>
      <image:loc>${img.loc}</image:loc>
      <image:title>${img.title}</image:title>
    </image:image>`,
        )
        .join("");
    }

    return `  <url>
    <loc>${page.loc}</loc>
    <lastmod>${dateStr}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>${imagesXml}
  </url>`;
  }).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urlEntries}
</urlset>
`;
}
