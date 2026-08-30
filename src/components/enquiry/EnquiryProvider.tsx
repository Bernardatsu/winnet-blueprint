import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { EnhancedBookingModal } from "@/components/booking/EnhancedBookingModal";
import { ProjectEnquiryForm } from "./ProjectEnquiryForm";
import { company } from "@/config/site";
import { CalendarCheck2, FileEdit } from "lucide-react";

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
  const [activeTab, setActiveTab] = useState<"booking" | "quick">("booking");

  const openEnquiry = useCallback((presetProjectType?: string) => {
    setPreset(presetProjectType);
    setActiveTab("booking");
    setOpen(true);
  }, []);

  const closeEnquiry = useCallback(() => setOpen(false), []);

  const value = useMemo(() => ({ openEnquiry, closeEnquiry }), [openEnquiry, closeEnquiry]);

  return (
    <EnquiryContext.Provider value={value}>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[92vh] max-w-[95vw] sm:max-w-2xl gap-0 overflow-y-auto rounded-3xl border border-white/60 bg-white/80 backdrop-blur-3xl backdrop-saturate-150 p-0 shadow-[inset_0_1.5px_1px_rgba(255,255,255,0.9),0_25px_60px_-15px_rgba(0,0,0,0.35)] ring-1 ring-black/5">
          <DialogHeader className="relative space-y-2 border-b border-white/20 bg-black/75 backdrop-blur-2xl px-5 py-5 sm:px-8 sm:py-6 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]">
            <div className="flex items-center justify-between">
              <p className="eyebrow text-gold font-bold">Winnet Construction Hub</p>
              <div className="flex items-center rounded-xl bg-white/10 p-1 border border-white/15">
                <button
                  type="button"
                  onClick={() => setActiveTab("booking")}
                  className={`font-display flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[0.625rem] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    activeTab === "booking"
                      ? "bg-gold text-ink shadow-sm"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  <CalendarCheck2 className="size-3" />
                  Book Consultation
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("quick")}
                  className={`font-display flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[0.625rem] font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    activeTab === "quick"
                      ? "bg-gold text-ink shadow-sm"
                      : "text-white/70 hover:text-white"
                  }`}
                >
                  <FileEdit className="size-3" />
                  Quick Enquiry
                </button>
              </div>
            </div>
            <DialogTitle className="h-display text-xl sm:text-2xl lg:text-3xl text-on-ink">
              {activeTab === "booking"
                ? "Schedule Site Inspection & Estimate"
                : "Send Project Details"}
            </DialogTitle>
            <DialogDescription className="text-xs sm:text-sm text-on-ink-muted leading-relaxed">
              {activeTab === "booking"
                ? `Choose an on-site physical inspection, diaspora video session, or office review with ${company.shortName}'s engineering team.`
                : `Submit your architectural drawings or project notes directly to ${company.shortName} via WhatsApp or email.`}
            </DialogDescription>
          </DialogHeader>

          <div className="relative bg-white/50 backdrop-blur-xl px-4 py-5 sm:px-8 sm:py-7">
            {activeTab === "booking" ? (
              <EnhancedBookingModal presetProjectType={preset} onClose={closeEnquiry} />
            ) : (
              <ProjectEnquiryForm presetProjectType={preset} onSent={closeEnquiry} />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </EnquiryContext.Provider>
  );
}
