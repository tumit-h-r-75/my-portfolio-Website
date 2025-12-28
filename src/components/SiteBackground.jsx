import { motion } from "framer-motion";

const SiteBackground = () => {
  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-[#020202]">
      {/* 1. Static Mesh Gradient - Pura screen-e halka ekta base color */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(163,230,53,0.05),transparent_80%)]" />

      {/* 2. Large Glowing Pulsating Orbs (High Visibility) */}
      {/* Top Left Orb */}
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-lime-500/20 blur-[100px] rounded-full"
      />

      {/* Bottom Right Orb */}
      <motion.div
        animate={{
          scale: [1.3, 1, 1.3],
          opacity: [0.2, 0.5, 0.2],
          x: [0, -60, 0],
          y: [0, -40, 0],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-20 -right-20 w-[500px] h-[500px] bg-lime-600/20 blur-[120px] rounded-full"
      />

      {/* Center Floating Orb */}
      <motion.div
        animate={{
          y: [0, -100, 0],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 blur-[150px] rounded-full"
      />

      {/* 3. Floating Geometric Squares (Unique Look) */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            opacity: 0, 
            rotate: 0,
            x: Math.random() * 100 + "vw",
            y: Math.random() * 100 + "vh" 
          }}
          animate={{ 
            opacity: [0, 0.2, 0],
            rotate: 360,
            y: [null, "-20vh"]
          }}
          transition={{
            duration: 20 + Math.random() * 10,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute w-20 h-20 border border-lime-400/20 rounded-xl"
        />
      ))}

      {/* 4. Glowing Particles (Bigger & Faster) */}
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: Math.random() * 100 + "vw", 
            y: "110vh",
            opacity: 0 
          }}
          animate={{ 
            y: "-10vh",
            opacity: [0, 0.7, 0],
            scale: [0, 1.5, 0]
          }}
          transition={{
            duration: 8 + Math.random() * 7,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
          className="absolute w-1 h-1 bg-lime-400 rounded-full shadow-[0_0_15px_#a3e635]"
        />
      ))}

      {/* 5. Animated Grid Lines (Moving Effect) */}
      <motion.div 
        animate={{ y: [0, -40] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 opacity-[0.1] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(#ffffff10 1px, transparent 1px), linear-gradient(90deg, #ffffff10 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* 6. Subtle Noise Texture */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
};

export default SiteBackground;