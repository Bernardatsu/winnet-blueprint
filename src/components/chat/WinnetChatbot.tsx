import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  MessageSquare,
  X,
  Send,
  Sparkles,
  PhoneCall,
  Calendar,
  Calculator,
  RotateCcw,
  Bot,
  User,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Mic,
  MicOff,
  Maximize2,
  Minimize2,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { company, phoneDisplay, telHref } from "@/config/site";
import { whatsappUrl } from "@/lib/enquiry";
import { useEnquiry } from "@/components/enquiry/EnquiryProvider";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  actions?: Array<{
    label: string;
    action: "enquiry" | "whatsapp" | "call" | "estimate";
    projectType?: string;
  }>;
};

const INITIAL_MESSAGES: Message[] = [
  {
    id: "welcome-1",
    role: "assistant",
    content: `Akwaaba! I am **Kwesi**, your AI Construction Advisor & Project Guide at **${company.name}**.\n\nI can assist you with estimating construction costs per m² in Ghana, detailing our diaspora milestone supervision, reviewing soil & permit requirements, or scheduling a site inspection with our senior engineers.\n\nHow can I help you build today?`,
    timestamp: new Date(),
    actions: [
      { label: "📅 Book Site Inspection", action: "enquiry" },
      { label: "💰 Calculate Build Cost", action: "estimate" },
      { label: "🌍 Diaspora Project Guide", action: "whatsapp" },
    ],
  },
];

const SUGGESTED_QUESTIONS = [
  "💰 How much does it cost to build a 4-bedroom house in Accra?",
  "📅 How do I schedule a certified structural site inspection?",
  "🌍 How does Winnet safeguard diaspora projects from overseas?",
  "🏗️ What is included in your detailed Bills of Quantities (BOQ)?",
  "📋 What building permits do I need before breaking ground?",
];

interface SpeechRecognitionEvent {
  results: {
    [index: number]: {
      [index: number]: {
        transcript: string;
      };
    };
  };
}

interface ISpeechRecognition {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onstart: () => void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: () => void;
  onend: () => void;
  start: () => void;
  stop: () => void;
}

interface WindowWithSpeech extends Window {
  SpeechRecognition?: new () => ISpeechRecognition;
  webkitSpeechRecognition?: new () => ISpeechRecognition;
}

