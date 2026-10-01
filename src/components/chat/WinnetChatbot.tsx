import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MessageSquare, X, Send, RotateCcw, Bot, User, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { company, telHref } from "@/config/site";
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
    content: `Hello! I'm **Kwesi**, your AI advisor at **${company.name}**.\n\nAsk me about construction costs in Ghana, diaspora project supervision, building permits, or booking a certified site inspection. How can I help you today?`,
    timestamp: new Date(),
  },
];

const SUGGESTED_QUESTIONS = [
  "What is the cost per m² to build in Accra?",
  "How does diaspora project supervision work?",
  "How do I book a site inspection?",
];

export function WinnetChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
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

      // Determine contextual quick actions if relevant
      const replyLower = replyContent.toLowerCase();
      const actions: Message["actions"] = [];

      if (
        replyLower.includes("book") ||
        replyLower.includes("inspect") ||
        replyLower.includes("consult") ||
        replyLower.includes("appointment")
      ) {
        actions.push({ label: "Book Site Inspection", action: "enquiry" });
      }
      if (
        replyLower.includes("whatsapp") ||
        replyLower.includes("engineer") ||
        replyLower.includes("contact")
      ) {
        actions.push({ label: "Chat on WhatsApp", action: "whatsapp" });
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
          "Thank you for reaching out! You can book an on-site structural inspection or chat with our engineering team on WhatsApp.",
        timestamp: new Date(),
        actions: [
          { label: "Book Inspection", action: "enquiry" },
          { label: "Chat on WhatsApp", action: "whatsapp" },
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
        .slice(-2)
        .join(" | ");
      const url = whatsappUrl(
        summary
          ? `Hello Winnet Construction, I was chatting with Kwesi regarding: "${summary}". I'd like to speak with an engineer.`
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

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-4 right-4 z-40 flex items-center gap-2.5 sm:bottom-6 sm:right-6">
        {/* Desktop notification pill */}
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, x: 10, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            type="button"
            className="hidden cursor-pointer items-center gap-2 rounded-full border border-zinc-200 bg-white px-3.5 py-2 text-xs font-semibold text-zinc-800 shadow-lg transition-all hover:bg-zinc-50 hover:border-gold md:flex"
            onClick={() => setIsOpen(true)}
          >
            <span className="flex size-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold text-zinc-900">Kwesi</span>
            <span className="text-zinc-500 font-normal">• Ask AI Guide</span>
          </motion.button>
        )}

        <motion.button
          id="winnet-ai-trigger"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          aria-expanded={isOpen}
          aria-label="Open Kwesi, Winnet AI Advisor"
          className="relative flex size-14 items-center justify-center rounded-full bg-gold text-ink shadow-lg ring-2 ring-gold/40 transition-transform cursor-pointer"
        >
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
                <MessageSquare className="size-6 text-ink stroke-[2.2]" />
                {hasUnread && (
                  <span className="absolute -top-1.5 -right-1.5 size-2.5 rounded-full bg-destructive ring-2 ring-gold" />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Chatbot Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="winnet-ai-chatbot-window"
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.96 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className={`fixed z-50 flex flex-col overflow-hidden bg-white text-zinc-900 border border-zinc-200/90 shadow-2xl transition-all
              ${
                /* Mobile: Bottom-sheet on small screens */
                "inset-x-0 bottom-0 top-12 rounded-t-2xl sm:top-auto sm:inset-x-auto sm:right-6 sm:bottom-22 sm:w-[400px] sm:h-[580px] sm:max-h-[80vh] sm:rounded-2xl"
              }
            `}
          >
            {/* Mobile Drag Indicator */}
            <div className="flex sm:hidden justify-center pt-2.5 pb-1 bg-white">
              <div className="h-1.5 w-10 rounded-full bg-zinc-200" />
            </div>

            {/* Clean White Header */}
            <div className="relative flex items-center justify-between border-b border-zinc-100 bg-white px-4 py-3 sm:px-5">
              <div className="flex items-center gap-3">
                <div className="relative flex size-9 items-center justify-center rounded-full bg-gold/15 text-zinc-900">
                  <Bot className="size-4.5 text-zinc-900" />
                  <span className="absolute bottom-0 right-0 size-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="text-sm font-bold tracking-tight text-zinc-900">Kwesi</h3>
                    <span className="rounded-full bg-gold/20 px-1.5 py-0.2 text-[0.625rem] font-semibold text-zinc-800 uppercase tracking-wider">
                      AI Guide
                    </span>
                  </div>
                  <p className="text-[0.6875rem] text-zinc-500">Winnet Construction Ltd</p>
                </div>
              </div>

              {/* Minimal Header Actions */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={resetChat}
                  title="Reset conversation"
                  aria-label="Reset conversation"
                  className="flex size-8 items-center justify-center rounded-lg text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 transition-colors cursor-pointer"
                >
                  <RotateCcw className="size-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  title="Close chat"
                  aria-label="Close chat"
                  className="flex size-8 items-center justify-center rounded-lg text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 transition-colors cursor-pointer"
                >
                  <X className="size-4.5" />
                </button>
              </div>
            </div>

            {/* Clean White Message Stream */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 text-sm bg-white scrollbar-thin">
              {messages.map((msg) => {
                const isUser = msg.role === "user";
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.15 }}
                    className={`flex gap-2 ${isUser ? "justify-end" : "justify-start"}`}
                  >
                    {!isUser && (
                      <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-gold/20 text-zinc-900 font-bold text-[0.625rem] mt-0.5">
                        K
                      </div>
                    )}

                    <div
                      className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm ${
                        isUser
                          ? "bg-gold text-ink font-medium rounded-tr-xs"
                          : "bg-zinc-100 text-zinc-800 rounded-tl-xs"
                      }`}
                    >
                      {/* Formatted Text Content */}
                      <div className="space-y-1.5 whitespace-pre-wrap leading-relaxed text-[0.84rem]">
                        {msg.content.split("\n\n").map((para, i) => (
                          <p key={i}>{formatText(para, isUser)}</p>
                        ))}
                      </div>

                      {/* Clean Inline Actions */}
                      {msg.actions && msg.actions.length > 0 && (
                        <div className="mt-2.5 flex flex-wrap gap-1.5 pt-2 border-t border-zinc-200/60">
                          {msg.actions.map((act, i) => (
                            <button
                              key={i}
                              type="button"
                              onClick={() => handleActionClick(act.action, act.projectType)}
                              className="inline-flex items-center gap-1 rounded-lg border border-zinc-300 bg-white px-2.5 py-1 text-[0.6875rem] font-semibold text-zinc-800 hover:border-gold hover:bg-gold/10 hover:text-ink transition-colors cursor-pointer shadow-2xs"
                            >
                              {act.label}
                              <ExternalLink className="size-2.5 text-zinc-400" />
                            </button>
                          ))}
                        </div>
                      )}

                      <div
                        className={`mt-1 text-[0.625rem] ${
                          isUser ? "text-ink/60 text-right" : "text-zinc-400 text-left"
                        }`}
                      >
                        {msg.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>

                    {isUser && (
                      <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-zinc-200 text-zinc-700 text-xs font-bold mt-0.5">
                        <User className="size-3.5" />
                      </div>
                    )}
                  </motion.div>
                );
              })}

              {isLoading && (
                <div className="flex gap-2 justify-start">
                  <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-gold/20 text-zinc-900 font-bold text-[0.625rem] mt-0.5">
                    K
                  </div>
                  <div className="rounded-2xl rounded-tl-xs bg-zinc-100 px-3.5 py-2.5">
                    <div className="flex items-center gap-1.5 py-1">
                      <span className="size-1.5 rounded-full bg-zinc-400 animate-bounce" />
                      <span className="size-1.5 rounded-full bg-zinc-400 animate-bounce [animation-delay:0.15s]" />
                      <span className="size-1.5 rounded-full bg-zinc-400 animate-bounce [animation-delay:0.3s]" />
                    </div>
                  </div>
                </div>
              )}

              {/* Clean simple prompt chips at start */}
              {messages.length === 1 && (
                <div className="pt-2">
                  <p className="text-[0.6875rem] text-zinc-400 mb-2 font-medium">
                    Suggested topics:
                  </p>
                  <div className="flex flex-col gap-1.5">
                    {SUGGESTED_QUESTIONS.map((q, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleSendMessage(q)}
                        className="text-left rounded-xl border border-zinc-200/90 bg-zinc-50/70 px-3 py-2 text-xs text-zinc-700 transition-colors hover:bg-zinc-100 hover:border-zinc-300 hover:text-zinc-900 cursor-pointer"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Clean White Input Footer */}
            <div className="border-t border-zinc-100 bg-white p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom,0px))]">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex items-center gap-2"
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask a question..."
                  className="flex-1 rounded-xl border border-zinc-200 bg-zinc-50 px-3.5 py-2.5 text-sm text-zinc-900 placeholder:text-zinc-400 focus:bg-white focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                />

                <Button
                  id="winnet-ai-send-btn"
                  type="submit"
                  size="icon"
                  variant="gold"
                  disabled={!inputValue.trim() || isLoading}
                  className="size-10 shrink-0 rounded-xl shadow-xs cursor-pointer disabled:opacity-40"
                  aria-label="Send message"
                >
                  <Send className="size-4 text-ink" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/** Clean bold formatting helper */
function formatText(text: string, isUser: boolean): React.ReactNode {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong
          key={index}
          className={isUser ? "font-bold text-ink" : "font-semibold text-zinc-900"}
        >
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}
