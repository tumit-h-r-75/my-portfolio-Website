import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import bannerImage from "../assets/myImg.png";

const Preloader = ({ onFinish }) => {
  const [startSplit, setStartSplit] = useState(false);

  useEffect(() => {
    const splitTimer = setTimeout(() => {
      setStartSplit(true);
    }, 1700);

    const finishTimer = setTimeout(() => {
      onFinish?.();
    }, 2500);

    return () => {
      clearTimeout(splitTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-[250] overflow-hidden" aria-label="Loading portfolio">
      <motion.div
        initial={false}
        animate={{ x: startSplit ? "-105%" : "0%", skewX: startSplit ? -4 : 0 }}
        transition={{ duration: 0.9, ease: [0.77, 0, 0.18, 1] }}
        className="absolute left-0 top-0 h-full w-1/2 bg-[#050505] border-r border-lime-400/20"
      />

      <motion.div
        initial={false}
        animate={{ x: startSplit ? "105%" : "0%", skewX: startSplit ? 4 : 0 }}
        transition={{ duration: 0.9, ease: [0.77, 0, 0.18, 1] }}
        className="absolute right-0 top-0 h-full w-1/2 bg-[#050505] border-l border-lime-400/20"
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: startSplit ? 0 : 1 }}
        transition={{ duration: 0.35 }}
        className="pointer-events-none absolute left-1/2 top-0 h-full w-[2px] -translate-x-1/2 bg-lime-400/70 shadow-[0_0_25px_rgba(163,230,53,0.95)]"
      />

      <motion.div
        initial={false}
        animate={{ opacity: startSplit ? 0 : 1, scale: startSplit ? 0.9 : 1, y: startSplit ? 16 : 0 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.17, 0.67, 0.35, 1] }}
          className="relative mx-6 w-full max-w-xl"
        >
          <div className="preloader-banner-glow" />
          <div className="preloader-banner-ring" />

          <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-black/45 shadow-[0_0_65px_rgba(163,230,53,0.14)] backdrop-blur-md">
            <motion.img
              src={bannerImage}
              alt="Tumit Hasan"
              initial={{ scale: 1.12 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-[340px] w-full object-cover object-top md:h-[430px]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
            <div className="preloader-shimmer absolute inset-0" />

            <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
              <h2 className="preloader-text-pop text-2xl font-black tracking-[0.18em] text-white md:text-3xl">
                TUMIT HASAN
              </h2>
              <p className="preloader-subtext-pop mt-1 text-xs uppercase tracking-[0.34em] text-zinc-300">
                MERN Stack Developer
              </p>

              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-zinc-800/90">
                <div className="preloader-banner-progress h-full rounded-full bg-gradient-to-r from-lime-400 to-emerald-400" />
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Preloader;
