import { Fragment, useLayoutEffect, useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
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

/** Builds a rounded elbow connector path between the facing edges of two cards. */
const buildConnector = (a, b, isLeftToRight, radius) => {
  const startX = isLeftToRight ? a.right : a.left;
  const endX = isLeftToRight ? b.left : b.right;
  const startY = a.midY;
  const endY = b.midY;
  const midX = (startX + endX) / 2;
  const sign = endY >= startY ? 1 : -1;
  const r = Math.min(radius, Math.abs(endY - startY) / 2, Math.abs(midX - startX) || radius);
  const bendX1 = isLeftToRight ? midX - r : midX + r;
  const bendX2 = isLeftToRight ? midX + r : midX - r;

  const d = [
    `M ${startX} ${startY}`,
    `L ${bendX1} ${startY}`,
    `Q ${midX} ${startY} ${midX} ${startY + r * sign}`,
    `L ${midX} ${endY - r * sign}`,
    `Q ${midX} ${endY} ${bendX2} ${endY}`,
    `L ${endX} ${endY}`,
  ].join(" ");

  return { d };
};

const Workflow = () => {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);
  const fullPathRef = useRef(null);
  const recomputeRef = useRef(() => {});
  const [connectors, setConnectors] = useState([]);
  const [svgSize, setSvgSize] = useState({ width: 0, height: 0 });
  const [pathLength, setPathLength] = useState(0);
  const [rocket, setRocket] = useState({ x: 0, y: 0, angle: 0 });

  const fullPathD = connectors.map((c) => c.d).join(" ");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const placeRocketAt = (progress, len) => {
    const path = fullPathRef.current;
    if (!path || !len) return;

    const clamped = Math.min(Math.max(progress, 0), 1);
    const l = clamped * len;
    const point = path.getPointAtLength(l);
    const aheadPoint = path.getPointAtLength(Math.min(len, l + 1));
    const angle = Math.atan2(aheadPoint.y - point.y, aheadPoint.x - point.x) * (180 / Math.PI);

    setRocket({ x: point.x, y: point.y, angle });
  };

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    const recompute = () => {
      const containerRect = container.getBoundingClientRect();
      setSvgSize({ width: containerRect.width, height: containerRect.height });

      const rects = cardRefs.current.map((el) => {
        if (!el) return null;
        const r = el.getBoundingClientRect();
        return {
          left: r.left - containerRect.left,
          right: r.right - containerRect.left,
          midY: r.top - containerRect.top + r.height / 2,
        };
      });

      const next = [];
      for (let i = 0; i < rects.length - 1; i++) {
        const a = rects[i];
        const b = rects[i + 1];
        if (!a || !b) continue;
        const isLeftToRight = i % 2 === 0;
        next.push(buildConnector(a, b, isLeftToRight, 28));
      }
      setConnectors(next);

      // Path DOM updates asynchronously after state commit; measure next frame.
      requestAnimationFrame(() => {
        if (!fullPathRef.current) return;
        const len = fullPathRef.current.getTotalLength();
        setPathLength(len);
        placeRocketAt(scrollYProgress.get(), len);
      });
    };

    recomputeRef.current = recompute;
    recompute();
    const ro = new ResizeObserver(recompute);
    ro.observe(container);
    window.addEventListener("resize", recompute);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", recompute);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // The entrance slide (x transform) temporarily shifts each card's measured
  // position; re-measure once it settles so the connector stays aligned.
  const handleCardAnimationComplete = () => recomputeRef.current();

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    placeRocketAt(progress, pathLength);
  });

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

      {/* Desktop: zigzag timeline with a measured, rounded connector path */}
      <div ref={containerRef} className="hidden md:block relative">
        <svg
          className="absolute top-0 left-0 pointer-events-none"
          width={svgSize.width}
          height={svgSize.height}
          style={{ overflow: "visible" }}
        >
          <path ref={fullPathRef} d={fullPathD} fill="none" stroke="#52525b" strokeWidth="2" strokeDasharray="7 7" />
        </svg>

        {pathLength > 0 && (
          <div
            className="absolute z-10 w-11 h-11 rounded-full bg-lime-400 border-4 border-black flex items-center justify-center text-black shadow-[0_0_20px_rgba(163,230,53,0.5)]"
            style={{
              left: rocket.x,
              top: rocket.y,
              transform: `translate(-50%, -50%) rotate(${rocket.angle - 45}deg)`,
            }}
          >
            <FaRocket className="text-lg" />
          </div>
        )}

        <div className="grid grid-cols-[1fr_auto_1fr] gap-x-10 relative">
          {steps.map((step, i) => {
            const isLeft = i % 2 === 0;
            return (
              <Fragment key={step.title}>
                <div className="py-6 flex items-center justify-end">
                  {isLeft && (
                    <motion.div
                      ref={(el) => (cardRefs.current[i] = el)}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      onAnimationComplete={handleCardAnimationComplete}
                      className="w-full max-w-md"
                    >
                      <StepCard step={step} index={i} />
                    </motion.div>
                  )}
                </div>

                <div />

                <div className="py-6 flex items-center justify-start">
                  {!isLeft && (
                    <motion.div
                      ref={(el) => (cardRefs.current[i] = el)}
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      onAnimationComplete={handleCardAnimationComplete}
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
    </div>
  );
};

export default Workflow;
