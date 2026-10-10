import { useContext, useRef, useState, useEffect } from "react";
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
  FaLayerGroup,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { SiMongodb, SiExpress, SiTypescript, SiTailwindcss } from "react-icons/si";
import { motion, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";
import banner from "../assets/myImg.webp";
import { IntroContext } from "../context/IntroContext";
import { isLiteMode, isLowEnd } from "../lib/perf";
import { RESUME_URL, RESUME_FILENAME } from "../lib/resume";
import "./Banner.css";

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

const ROLES = ["MERN Developer", "React Specialist", "Node.js Engineer", "Problem Solver"];

const EASE = [0.16, 1, 0.3, 1];

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};
const item = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: EASE } },
};
// headline lines rise out of a mask one after another
const titleStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};
const lineReveal = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: 0.9, ease: EASE } },
};
const featureList = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const scrollToId = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

/* count-up number that runs once, when `start` is true and it is on screen */
const CountUp = ({ end, suffix = "+", pad = true, start = true, duration = 1200 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView || !start) return;
    let raf;
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min((t - t0) / duration, 1);
      setN(Math.round(end * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, start, end, duration]);

  return (
    <span ref={ref}>
      {pad ? String(n).padStart(2, "0") : n}
      {suffix}
    </span>
  );
};

/* types each role, pauses, deletes it, moves on — only while visible */
const RotatingRole = ({ active }) => {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!active) return undefined;
    const word = ROLES[index % ROLES.length];
    let delay = deleting ? 38 : 80;
    if (!deleting && text === word) delay = 1700;
    if (deleting && text === "") delay = 260;

    const timer = setTimeout(() => {
      if (!deleting && text === word) setDeleting(true);
      else if (deleting && text === "") {
        setDeleting(false);
        setIndex((i) => i + 1);
      } else {
        setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
      }
    }, delay);
    return () => clearTimeout(timer);
  }, [active, text, deleting, index]);

  // weak devices: plain text, no timers
  if (isLowEnd) return <span className="text-lime-400">{ROLES[0]}</span>;

  return (
    <span className="banner-typed">
      <span className="sr-only">{ROLES[0]}</span>
      <span aria-hidden="true">{text}</span>
      <span className="banner-typed-caret" aria-hidden="true" />
    </span>
  );
};

/* live Dhaka time in the HUD header */
const LiveClock = () => {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    if (isLowEnd) return undefined;
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const time = now.toLocaleTimeString("en-GB", { timeZone: "Asia/Dhaka", hour12: false });
  return <span className="tabular-nums">BD {time}</span>;
};

/* primary button that is gently pulled towards the cursor */
const MagneticButton = ({ children, className, onClick }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 15 });
  const sy = useSpring(y, { stiffness: 220, damping: 15 });

  const handleMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.25);
    y.set((e.clientY - r.top - r.height / 2) * 0.35);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={className}
      style={isLiteMode ? undefined : { x: sx, y: sy }}
      onMouseMove={isLiteMode ? undefined : handleMove}
      onMouseLeave={isLiteMode ? undefined : reset}
    >
      {children}
    </motion.button>
  );
};

