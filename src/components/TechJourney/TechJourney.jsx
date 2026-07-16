import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCode,
  FaBolt,
  FaReact,
  FaLayerGroup,
  FaRocket,
  FaCheck,
  FaChevronDown,
} from "react-icons/fa";
import SectionHeading from "../SectionHeading";
import BorderGlow, { glowTheme } from "../BorderGlow/BorderGlow";
import "./TechJourney.css";

const commits = [
  {
    id: 1,
    phase: "01",
    hash: "e5f0a12",
    branch: "main",
    verb: "init",
    message: "laid the foundations",
    icon: FaCode,
    tagline: "Where curiosity met code",
    description:
      "It started with HTML & CSS — turning blank pages into structured, styled layouts. I learned how the web is built from the ground up, and how good structure makes everything else possible.",
    skills: ["HTML5", "CSS3", "Responsive", "Flexbox & Grid"],
    outcome: "Built my first websites from scratch.",
  },
  {
    id: 2,
    phase: "02",
    hash: "9c4db83",
    branch: "feat/interactivity",
    verb: "feat",
    message: "brought pages to life",
    icon: FaBolt,
    tagline: "Logic, interactivity, problem-solving",
    description:
      "I dove into JavaScript — variables, loops, functions, the DOM. This is where I learned to think in logic, break problems apart, and make static pages respond, move, and feel alive.",
    skills: ["JavaScript", "DOM", "Async / Await", "Problem Solving"],
    outcome: "Turned flat designs into interactive experiences.",
  },
  {
    id: 3,
    phase: "03",
    hash: "61bea77",
    branch: "feat/react",
    verb: "refactor",
    message: "adopted component thinking",
    icon: FaReact,
    tagline: "The React mindset",
    description:
      "React changed how I build. I adopted component-driven architecture, learned hooks and state, and started routing between views — building interfaces that scale without turning into a mess.",
    skills: ["React.js", "Hooks", "Router", "Tailwind CSS"],
    outcome: "Built reusable, maintainable UI systems.",
  },
  {
    id: 4,
    phase: "04",
    hash: "3faed09",
    branch: "feat/mern-stack",
    verb: "feat",
    message: "went full stack",
    icon: FaLayerGroup,
    tagline: "Frontend meets backend",
    description:
      "I connected the dots with Node.js, Express, and MongoDB. Building REST APIs, handling authentication, and managing data completed the picture — the full MERN stack, end to end.",
    skills: ["Node.js", "Express", "MongoDB", "JWT / REST"],
    outcome: "Shipped complete full-stack applications.",
  },
  {
    id: 5,
    phase: "05",
    hash: "d0c4e75",
    branch: "release/production",
    verb: "release",
    message: "shipped to production",
    icon: FaRocket,
    tagline: "Real products, real users",
    description:
      "Now I focus on shipping. Next.js, performance, and deployment — writing production-ready code with clean architecture, SEO, and the reliability that real-world projects demand.",
    skills: ["Next.js", "Firebase", "Deployment", "Performance"],
    outcome: "Deploying real projects people actually use.",
    head: true,
  },
];

const TechJourney = () => {
  const [openId, setOpenId] = useState(1);

  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <section
      id="journey"
      className="relative overflow-hidden bg-transparent px-6 py-20 md:py-28 md:px-12"
    >
      <div className="pointer-events-none absolute left-1/2 top-24 h-56 w-[30rem] -translate-x-1/2 rounded-full bg-lime-400/10 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-5xl">
        <SectionHeading
          kicker="The Path"
          before="Developer "
          highlight="Journey"
          align="center"
        />

        <BorderGlow
          {...glowTheme}
          backgroundColor="rgba(8, 9, 12, 0.45)"
          borderRadius={24}
          className="tj-terminal"
        >
          {/* Terminal title bar */}
          <div className="tj-bar">
            <div className="tj-lights">
              <span className="tj-light tj-light--red" />
              <span className="tj-light tj-light--amber" />
              <span className="tj-light tj-light--green" />
            </div>
            <div className="tj-bar-path">tumit-hasan — ~/journey</div>
            <div className="tj-bar-spacer" />
          </div>

          {/* Command line */}
          <div className="tj-cmd">
            <span className="tj-prompt">$</span>
            <span className="tj-cmd-text">git log --graph --oneline --reverse</span>
            <span className="tj-caret" />
          </div>
          <p className="tj-hint">
            <span className="tj-hint-key">click</span> a commit to{" "}
            <span className="tj-hint-cmd">git show</span> the full story
          </p>

          {/* Graph */}
          <div className="tj-graph">
            {commits.map((c) => {
              const Icon = c.icon;
              const open = openId === c.id;
              return (
                <motion.article
                  key={c.id}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-70px" }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className={`tj-commit ${open ? "tj-commit--open" : ""}`}
                >
                  {/* dot on the spine */}
                  <div className="tj-dot-col">
                    <motion.span
                      className="tj-dot"
                      initial={{ scale: 0.5 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true, margin: "-45% 0px -45% 0px" }}
                      transition={{ duration: 0.4, ease: "backOut" }}
                    >
                      <Icon className="tj-dot-icon" />
                    </motion.span>
                  </div>

                  {/* commit body */}
                  <div className="tj-commit-body">
                    {/* one-line header (clickable) */}
                    <button
                      className="tj-oneline"
                      onClick={() => toggle(c.id)}
                      aria-expanded={open}
                    >
                      <span className="tj-hash">{c.hash}</span>
                      <span className="tj-branch">
                        <span className="tj-branch-dot" />
                        {c.branch}
                      </span>
                      {c.head && <span className="tj-head-tag">HEAD</span>}
                      <span className="tj-oneline-msg">
                        <span className="tj-verb">{c.verb}:</span> {c.message}
                      </span>
                      <span className="tj-toggle">
                        <FaChevronDown />
                      </span>
                    </button>

                    {/* expandable detail (git show) */}
                    <AnimatePresence initial={false}>
                      {open && (
                        <motion.div
                          key="detail"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                          className="tj-detail-wrap"
                        >
                          <div className="tj-detail">
                            <p className="tj-tagline">{c.tagline}</p>
                            <p className="tj-desc">{c.description}</p>

                            <div className="tj-skills">
                              {c.skills.map((s, i) => (
                                <motion.span
                                  key={s}
                                  initial={{ opacity: 0, y: 6 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.12 + i * 0.06 }}
                                  className="tj-chip"
                                >
                                  {s}
                                </motion.span>
                              ))}
                            </div>

                            <div className="tj-outcome">
                              <span className="tj-outcome-icon">
                                <FaCheck />
                              </span>
                              <span>{c.outcome}</span>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </BorderGlow>
      </div>
    </section>
  );
};

export default TechJourney;
