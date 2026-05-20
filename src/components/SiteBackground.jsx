import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import LetterGlitch from "./LetterGlitch";

const SiteBackground = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Device detect korar jonno (performance optimize)
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const checkMotion = () => setPrefersReducedMotion(motionQuery.matches);

    checkMobile();
    checkMotion();
    window.addEventListener("resize", checkMobile);
    motionQuery.addEventListener("change", checkMotion);

    return () => {
      window.removeEventListener("resize", checkMobile);
      motionQuery.removeEventListener("change", checkMotion);
    };
  }, []);

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-[#020202]">
      <div className="absolute inset-0 opacity-80">
        <LetterGlitch
          glitchColors={["#17351f", "#65a30d", "#84cc16", "#bef264", "#22c55e"]}
          glitchSpeed={prefersReducedMotion ? 700 : isMobile ? 180 : 120}
          centerVignette={false}
          outerVignette
          smooth={false}
          updateRatio={isMobile ? 0.008 : 0.012}
          maxDpr={isMobile ? 1 : 1.15}
          characters="01<>[]{};:/\\ABCDEFGHIJKLMNOPQRSTUVWXYZ"
          className="h-full w-full"
        />
      </div>

      {/* Contrast layer - content readable rakhar jonno */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Brand glow */}
      <div className={`absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(163,230,53,${isMobile ? '0.1' : '0.14'}),transparent_62%)]`} />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.2),rgba(0,0,0,0.78))]" />

      {!prefersReducedMotion && !isMobile && (
        <motion.div
          animate={{ y: ["-20%", "120%"], opacity: [0, 0.28, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 right-0 h-32 bg-gradient-to-b from-transparent via-lime-300/10 to-transparent blur-sm"
        />
      )}

      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.12, 0.24, 0.12],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute -top-20 -left-20 bg-lime-500/10 rounded-full 
          ${isMobile ? "w-[250px] h-[250px] blur-[60px]" : "w-[400px] h-[400px] blur-[100px]"}`}
      />

      {!isMobile && (
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.08, 0.18, 0.08],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-20 -right-20 w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full"
        />
      )}

      {!prefersReducedMotion && [...Array(isMobile ? 1 : 3)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            opacity: 0, 
            x: Math.random() * 100 + "vw",
            y: Math.random() * 100 + "vh" 
          }}
          animate={{ 
            opacity: [0, 0.1, 0],
            rotate: 360,
            y: [null, "-10vh"]
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute w-16 h-16 border border-lime-400/5 rounded-xl"
        />
      ))}

      {!prefersReducedMotion && [...Array(isMobile ? 3 : 7)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ x: Math.random() * 100 + "vw", y: "105vh", opacity: 0 }}
          animate={{ 
            y: "-5vh",
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: isMobile ? 14 : 10,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
          className="absolute w-1 h-1 bg-lime-300/70 rounded-full shadow-[0_0_8px_#a3e635] will-change-transform"
        />
      ))}

      <div 
        className="absolute inset-0 opacity-[0.045] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#ffffff10 1px, transparent 1px), linear-gradient(90deg, #ffffff10 1px, transparent 1px)`,
          backgroundSize: isMobile ? '30px 30px' : '40px 40px'
        }}
      />

      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
};

export default SiteBackground;
