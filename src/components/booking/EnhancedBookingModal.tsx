import { useState } from "react";
import { toast } from "sonner";
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Building,
  HardHat,
  Video,
  CheckCircle2,
  Phone,
  Mail,
  MessageSquare,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  DollarSign,
  Info,
  CalendarCheck,
  ShieldCheck,
  Copy,
  Check,
  FileCheck,
  Globe,
  Compass,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { company, contactMethods, phoneDisplay } from "@/config/site";
import { whatsappUrl, mailtoUrl } from "@/lib/enquiry";

export type ConsultationType = "site-inspection" | "diaspora-video" | "office-review";

export type BookingFormData = {
  consultationType: ConsultationType;
  projectType: string;
  location: string;
  landmark: string;
  digitalAddressGps: string;
  plotSize: string;
  diasporaCountry: string;
  videoPlatform: "Zoom" | "Google Meet" | "WhatsApp Video";
  projectStage: string;
  targetTimeline: string;
  estimatedAreaSqm: number;
  qualityTier: "standard" | "executive" | "luxury";
  preferredDate: string;
  timeSlot: "morning" | "afternoon" | "evening";
  fullName: string;
  phone: string;
  countryCode: string;
  email: string;
  contactPreference: "WhatsApp" | "Phone Call" | "Email";
  notes: string;
};

const INITIAL_BOOKING: BookingFormData = {
  consultationType: "site-inspection",
  projectType: "Residential Luxury Villa / Storey Home",
  location: "",
  landmark: "",
  digitalAddressGps: "",
  plotSize: "70 x 100 ft (1 Standard Plot)",
  diasporaCountry: "United Kingdom (UK)",
  videoPlatform: "WhatsApp Video",
  projectStage: "Architectural Drawings in Progress",
  targetTimeline: "Within 1 – 3 Months",
  estimatedAreaSqm: 280,
  qualityTier: "executive",
  preferredDate: new Date(Date.now() + 86400000 * 2).toISOString().split("T")[0],
  timeSlot: "morning",
  fullName: "",
  phone: "",
  countryCode: "+233",
  email: "",
  contactPreference: "WhatsApp",
  notes: "",
};

const PROJECT_TYPES = [
  "Residential Luxury Villa / Storey Home",
  "Modern Custom Bungalow / Duplex",
  "Commercial Complex / Retail Plaza",
  "Structural Concrete Casting & Steel Trussing",
  "Turnkey Finishing, Tiling & POP Ceilings",
  "Stalled Project Takeover & Structural Audit",
];

const PLOT_SIZES = [
  "70 x 100 ft (1 Standard Plot)",
  "100 x 100 ft (Corner Plot)",
  "140 x 100 ft (2 Plots)",
  "1 to 2 Acres",
  "Multi-Acre Commercial Site",
  "Not Sure / Site Survey Required",
];

const PROJECT_STAGES = [
  "Raw Land / Plot Acquired (Needs Soil Test & Survey)",
  "Architectural Drawings in Progress",
  "Blueprints & Permits Approved (Ready to Build)",
  "Active Site (Substructure / Decking / Roofing in progress)",
  "Budgeting & Initial Exploration",
];

const TARGET_TIMELINES = [
  "Immediate (Within 1 – 2 Weeks)",
  "Within 1 – 3 Months",
  "Within 3 – 6 Months",
  "Future Planning (6+ Months)",
];

const TIME_SLOTS = [
  {
    id: "morning",
    label: "Morning Daylight Slot",
    time: "09:00 – 12:00 GMT",
    desc: "Optimal for site soil, boundary & foundation daylight checks",
  },
  {
    id: "afternoon",
    label: "Afternoon Technical Slot",
    time: "13:00 – 16:00 GMT",
    desc: "Best for architectural drawings, BOQ & specification review",
  },
  {
    id: "evening",
    label: "Diaspora Evening Slot",
    time: "16:30 – 19:00 GMT",
    desc: "Convenient for UK, US, Canada & European timezone alignment",
  },
];

