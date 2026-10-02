import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProjectEnquiryForm } from "./ProjectEnquiryForm";
import { company } from "@/config/site";
import { CalendarCheck, X } from "lucide-react";

type EnquiryContextValue = {
  openEnquiry: (presetProjectType?: string) => void;
  closeEnquiry: () => void;
};

const EnquiryContext = createContext<EnquiryContextValue | null>(null);

export function useEnquiry() {
  const ctx = useContext(EnquiryContext);
  if (!ctx) throw new Error("useEnquiry must be used inside <EnquiryProvider>");
  return ctx;
}

export function EnquiryProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [preset, setPreset] = useState<string | undefined>(undefined);

  const openEnquiry = useCallback((presetProjectType?: string) => {
    setPreset(presetProjectType);
    setOpen(true);
  }, []);

  const closeEnquiry = useCallback(() => setOpen(false), []);

  const value = useMemo(() => ({ openEnquiry, closeEnquiry }), [openEnquiry, closeEnquiry]);

  return (
    <EnquiryContext.Provider value={value}>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[92vh] w-[95vw] max-w-lg sm:max-w-xl gap-0 overflow-y-auto rounded-2xl sm:rounded-3xl border border-white/60 bg-white/95 backdrop-blur-2xl p-0 shadow-2xl ring-1 ring-black/5">
          <DialogHeader className="relative space-y-1.5 border-b border-white/20 bg-ink px-4 py-4 sm:px-6 sm:py-5 text-left text-on-ink pr-14">
            <div className="flex items-center gap-2 text-gold text-xs font-bold uppercase tracking-wider">
              <CalendarCheck className="size-4" />
              <span>{company.name}</span>
            </div>
            <DialogTitle className="h-display text-lg sm:text-xl md:text-2xl text-on-ink">
              Book Project Consultation
            </DialogTitle>
            <DialogDescription className="text-xs sm:text-sm text-on-ink-muted leading-relaxed">
              Share your project location and scope for a direct site inspection or estimate from
              our engineering team.
            </DialogDescription>
            {/* Prominent, high-contrast Close Button */}
            <button
              type="button"
              onClick={closeEnquiry}
              className="absolute right-3.5 top-3.5 sm:right-5 sm:top-5 z-20 flex size-9 items-center justify-center rounded-full bg-white/15 text-white hover:bg-white/30 hover:text-white border border-white/25 transition-all cursor-pointer shadow-md focus:outline-none focus:ring-2 focus:ring-gold"
              aria-label="Close booking modal"
            >
              <X className="size-5" />
            </button>
          </DialogHeader>

          <div className="relative p-4 sm:p-6">
            <ProjectEnquiryForm presetProjectType={preset} onSent={closeEnquiry} />
            <div className="mt-4 pt-3 border-t border-slate-200/70 flex justify-center">
              <button
                type="button"
                onClick={closeEnquiry}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors py-1.5 px-3.5 rounded-lg hover:bg-slate-100"
              >
                <X className="size-3.5" />
                <span>Close Window</span>
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </EnquiryContext.Provider>
  );
}
