import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaRobot,
  FaTimes,
  FaPaperPlane,
  FaCommentDots,
} from "react-icons/fa";

/* Predefined knowledge base — rule-based, matched by keywords. */
const faqs = [
  {
    q: "Who is Tumit?",
    keywords: ["who", "about", "yourself", "tumit", "introduce", "you"],
    a: "I'm Tumit Hasan — a MERN Stack Developer from Jashore, Bangladesh. I turn ideas into fast, responsive web apps with React, Node.js, Express & MongoDB.",
  },
  {
    q: "What are your skills?",
    keywords: ["skill", "tech", "stack", "technolog", "know", "language", "tool"],
    a: "Frontend: React, Next.js, TypeScript, JavaScript, Tailwind CSS. Backend: Node.js, Express, MongoDB, Firebase, JWT. Plus WordPress, ACF & SQL.",
    action: "skills",
    actionLabel: "See skills",
  },
  {
    q: "Show me projects",
    keywords: ["project", "portfolio", "work", "built", "made", "app"],
    a: "I've built several full-stack projects — each with a live demo & GitHub link. Take a look 👇",
    action: "portfolio",
    actionLabel: "View projects",
  },
  {
    q: "Your education?",
    keywords: ["education", "study", "college", "diploma", "degree", "cst", "school"],
    a: "Diploma in Computer Science & Technology at Satkhira Govt Polytechnic Institute (2022–2025).",
    action: "education",
    actionLabel: "See education",
  },
  {
    q: "How can I reach you?",
    keywords: ["contact", "hire", "email", "reach", "available", "freelance", "phone", "work", "job", "opportunity"],
    a: "I'm open to new job opportunities! 📧 tumithasan1@gmail.com  •  📞 +8801611960330",
    action: "contact",
    actionLabel: "Contact me",
  },
  {
    q: "Resume?",
    keywords: ["resume", "cv", "download"],
    a: "You can download my resume from the Resume button in the top navigation bar.",
  },
];

const greeting = {
  from: "bot",
  text: "Hey there! 👋 I'm Tumit's assistant. Ask me anything, or tap a question below.",
};

const findAnswer = (text) => {
  const t = text.toLowerCase();
  const match = faqs.find((f) => f.keywords.some((k) => t.includes(k)));
  if (match) return match;
  return {
    a: "Hmm, I didn't quite catch that 🤔 — try one of the quick questions below, or ask about my skills, projects, or how to hire me.",
  };
};

const ChatBot = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([greeting]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing, open]);

  const goToSection = (id) => {
    setOpen(false);
    const scroll = () => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(scroll, 400);
    } else {
      setTimeout(scroll, 200);
    }
  };

  const respond = (userText) => {
    setMessages((m) => [...m, { from: "user", text: userText }]);
    setTyping(true);
    const answer = findAnswer(userText);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [
        ...m,
        { from: "bot", text: answer.a, action: answer.action, actionLabel: answer.actionLabel },
      ]);
    }, 650);
  };

  const handleSend = (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    setInput("");
    respond(text);
  };

  return (
    <>
      {/* Floating toggle button */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        aria-label="Open chat assistant"
        className="fixed bottom-5 right-5 z-[85] flex h-14 w-14 items-center justify-center rounded-2xl bg-lime-400 text-black shadow-[0_10px_30px_rgba(163,230,53,0.35)] md:bottom-8 md:right-8"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} className="text-xl">
              <FaTimes />
            </motion.span>
          ) : (
            <motion.span key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} className="text-2xl">
              <FaCommentDots />
            </motion.span>
          )}
        </AnimatePresence>
        {!open && (
          <span className="absolute -right-0.5 -top-0.5 flex h-3.5 w-3.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-300 opacity-75" />
            <span className="relative inline-flex h-3.5 w-3.5 rounded-full border-2 border-black bg-lime-300" />
          </span>
        )}
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-24 right-4 z-[85] flex h-[70vh] max-h-[560px] w-[calc(100vw-2rem)] max-w-[380px] flex-col overflow-hidden rounded-3xl border border-lime-400/25 bg-[#0a0b0e]/95 shadow-[0_20px_60px_rgba(0,0,0,0.5)] backdrop-blur-xl md:bottom-28 md:right-8"
          >
            {/* Header */}
            <div className="flex items-center gap-3 border-b border-white/10 bg-gradient-to-r from-lime-400/10 to-transparent px-4 py-3.5">
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-lime-400 text-black">
                <FaRobot className="text-lg" />
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#0a0b0e] bg-green-400" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-white">Tumit&apos;s Assistant</p>
                <p className="text-[11px] font-medium text-lime-400">● Online — usually instant</p>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      msg.from === "user"
                        ? "rounded-br-sm bg-lime-400 font-medium text-black"
                        : "rounded-bl-sm border border-white/10 bg-white/[0.04] text-zinc-200"
                    }`}
                  >
                    {msg.text}
                    {msg.action && (
                      <button
                        onClick={() => goToSection(msg.action)}
                        className="mt-2 flex items-center gap-1.5 rounded-lg border border-lime-400/40 bg-lime-400/10 px-3 py-1.5 text-xs font-bold text-lime-300 transition hover:bg-lime-400/20"
                      >
                        {msg.actionLabel || "Go"} →
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {typing && (
                <div className="flex justify-start">
                  <div className="flex items-center gap-1 rounded-2xl rounded-bl-sm border border-white/10 bg-white/[0.04] px-4 py-3">
                    {[0, 1, 2].map((d) => (
                      <span
                        key={d}
                        className="h-2 w-2 animate-bounce rounded-full bg-lime-400"
                        style={{ animationDelay: `${d * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Quick replies */}
            <div className="flex flex-wrap gap-2 border-t border-white/10 px-4 py-3">
              {faqs.map((f) => (
                <button
                  key={f.q}
                  onClick={() => respond(f.q)}
                  className="rounded-full border border-lime-400/25 bg-lime-400/[0.06] px-3 py-1.5 text-xs font-semibold text-zinc-300 transition hover:border-lime-400/50 hover:text-lime-300"
                >
                  {f.q}
                </button>
              ))}
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="flex items-center gap-2 border-t border-white/10 p-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question..."
                className="flex-1 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder-zinc-500 outline-none transition focus:border-lime-400/50"
              />
              <button
                type="submit"
                aria-label="Send message"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-lime-400 text-black transition hover:bg-lime-300"
              >
                <FaPaperPlane className="text-sm" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
