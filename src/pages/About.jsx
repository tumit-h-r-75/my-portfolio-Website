import { useContext, useRef } from "react";
import { FaCoffee, FaMusic, FaPlaneDeparture, FaUser, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaGraduationCap, FaGlobeAmericas } from "react-icons/fa";
import { GiCricketBat } from "react-icons/gi";
import { motion, useScroll, useTransform } from "framer-motion";
import { NavigateContext } from "../context/NavigateProvider";
import aboutImg from "../assets/myImg.png";

const About = () => {
  const { aboutRef } = useContext(NavigateContext);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 50]);

  const interests = [
    { icon: <GiCricketBat />, label: "Cricket" },
    { icon: <FaCoffee />, label: "Coffee" },
    { icon: <FaPlaneDeparture />, label: "Travel" },
    { icon: <FaMusic />, label: "Music" },
  ];

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
      className="relative py-16 md:py-24 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto overflow-hidden rounded-[2rem] md:rounded-[3.5rem] "
    >
      {/* --- Interactive Spotlight --- */}
      <div 
        onMouseMove={(e) => {
          const { currentTarget: target, clientX: x, clientY: y } = e;
          const { left, top } = target.getBoundingClientRect();
          target.style.setProperty("--x", `${x - left}px`);
          target.style.setProperty("--y", `${y - top}px`);
        }}
        className="absolute inset-0 pointer-events-none opacity-30 transition-opacity duration-500 hidden md:block"
        style={{
          background: `radial-gradient(800px circle at var(--x) var(--y), rgba(163, 230, 53, 0.15), transparent 40%)`,
        }}
      />

      <div ref={containerRef} className="relative z-10">
        {/* --- Header --- */}
        <div className="text-center mb-12 md:mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl md:text-8xl font-black text-white uppercase tracking-tighter"
          >
            ABOUT <span className="text-lime-400">ME</span>
          </motion.h2>
          <div className="w-16 md:w-24 h-1 bg-lime-400 mx-auto mt-4 rounded-full shadow-[0_0_15px_#a3e635]" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-center">
          
          {/* 1. Image Section (Color Image + Responsive Scale) */}
          <motion.div 
            style={{ y: typeof window !== "undefined" && window.innerWidth > 1024 ? imgY : 0 }} 
            className="lg:col-span-5 relative group order-1 lg:order-1"
          >
            <div className="relative z-10 rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden border-2 border-white/10 bg-zinc-900 aspect-[4/5] shadow-2xl">
              <img
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                src={aboutImg}
                alt="Tumit Hasan"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-40" />
            </div>
            <div className="absolute -top-4 -right-4 md:-top-6 md:-right-6 w-full h-full border-2 border-lime-400/20 rounded-[1.5rem] md:rounded-[2.5rem] -z-10 hidden sm:block" />
          </motion.div>

          {/* 2. Text Content */}
          <motion.div 
            style={{ y: typeof window !== "undefined" && window.innerWidth > 1024 ? textY : 0 }}
            className="lg:col-span-7 space-y-6 md:space-y-8 order-2 lg:order-2"
          >
            <div className="space-y-4">
              <h3 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white leading-tight">
                MERN Stack <span className="text-lime-400 italic">Developer</span>
              </h3>
              <p className="text-zinc-400 text-base md:text-lg leading-relaxed text-justify">
                Hello! I'm <span className="text-white font-bold">Tumit Hasan</span>, a dedicated and results-driven MERN Stack Developer. I specialize in <span className="text-lime-400 font-semibold underline underline-offset-4 decoration-lime-400/30">React.js, Node.js, MongoDB, Express.js</span>, and <span className="text-lime-400 font-semibold">Tailwind CSS</span>.
                <br /><br />
                I love turning ideas into responsive, functional digital products. I focus on clean, maintainable code, and real-world solutions.
              </p>
            </div>

            {/* Personal Info Grid (Clickable Links) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 pt-6 border-t border-white/5">
              {personalInfo.map((info, idx) => {
                const Content = (
                  <>
                    <div className="text-lime-400 text-lg md:text-xl shrink-0">{info.icon}</div>
                    <div className="min-w-0">
                      <p className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest">{info.label}</p>
                      <p className="text-zinc-200 text-sm md:text-base font-medium truncate">{info.value}</p>
                    </div>
                  </>
                );

                return info.link ? (
                  <a 
                    key={idx} 
                    href={info.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl md:rounded-2xl bg-white/5 border border-white/5 hover:border-lime-400/40 hover:bg-lime-400/5 transition-all group"
                  >
                    {Content}
                  </a>
                ) : (
                  <div key={idx} className="flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl md:rounded-2xl bg-white/5 border border-white/5">
                    {Content}
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>

        {/* --- 3. Interests Section --- */}
        <div className="mt-20 md:mt-32">
          <h3 className="text-2xl md:text-5xl font-black text-white text-center uppercase tracking-tighter mb-8 md:mb-12">
            My <span className="text-lime-400">Interests</span>
          </h3>

          <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-4 md:gap-8">
            {interests.map((interest, index) => (
              <motion.div
                key={index}
                whileHover={{
                  scale: 1.05,
                  rotate: index % 2 === 0 ? 3 : -3,
                  boxShadow: "0 0 25px rgba(163,230,53,0.3)",
                  backgroundColor: "#a3e635",
                  color: "#000",
                }}
                className="aspect-square sm:w-28 sm:h-28 md:w-36 md:h-36 bg-zinc-900 border border-white/10 flex flex-col items-center justify-center rounded-2xl md:rounded-[2.5rem] text-white cursor-pointer transition-all duration-300"
              >
                <div className="text-3xl md:text-4xl mb-2 md:mb-3">{interest.icon}</div>
                <p className="text-[10px] md:text-sm font-black uppercase tracking-widest">{interest.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;