export function WinnetChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { openEnquiry } = useEnquiry();

  // Scroll to bottom whenever messages update
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setHasUnread(false);
      // Autofocus input on desktop devices
      if (window.innerWidth >= 768) {
        setTimeout(() => inputRef.current?.focus(), 150);
      }
    }
  }, [isOpen, messages]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Build conversation payload for server Gemini endpoint
      const conversationHistory = [...messages, userMessage].map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: conversationHistory }),
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = (await res.json()) as { reply?: string };
      const replyContent =
        data.reply ||
        "Thank you! Our engineering team is on standby. Would you like to schedule a site inspection or chat directly on WhatsApp?";

      // Determine contextual quick actions
      const replyLower = replyContent.toLowerCase();
      const actions: Message["actions"] = [];

      if (
        replyLower.includes("book") ||
        replyLower.includes("inspect") ||
        replyLower.includes("consult") ||
        replyLower.includes("appointment")
      ) {
        actions.push({ label: "📅 Schedule Inspection", action: "enquiry" });
      }
      if (
        replyLower.includes("whatsapp") ||
        replyLower.includes("engineer") ||
        replyLower.includes("contact")
      ) {
        actions.push({ label: "💬 Chat with Lead Engineer", action: "whatsapp" });
      }
      if (
        replyLower.includes("cost") ||
        replyLower.includes("price") ||
        replyLower.includes("estimate") ||
        replyLower.includes("budget")
      ) {
        actions.push({ label: "📋 Detailed Project BOQ", action: "enquiry" });
      }

      const assistantMessage: Message = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: replyContent,
        timestamp: new Date(),
        actions: actions.length > 0 ? actions : undefined,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error("Chat error:", err);
      const fallbackMessage: Message = {
        id: `fallback-${Date.now()}`,
        role: "assistant",
        content:
          "Thank you for reaching out! I am Kwesi, your AI Construction Advisor. We are available for immediate discussion on WhatsApp, or you can book an on-site structural inspection right now.",
        timestamp: new Date(),
        actions: [
          { label: "📅 Book Consultation", action: "enquiry" },
          { label: "💬 Open WhatsApp", action: "whatsapp" },
        ],
      };
      setMessages((prev) => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleActionClick = (
    action: "enquiry" | "whatsapp" | "call" | "estimate",
    projectType?: string,
  ) => {
    if (action === "enquiry" || action === "estimate") {
      openEnquiry(projectType);
      if (window.innerWidth < 768) {
        setIsOpen(false);
      }
    } else if (action === "whatsapp") {
      const summary = messages
        .filter((m) => m.role === "user")
        .map((m) => m.content)
        .slice(-3)
        .join(" | ");
      const url = whatsappUrl(
        summary
          ? `Hello Winnet Construction, I was discussing with Kwesi (AI Guide) regarding: "${summary}". I would like to speak directly with an engineer.`
          : undefined,
      );
      window.open(url, "_blank", "noopener,noreferrer");
    } else if (action === "call") {
      window.location.href = telHref;
    }
  };

  const resetChat = () => {
    setMessages(INITIAL_MESSAGES);
    setHasUnread(false);
  };

  // Voice Input Handler (Web Speech API)
  const toggleSpeechRecognition = () => {
    const speechWin = window as WindowWithSpeech;
    const SpeechRecognition = speechWin.SpeechRecognition || speechWin.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice input is not supported on this browser.");
      return;
    }

    if (isListening) {
      setIsListening(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0]?.[0]?.transcript || "";
        if (transcript) {
          setInputValue((prev) => (prev ? `${prev} ${transcript}` : transcript));
        }
        setIsListening(false);
      };
      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);

      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-4 right-3 z-40 flex items-center gap-2.5 sm:bottom-6 sm:right-6">
        {/* Desktop notification indicator */}
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            className="hidden cursor-pointer items-center gap-2 rounded-full border border-gold/40 bg-black/90 px-3.5 py-2 text-xs font-semibold text-white shadow-2xl backdrop-blur-md transition-all hover:bg-black hover:border-gold md:flex ring-1 ring-white/10"
            onClick={() => setIsOpen(true)}
          >
            <span className="flex size-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-gold font-bold">Kwesi</span>
            <span className="text-white/70">• AI Construction Guide</span>
          </motion.div>
        )}

        <motion.button
          id="winnet-ai-trigger"
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          aria-expanded={isOpen}
          aria-label="Open Kwesi, Winnet AI Construction Advisor"
          className="relative flex size-14 sm:size-16 items-center justify-center rounded-full bg-gold text-ink shadow-[0_10px_35px_-6px_rgba(242,178,60,0.65)] ring-2 ring-gold/40 transition-transform cursor-pointer"
        >
          {/* Pulse ring when closed */}
          {!isOpen && (
            <span
              className="absolute inset-0 animate-ping rounded-full bg-gold/40 motion-reduce:hidden"
              aria-hidden="true"
            />
          )}

          <AnimatePresence mode="wait" initial={false}>
            {isOpen ? (
              <motion.div
                key="close-icon"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                <X className="size-6 text-ink stroke-[2.5]" />
              </motion.div>
            ) : (
              <motion.div
                key="chat-icon"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="relative"
              >
                <MessageSquare className="size-6 text-ink fill-ink/20 stroke-[2.2]" />
                <Sparkles className="absolute -top-1.5 -right-1.5 size-3.5 text-ink animate-bounce" />
                {hasUnread && (
                  <span className="absolute -top-2 -right-2 size-3 rounded-full bg-destructive ring-2 ring-gold" />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Chatbot Window / Full-screen Sheet on Mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="winnet-ai-chatbot-window"
            initial={{ opacity: 0, y: 24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.94 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed z-50 flex flex-col overflow-hidden bg-black/92 text-white shadow-[0_25px_80px_rgba(0,0,0,0.9),inset_0_1px_1px_rgba(255,255,255,0.2)] backdrop-blur-3xl backdrop-saturate-150 border border-white/20 transition-all duration-300
              ${
                /* Mobile: Bottom-sheet / Full overlay on small screens */
                "inset-x-0 bottom-0 top-10 rounded-t-3xl border-b-0 sm:top-auto sm:inset-x-auto sm:right-6 sm:bottom-20 sm:rounded-3xl sm:border-b"
              }
              ${
                /* Desktop Sizing (Default vs Expanded) */
                isExpanded
                  ? "sm:w-[660px] sm:h-[720px] sm:max-h-[88vh]"
                  : "sm:w-[440px] sm:h-[640px] sm:max-h-[82vh]"
              }
            `}
          >
            {/* Mobile Sheet Drag Indicator */}
            <div className="flex sm:hidden justify-center pt-2.5 pb-1 bg-black/90">
              <div className="h-1.5 w-12 rounded-full bg-white/25" />
            </div>

            {/* Header */}
            <div className="relative flex items-center justify-between border-b border-white/10 bg-gradient-to-r from-black/90 via-zinc-950 to-black/90 px-4 py-3 sm:px-5 sm:py-3.5">
              <div className="flex items-center gap-3">
                <div className="relative flex size-10 items-center justify-center rounded-2xl bg-gold/20 border border-gold/40 text-gold shadow-inner">
                  <Bot className="size-5" />
                  <span className="absolute -bottom-0.5 -right-0.5 size-3 rounded-full bg-emerald-500 ring-2 ring-black" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-base font-bold tracking-wide text-white">
                      Kwesi
                    </h3>
                    <span className="rounded-full bg-gold/20 px-2 py-0.5 text-[0.625rem] font-bold text-gold uppercase tracking-wider border border-gold/30">
                      AI Advisor
                    </span>
                  </div>
                  <p className="text-[0.6875rem] text-white/60 flex items-center gap-1">
                    <ShieldCheck className="size-3 text-gold" />
                    Winnet Construction Ltd • Online
                  </p>
                </div>
              </div>

              {/* Header Action Icons */}
              <div className="flex items-center gap-1">
                {/* Desktop Expand/Minimize Toggle */}
                <button
                  type="button"
                  onClick={() => setIsExpanded((v) => !v)}
                  title={isExpanded ? "Standard view" : "Expand window"}
                  aria-label={isExpanded ? "Standard view" : "Expand window"}
                  className="hidden sm:flex size-8 items-center justify-center rounded-lg text-white/60 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                >
                  {isExpanded ? <Minimize2 className="size-4" /> : <Maximize2 className="size-4" />}
                </button>

                <button
                  type="button"
                  onClick={resetChat}
                  title="Reset conversation"
                  aria-label="Reset conversation"
                  className="flex size-8 items-center justify-center rounded-lg text-white/60 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                >
                  <RotateCcw className="size-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  title="Close chat"
                  aria-label="Close chat"
                  className="flex size-8 items-center justify-center rounded-lg text-white/60 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="size-5" />
                </button>
              </div>
            </div>

            {/* Quick Action Top Banner */}
            <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.04] px-4 py-2 text-[0.6875rem]">
              <span className="text-white/70">Need human engineer follow-up?</span>
              <button
                type="button"
                onClick={() => handleActionClick("whatsapp")}
                className="font-display text-gold hover:underline flex items-center gap-1 font-semibold cursor-pointer"
              >
                WhatsApp Winnet <ArrowRight className="size-3" />
              </button>
            </div>

            {/* Message Stream */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-sm leading-relaxed scrollbar-thin scrollbar-thumb-white/20">
              {messages.map((msg) => {
                const isUser = msg.role === "user";
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className={`flex gap-2.5 ${isUser ? "justify-end" : "justify-start"}`}
                  >
                    {!isUser && (
                      <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-gold text-ink font-bold text-xs mt-0.5 shadow-sm">
                        K
                      </div>
                    )}

                    <div
                      className={`max-w-[88%] sm:max-w-[85%] rounded-2xl px-4 py-3 shadow-md ${
                        isUser
                          ? "bg-gold text-ink font-medium rounded-tr-xs"
                          : "bg-white/10 text-white/95 border border-white/15 backdrop-blur-md rounded-tl-xs"
                      }`}
                    >
                      {/* Formatted Text Content */}
                      <div className="space-y-2 whitespace-pre-wrap">
                        {msg.content.split("\n\n").map((para, i) => (
                          <p
                            key={i}
                            className="text-[0.8125rem] sm:text-[0.875rem] leading-relaxed"
                          >
                            {formatText(para, isUser)}
                          </p>
                        ))}
                      </div>

                      {/* Action buttons if available */}
                      {msg.actions && msg.actions.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2 pt-2.5 border-t border-white/15">
                          {msg.actions.map((act, i) => (
                            <button
                              key={i}
                              type="button"
                              onClick={() => handleActionClick(act.action, act.projectType)}
                              className="font-display inline-flex items-center gap-1.5 rounded-xl border border-gold/40 bg-gold/15 px-3 py-1.5 text-[0.6875rem] font-bold uppercase tracking-wider text-gold shadow-sm hover:bg-gold hover:text-ink transition-all cursor-pointer"
                            >
                              {act.label}
                            </button>
                          ))}
                        </div>
                      )}

                      <div
                        className={`mt-1.5 text-[0.625rem] ${
                          isUser ? "text-ink/60 text-right" : "text-white/45 text-left"
                        }`}
                      >
                        {msg.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>

                    {isUser && (
                      <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-white/20 text-white text-xs font-bold mt-0.5">
                        <User className="size-3.5" />
                      </div>
                    )}
                  </motion.div>
                );
              })}

              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-2.5 justify-start"
                >
                  <div className="flex size-7 shrink-0 items-center justify-center rounded-full bg-gold text-ink font-bold text-xs mt-0.5 shadow-sm">
                    K
                  </div>
                  <div className="rounded-2xl rounded-tl-xs bg-white/10 px-4 py-3 border border-white/15 backdrop-blur-md">
                    <div className="flex items-center gap-1.5">
                      <span className="size-2 rounded-full bg-gold animate-bounce" />
                      <span className="size-2 rounded-full bg-gold animate-bounce [animation-delay:0.2s]" />
                      <span className="size-2 rounded-full bg-gold animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Popular prompt chips if at conversation start */}
              {messages.length === 1 && (
                <div className="pt-2">
                  <p className="text-[0.6875rem] text-gold/80 mb-2 uppercase tracking-wider font-semibold">
                    Popular Questions for Kwesi:
                  </p>
                  <div className="flex flex-col gap-1.5">
                    {SUGGESTED_QUESTIONS.map((q, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSendMessage(q)}
                        className="text-left rounded-xl border border-white/10 bg-white/[0.06] px-3 py-2 text-xs text-white/85 transition-colors hover:border-gold/50 hover:bg-gold/10 hover:text-gold cursor-pointer"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Action Footer Bar & Input Form */}
            <div className="border-t border-white/10 bg-zinc-950/90 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))]">
              <div className="mb-2 flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
                <button
                  type="button"
                  onClick={() => openEnquiry()}
                  className="font-display shrink-0 flex items-center gap-1 rounded-full border border-gold/30 bg-gold/10 px-3 py-1.5 text-[0.625rem] font-bold uppercase tracking-wider text-gold hover:bg-gold hover:text-ink transition-colors cursor-pointer"
                >
                  <Calendar className="size-3" /> Book Consultation
                </button>
                <button
                  type="button"
                  onClick={() =>
                    handleSendMessage(
                      "What are the estimated construction costs per square meter in Ghana right now?",
                    )
                  }
                  className="font-display shrink-0 flex items-center gap-1 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-[0.625rem] font-bold uppercase tracking-wider text-white/80 hover:border-gold/40 hover:text-gold transition-colors cursor-pointer"
                >
                  <Calculator className="size-3" /> Cost Benchmarks
                </button>
                <button
                  type="button"
                  onClick={() => handleActionClick("whatsapp")}
                  className="font-display shrink-0 flex items-center gap-1 rounded-full border border-emerald-500/40 bg-emerald-500/15 px-3 py-1.5 text-[0.625rem] font-bold uppercase tracking-wider text-emerald-400 hover:bg-emerald-500 hover:text-black transition-colors cursor-pointer"
                >
                  <PhoneCall className="size-3" /> WhatsApp Lead Engineer
                </button>
              </div>

              {/* Input form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <div className="relative flex-1">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask Kwesi about costs, permits, diaspora builds..."
                    className="w-full rounded-xl border border-white/20 bg-white/10 px-3.5 py-3 pr-9 text-base md:text-sm text-white placeholder:text-white/40 focus:border-gold focus:bg-white/15 focus:outline-none focus:ring-1 focus:ring-gold"
                  />
                  <button
                    type="button"
                    onClick={toggleSpeechRecognition}
                    title="Voice input"
                    aria-label="Voice input"
                    className={`absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-white/50 hover:text-gold transition-colors cursor-pointer ${
                      isListening ? "text-red-400 animate-pulse" : ""
                    }`}
                  >
                    {isListening ? <MicOff className="size-4" /> : <Mic className="size-4" />}
                  </button>
                </div>

                <Button
                  id="winnet-ai-send-btn"
                  type="submit"
                  size="icon"
                  variant="gold"
                  disabled={!inputValue.trim() || isLoading}
                  className="size-11 shrink-0 rounded-xl shadow-md cursor-pointer disabled:opacity-40"
                  aria-label="Send message to Kwesi"
                >
                  <Send className="size-4.5 text-ink" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/** Helper to render simple bold formatting and bullet items cleanly */
function formatText(text: string, isUser: boolean): React.ReactNode {
  // Split on **bold**
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={index} className={isUser ? "font-bold text-ink" : "font-semibold text-gold"}>
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}
