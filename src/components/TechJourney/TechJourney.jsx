import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaReact,
  FaNodeJs,
  FaJs,
  FaHtml5,
  FaFireAlt,
  FaLock,
  FaGitAlt,
  FaGithub,
  FaPuzzlePiece,
  FaCode,
  FaFire,
  FaServer,
  FaUsers,
  FaBolt,
} from "react-icons/fa";
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiExpress, SiMongodb } from "react-icons/si";
import SectionHeading from "../SectionHeading";
import avatar from "../../assets/myImg.webp";
import "./TechJourney.css";

const frontend = [
  { icon: <FaReact />, name: "React", level: "Advanced", color: "#22d3ee" },
  { icon: <SiNextdotjs />, name: "Next.js", level: "Intermediate", color: "#ffffff" },
  { icon: <FaJs />, name: "JavaScript", level: "Advanced", color: "#facc15" },
  { icon: <SiTypescript />, name: "TypeScript", level: "Intermediate", color: "#3b82f6" },
  { icon: <SiTailwindcss />, name: "Tailwind", level: "Advanced", color: "#2dd4bf" },
  { icon: <FaHtml5 />, name: "HTML5", level: "Advanced", color: "#f97316" },
];

const backend = [
  { icon: <FaNodeJs />, name: "Node.js", level: "Intermediate", color: "#4ade80" },
  { icon: <SiExpress />, name: "Express.js", level: "Intermediate", color: "#e5e7eb" },
  { icon: <SiMongodb />, name: "MongoDB", level: "Intermediate", color: "#34d399" },
  { icon: <FaFireAlt />, name: "Firebase", level: "Advanced", color: "#fbbf24" },
  { icon: <FaLock />, name: "JWT Auth", level: "Intermediate", color: "#a78bfa" },
];

const tools = [
  { icon: <FaGitAlt />, name: "Git", level: "Advanced", color: "#f97316" },
  { icon: <FaGithub />, name: "GitHub", level: "Advanced", color: "#e5e7eb" },
  { icon: <FaServer />, name: "REST APIs", level: "Intermediate", color: "#38bdf8" },
  { icon: <FaPuzzlePiece />, name: "Problem Solving", level: "Growing", color: "#f472b6" },
  { icon: <FaCode />, name: "Clean Code", level: "Growing", color: "#a3e635" },
];

const Node = ({ icon, name, level, color }) => (
  <div className="st-node" style={{ "--c": color }}>
    {icon}
    <span className="st-node-dot" />
    <span className="st-node-tip">
      {name} · <span>{level}</span>
    </span>
  </div>
);

const TechJourney = () => {
  const [rec, setRec] = useState(true);

  return (
    <section
      id="journey"
      className="relative overflow-hidden bg-transparent px-6 py-20 md:py-28 md:px-12"
    >
      <div className="pointer-events-none absolute left-1/2 top-24 h-56 w-[30rem] -translate-x-1/2 rounded-full bg-lime-400/10 blur-[140px]" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionHeading kicker="Progression Map" before="Skill " highlight="Tree" align="center" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="st-wrap"
        >
          {/* toggle */}
          <button className={`st-toggle ${rec ? "on" : ""}`} onClick={() => setRec((r) => !r)}>
            <span className="st-toggle-track" />
            Recommended Path
          </button>

          {/* HUD */}
          <div className="st-hud">
            <span className="st-hud-badge"><FaBolt /> LVL 1 · JR DEV</span>
            <span className="st-hud-badge"><FaFire /> {frontend.length + backend.length + tools.length} SKILLS</span>
          </div>

          {/* grid tree */}
          <div className={`st-grid ${rec ? "rec" : ""}`}>
            {/* Frontend (top) */}
            <div className="st-branch--frontend">
              <div className="st-nodes--row">
                {frontend.map((s) => (
                  <Node key={s.name} {...s} />
                ))}
              </div>
              <span className="st-branch-label"><FaReact /> Frontend</span>
            </div>

            {/* Soft skills / tools (left) */}
            <div className="st-branch--soft">
              <div className="st-nodes--col">
                {tools.map((s) => (
                  <Node key={s.name} {...s} />
                ))}
              </div>
              <span className="st-branch-label"><FaCode /> Tools</span>
            </div>

            {/* Center avatar */}
            <div className="st-center">
              <span className="st-link st-link--up" />
              <span className="st-link st-link--left" />
              <span className="st-link st-link--right" />

              <div className="st-avatar">
                <div className="st-avatar-img">
                  <img src={avatar} alt="Tumit Hasan" />
                  <span className="st-avatar-lvl">LVL 1</span>
                </div>
                <div className="st-avatar-name">Tumit Hasan</div>
                <div className="st-avatar-role">
                  <b>Jr. Developer</b>
                  <br />
                  climbing towards Mid Developer
                </div>
                <div className="st-progress">
                  <motion.div
                    className="st-progress-fill"
                    initial={{ width: 0 }}
                    whileInView={{ width: "55%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.1, delay: 0.3, ease: "easeOut" }}
                  />
                </div>
                <div className="st-progress-label">
                  <span>Jr</span>
                  <span>55% XP</span>
                  <span>Mid</span>
                </div>
              </div>
            </div>

            {/* Backend (right) */}
            <div className="st-branch--backend">
              <span className="st-branch-label"><FaServer /> Backend</span>
              <div className="st-nodes--col">
                {backend.map((s) => (
                  <Node key={s.name} {...s} />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechJourney;
