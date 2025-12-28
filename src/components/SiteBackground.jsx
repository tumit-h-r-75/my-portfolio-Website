import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const SiteBackground = () => {
  const [isMobile, setIsMobile] = useState(false);

  // Device detect korar jonno (performance optimize)
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-[#020202]">
      {/* 1. Base Gradient - Mobile-e blur komiye optimize kora hoyeche */}
      <div className={`absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(163,230,53,${isMobile ? '0.03' : '0.05'}),transparent_80%)]`} />

      {/* 2. Optimized Orbs - Mobile-e sudhu 2ta thakbe ebong blur kom thakbe */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute -top-20 -left-20 bg-lime-500/10 rounded-full 
          ${isMobile ? "w-[250px] h-[250px] blur-[60px]" : "w-[400px] h-[400px] blur-[100px]"}`}
      />

      {!isMobile && (
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-20 -right-20 w-[500px] h-[500px] bg-lime-600/10 blur-[120px] rounded-full"
        />
      )}

      {/* 3. Floating Geometric Squares - Mobile-e shonkhya komano hoyeche */}
      {[...Array(isMobile ? 3 : 6)].map((_, i) => (
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
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute w-16 h-16 border border-lime-400/10 rounded-xl"
        />
      ))}

      {/* 4. Optimized Particles - Hardware Accelerated */}
      {[...Array(isMobile ? 12 : 25)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ x: Math.random() * 100 + "vw", y: "105vh", opacity: 0 }}
          animate={{ 
            y: "-5vh",
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: isMobile ? 12 : 8, // Mobile-e slow jabe jate CPU load kom hoy
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
          // will-change-transform property performance boost kore
          className="absolute w-1 h-1 bg-lime-400 rounded-full shadow-[0_0_8px_#a3e635] will-change-transform"
        />
      ))}

      {/* 5. Static Grid - Mobile-e grid move korbe na (Lag bypass) */}
      <div 
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#ffffff10 1px, transparent 1px), linear-gradient(90deg, #ffffff10 1px, transparent 1px)`,
          backgroundSize: isMobile ? '30px 30px' : '40px 40px'
        }}
      />

      {/* 6. Noise Texture - Mobile-e opacity r-o komano hoyeche */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
};

export default SiteBackground;