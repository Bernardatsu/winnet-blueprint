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
        <DialogContent className="max-h-[92vh] gap-0 overflow-y-auto rounded-3xl border border-white/60 bg-white/75 backdrop-blur-3xl backdrop-saturate-150 p-0 shadow-[inset_0_1.5px_1px_rgba(255,255,255,0.9),0_25px_60px_-15px_rgba(0,0,0,0.35)] ring-1 ring-black/5 sm:max-w-2xl">
          <DialogHeader className="relative space-y-2 border-b border-white/20 bg-black/45 backdrop-blur-2xl px-5 py-6 text-left sm:px-8 shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]">
            <p className="eyebrow text-gold">Project Enquiry</p>
            <DialogTitle className="h-display text-2xl text-on-ink sm:text-3xl">
              Start Your Project
            </DialogTitle>
            <DialogDescription className="text-sm text-on-ink-muted">
              Tell us about your project. Your details are sent straight to {company.shortName} by
              WhatsApp or email — nothing is stored on this website.
            </DialogDescription>
          </DialogHeader>
          <div className="relative bg-white/40 backdrop-blur-xl px-5 py-6 sm:px-8 sm:py-8">
            <ProjectEnquiryForm presetProjectType={preset} onSent={closeEnquiry} />
          </div>
        </DialogContent>
      </Dialog>
    </EnquiryContext.Provider>
  );
}