const Banner = () => {
  const introReady = useContext(IntroContext);
  const state = introReady ? "visible" : "hidden";
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef);
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
      ref={sectionRef}
      className={`banner site-text-glitch relative flex min-h-screen items-center overflow-hidden px-6 py-24 md:px-12 lg:px-20${
        inView ? "" : " banner-paused"
      }`}
    >
      <div className="banner-grid" />
      <div className="banner-glow" />
      <div className="banner-scanline" />

      <div className="relative z-10 mx-auto w-full max-w-[96rem]">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <motion.div
            variants={container}
            initial="hidden"
            animate={state}
            className="relative order-2 text-left lg:order-1"
          >
            {/* floating tech tag */}
            <motion.div variants={item} className="banner-float-tag hidden lg:flex">
              <span className="dot" />
              <span>MERN Stack</span>
              <span>Developer</span>
            </motion.div>

            {/* radar with a rotating sweep */}
            <div className="banner-radar hidden lg:block">
              <span className="radar-ring r1" />
              <span className="radar-ring r2" />
              <span className="radar-ring r3" />
              <span className="radar-sweep" />
              <span className="radar-ping" />
              <span className="radar-ping p2" />
              <span className="radar-blip b1" />
              <span className="radar-blip b2" />
              <span className="radar-dot" />
            </div>

            <motion.div variants={item} className="banner-badge">
              <span className="banner-badge-dot" /> SYSTEM ONLINE
              <span className="text-zinc-600">{"//"}</span> OPEN TO WORK
            </motion.div>

            <motion.h1 variants={titleStagger} className="banner-title">
              <span className="banner-line">
                <motion.span variants={lineReveal} className="block text-white">
                  FULL
                </motion.span>
              </span>
              <span className="banner-line">
                <motion.span variants={lineReveal} className="block text-white">
                  STACK
                </motion.span>
              </span>
              <span className="banner-line">
                <motion.span variants={lineReveal} className="block text-lime-400">
                  <span className="banner-glitch" data-text="DEV">
                    DEV
                  </span>
                  <span className="banner-caret">_</span>
                </motion.span>
              </span>
            </motion.h1>

            <motion.div variants={item} className="banner-role">
              <span className="text-zinc-600">$</span>{" "}
              <span className="name">Tumit Hasan</span>{" "}
              <span className="text-zinc-600">—</span>{" "}
              <RotatingRole active={introReady && inView} />
            </motion.div>

            <motion.p variants={item} className="banner-desc">
              1+ years of hands-on experience transforming complex problems into
              elegant, high-performance web applications with the{" "}
              <span className="font-semibold text-lime-400">MERN ecosystem</span>.
              Focused on scalable architecture and clean, user-centric design.
            </motion.p>

            <motion.div variants={item} className="banner-actions">
              <MagneticButton onClick={() => scrollToId("portfolio")} className="banner-cta">
                VIEW PROJECTS <FaArrowRight />
              </MagneticButton>
              <a href={RESUME_URL} download={RESUME_FILENAME} className="banner-resume">
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
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={introReady ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 40, scale: 0.96 }}
            transition={{ duration: 1, ease: EASE, delay: 0.25 }}
            className="order-1 flex justify-center lg:order-2 lg:justify-end"
            style={{ perspective: 1200 }}
          >
            <div className="banner-laser-wrap">
              <span className="laser laser-1" />
              <span className="laser laser-2" />

              {/* 3D tilt only with a real mouse on capable hardware */}
              <motion.div
                ref={panelRef}
                onMouseMove={isLiteMode ? undefined : handleMove}
                onMouseLeave={isLiteMode ? undefined : handleLeave}
                style={isLiteMode ? undefined : { rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="hud-panel"
              >
                {/* light running around the panel border */}
                <span className="hud-trace" aria-hidden="true">
                  <span className="hud-trace-spin" />
                </span>

                <span className="hud-corner hud-corner--tl" />
                <span className="hud-corner hud-corner--tr" />
                <span className="hud-corner hud-corner--bl" />
                <span className="hud-corner hud-corner--br" />

                <div className="hud-head">
                  <span>
                    SYS.STATUS: <span className="text-lime-400">ONLINE</span>
                  </span>
                  <LiveClock />
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
                    <img src={banner} alt="Tumit Hasan" fetchPriority="high" decoding="async" />
                    <div className="hud-scanlines" />
                    <span className="hud-scan" />
                    {/* face-lock brackets + ID readout */}
                    <span className="hud-target" aria-hidden="true">
                      <i />
                      <i />
                      <i />
                      <i />
                    </span>
                    <span className="hud-rec">
                      <span className="hud-rec-dot" /> LIVE
                    </span>
                    <span className="hud-id">
                      ID: TUMIT_HASAN <span className="text-lime-400">✓ VERIFIED</span>
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

                {/* skill bars (fill + count up when the intro opens) */}
                <div className="hud-metrics">
                  {metrics.map((m, i) => (
                    <div key={m.label}>
                      <div className="hud-metric-top">
                        <span>{m.label}</span>
                        <span className="pct">
                          <CountUp end={m.value} suffix="%" pad={false} start={introReady} duration={1300} />
                        </span>
                      </div>
                      <div className="hud-bar">
                        <motion.span
                          className="hud-bar-fill"
                          initial={{ width: 0 }}
                          animate={introReady ? { width: `${m.value}%` } : { width: 0 }}
                          transition={{ duration: 1.3, delay: 0.5 + i * 0.12, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* stats */}
                <div className="hud-stats">
                  <div className="hud-stat">
                    <span className="hud-stat-icon"><FaCode /></span>
                    <div className="hud-stat-num"><CountUp end={1} start={introReady} /></div>
                    <span className="hud-stat-label">YEARS EXPERIENCE</span>
                  </div>
                  <div className="hud-stat">
                    <span className="hud-stat-icon"><FaLayerGroup /></span>
                    <div className="hud-stat-num hud-stat-text">MERN</div>
                    <span className="hud-stat-label">STACK</span>
                  </div>
                  <div className="hud-stat">
                    <span className="hud-stat-icon"><FaMapMarkerAlt /></span>
                    <div className="hud-stat-num hud-stat-text">Bangladesh</div>
                    <span className="hud-stat-label">FROM</span>
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
          variants={featureList}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="banner-features"
        >
          {features.map((f) => (
            // wrapper animates in; the card itself keeps its CSS hover lift
            <motion.div key={f.title} variants={item}>
              <div className="feature-card h-full">
                <span className="feature-icon">{f.icon}</span>
                <div>
                  <p className="feature-title">{f.title}</p>
                  <p className="feature-desc">{f.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;
