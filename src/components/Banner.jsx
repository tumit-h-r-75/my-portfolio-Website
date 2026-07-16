import { useRef, useState, useEffect } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaArrowRight,
  FaDownload,
  FaNodeJs,
  FaReact,
  FaBolt,
  FaShieldAlt,
  FaUserAlt,
  FaCloud,
  FaCode,
  FaRocket,
  FaStar,
  FaLayerGroup,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { SiMongodb, SiExpress, SiTypescript, SiTailwindcss } from "react-icons/si";
import { motion, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";
import banner from "../assets/myImg.webp";
import projects from "./data/projects";
import "./Banner.css";

const RESUME_LINK =
  "https://drive.google.com/file/d/1P61zXG4Ryuh2Z445UwzTpP0Uljt0SvjY/view?usp=sharing";

const socials = [
  { icon: <FaGithub />, link: "https://github.com/tumit-h-r-75", label: "GitHub" },
  { icon: <FaLinkedin />, link: "https://www.linkedin.com/in/tumit-hasan-rafi/", label: "LinkedIn" },
  { icon: <FaFacebook />, link: "https://www.facebook.com/tumit.hasan.rafi.2025", label: "Facebook" },
];

const leftTech = [
  { icon: <FaReact className="text-cyan-400" />, label: "React" },
  { icon: <FaNodeJs className="text-green-500" />, label: "Node.js" },
  { icon: <SiMongodb className="text-emerald-400" />, label: "MongoDB" },
];
const rightTech = [
  { icon: <SiExpress className="text-zinc-200" />, label: "Express" },
  { icon: <SiTypescript className="text-blue-400" />, label: "TypeScript" },
  { icon: <SiTailwindcss className="text-teal-300" />, label: "Tailwind" },
];

const metrics = [
  { label: "FRONTEND_SYS", value: 92 },
  { label: "BACKEND_SYS", value: 85 },
  { label: "DATABASE_IO", value: 88 },
  { label: "DEVOPS_TOOLS", value: 78 },
];

const features = [
  { icon: <FaBolt />, title: "High Performance", desc: "Optimized, scalable and fast applications" },
  { icon: <FaShieldAlt />, title: "Clean Code", desc: "Maintainable, reusable and modular code" },
  { icon: <FaUserAlt />, title: "User Focused", desc: "Intuitive experiences that users love" },
  { icon: <FaCloud />, title: "Deploy Ready", desc: "Production ready with CI/CD pipelines" },
];

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};
const item = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

const scrollToId = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

