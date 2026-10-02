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
import { CalendarCheck } from "lucide-react";

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
          <DialogHeader className="relative space-y-1.5 border-b border-white/20 bg-ink px-4 py-4 sm:px-6 sm:py-5 text-left text-on-ink">
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
          </DialogHeader>

          <div className="relative p-4 sm:p-6">
            <ProjectEnquiryForm presetProjectType={preset} onSent={closeEnquiry} />
          </div>
        </DialogContent>
      </Dialog>
    </EnquiryContext.Provider>
  );
}
