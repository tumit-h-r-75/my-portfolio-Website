import { Fragment } from "react";
import { motion } from "framer-motion";
import {
  FaLightbulb,
  FaDraftingCompass,
  FaPaintBrush,
  FaCode,
  FaBug,
  FaRocket,
  FaHeadset,
} from "react-icons/fa";
import SectionHeading from "./SectionHeading";
import BorderGlow, { glowTheme } from "./BorderGlow/BorderGlow";
import MagicBentoPanel from "./MagicBento/MagicBento";

const steps = [
  {
    icon: <FaLightbulb />,
    title: "Requirement Analysis",
    description: "I start by understanding the goal, target users, and core features so the project has a clear direction before any code is written.",
  },
  {
    icon: <FaDraftingCompass />,
    title: "Planning & Architecture",
    description: "Database schema, API structure, and component architecture are planned out to keep the codebase scalable and maintainable.",
  },
  {
    icon: <FaPaintBrush />,
    title: "UI/UX Design",
    description: "Wireframes and layouts are shaped around a clean, responsive design that feels intuitive across every screen size.",
  },
  {
    icon: <FaCode />,
    title: "Development",
    description: "The MERN stack comes together here — building reusable React components and robust Node/Express APIs with MongoDB.",
  },
  {
    icon: <FaBug />,
    title: "Testing & QA",
    description: "Features are tested across edge cases and devices, fixing bugs early to keep the final product stable and reliable.",
  },
  {
    icon: <FaRocket />,
    title: "Deployment",
    description: "Once everything checks out, the project is optimized and shipped to production with proper environment configuration.",
  },
  {
    icon: <FaHeadset />,
    title: "Support & Maintenance",
    description: "Launch isn't the end — I monitor, gather feedback, and keep improving the project after it goes live.",
  },
];

const StepCard = ({ step, index }) => (
  <BorderGlow {...glowTheme} backgroundColor="#0a0a0a" borderRadius={24} className="w-full">
    <MagicBentoPanel className="flex items-start gap-4 p-5 md:p-6">
      <div className="shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-xl bg-lime-400/10 border border-lime-400/20 flex items-center justify-center text-lime-400 text-xl md:text-2xl">
        {step.icon}
      </div>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-lime-400 mb-1">Step {index + 1}</p>
        <h3 className="text-lg md:text-xl font-black text-white mb-2">{step.title}</h3>
        <p className="text-zinc-400 text-sm leading-relaxed">{step.description}</p>
      </div>
    </MagicBentoPanel>
  </BorderGlow>
);

const Workflow = () => {
  return (
    <div className="mb-20 md:mb-28">
      <SectionHeading kicker="My Process" before="How I Build " highlight="Projects" align="center" />

      {/* Mobile: simple stacked timeline */}
      <div className="md:hidden space-y-6">
        {steps.map((step, i) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="flex gap-4"
          >
            <div className="flex flex-col items-center shrink-0">
              <div className="w-9 h-9 rounded-full bg-lime-400 text-black font-black flex items-center justify-center text-sm">
                {i + 1}
              </div>
              {i < steps.length - 1 && (
                <div className="flex-1 w-px border-l-2 border-dashed border-zinc-700 my-2" />
              )}
            </div>
            <div className="flex-1 pb-2">
              <StepCard step={step} index={i} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Desktop: zigzag alternating timeline */}
      <div className="hidden md:grid grid-cols-[1fr_auto_1fr] gap-x-10">
        {steps.map((step, i) => {
          const isLeft = i % 2 === 0;
          return (
            <Fragment key={step.title}>
              <div className="py-6 flex items-center justify-end">
                {isLeft && (
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md"
                  >
                    <StepCard step={step} index={i} />
                  </motion.div>
                )}
              </div>

              <div className="flex flex-col items-center">
                <div className="mt-6 w-11 h-11 rounded-full bg-lime-400 text-black font-black flex items-center justify-center shadow-[0_0_20px_rgba(163,230,53,0.4)] shrink-0">
                  {i + 1}
                </div>
                {i < steps.length - 1 && (
                  <div className="flex-1 w-px border-l-2 border-dashed border-zinc-700 my-2" />
                )}
              </div>

              <div className="py-6 flex items-center justify-start">
                {!isLeft && (
                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md"
                  >
                    <StepCard step={step} index={i} />
                  </motion.div>
                )}
              </div>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default Workflow;