/* count-up number that runs once on scroll into view */
const CountUp = ({ end, suffix = "+" }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf;
    const start = performance.now();
    const dur = 1200;
    const tick = (t) => {
      const p = Math.min((t - start) / dur, 1);
      setN(Math.round(end * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, end]);

  return (
    <span ref={ref}>
      {String(n).padStart(2, "0")}
      {suffix}
    </span>
  );
};

const Banner = () => {
  const panelRef = useRef(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 150, damping: 18 });
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-7, 7]), { stiffness: 150, damping: 18 });

  const handleMove = (e) => {
    const el = panelRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const handleLeave = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <section
      id="home"
      className="banner site-text-glitch relative flex min-h-screen items-center overflow-hidden px-6 py-24 md:px-12 lg:px-20"
    >
      <div className="banner-grid" />
      <div className="banner-glow" />

      <div className="relative z-10 mx-auto w-full max-w-[88rem]">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          {/* ---------- LEFT ---------- */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className="relative order-2 text-left lg:order-1"
          >
            {/* floating tech tag */}
            <div className="banner-float-tag hidden lg:flex">
              <span className="dot" />
              <span>MERN Stack</span>
              <span>Developer</span>
            </div>

            {/* radar */}
            <div className="banner-radar hidden lg:block">
              <span className="radar-ring r1" />
              <span className="radar-ring r2" />
              <span className="radar-ring r3" />
              <span className="radar-ping" />
              <span className="radar-ping p2" />
              <span className="radar-dot" />
            </div>

            <motion.div variants={item} className="banner-badge">
              <span className="banner-badge-dot" /> SYSTEM ONLINE
              <span className="text-zinc-600">//</span> OPEN TO WORK
            </motion.div>

            <motion.h1 variants={item} className="banner-title">
              <span className="block text-white">FULL</span>
              <span className="block text-white">STACK</span>
              <span className="block text-lime-400">
                DEV<span className="banner-caret">_</span>
              </span>
            </motion.h1>

            <motion.div variants={item} className="banner-role">
              <span className="text-zinc-600">$</span>{" "}
              <span className="name">Tumit Hasan</span>{" "}
              <span className="text-zinc-600">—</span>{" "}
              <span className="text-lime-400">MERN Developer</span>
            </motion.div>

            <motion.p variants={item} className="banner-desc">
              Transforming complex problems into elegant, high-performance web
              applications with the{" "}
              <span className="font-semibold text-lime-400">MERN ecosystem</span>.
              Focused on scalable architecture and clean, user-centric design.
            </motion.p>

            <motion.div variants={item} className="banner-actions">
              <button onClick={() => scrollToId("portfolio")} className="banner-cta">
                VIEW PROJECTS <FaArrowRight />
              </button>
              <a href={RESUME_LINK} target="_blank" rel="noreferrer" className="banner-resume">
                DOWNLOAD RESUME <FaDownload className="text-lime-400" />
              </a>
            </motion.div>

            <motion.div variants={item} className="banner-socials">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.link}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="banner-social"
                >
                  {s.icon}
                </a>
              ))}
            </motion.div>
          </motion.div>

          {/* ---------- RIGHT (HUD) ---------- */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-1 flex justify-center lg:order-2 lg:justify-end"
            style={{ perspective: 1200 }}
          >
            <div className="banner-laser-wrap">
              <span className="laser laser-1" />
              <span className="laser laser-2" />

              <motion.div
                ref={panelRef}
                onMouseMove={handleMove}
                onMouseLeave={handleLeave}
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="hud-panel"
              >
                <span className="hud-corner hud-corner--tl" />
                <span className="hud-corner hud-corner--tr" />
                <span className="hud-corner hud-corner--bl" />
                <span className="hud-corner hud-corner--br" />

                <div className="hud-head">
                  <span>
                    SYS.STATUS: <span className="text-lime-400">ONLINE</span>
                  </span>
                  <span>UPTIME: 99.9%</span>
                </div>

                {/* feed row: hexes + photo */}
                <div className="hud-feed-row">
                  <div className="hud-hex-col">
                    {leftTech.map((t) => (
                      <div key={t.label} className="hud-hex" title={t.label}>
                        {t.icon}
                      </div>
                    ))}
                  </div>

                  <div className="hud-photo">
                    <img src={banner} alt="Tumit Hasan" />
                    <div className="hud-scanlines" />
                    <span className="hud-scan" />
                    <span className="hud-rec">
                      <span className="hud-rec-dot" /> LIVE
                    </span>
                  </div>

                  <div className="hud-hex-col">
                    {rightTech.map((t) => (
                      <div key={t.label} className="hud-hex" title={t.label}>
                        {t.icon}
                      </div>
                    ))}
                  </div>
                </div>

                {/* skill bars */}
                <div className="hud-metrics">
                  {metrics.map((m, i) => (
                    <div key={m.label}>
                      <div className="hud-metric-top">
                        <span>{m.label}</span>
                        <span className="pct">{m.value}%</span>
                      </div>
                      <div className="hud-bar">
                        <motion.span
                          className="hud-bar-fill"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${m.value}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.1, delay: 0.3 + i * 0.12, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* stats */}
                <div className="hud-stats">
                  <div className="hud-stat">
                    <span className="hud-stat-icon"><FaCode /></span>
                    <div className="hud-stat-num"><CountUp end={1} /></div>
                    <span className="hud-stat-label">YEARS EXP.</span>
                  </div>
                  <div className="hud-stat">
                    <span className="hud-stat-icon"><FaRocket /></span>
                    <div className="hud-stat-num"><CountUp end={projects.length} /></div>
                    <span className="hud-stat-label">PROJECTS</span>
                  </div>
                  <div className="hud-stat">
                    <span className="hud-stat-icon"><FaLayerGroup /></span>
                    <div className="hud-stat-num"><CountUp end={15} /></div>
                    <span className="hud-stat-label">TECHNOLOGIES</span>
                  </div>
                </div>

                {/* footer */}
                <div className="hud-foot">
                  <span className="hud-foot-item">
                    <FaLayerGroup /> STACK: MERN
                  </span>
                  <span className="hud-foot-item">
                    <FaMapMarkerAlt /> LOCATION: BD
                  </span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* ---------- feature cards ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="banner-features"
        >
          {features.map((f) => (
            <div key={f.title} className="feature-card">
              <span className="feature-icon">{f.icon}</span>
              <div>
                <p className="feature-title">{f.title}</p>
                <p className="feature-desc">{f.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;
