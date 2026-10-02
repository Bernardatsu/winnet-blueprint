import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

import { getSitemapXml } from "./lib/sitemap";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const url = new URL(request.url);

      // Handle Google Search Console verification endpoints directly
      if (
        url.pathname === "/google270b1bc48ab03f45.html" ||
        url.pathname === "/google270b1bc48ab03f45"
      ) {
        return new Response("google-site-verification: google270b1bc48ab03f45.html\n", {
          status: 200,
          headers: {
            "content-type": "text/html; charset=utf-8",
            "cache-control": "public, max-age=3600",
          },
        });
      }

      if (
        url.pathname === "/google2de381af7c64b3ae.html" ||
        url.pathname === "/google2de381af7c64b3ae"
      ) {
        return new Response("google-site-verification: google2de381af7c64b3ae.html\n", {
          status: 200,
          headers: {
            "content-type": "text/html; charset=utf-8",
            "cache-control": "public, max-age=3600",
          },
        });
      }

      // Redirect /booking and /book to /contact
      if (url.pathname === "/booking" || url.pathname === "/book") {
        return Response.redirect(`${url.origin}/contact`, 301);
      }

      // Handle XML Sitemap directly
      if (url.pathname === "/sitemap.xml" || url.pathname === "/sitemap") {
        return new Response(getSitemapXml(), {
          status: 200,
          headers: {
            "content-type": "application/xml; charset=utf-8",
            "cache-control": "public, max-age=86400, s-maxage=86400",
          },
        });
      }

      // Handle robots.txt directly
      if (url.pathname === "/robots.txt") {
        const robotsTxt = `User-agent: *\nAllow: /\n\n# Sitemap Index\nSitemap: https://winnet-constructions.vercel.app/sitemap.xml\n`;
        return new Response(robotsTxt, {
          status: 200,
          headers: {
            "content-type": "text/plain; charset=utf-8",
            "cache-control": "public, max-age=86400",
          },
        });
      }

      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      const normalized = await normalizeCatastrophicSsrResponse(response);

      // Enhance static asset cache-control headers for maximum loading speed
      const isStaticAsset =
        url.pathname.startsWith("/assets/") ||
        url.pathname.startsWith("/_build/") ||
        /\.(webp|jpg|jpeg|png|svg|ico|woff2|css|js)$/i.test(url.pathname);

      if (isStaticAsset && normalized.status === 200 && !normalized.headers.has("cache-control")) {
        const headers = new Headers(normalized.headers);
        headers.set("cache-control", "public, max-age=31536000, immutable");
        return new Response(normalized.body, {
          status: normalized.status,
          statusText: normalized.statusText,
          headers,
        });
      }

      return normalized;
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
