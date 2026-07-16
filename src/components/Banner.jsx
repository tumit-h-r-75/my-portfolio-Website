import { useRef } from "react";
import { FaGithub, FaLinkedin, FaFacebook, FaArrowRight, FaDownload } from "react-icons/fa";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
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

const metrics = [
  { label: "FRONTEND_SYS", value: 92 },
  { label: "BACKEND_SYS", value: 85 },
  { label: "DATABASE_IO", value: 80 },
];

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};
const item = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

const scrollToId = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

const Banner = () => {
  const panelRef = useRef(null);

  // pointer-driven 3D tilt on the HUD panel
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

  const projectCount = projects.length;
  const countStr = projectCount < 10 ? `0${projectCount}` : `${projectCount}`;

  return (
    <section
      id="home"
      className="banner site-text-glitch relative flex min-h-screen items-center overflow-hidden px-6 py-28 md:px-12 lg:px-20"
    >
      <div className="banner-grid" />
      <div className="banner-glow" />

      <div className="relative z-10 mx-auto grid w-full max-w-[88rem] grid-cols-1 items-center gap-12 lg:grid-cols-2">
        {/* ---------- LEFT ---------- */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="visible"
          className="order-2 text-left lg:order-1"
        >
          <motion.div variants={item} className="banner-badge">
            <span className="banner-badge-dot" /> SYSTEM ONLINE
            <span className="text-zinc-600">//</span> AVAILABLE FOR HIRE
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
            <span className="font-semibold text-white">Tumit Hasan</span> —{" "}
            <span className="text-lime-400">
              <Typewriter
                words={["MERN Stack Developer", "React Expert", "Solution Architect", "Clean Code Enthusiast"]}
                loop={0}
                cursor
                cursorStyle="_"
                typeSpeed={55}
                deleteSpeed={30}
                delaySpeed={1800}
              />
            </span>
          </motion.div>

          <motion.p variants={item} className="banner-desc">
            Transforming complex problems into elegant, high-performance web
            applications with the <span className="font-semibold text-zinc-300">MERN ecosystem</span>.
            Focused on scalable architecture and clean, user-centric design.
          </motion.p>

          <motion.div variants={item} className="banner-actions">
            <button onClick={() => scrollToId("portfolio")} className="banner-cta">
              VIEW PROJECTS <FaArrowRight />
            </button>
            <a href={RESUME_LINK} target="_blank" rel="noreferrer" className="banner-resume">
              resume.pdf <FaDownload className="text-lime-400" />
            </a>
            <div className="banner-socials">
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
            </div>
          </motion.div>
        </motion.div>

        {/* ---------- RIGHT (HUD) ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="order-1 flex justify-center lg:order-2 lg:justify-end"
          style={{ perspective: 1000 }}
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

              {/* image feed */}
              <div className="hud-feed">
                <img src={banner} alt="Tumit Hasan" />
                <div className="hud-scanlines" />
                <span className="hud-scan" />
                <span className="hud-rec">
                  <span className="hud-rec-dot" /> LIVE
                </span>
              </div>

              {/* animated metrics */}
              <div className="hud-metrics">
                {metrics.map((m, i) => (
                  <div key={m.label}>
                    <div className="hud-metric-top">
                      <span>{m.label}</span>
                      <span className="text-lime-400">{m.value}%</span>
                    </div>
                    <div className="hud-bar">
                      <motion.span
                        className="hud-bar-fill"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${m.value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.1, delay: 0.4 + i * 0.15, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* footer */}
              <div className="hud-foot">
                <div className="hud-foot-left">
                  STACK: MERN
                  <br />
                  LOCATION: BD
                </div>
                <div>
                  <span className="hud-count">{countStr}</span>
                  <span className="hud-count-label">PROJECTS_SHIPPED</span>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;
