import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  MessageSquare,
  X,
  Send,
  Loader2,
  HardHat,
  RotateCcw,
  Phone,
  ArrowUpRight,
} from "lucide-react";
import { company, telHref } from "@/config/site";
import { useEnquiry } from "@/components/enquiry/EnquiryProvider";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  time: string;
};

const INITIAL_MESSAGES: Message[] = [
  {
    id: "welcome-1",
    role: "assistant",
    content:
      "Hello and welcome to Winnet Construction Ltd! How can I help with your residential, commercial, or renovation project in Ghana today?",
    time: "Just now",
  },
];

const SUGGESTIONS = [
  "How much does it cost to build a house in Ghana?",
  "What is Winnet's construction process?",
  "Do you handle commercial projects?",
  "How can I speak directly with Mr. Winfred Kwesi Agbenyo?",
];

export function WinnetChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPromptBadge, setShowPromptBadge] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { openEnquiry } = useEnquiry();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setShowPromptBadge(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen, messages]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend ?? inputValue).trim();
    if (!text || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok) {
        throw new Error("Chat request failed");
      }

      const data = (await response.json()) as { reply?: string };
      const replyContent =
        data.reply ||
        "Thank you for your enquiry. For immediate technical consultations and project estimates, please call or WhatsApp Mr. Winfred Kwesi Agbenyo at 0549074200.";

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: replyContent,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      const fallbackMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "Thank you for contacting Winnet Construction Ltd. For immediate assistance with your building project or to get a tailored estimate, please reach Mr. Winfred Kwesi Agbenyo directly at 0549074200 or via WhatsApp (+233549074200).",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages(INITIAL_MESSAGES);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end sm:bottom-8 sm:right-8">
      {/* Light prompt badge */}
      <AnimatePresence>
        {!isOpen && showPromptBadge && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="mb-3 hidden cursor-pointer items-center gap-2 rounded-full border border-slate-200/90 bg-white px-3.5 py-1.5 text-xs font-medium text-slate-800 shadow-lg hover:border-gold/60 sm:flex"
            onClick={() => setIsOpen(true)}
          >
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Chat with Winnet</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowPromptBadge(false);
              }}
              className="ml-0.5 text-slate-400 hover:text-slate-600"
              aria-label="Dismiss prompt"
            >
              <X className="size-3" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window - Simple, white background */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ type: "spring", damping: 26, stiffness: 320 }}
            className="flex h-[520px] max-h-[82vh] w-[92vw] max-w-[380px] flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white text-slate-900 shadow-2xl sm:w-[390px]"
          >
            {/* Header - White background */}
            <div className="flex items-center justify-between border-b border-slate-100 bg-white px-4 py-3">
              <div className="flex items-center gap-2.5">
                <div className="flex size-9 items-center justify-center rounded-xl bg-gold/15 text-gold-dark border border-gold/25">
                  <HardHat className="size-5 text-amber-700" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-semibold tracking-tight text-slate-900">
                      Winnet Project Consultant
                    </h3>
                    <span className="size-2 rounded-full bg-emerald-500" />
                  </div>
                  <p className="text-[11px] text-slate-500">Direct building support • Online</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handleReset}
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
                  title="Reset conversation"
                  aria-label="Reset conversation"
                >
                  <RotateCcw className="size-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
                  aria-label="Close chat"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>

            {/* Sub-header contact info */}
            <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/70 px-4 py-1.5 text-[11px] text-slate-600">
              <span>Director: {company.owner}</span>
              <a
                href={telHref}
                className="flex items-center gap-1 font-semibold text-amber-700 hover:underline"
              >
                <Phone className="size-3" />
                {company.phoneLocal}
              </a>
            </div>

            {/* Messages Scroll Area - Pure white background */}
            <div className="flex-1 overflow-y-auto bg-white p-4 space-y-3">
              {messages.map((message) => {
                const isAssistant = message.role === "assistant";
                return (
                  <div
                    key={message.id}
                    className={`flex flex-col ${isAssistant ? "items-start" : "items-end"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-xs sm:text-[13px] leading-relaxed ${
                        isAssistant
                          ? "bg-slate-100 text-slate-800 rounded-tl-sm border border-slate-200/80 whitespace-pre-wrap"
                          : "bg-gold text-slate-950 font-medium rounded-tr-sm shadow-sm"
                      }`}
                    >
                      {message.content}
                    </div>
                    <span className="mt-1 px-1 text-[10px] text-slate-400">{message.time}</span>
                  </div>
                );
              })}

              {isLoading && (
                <div className="flex items-center gap-2 text-slate-500 text-xs px-1 py-1">
                  <Loader2 className="size-3.5 animate-spin text-amber-600" />
                  <span>Consultant is replying...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Compact suggestions when starting */}
            {messages.length <= 1 && (
              <div className="border-t border-slate-100 bg-slate-50/60 p-2.5">
                <p className="mb-1.5 text-[10px] uppercase font-semibold tracking-wider text-slate-400 px-1">
                  Common Questions
                </p>
                <div className="flex flex-col gap-1">
                  {SUGGESTIONS.slice(0, 3).map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => handleSendMessage(suggestion)}
                      className="text-left rounded-lg border border-slate-200/70 bg-white px-2.5 py-1.5 text-[11px] text-slate-700 transition-colors hover:border-gold hover:bg-gold/5"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Action Links */}
            <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/80 px-4 py-2 text-xs">
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  openEnquiry();
                }}
                className="flex items-center gap-1 text-[11px] font-semibold text-amber-800 hover:text-amber-900"
              >
                <span>Start a Project Enquiry</span>
                <ArrowUpRight className="size-3" />
              </button>

              <a
                href={`https://wa.me/${company.phoneInternational}?text=Hello%20Winnet%20Construction,%20I%20would%20like%20to%20inquire%20about%20a%20construction%20project.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 hover:text-emerald-800"
              >
                <span>WhatsApp Us</span>
                <ArrowUpRight className="size-3" />
              </a>
            </div>

            {/* Input Bar - White background */}
            <div className="border-t border-slate-100 bg-white p-3">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  void handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask about costs, process, materials..."
                  disabled={isLoading}
                  className="flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold disabled:opacity-60"
                />
                <button
                  type="submit"
                  disabled={isLoading || !inputValue.trim()}
                  className="flex size-9 items-center justify-center rounded-xl bg-gold text-slate-950 font-bold transition-all hover:bg-gold-light disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
                  aria-label="Send message"
                >
                  {isLoading ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    <Send className="size-4" />
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button - Clean, simple */}
      <motion.button
        type="button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {
          setIsOpen(!isOpen);
          setShowPromptBadge(false);
        }}
        className={`group relative flex size-14 items-center justify-center rounded-full shadow-xl transition-all duration-200 ${
          isOpen
            ? "bg-slate-900 text-white hover:bg-slate-800"
            : "bg-gold text-slate-950 hover:bg-gold-light border border-amber-300/60 shadow-amber-500/20"
        }`}
        aria-label={isOpen ? "Close chat" : "Open Winnet Project Consultant chat"}
      >
        {isOpen ? (
          <X className="size-6 transition-transform group-hover:rotate-90 duration-200" />
        ) : (
          <MessageSquare className="size-6 fill-current transition-transform group-hover:scale-105 duration-200" />
        )}
      </motion.button>
    </div>
  );
}
