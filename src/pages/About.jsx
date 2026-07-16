import { useContext, useRef, useState, useEffect } from "react";
import {
  FaUser,
  FaGlobeAmericas,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaGraduationCap,
  FaReact,
  FaNodeJs,
  FaJs,
  FaCode,
  FaRocket,
  FaLayerGroup,
} from "react-icons/fa";
import { SiMongodb, SiExpress, SiTailwindcss, SiNextdotjs } from "react-icons/si";
import { motion, useInView } from "framer-motion";
import { NavigateContext } from "../context/NavigateProvider";
import aboutImg from "../assets/myImg.webp";
import SectionHeading from "../components/SectionHeading";
import "./About.css";

const floatingTech = [
  { icon: <FaReact className="text-cyan-400" />, label: "React", cls: "about-hex--react" },
  { icon: <SiMongodb className="text-emerald-400" />, label: "MongoDB", cls: "about-hex--mongo" },
  { icon: <FaNodeJs className="text-green-500" />, label: "Node.js", cls: "about-hex--node" },
  { icon: <SiExpress className="text-zinc-200" />, label: "Express.js", cls: "about-hex--express" },
  { icon: <SiTailwindcss className="text-teal-300" />, label: "Tailwind", cls: "about-hex--tailwind" },
  { icon: <SiNextdotjs className="text-white" />, label: "Next.js", cls: "about-hex--next" },
];

const techBar = [
  { icon: <FaReact className="text-cyan-400" />, label: "React" },
  { icon: <FaNodeJs className="text-green-500" />, label: "Node.js" },
  { icon: <SiMongodb className="text-emerald-400" />, label: "MongoDB" },
  { icon: <SiExpress className="text-zinc-200" />, label: "Express.js" },
  { icon: <SiNextdotjs className="text-white" />, label: "Next.js" },
  { icon: <SiTailwindcss className="text-teal-300" />, label: "Tailwind CSS" },
  { icon: <FaJs className="text-yellow-400" />, label: "JavaScript" },
];

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

const About = () => {
  const { aboutRef } = useContext(NavigateContext);

  const personalInfo = [
    { icon: <FaUser />, label: "Name", value: "Tumit Hasan", link: null },
    { icon: <FaGlobeAmericas />, label: "Nationality", value: "Bangladeshi", link: null },
    { icon: <FaMapMarkerAlt />, label: "Address", value: "Jashore, Bangladesh", link: "https://maps.google.com/?q=Jashore,Bangladesh" },
    { icon: <FaPhoneAlt />, label: "Phone", value: "+8801611960330", link: "tel:+8801611960330" },
    { icon: <FaEnvelope />, label: "E-mail", value: "tumithasan1@gmail.com", link: "mailto:tumithasan1@gmail.com" },
    { icon: <FaGraduationCap />, label: "Education", value: "Diploma in CST", link: null },
  ];

  return (
    <section
      ref={aboutRef}
      id="about"
      className="relative mx-auto max-w-[88rem] overflow-hidden px-4 py-20 sm:px-6 md:px-12 md:py-28"
    >
      <SectionHeading kicker="Who I Am" before="ABOUT " highlight="ME" align="center" />

      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-14">
        {/* ---------- LEFT ---------- */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5"
        >
          <div className="about-photo-wrap">
            <div className="about-rings">
              <span />
              <span />
              <span />
            </div>

            <div className="about-frame">
              <div className="about-frame-inner">
                <img src={aboutImg} alt="Tumit Hasan" />
              </div>
            </div>

            {floatingTech.map((t) => (
              <div key={t.label} className={`about-hex ${t.cls}`}>
                <div className="about-hex-inner">
                  {t.icon}
                  <span>{t.label}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="about-freelance">
            <div className="about-freelance-title">
              <span className="dot" /> Open to Work
            </div>
            <p className="about-freelance-sub">Let's build something amazing together!</p>
          </div>
        </motion.div>

        {/* ---------- RIGHT ---------- */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7"
        >
          {/* bio */}
          <div className="about-bio">
            <h3 className="about-bio-title">
              MERN Stack <span>Developer</span>
            </h3>
            <div className="about-bio-body">
              <p>
                Hello! I'm <span className="name">Tumit Hasan</span>, a dedicated and
                results-driven MERN Stack Developer. I specialize in{" "}
                <b>React.js</b>, <b>Node.js</b>, <b>MongoDB</b>, <b>Express.js</b>, and{" "}
                <b>Tailwind CSS</b>.
              </p>
              <p>
                I love turning ideas into responsive, functional digital products. I focus
                on clean, maintainable code, and real-world solutions.
              </p>
            </div>
          </div>

          {/* stats */}
          <div className="about-stats">
            <div className="about-stat">
              <div className="about-stat-ring"><FaCode /></div>
              <div className="about-stat-num"><CountUp end={1} /></div>
              <div className="about-stat-label">Years Experience</div>
            </div>
            <div className="about-stat">
              <div className="about-stat-ring"><FaRocket /></div>
              <div className="about-stat-num"><CountUp end={4} /></div>
              <div className="about-stat-label">Projects Built</div>
            </div>
            <div className="about-stat">
              <div className="about-stat-ring"><FaLayerGroup /></div>
              <div className="about-stat-num"><CountUp end={15} /></div>
              <div className="about-stat-label">Technologies</div>
            </div>
            <div className="about-stat">
              <div className="about-stat-ring"><FaMapMarkerAlt /></div>
              <div className="about-stat-num" style={{ fontSize: "1.15rem" }}>Bangladesh</div>
              <div className="about-stat-label">From</div>
            </div>
          </div>

          {/* info tiles */}
          <div className="about-info">
            {personalInfo.map((info) => {
              const inner = (
                <>
                  <span className="about-info-icon">{info.icon}</span>
                  <div className="min-w-0">
                    <p className="about-info-label">{info.label}</p>
                    <p className="about-info-value truncate">{info.value}</p>
                  </div>
                </>
              );
              return info.link ? (
                <a
                  key={info.label}
                  href={info.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="about-info-tile"
                >
                  {inner}
                </a>
              ) : (
                <div key={info.label} className="about-info-tile">
                  {inner}
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* ---------- tech bar ---------- */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6 }}
        className="about-tech"
      >
        <span className="about-tech-label">Technologies I Work With</span>
        {techBar.map((t) => (
          <span key={t.label} className="about-tech-item">
            {t.icon} {t.label}
          </span>
        ))}
      </motion.div>
    </section>
  );
};

export default About;
