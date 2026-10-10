import CursorGrid from "./CursorGrid/CursorGrid";
import { isLiteMode } from "../lib/perf";
import "./SiteBackground.css";

// Fixed positions (instead of Math.random on every render) — stable layout,
// no re-randomizing when the component re-renders.
const PARTICLES = [
  { x: 8, delay: 0.4 },
  { x: 47, delay: 2.1 },
  { x: 83, delay: 3.6 },
  { x: 26, delay: 1.2 },
  { x: 64, delay: 4.4 },
  { x: 92, delay: 0.9 },
  { x: 36, delay: 2.9 },
];

const SQUARES = [
  { x: 14, y: 62 },
  { x: 71, y: 38 },
  { x: 52, y: 84 },
];

const SiteBackground = () => {
  const particles = isLiteMode ? PARTICLES.slice(0, 3) : PARTICLES;

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden bg-[#020202]">
      {/* Contrast layer - content readable rakhar jonno */}
      <div className="absolute inset-0 bg-black/55" />

      {/* Brand glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(163,230,53,0.1),transparent_62%)] md:bg-[radial-gradient(circle_at_50%_45%,rgba(163,230,53,0.14),transparent_62%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.2),rgba(0,0,0,0.78))]" />

      {!isLiteMode && <div className="site-bg-scan site-bg-anim" />}

      <div className="site-bg-glow site-bg-glow--lime site-bg-anim" />
      <div className="site-bg-glow site-bg-glow--emerald site-bg-anim hidden md:block" />

      {!isLiteMode &&
        SQUARES.map((s, i) => (
          <div
            key={i}
            className="site-bg-square site-bg-anim"
            style={{ left: `${s.x}vw`, top: `${s.y}vh`, animationDelay: `${i * -9}s` }}
          />
        ))}

      {particles.map((p, i) => (
        <div
          key={i}
          className="site-bg-particle site-bg-anim"
          style={{
            left: `${p.x}vw`,
            "--dur": isLiteMode ? "14s" : "10s",
            "--delay": `${p.delay}s`,
          }}
        />
      ))}

      {/* Mouse-reactive grid: only on real mouse + capable hardware */}
      {!isLiteMode && (
        <div className="absolute inset-0">
          <CursorGrid
            cellSize={64}
            color="#a3e635"
            radius={160}
            falloff="smooth"
            holdTime={350}
            fadeDuration={750}
            lineWidth={1}
            maxOpacity={0.55}
            fillOpacity={0.04}
            gridOpacity={0}
            cellRadius={4}
            clickPulse
            pulseSpeed={650}
          />
        </div>
      )}

      <div
        className="absolute inset-0 opacity-[0.045] pointer-events-none bg-[length:30px_30px] md:bg-[length:40px_40px]"
        style={{
          backgroundImage: `linear-gradient(#ffffff10 1px, transparent 1px), linear-gradient(90deg, #ffffff10 1px, transparent 1px)`,
        }}
      />

      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, #ffffff 0 0.5px, transparent 0.8px), radial-gradient(circle at 70% 65%, #ffffff 0 0.45px, transparent 0.75px)",
          backgroundSize: "18px 18px, 23px 23px",
        }}
      />
    </div>
  );
};

export default SiteBackground;
