import { Fragment, useLayoutEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  FaLightbulb,
  FaDraftingCompass,
  FaPaintBrush,
  FaCode,
  FaBug,
  FaRocket,
  FaHeadset,
} from "react-icons/fa";
import SectionHeading from "../SectionHeading";
import BorderGlow, { glowTheme } from "../BorderGlow/BorderGlow";
import MagicBentoPanel from "../MagicBento/MagicBento";
import RocketIcon from "./RocketIcon";

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

/**
 * Builds a connector between the CENTERS of two consecutive cards: a long
 * horizontal sweep at the outgoing card's row (running straight through the
 * next card's side), one rounded turn, then a vertical drop down to that
 * next card's own center. Since cards paint above this layer, the segment
 * "inside" each card is hidden by its opaque background, giving the illusion
 * that the line dives through the middle of every card and re-emerges on
 * the other side, matching the reference site.
 */
const buildConnector = (aX, aY, bX, bY, radius) => {
  const hSign = bX >= aX ? 1 : -1;
  const vSign = bY >= aY ? 1 : -1;
  const r = Math.max(0, Math.min(radius, Math.abs(bX - aX) - 1, Math.abs(bY - aY) - 1));

  const d = [
    `M ${aX} ${aY}`,
    `L ${bX - r * hSign} ${aY}`,
    `Q ${bX} ${aY} ${bX} ${aY + r * vSign}`,
    `L ${bX} ${bY}`,
  ].join(" ");

  return { d };
};

const Workflow = () => {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);
  const fullPathRef = useRef(null);
  const pathLengthRef = useRef(0);
  const recomputeRef = useRef(() => {});
  const [connectors, setConnectors] = useState([]);
  const [svgSize, setSvgSize] = useState({ width: 0, height: 0 });
  const [rocketReady, setRocketReady] = useState(false);

  const fullPathD = connectors.map((c) => c.d).join(" ");

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // Reads the path directly on every scroll tick (via framer-motion's
  // MotionValues) instead of going through React state, so the rocket's
  // position and rotation update smoothly on every frame, not just on
  // whichever renders happen to catch a "change" event.
  const getPointAt = (progress) => {
    const path = fullPathRef.current;
    const len = pathLengthRef.current;
    if (!path || !len) return { x: 0, y: 0 };
    const clamped = Math.min(Math.max(progress, 0), 1);
    return path.getPointAtLength(clamped * len);
  };

  const getAngleAt = (progress) => {
    const path = fullPathRef.current;
    const len = pathLengthRef.current;
    if (!path || !len) return 0;
    const clamped = Math.min(Math.max(progress, 0), 1);
    const l = clamped * len;
    const p1 = path.getPointAtLength(l);
    const p2 = path.getPointAtLength(Math.min(len, l + 1));
    return Math.atan2(p2.y - p1.y, p2.x - p1.x) * (180 / Math.PI);
  };

  const rocketX = useTransform(scrollYProgress, (v) => getPointAt(v).x);
  const rocketY = useTransform(scrollYProgress, (v) => getPointAt(v).y);
  const rocketAngle = useTransform(scrollYProgress, getAngleAt);

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
          midX: r.left - containerRect.left + r.width / 2,
          midY: r.top - containerRect.top + r.height / 2,
        };
      });

      const next = [];
      for (let i = 0; i < rects.length - 1; i++) {
        const a = rects[i];
        const b = rects[i + 1];
        if (!a || !b) continue;
        next.push(buildConnector(a.midX, a.midY, b.midX, b.midY, 48));
      }
      setConnectors(next);

      // Path DOM updates asynchronously after state commit; measure next frame.
      requestAnimationFrame(() => {
        if (!fullPathRef.current) return;
        pathLengthRef.current = fullPathRef.current.getTotalLength();
        setRocketReady(true);

        // Force an immediate refresh so the rocket doesn't wait for the next
        // scroll event to reflect freshly measured geometry.
        const progress = scrollYProgress.get();
        rocketX.set(getPointAt(progress).x);
        rocketY.set(getPointAt(progress).y);
        rocketAngle.set(getAngleAt(progress));
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

        {rocketReady && (
          <motion.div
            className="absolute"
            style={{
              left: rocketX,
              top: rocketY,
              rotate: rocketAngle,
              x: "-50%",
              y: "-50%",
            }}
          >
            <RocketIcon className="w-[67px] h-10 drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)]" />
          </motion.div>
        )}

        <div className="grid grid-cols-[1fr_260px_1fr] gap-x-0 relative">
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
