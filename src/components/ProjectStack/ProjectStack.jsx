import { forwardRef, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import useMediaQuery from "../../lib/useMediaQuery";
import { isLiteMode } from "../../lib/perf";
import "./ProjectStack.css";

// "Kaimana – AI-Powered Coding Platform" → title "Kaimana", category "AI-Powered Coding Platform"
const TITLE_SPLIT = /\s+[–—-]\s+/;

const normalizeTags = (techStack) =>
  Array.isArray(techStack)
    ? techStack.length === 1 && techStack[0].includes(",")
      ? techStack[0].split(",").map((s) => s.trim())
      : techStack
    : [];

const splitTitle = (name = "", tags = []) => {
  const [title, ...rest] = name.split(TITLE_SPLIT);
  const category = rest.join(" — ") || tags.slice(0, 2).join(" · ") || "Web Application";
  return { title: title.trim(), category };
};

// first short, clean feature line — dashboard data sometimes holds comma-split
// fragments ("Dynamic", "soda brand"), so require a capitalised multi-word phrase
const pickHighlight = (features = []) =>
  features.find((f) => f && f.length >= 10 && f.length <= 48 && /^[A-Z0-9]/.test(f) && /\s/.test(f) && !/[()]/.test(f)) ||
  (features.length ? `${features.length} key features` : "Custom build");

const SHRINK_PER_CARD = 0.035;

const ProjectStackCard = forwardRef(({ project, index, scrollY, timing, stacked }, ref) => {
  const tags = normalizeTags(project.techStack);
  const { title, category } = splitTitle(project.name, tags);
  const num = String(index + 1).padStart(2, "0");
  const detailsUrl = `/projects/${project.id}`;

  // Covered cards shrink a little more with every card that lands on top,
  // and darken while the next one slides over them (timing measured in px of scroll)
  const zero = useMotionValue(0);
  const animated = Boolean(scrollY && timing);
  const scale = useTransform(
    animated ? scrollY : zero,
    animated ? timing.scaleIn : [0, 1],
    animated ? timing.scaleIn.map((_, k) => 1 - k * SHRINK_PER_CARD) : [1, 1]
  );
  const dim = useTransform(animated ? scrollY : zero, animated ? timing.dimIn : [0, 1], animated ? [0, 0.45] : [0, 0]);

  const specs = [
    ["Highlight", pickHighlight(project.features)],
    ["Status", project.liveLink ? "Live in production" : "In development"],
    ["Source", project.githubClient ? "Public GitHub repo" : "Client project"],
  ];

  return (
    <motion.article
      ref={ref}
      className="psc-card"
      // stacked cards overlap, so they slide in without fading (no see-through moment)
      initial={stacked ? { y: 60 } : { opacity: 0, y: 50 }}
      whileInView={stacked ? { y: 0 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={
        stacked
          ? {
              top: `calc(var(--psc-top) + ${index} * var(--psc-step))`,
              ...(animated ? { scale } : null),
            }
          : undefined
      }
    >
      <div className="psc-grid">
        <div className="psc-info">
          <p className="psc-meta">
            <span className="psc-num">{`${num} //`}</span>
            {category}
          </p>
          <h3 className="psc-title">{title}</h3>
          <p className="psc-desc">{project.description}</p>
          <div className="psc-rule" />
          <div className="psc-tags">
            {tags.slice(0, 6).map((tag) => (
              <span key={tag} className="psc-tag">
                {tag}
              </span>
            ))}
            {tags.length > 6 && <span className="psc-tag">+{tags.length - 6}</span>}
          </div>
          <Link to={detailsUrl} className="psc-details">
            Case Study <span className="arrow">→</span>
          </Link>
        </div>

        <Link to={detailsUrl} className="psc-shot" aria-label={`Open ${title} case study`}>
          <img src={project.image} alt={title} loading="lazy" decoding="async" />
        </Link>

        <div className="psc-specs">
          <p className="psc-label">{"// Project Specs"}</p>
          <dl className="psc-metrics">
            {specs.map(([label, value]) => (
              <div key={label} className="psc-row">
                <dt>{label}</dt>
                <dd title={value}>{value}</dd>
              </div>
            ))}
          </dl>
          <div className="psc-actions">
            {project.liveLink && (
              <a href={project.liveLink} target="_blank" rel="noreferrer" className="psc-btn psc-btn--primary">
                Live Site ↗
              </a>
            )}
            {project.githubClient && (
              <a href={project.githubClient} target="_blank" rel="noreferrer" className="psc-btn">
                Source Code ↗
              </a>
            )}
            {!project.liveLink && !project.githubClient && (
              <Link to={detailsUrl} className="psc-btn psc-btn--primary">
                View Details →
              </Link>
            )}
          </div>
        </div>
      </div>

      <span className="psc-ghost" aria-hidden="true">
        {num}
      </span>
      {animated && <motion.div className="psc-dim" style={{ opacity: dim }} />}
    </motion.article>
  );
});

ProjectStackCard.displayName = "ProjectStackCard";

const remToPx = (value) =>
  parseFloat(value) * (parseFloat(getComputedStyle(document.documentElement).fontSize) || 16);

/**
 * sticky=true → on desktop the cards pin under the navbar and stack like a deck.
 * On phones/tablets (and the /projects page) it is a normal vertical list.
 */
const ProjectStack = ({ projects, sticky = true }) => {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const canStack = sticky && isDesktop;
  // every stuck card must fit on screen, otherwise its buttons could never be reached
  const [fits, setFits] = useState(true);
  const stacked = canStack && fits;
  // the scroll-linked shrink/dim is skipped on weak hardware (sticky stacking still works)
  const animate = stacked && !isLiteMode;
  const { scrollY } = useScroll();
  const [timings, setTimings] = useState([]);

  // Work out, in page-scroll pixels, when each card starts sliding over the
  // previous one and when it lands. Uses natural (non-sticky) positions:
  // container top + heights + gaps, so stuck cards never skew the maths.
  useLayoutEffect(() => {
    if (!canStack) return undefined;
    const container = containerRef.current;

    const measure = () => {
      const cards = cardRefs.current.slice(0, projects.length);
      if (!container || cards.some((c) => !c)) return;
      const cs = getComputedStyle(container);
      const gap = parseFloat(cs.rowGap) || 0;
      const stickyTop = (i) => remToPx(cs.getPropertyValue("--psc-top")) + i * remToPx(cs.getPropertyValue("--psc-step"));

      setFits(cards.every((card, i) => stickyTop(i) + card.offsetHeight <= window.innerHeight - 12));
      if (isLiteMode) return;

      let y = container.getBoundingClientRect().top + window.scrollY + (parseFloat(cs.paddingTop) || 0);
      const tops = cards.map((card) => {
        const top = y;
        y += card.offsetHeight + gap;
        return top;
      });
      // card j (j ≥ 1) starts covering card j-1 … and is fully stuck
      const starts = tops.map((t, j) => (j === 0 ? 0 : t - stickyTop(j - 1) - cards[j - 1].offsetHeight));
      const lands = tops.map((t, j) => t - stickyTop(j));

      setTimings(
        cards.map((_, i) => {
          if (i === cards.length - 1) return null;
          const dimIn = [starts[i + 1], Math.max(lands[i + 1], starts[i + 1] + 1)];
          const scaleIn = [dimIn[0]];
          for (let j = i + 1; j < cards.length; j++) {
            scaleIn.push(Math.max(lands[j], scaleIn[scaleIn.length - 1] + 1));
          }
          return { dimIn, scaleIn };
        })
      );
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(container);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [canStack, projects.length]);

  return (
    <div ref={containerRef} className={`psc-stack${stacked ? " is-stacked" : ""}`}>
      {projects.map((project, i) => (
        <ProjectStackCard
          key={project.id}
          ref={(el) => (cardRefs.current[i] = el)}
          project={project}
          index={i}
          scrollY={animate ? scrollY : null}
          timing={animate ? timings[i] : null}
          stacked={stacked}
        />
      ))}
    </div>
  );
};

export default ProjectStack;
