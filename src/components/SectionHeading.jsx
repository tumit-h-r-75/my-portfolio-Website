import { motion } from "framer-motion";
import DecryptLabel, { DecryptSplitHeading } from "./DecryptLabel";

const SectionHeading = ({ kicker, before = "", highlight = "", highlightClassName = "text-lime-400", align = "left" }) => {
  const isCenter = align === "center";

  return (
    <div className={`mb-12 md:mb-16 flex flex-col ${isCenter ? "items-center text-center" : "items-start text-left"}`}>
      {kicker && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-2 text-lime-400 mb-4"
        >
          <div className="w-10 h-[1px] bg-lime-400" />
          <span className="text-sm font-bold tracking-[0.3em] uppercase">
            <DecryptLabel text={kicker} parentClassName="text-lime-400" className="text-lime-400" />
          </span>
        </motion.div>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-4xl sm:text-5xl md:text-6xl font-black text-white uppercase tracking-tighter leading-tight"
      >
        <DecryptSplitHeading before={before} highlight={highlight} highlightClassName={highlightClassName} />
      </motion.h2>
      <div className="w-16 md:w-20 h-1 bg-lime-400 mt-4 rounded-full shadow-[0_0_15px_#a3e635]" />
    </div>
  );
};

export default SectionHeading;
