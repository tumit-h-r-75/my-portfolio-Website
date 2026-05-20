import { forwardRef, useRef } from "react";
import "./MagicBento.css";

const MagicBentoPanel = forwardRef(({
  as: Component = "div",
  children,
  className = "",
  glowColor = "163, 230, 53",
  enableTilt = true,
  enableRipple = true,
  ...props
}, externalRef) => {
  const panelRef = useRef(null);

  const setRefs = (node) => {
    panelRef.current = node;
    if (typeof externalRef === "function") {
      externalRef(node);
    } else if (externalRef) {
      externalRef.current = node;
    }
  };

  const handlePointerMove = (event) => {
    const panel = panelRef.current;
    if (!panel) return;

    const rect = panel.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    panel.style.setProperty("--magic-glow-x", `${xPercent}%`);
    panel.style.setProperty("--magic-glow-y", `${yPercent}%`);
    panel.style.setProperty("--magic-glow-intensity", "1");
    panel.style.setProperty("--magic-glow-color", glowColor);

    if (enableTilt && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const rotateX = ((y / rect.height) - 0.5) * -5;
      const rotateY = ((x / rect.width) - 0.5) * 5;
      panel.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
    }
  };

  const handlePointerLeave = () => {
    const panel = panelRef.current;
    if (!panel) return;

    panel.style.setProperty("--magic-glow-intensity", "0");
    panel.style.transform = "";
  };

  const handleClick = (event) => {
    props.onClick?.(event);
    if (!enableRipple || event.defaultPrevented) return;

    const panel = panelRef.current;
    if (!panel) return;

    const rect = panel.getBoundingClientRect();
    const ripple = document.createElement("span");
    const size = Math.max(rect.width, rect.height) * 1.35;

    ripple.className = "magic-bento-ripple";
    ripple.style.width = `${size}px`;
    ripple.style.height = `${size}px`;
    ripple.style.left = `${event.clientX - rect.left}px`;
    ripple.style.top = `${event.clientY - rect.top}px`;

    panel.appendChild(ripple);
    window.setTimeout(() => ripple.remove(), 700);
  };

  return (
    <Component
      {...props}
      ref={setRefs}
      className={`magic-bento-panel ${className}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick}
    >
      {children}
    </Component>
  );
});

MagicBentoPanel.displayName = "MagicBentoPanel";

export default MagicBentoPanel;
