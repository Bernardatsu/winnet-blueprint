import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/lib/enquiry";

/** Floating WhatsApp enquiry button with a subtle pulse and hover tooltip. */
export function WhatsAppButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="fixed bottom-5 right-4 z-40 flex items-center gap-3 sm:bottom-7 sm:right-7">
      <span
        className={`font-display pointer-events-none hidden border border-ink/10 bg-card px-3 py-2 text-[0.625rem] uppercase tracking-[0.16em] text-ink shadow-lg transition-opacity duration-200 sm:block ${
          hovered ? "opacity-100" : "opacity-0"
        }`}
        aria-hidden="true"
      >
        Need a quote?
      </span>
      <a
        href={whatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Winnet Construction Ltd on WhatsApp"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        className="relative flex size-14 items-center justify-center rounded-full bg-gold text-ink shadow-[0_10px_30px_-8px_oklch(0.19_0.006_60/0.55)] transition-transform hover:scale-105"
      >
        <span
          className="absolute inset-0 animate-ping rounded-full bg-gold/50 motion-reduce:hidden"
          aria-hidden="true"
        />
        <MessageCircle className="relative size-6" aria-hidden="true" />
      </a>
    </div>
  );
}
