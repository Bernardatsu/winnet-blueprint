import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

import { handleChatRequest, type ChatMessage } from "./server/gemini";

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
        url.pathname === "/google4cfcc257bdd58937.html" ||
        url.pathname === "/google4cfcc257bdd58937"
      ) {
        return new Response("google-site-verification: google4cfcc257bdd58937.html\n", {
          status: 200,
          headers: {
            "content-type": "text/html; charset=utf-8",
            "cache-control": "public, max-age=3600",
          },
        });
      }

      // Handle Gemini AI Chat API
      if (url.pathname === "/api/chat" && request.method === "POST") {
        try {
          const body = (await request.json()) as { messages?: ChatMessage[] };
          const messages = body.messages || [];
          const reply = await handleChatRequest(messages);
          return new Response(JSON.stringify({ reply }), {
            status: 200,
            headers: {
              "content-type": "application/json; charset=utf-8",
              "cache-control": "no-store",
            },
          });
        } catch (err) {
          console.error("Chat API error:", err);
          return new Response(
            JSON.stringify({
              reply:
                "I apologize, but I encountered a temporary connection issue. Please feel free to book a consultation directly using the button above or message us on WhatsApp!",
            }),
            {
              status: 200,
              headers: { "content-type": "application/json; charset=utf-8" },
            },
          );
        }
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
