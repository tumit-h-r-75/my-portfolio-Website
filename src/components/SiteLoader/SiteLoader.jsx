import { useEffect, useRef, useState } from "react";
import logo from "../../assets/Purple and White Modern Computer Service and Repair Logo -Photoroom.png";
import { isLiteMode, isLowEnd } from "../../lib/perf";
import "./SiteLoader.css";

/**
 * Branded loader: the TUMIT DEV logo inside a HUD frame with a scanning beam,
 * a light running round the border, a typing terminal status line and an
 * indeterminate progress bar. Tilts towards the cursor, ripples + glitches on click.
 *
 * size: "lg" (full page) | "md" (section) | "sm" (dashboard panel)
 */
const SiteLoader = ({ messages = ["Loading"], size = "md", className = "" }) => {
  const emblemRef = useRef(null);
  const [typed, setTyped] = useState(isLowEnd ? messages[0] : "");
  const [index, setIndex] = useState(0);
  const [ripples, setRipples] = useState([]);
  const [glitch, setGlitch] = useState(false);
  const messageKey = messages.join("|");

  // type each status message, pause, move to the next one
  useEffect(() => {
    if (isLowEnd) return undefined;
    const word = messages[index % messages.length];
    const done = typed === word;
    const timer = setTimeout(
      () => {
        if (done) {
          setTyped("");
          setIndex((i) => i + 1);
        } else {
          setTyped(word.slice(0, typed.length + 1));
        }
      },
      done ? 1300 : 42
    );
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [typed, index, messageKey]);

  // 3D tilt towards the cursor (direct DOM write, no re-render)
  const handleMove = (e) => {
    const el = emblemRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(700px) rotateX(${(-y * 14).toFixed(2)}deg) rotateY(${(x * 18).toFixed(2)}deg)`;
  };
  const handleLeave = () => {
    if (emblemRef.current) emblemRef.current.style.transform = "";
  };

  // click / tap: ripple from the pointer + a quick logo glitch
  const handleClick = (e) => {
    const el = emblemRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const id = performance.now();
    setRipples((list) => [...list, { id, x: e.clientX - r.left, y: e.clientY - r.top }]);
    setGlitch(true);
    setTimeout(() => setGlitch(false), 420);
  };

  return (
    <div
      className={`site-loader site-loader--${size} ${className}`}
      role="status"
      aria-live="polite"
      aria-label={messages[0]}
    >
      <div className="sl-glow" aria-hidden="true" />

      <div
        ref={emblemRef}
        className={`sl-emblem${glitch ? " is-glitch" : ""}`}
        onPointerMove={isLiteMode ? undefined : handleMove}
        onPointerLeave={isLiteMode ? undefined : handleLeave}
        onClick={handleClick}
        aria-hidden="true"
      >
        <span className="sl-trace">
          <span className="sl-trace-spin" />
        </span>
        <span className="sl-corner sl-corner--tl" />
        <span className="sl-corner sl-corner--tr" />
        <span className="sl-corner sl-corner--bl" />
        <span className="sl-corner sl-corner--br" />

        <div className="sl-screen">
          <img src={logo} alt="" className="sl-logo" draggable="false" />
          <span className="sl-scan" />
          {ripples.map((rp) => (
            <span
              key={rp.id}
              className="sl-ripple"
              style={{ left: rp.x, top: rp.y }}
              onAnimationEnd={() => setRipples((list) => list.filter((r) => r.id !== rp.id))}
            />
          ))}
        </div>
      </div>

      <p className="sl-term" aria-hidden="true">
        <span className="sl-prompt">$</span> {typed}
        <span className="sl-caret" />
      </p>

      <div className="sl-bar" aria-hidden="true">
        <span />
      </div>

      <span className="sr-only">{messages[0]}…</span>
    </div>
  );
};

export default SiteLoader;