const COUNTRY_CODES = [
  { code: "+233", country: "Ghana 🇬🇭" },
  { code: "+44", country: "United Kingdom 🇬🇧" },
  { code: "+1", country: "USA / Canada 🇺🇸 🇨🇦" },
  { code: "+49", country: "Germany 🇩🇪" },
  { code: "+31", country: "Netherlands 🇳🇱" },
  { code: "+39", country: "Italy 🇮🇹" },
  { code: "+353", country: "Ireland 🇮🇪" },
  { code: "+27", country: "South Africa 🇿🇦" },
  { code: "+234", country: "Nigeria 🇳🇬" },
  { code: "+971", country: "UAE 🇦🇪" },
  { code: "+61", country: "Australia 🇦🇺" },
];

export function EnhancedBookingModal({
  presetProjectType,
  onClose,
}: {
  presetProjectType?: string;
  onClose?: () => void;
}) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [form, setForm] = useState<BookingFormData>({
    ...INITIAL_BOOKING,
    projectType: presetProjectType || INITIAL_BOOKING.projectType,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof BookingFormData, string>>>({});
  const [bookingReference, setBookingReference] = useState<string>("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const update = <K extends keyof BookingFormData>(key: K, value: BookingFormData[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  // Dual Currency Estimator Calculation (Ghana Construction Benchmarks)
  const calculateEstimatedCost = () => {
    const sqm = form.estimatedAreaSqm || 280;
    let ratePerSqmGhs = 5500; // Executive standard
    if (form.qualityTier === "standard") ratePerSqmGhs = 3800;
    if (form.qualityTier === "luxury") ratePerSqmGhs = 8500;

    const totalGhs = sqm * ratePerSqmGhs;
    const totalUsd = Math.round(totalGhs / 15.5); // Current standard conversion benchmark
    return {
      ghs: totalGhs.toLocaleString(),
      usd: totalUsd.toLocaleString(),
      rateGhs: ratePerSqmGhs.toLocaleString(),
    };
  };

  const validateStep = (currentStep: number): boolean => {
    const nextErrors: Partial<Record<keyof BookingFormData, string>> = {};

    if (currentStep === 1) {
      if (!form.projectType) nextErrors.projectType = "Please select a project scope";
    }

    if (currentStep === 2) {
      if (
        form.consultationType === "site-inspection" &&
        (!form.location || form.location.trim().length < 2)
      ) {
        nextErrors.location = "Please enter the town or area in Ghana (e.g. East Legon Hills)";
      }
      if (!form.preferredDate) {
        nextErrors.preferredDate = "Please choose a preferred appointment date";
      }
    }

    if (currentStep === 3) {
      if (!form.fullName || form.fullName.trim().length < 2) {
        nextErrors.fullName = "Please enter your full name";
      }
      if (!form.phone || form.phone.trim().length < 6) {
        nextErrors.phone = "Please enter a valid phone number";
      }
      if (!form.email || !form.email.includes("@")) {
        nextErrors.email = "Please enter a valid email address";
      }
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      if (step < 3) {
        setStep((s) => (s + 1) as 1 | 2 | 3 | 4);
      } else if (step === 3) {
        // Generate pristine unique booking reference ticket
        const ref = `WCL-2026-${Math.floor(1000 + Math.random() * 9000)}`;
        setBookingReference(ref);
        setIsCompleted(true);
        setStep(4);
      }
    } else {
      toast.error("Please complete the required details.");
    }
  };

  const handleBack = () => {
    if (step > 1) setStep((s) => (s - 1) as 1 | 2 | 3 | 4);
  };

  /**
   * Generates a pristinely arranged, crystal-clear booking dossier
   * optimized for WhatsApp, Email, CRM, and Site Engineer dispatch.
   */
  const formatTicketSummary = () => {
    const estimate = calculateEstimatedCost();
    const typeLabel =
      form.consultationType === "site-inspection"
        ? "🏗️ On-Site Physical Inspection & Soil Review"
        : form.consultationType === "diaspora-video"
          ? `🌍 Virtual Diaspora Video Consultation (${form.videoPlatform})`
          : "🏛️ In-Office Architectural & BOQ Review (Accra HQ)";

    const slotInfo = TIME_SLOTS.find((s) => s.id === form.timeSlot);

    return `🏛️ *WINNET CONSTRUCTION LTD — OFFICIAL CONSULTATION BOOKING*
*Ref Code:* ${bookingReference}
*Generated:* ${new Date().toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
👤 *CLIENT INFORMATION*
• *Full Name:* ${form.fullName}
• *Phone/WhatsApp:* ${form.countryCode} ${form.phone}
• *Email:* ${form.email}
• *Preferred Channel:* ${form.contactPreference}
${form.consultationType === "diaspora-video" ? `• *Diaspora Base:* ${form.diasporaCountry}\n• *Meeting Platform:* ${form.videoPlatform}` : ""}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📍 *PROJECT & SITE SPECIFICATIONS*
• *Project Scope:* ${form.projectType}
• *Location in Ghana:* ${form.location || "To be confirmed during review"}
${form.landmark ? `• *Nearby Landmark:* ${form.landmark}\n` : ""}${form.digitalAddressGps ? `• *GhanaPost GPS:* ${form.digitalAddressGps}\n` : ""}• *Plot Dimensions:* ${form.plotSize}
• *Current Stage:* ${form.projectStage}
• *Target Timeline:* ${form.targetTimeline}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
💰 *ESTIMATED BENCHMARK (PRELIMINARY)*
• *Target Floor Area:* ~${form.estimatedAreaSqm} m²
• *Finishing Tier:* ${form.qualityTier.toUpperCase()} Quality (~GH₵ ${estimate.rateGhs}/m²)
• *Estimated Build Cost:* ~GH₵ ${estimate.ghs} (Approx. $${estimate.usd} USD)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📅 *SCHEDULED APPOINTMENT*
• *Format:* ${typeLabel}
• *Date:* ${form.preferredDate}
• *Time Slot:* ${slotInfo?.label} (${slotInfo?.time})

${form.notes ? `📝 *SPECIAL CLIENT DIRECTIVES:*\n"${form.notes.trim()}"\n\n` : ""}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📋 *ACTION REQUIRED FOR WINNET ENGINEERING DISPATCH:*
1. Assign Lead Site / Structural Engineer to review site access.
2. Confirm client appointment via ${form.contactPreference}.
3. Prepare preliminary Bill of Quantities (BOQ) outline.
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
_Delivered via Winnet Construction Client Portal_`;
  };

  const handleSendWhatsApp = () => {
    const message = formatTicketSummary();
    const url = whatsappUrl(message);
    window.open(url, "_blank", "noopener,noreferrer");
    toast.success("Opening WhatsApp with your formatted booking dossier!");
  };

  const handleSendEmail = () => {
    const message = formatTicketSummary();
    const subject = `[Booking ${bookingReference}] ${form.fullName} – ${form.projectType}`;
    const url = mailtoUrl(message, subject);
    window.open(url, "_self", "noopener,noreferrer");
    toast.success("Opening email client with your booking summary!");
  };

  const handleCopyTicket = () => {
    const message = formatTicketSummary();
    navigator.clipboard.writeText(message).then(() => {
      setIsCopied(true);
      toast.success("Booking ticket copied to clipboard!");
      setTimeout(() => setIsCopied(false), 2500);
    });
  };

  const estimate = calculateEstimatedCost();

  return (
    <div className="space-y-6">
      {/* Step Progress Indicator */}
      {!isCompleted && (
        <div className="border-b border-black/10 pb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="eyebrow text-gold-deep font-bold">
              Step {step} of 3 •{" "}
              {step === 1
                ? "Format & Project Scope"
                : step === 2
                  ? "Site Location & Schedule"
                  : "Client Details & Review"}
            </span>
            <span className="text-xs font-semibold text-muted-foreground">
              {step === 1 ? "33%" : step === 2 ? "66%" : "100%"}
            </span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-black/10 overflow-hidden">
            <div
              className="h-full bg-gold transition-all duration-300 rounded-full"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>
      )}

      {/* STEP 1: Consultation Type & Project Scope */}
      {step === 1 && (
        <div className="space-y-5">
          <div>
            <Label className="eyebrow text-ink mb-2.5 block">
              1. Choose Consultation Format <span className="text-gold-deep">*</span>
            </Label>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                {
                  id: "site-inspection" as ConsultationType,
                  title: "On-Site Inspection",
                  badge: "Ghana Sites",
                  desc: "Senior engineer visits your plot in Ghana for soil, topography & foundation review",
                  icon: HardHat,
                },
                {
                  id: "diaspora-video" as ConsultationType,
                  title: "Diaspora Video Call",
                  badge: "Overseas / Remote",
                  desc: "Live Zoom / WhatsApp video session tailored to international timezones",
                  icon: Video,
                },
                {
                  id: "office-review" as ConsultationType,
                  title: "In-Office Review",
                  badge: "Accra HQ",
                  desc: "Comprehensive blueprint review, material sample review & contract structuring",
                  icon: Building,
                },
              ].map((item) => {
                const active = form.consultationType === item.id;
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => update("consultationType", item.id)}
                    className={`text-left rounded-2xl border p-4 transition-all duration-200 cursor-pointer relative ${
                      active
                        ? "border-gold bg-gold/10 ring-2 ring-gold/40 shadow-md"
                        : "border-black/10 bg-white/50 hover:border-gold/50 hover:bg-white/80"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div
                        className={`flex size-9 items-center justify-center rounded-xl ${
                          active ? "bg-gold text-ink font-bold" : "bg-black/5 text-ink"
                        }`}
                      >
                        <Icon className="size-5" />
                      </div>
                      {item.badge && (
                        <span
                          className={`text-[0.625rem] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                            active ? "bg-gold text-ink" : "bg-black/10 text-muted-foreground"
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>
                    <h4 className="font-display text-sm font-bold text-ink">{item.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                      {item.desc}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <Label className="eyebrow text-ink mb-2.5 block">
              2. Select Project Scope <span className="text-gold-deep">*</span>
            </Label>
            <div className="grid gap-2 sm:grid-cols-2">
              {PROJECT_TYPES.map((type) => {
                const active = form.projectType === type;
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => update("projectType", type)}
                    className={`text-left rounded-xl border px-3.5 py-3 text-xs font-semibold transition-all cursor-pointer flex items-center justify-between ${
                      active
                        ? "border-gold bg-gold text-ink font-bold shadow-sm"
                        : "border-black/10 bg-white/50 hover:border-gold/40 hover:bg-white/80 text-foreground"
                    }`}
                  >
                    <span>{type}</span>
                    {active && <CheckCircle2 className="size-4 text-ink shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Dual-Currency Interactive Cost Estimator */}
          <div className="rounded-2xl border border-gold/40 bg-gold/10 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="eyebrow text-gold-deep flex items-center gap-1.5 font-bold">
                <Sparkles className="size-3.5 text-gold-deep" />
                Live Building Cost Estimator (Ghana Benchmark)
              </span>
              <span className="text-[0.6875rem] text-muted-foreground font-semibold">
                Dual Currency
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label className="text-xs text-ink/90 block mb-1">Target Floor Area (m²)</Label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="80"
                    max="1000"
                    step="20"
                    value={form.estimatedAreaSqm || 280}
                    onChange={(e) => update("estimatedAreaSqm", Number(e.target.value))}
                    className="flex-1 accent-gold cursor-pointer"
                  />
                  <span className="font-display text-xs font-bold text-ink w-16 text-right">
                    {form.estimatedAreaSqm} m²
                  </span>
                </div>
              </div>

              <div>
                <Label className="text-xs text-ink/90 block mb-1">Finishing Standard</Label>
                <div className="grid grid-cols-3 gap-1">
                  {(["standard", "executive", "luxury"] as const).map((tier) => (
                    <button
                      key={tier}
                      type="button"
                      onClick={() => update("qualityTier", tier)}
                      className={`text-[0.6875rem] uppercase font-bold py-1.5 rounded-lg border transition-colors cursor-pointer ${
                        form.qualityTier === tier
                          ? "bg-gold border-gold text-ink shadow-xs"
                          : "bg-white/50 border-black/10 text-muted-foreground hover:bg-white"
                      }`}
                    >
                      {tier}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-gold/25 pt-2.5 text-xs">
              <span className="text-muted-foreground">Estimated Construction Cost:</span>
              <span className="font-display font-bold text-ink text-sm sm:text-base">
                ~GH₵ {estimate.ghs}{" "}
                <span className="text-xs font-normal text-muted-foreground">
                  (approx. ${estimate.usd} USD)
                </span>
              </span>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: Location & Schedule */}
      {step === 2 && (
        <div className="space-y-5">
          {form.consultationType === "diaspora-video" && (
            <div className="rounded-2xl border border-blue-200 bg-blue-50/70 p-4 space-y-3">
              <div className="flex items-center gap-2 text-blue-900 font-semibold text-xs uppercase tracking-wider">
                <Globe className="size-4 text-blue-700" />
                Diaspora Remote Consultation Setup
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <Label className="text-xs text-ink block mb-1">
                    Your Base / Country of Residence
                  </Label>
                  <Input
                    value={form.diasporaCountry}
                    onChange={(e) => update("diasporaCountry", e.target.value)}
                    placeholder="e.g. London, UK or Texas, USA"
                    className="rounded-xl border border-black/10 bg-white/70 px-3.5 py-2.5 text-sm"
                  />
                </div>
                <div>
                  <Label className="text-xs text-ink block mb-1">
                    Preferred Video Call Platform
                  </Label>
                  <div className="grid grid-cols-3 gap-1">
                    {(["WhatsApp Video", "Zoom", "Google Meet"] as const).map((plat) => (
                      <button
                        key={plat}
                        type="button"
                        onClick={() => update("videoPlatform", plat)}
                        className={`text-[0.6875rem] font-bold py-2 rounded-lg border transition-colors cursor-pointer ${
                          form.videoPlatform === plat
                            ? "bg-gold border-gold text-ink"
                            : "bg-white/60 border-black/10 text-muted-foreground"
                        }`}
                      >
                        {plat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="location-input" className="eyebrow text-ink mb-1.5 block">
                Site Town / Suburb (in Ghana) <span className="text-gold-deep">*</span>
              </Label>
              <Input
                id="location-input"
                value={form.location}
                onChange={(e) => update("location", e.target.value)}
                placeholder="e.g. East Legon Hills, Cantonments, Ahodwo"
                className="rounded-xl border border-black/10 bg-white/50 px-3.5 py-2.5 text-base md:text-sm"
              />
              {errors.location && (
                <p className="text-xs text-destructive mt-1">{errors.location}</p>
              )}
            </div>

            <div>
              <Label htmlFor="landmark-input" className="eyebrow text-ink mb-1.5 block">
                Nearby Landmark / Road Access
              </Label>
              <Input
                id="landmark-input"
                value={form.landmark}
                onChange={(e) => update("landmark", e.target.value)}
                placeholder="e.g. Near British International School / Shell station"
                className="rounded-xl border border-black/10 bg-white/50 px-3.5 py-2.5 text-base md:text-sm"
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="gps-input" className="eyebrow text-ink mb-1.5 block">
                GhanaPost GPS Digital Address (Optional)
              </Label>
              <Input
                id="gps-input"
                value={form.digitalAddressGps}
                onChange={(e) => update("digitalAddressGps", e.target.value.toUpperCase())}
                placeholder="e.g. GA-183-9321 or AK-482-1920"
                className="rounded-xl border border-black/10 bg-white/50 px-3.5 py-2.5 text-base md:text-sm uppercase"
              />
            </div>

            <div>
              <Label className="eyebrow text-ink mb-1.5 block">Plot Dimensions / Size</Label>
              <select
                value={form.plotSize}
                onChange={(e) => update("plotSize", e.target.value)}
                className="w-full rounded-xl border border-black/10 bg-white/50 px-3.5 py-2.5 text-base md:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-gold"
              >
                {PLOT_SIZES.map((ps) => (
                  <option key={ps} value={ps}>
                    {ps}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label className="eyebrow text-ink mb-1.5 block">Current Project Stage</Label>
              <select
                value={form.projectStage}
                onChange={(e) => update("projectStage", e.target.value)}
                className="w-full rounded-xl border border-black/10 bg-white/50 px-3.5 py-2.5 text-base md:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-gold"
              >
                {PROJECT_STAGES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <Label className="eyebrow text-ink mb-1.5 block">Target Start Timeline</Label>
              <select
                value={form.targetTimeline}
                onChange={(e) => update("targetTimeline", e.target.value)}
                className="w-full rounded-xl border border-black/10 bg-white/50 px-3.5 py-2.5 text-base md:text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-gold"
              >
                {TARGET_TIMELINES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Date and Time Slot Picker */}
          <div className="space-y-3 pt-2">
            <Label className="eyebrow text-ink block">
              Choose Date & Time Slot <span className="text-gold-deep">*</span>
            </Label>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <Label className="text-xs text-muted-foreground mb-1 block font-medium">
                  Preferred Date
                </Label>
                <Input
                  type="date"
                  min={new Date().toISOString().split("T")[0]}
                  value={form.preferredDate}
                  onChange={(e) => update("preferredDate", e.target.value)}
                  className="rounded-xl border border-black/10 bg-white/50 px-3.5 py-2.5 text-base md:text-sm"
                />
                {errors.preferredDate && (
                  <p className="text-xs text-destructive mt-1">{errors.preferredDate}</p>
                )}
              </div>

              <div>
                <Label className="text-xs text-muted-foreground mb-1 block font-medium">
                  Time Slot (GMT)
                </Label>
                <div className="space-y-2">
                  {TIME_SLOTS.map((slot) => {
                    const active = form.timeSlot === slot.id;
                    return (
                      <button
                        key={slot.id}
                        type="button"
                        onClick={() => update("timeSlot", slot.id as BookingFormData["timeSlot"])}
                        className={`w-full text-left rounded-xl border px-3 py-2 transition-all cursor-pointer flex items-center justify-between text-xs ${
                          active
                            ? "border-gold bg-gold/20 ring-1 ring-gold font-bold text-ink shadow-xs"
                            : "border-black/10 bg-white/50 hover:bg-white/80 text-muted-foreground"
                        }`}
                      >
                        <div>
                          <span className="font-semibold text-ink block">{slot.label}</span>
                          <span className="text-[0.625rem] text-muted-foreground">{slot.time}</span>
                        </div>
                        {active && <CheckCircle2 className="size-4 text-gold-deep shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="notes-input" className="eyebrow text-ink mb-1.5 block">
              Special Architectural / Structural Notes (Optional)
            </Label>
            <Textarea
              id="notes-input"
              rows={2}
              value={form.notes}
              onChange={(e) => update("notes", e.target.value)}
              placeholder="Tell us about the soil type, number of storeys, specific drawings ready, or key questions for the engineer."
              className="rounded-xl border border-black/10 bg-white/50 px-3.5 py-2 text-base md:text-sm resize-none"
            />
          </div>
        </div>
      )}

      {/* STEP 3: Client Details & Final Review */}
      {step === 3 && (
        <div className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="fullname-input" className="eyebrow text-ink mb-1.5 block">
                Full Name <span className="text-gold-deep">*</span>
              </Label>
              <Input
                id="fullname-input"
                value={form.fullName}
                onChange={(e) => update("fullName", e.target.value)}
                placeholder="e.g. Samuel Mensah"
                className="rounded-xl border border-black/10 bg-white/50 px-3.5 py-2.5 text-base md:text-sm"
              />
              {errors.fullName && (
                <p className="text-xs text-destructive mt-1">{errors.fullName}</p>
              )}
            </div>

            <div>
              <Label htmlFor="phone-input" className="eyebrow text-ink mb-1.5 block">
                Direct Phone / WhatsApp <span className="text-gold-deep">*</span>
              </Label>
              <div className="flex gap-2">
                <select
                  value={form.countryCode}
                  onChange={(e) => update("countryCode", e.target.value)}
                  className="w-32 rounded-xl border border-black/10 bg-white/50 px-2 py-2.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-gold"
                >
                  {COUNTRY_CODES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.country} ({c.code})
                    </option>
                  ))}
                </select>
                <Input
                  id="phone-input"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="24 400 0000"
                  className="flex-1 rounded-xl border border-black/10 bg-white/50 px-3.5 py-2.5 text-base md:text-sm"
                />
              </div>
              {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone}</p>}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="email-input" className="eyebrow text-ink mb-1.5 block">
                Email Address <span className="text-gold-deep">*</span>
              </Label>
              <Input
                id="email-input"
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                placeholder="samuel@example.com"
                className="rounded-xl border border-black/10 bg-white/50 px-3.5 py-2.5 text-base md:text-sm"
              />
              {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
            </div>

            <div>
              <Label className="eyebrow text-ink mb-1.5 block">
                Preferred Communication Channel
              </Label>
              <div className="grid grid-cols-3 gap-1.5">
                {(["WhatsApp", "Phone Call", "Email"] as const).map((pref) => (
                  <button
                    key={pref}
                    type="button"
                    onClick={() => update("contactPreference", pref)}
                    className={`py-2 text-xs font-semibold rounded-xl border transition-colors cursor-pointer ${
                      form.contactPreference === pref
                        ? "bg-gold text-ink font-bold border-gold shadow-xs"
                        : "bg-white/50 border-black/10 text-muted-foreground hover:bg-white"
                    }`}
                  >
                    {pref}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Review Summary Card */}
          <div className="rounded-2xl border border-black/15 bg-black/5 p-4 space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <h5 className="font-display font-bold text-ink uppercase tracking-wider text-[0.6875rem] flex items-center gap-1.5">
                <FileCheck className="size-4 text-gold-deep" />
                Draft Booking Review:
              </h5>
              <span className="text-[0.6875rem] font-bold text-gold-deep uppercase">
                {form.qualityTier} Tier (~{form.estimatedAreaSqm} m²)
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-muted-foreground">
              <div>
                <span className="block text-ink font-semibold">Format:</span>
                {form.consultationType === "site-inspection"
                  ? "On-Site Physical Inspection"
                  : form.consultationType === "diaspora-video"
                    ? `Diaspora Video (${form.videoPlatform})`
                    : "In-Office Blueprint Review"}
              </div>
              <div>
                <span className="block text-ink font-semibold">Site Location:</span>
                {form.location || "To be confirmed"} {form.landmark ? `(${form.landmark})` : ""}
              </div>
              <div>
                <span className="block text-ink font-semibold">Scheduled Date:</span>
                {form.preferredDate} ({TIME_SLOTS.find((s) => s.id === form.timeSlot)?.time})
              </div>
              <div>
                <span className="block text-ink font-semibold">Project Scope:</span>
                {form.projectType}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* STEP 4: Success Confirmation & Multi-Channel Transmit */}
      {step === 4 && (
        <div className="text-center space-y-5 py-3">
          <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-600 shadow-md">
            <CalendarCheck className="size-8" />
          </div>

          <div>
            <span className="eyebrow text-emerald-700 font-bold tracking-wider">
              Booking Ticket Generated
            </span>
            <h3 className="font-display text-2xl font-bold text-ink mt-1">
              Reference: <span className="text-gold-deep">{bookingReference}</span>
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground mt-2 max-w-lg mx-auto leading-relaxed">
              Your consultation request has been prepared in our verified engineering format. Send
              it via WhatsApp or Email to alert our lead project manager immediately.
            </p>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-col gap-2.5 sm:flex-row justify-center max-w-xl mx-auto">
            <Button
              id="confirm-whatsapp-btn"
              type="button"
              variant="gold"
              size="cta"
              onClick={handleSendWhatsApp}
              className="flex-1 shadow-lg shadow-gold/25 cursor-pointer font-bold"
            >
              <MessageSquare className="size-4 mr-1.5" />
              Send to WhatsApp (Instant)
            </Button>

            <Button
              id="confirm-email-btn"
              type="button"
              variant="outlineInk"
              size="cta"
              onClick={handleSendEmail}
              className="flex-1 bg-white/60 hover:bg-white cursor-pointer font-bold"
            >
              <Mail className="size-4 mr-1.5" />
              Send by Email
            </Button>

            <Button
              id="copy-ticket-btn"
              type="button"
              variant="outlineInk"
              size="cta"
              onClick={handleCopyTicket}
              className="sm:w-auto px-4 bg-white/60 hover:bg-white cursor-pointer font-bold"
              title="Copy formatted text summary"
            >
              {isCopied ? (
                <>
                  <Check className="size-4 text-emerald-600 mr-1" /> Copied!
                </>
              ) : (
                <>
                  <Copy className="size-4 mr-1" /> Copy Ticket
                </>
              )}
            </Button>
          </div>

          {/* Formatted Preview Box for Receiver/Handler */}
          <div className="text-left rounded-2xl border border-black/15 bg-black/[0.03] p-4 max-h-48 overflow-y-auto font-mono text-[0.6875rem] text-foreground/80 leading-relaxed scrollbar-thin">
            <pre className="whitespace-pre-wrap font-mono">{formatTicketSummary()}</pre>
          </div>

          <div className="pt-2 border-t border-black/10 flex flex-wrap items-center justify-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <ShieldCheck className="size-3.5 text-emerald-600" /> Transparent BOQ Guarantee
            </span>
            <span className="flex items-center gap-1">
              <Clock className="size-3.5 text-gold-deep" /> Engineer response within 2 hrs
            </span>
          </div>
        </div>
      )}

      {/* Step Navigation Controls */}
      {!isCompleted && (
        <div className="flex items-center justify-between border-t border-black/10 pt-4">
          {step > 1 ? (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="text-xs uppercase font-bold tracking-wider text-muted-foreground hover:text-ink cursor-pointer"
            >
              <ArrowLeft className="size-3.5 mr-1" />
              Back
            </Button>
          ) : (
            <div />
          )}

          <Button
            id="booking-continue-btn"
            type="button"
            variant="gold"
            size="cta"
            onClick={handleNext}
            className="shadow-md shadow-gold/20 cursor-pointer font-bold"
          >
            {step === 3 ? "Generate Booking Ticket" : "Continue"}
            <ArrowRight className="size-4 ml-1" />
          </Button>
        </div>
      )}
    </div>
  );
}
