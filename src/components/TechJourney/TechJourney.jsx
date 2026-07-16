import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCode,
  FaBolt,
  FaReact,
  FaLayerGroup,
  FaRocket,
  FaCheck,
  FaArrowRight,
} from "react-icons/fa";
import SectionHeading from "../SectionHeading";
import BorderGlow, { glowTheme } from "../BorderGlow/BorderGlow";
import "./TechJourney.css";

const phases = [
  {
    id: 1,
    phase: "01",
    icon: FaCode,
    title: "Foundations",
    tagline: "Where curiosity met code",
    description:
      "It started with HTML & CSS — turning blank pages into structured, styled layouts. I learned how the web is built from the ground up, and how good structure makes everything else possible.",
    skills: ["HTML5", "CSS3", "Responsive Design", "Flexbox & Grid"],
    outcome: "Built my first websites from scratch.",
  },
  {
    id: 2,
    phase: "02",
    icon: FaBolt,
    title: "Bringing Pages to Life",
    tagline: "Logic, interactivity, problem-solving",
    description:
      "I dove into JavaScript — variables, loops, functions, and the DOM. This is where I learned to think in logic, break problems apart, and make static pages respond, move, and feel alive.",
    skills: ["JavaScript (ES6+)", "DOM", "Async / Await", "Problem Solving"],
    outcome: "Turned flat designs into interactive experiences.",
  },
  {
    id: 3,
    phase: "03",
    icon: FaReact,
    title: "Thinking in Components",
    tagline: "The React mindset",
    description:
      "React changed how I build. I adopted component-driven architecture, learned hooks and state, and started routing between views — building interfaces that scale without turning into a mess.",
    skills: ["React.js", "Hooks", "React Router", "Tailwind CSS"],
    outcome: "Built reusable, maintainable UI systems.",
  },
  {
    id: 4,
    phase: "04",
    icon: FaLayerGroup,
    title: "Going Full Stack",
    tagline: "Frontend meets backend",
    description:
      "I connected the dots with Node.js, Express, and MongoDB. Building REST APIs, handling authentication, and managing data completed the picture — the full MERN stack, end to end.",
    skills: ["Node.js", "Express", "MongoDB", "JWT & REST APIs"],
    outcome: "Shipped complete full-stack applications.",
  },
  {
    id: 5,
    phase: "05",
    icon: FaRocket,
    title: "Production & Beyond",
    tagline: "Real products, real users",
    description:
      "Now I focus on shipping. Next.js, performance, and deployment — writing production-ready code with clean architecture, SEO, and the reliability that real-world projects demand.",
    skills: ["Next.js", "Firebase", "Deployment", "Performance"],
    outcome: "Deploying real projects people actually use.",
  },
];

const AUTOPLAY_MS = 5000;

const TechJourney = () => {
  const [activeId, setActiveId] = useState(1);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  const activeIndex = phases.findIndex((p) => p.id === activeId);
  const active = phases[activeIndex];
  const ActiveIcon = active.icon;

  const advance = useCallback(() => {
    setActiveId((prev) => {
      const idx = phases.findIndex((p) => p.id === prev);
      return phases[(idx + 1) % phases.length].id;
    });
  }, []);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(advance, AUTOPLAY_MS);
    return () => clearInterval(timerRef.current);
  }, [paused, advance]);

  const handleSelect = (id) => {
    setActiveId(id);
    setPaused(true);
  };

  return (
    <section
      id="journey"
      className="relative overflow-hidden bg-transparent px-6 py-20 md:py-28 md:px-12"
    >
      <div className="pointer-events-none absolute left-1/2 top-24 h-56 w-[30rem] -translate-x-1/2 rounded-full bg-lime-400/10 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <SectionHeading
          kicker="The Path"
          before="Developer "
          highlight="Journey"
          align="center"
        />

        <div
          className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* LEFT — Timeline spine */}
          <div className="lg:col-span-5">
            <div className="tj-timeline">
              {phases.map((p, i) => {
                const state =
                  i < activeIndex
                    ? "done"
                    : i === activeIndex
                    ? "active"
                    : "upcoming";
                const StepIcon = p.icon;
                return (
                  <button
                    key={p.id}
                    onClick={() => handleSelect(p.id)}
                    className={`tj-step tj-step--${state}`}
                    aria-current={state === "active"}
                  >
                    <span className="tj-node">
                      {state === "done" ? (
                        <FaCheck className="tj-node-icon" />
                      ) : (
                        <StepIcon className="tj-node-icon" />
                      )}
                      {state === "active" && <span className="tj-node-ring" />}
                    </span>

                    <span className="tj-step-meta">
                      <span className="tj-step-phase">Phase {p.phase}</span>
                      <span className="tj-step-title">{p.title}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT — Active phase detail */}
          <div className="lg:col-span-7">
            <BorderGlow
              {...glowTheme}
              backgroundColor="#0a0a0a"
              borderRadius={32}
              className="h-full"
            >
              <div className="tj-card">
                <span className="tj-watermark">{active.phase}</span>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={active.id}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    className="relative z-10 flex h-full flex-col"
                  >
                    <div className="tj-card-head">
                      <span className="tj-icon-badge">
                        <ActiveIcon />
                      </span>
                      <span className="tj-tagline">{active.tagline}</span>
                    </div>

                    <h3 className="tj-title">{active.title}</h3>
                    <p className="tj-desc">{active.description}</p>

                    <div className="tj-skills-block">
                      <span className="tj-skills-label">Skills unlocked</span>
                      <div className="tj-skills">
                        {active.skills.map((s, i) => (
                          <motion.span
                            key={s}
                            initial={{ opacity: 0, scale: 0.85 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.15 + i * 0.07 }}
                            className="tj-chip"
                          >
                            {s}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    <div className="tj-outcome">
                      <span className="tj-outcome-icon">
                        <FaArrowRight />
                      </span>
                      <span>{active.outcome}</span>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* Autoplay progress bar */}
                <div className="tj-progress">
                  <motion.span
                    key={`${active.id}-${paused}`}
                    className="tj-progress-fill"
                    initial={{ width: paused ? "100%" : "0%" }}
                    animate={{ width: "100%" }}
                    transition={{
                      duration: paused ? 0 : AUTOPLAY_MS / 1000,
                      ease: "linear",
                    }}
                  />
                </div>
              </div>
            </BorderGlow>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechJourney;
