// Device capability flags, computed once at startup.
// Heavy visual effects (canvas grids, backdrop blur, tilt, ambient loops)
// are switched off on weak or touch devices so the site stays smooth.

const matches = (query) =>
  typeof window !== "undefined" && typeof window.matchMedia === "function"
    ? window.matchMedia(query).matches
    : false;

const nav = typeof navigator !== "undefined" ? navigator : {};

export const prefersReducedMotion = matches("(prefers-reduced-motion: reduce)");

// Real mouse/trackpad — hover and pointer-tracking effects only make sense here.
export const canHover = matches("(hover: hover) and (pointer: fine)");

const lowCpu = (nav.hardwareConcurrency || 8) <= 4;
const lowMemory = (nav.deviceMemory || 8) <= 4;
const saveData = Boolean(nav.connection?.saveData);

// Weak hardware: also stop decorative infinite animations.
export const isLowEnd = prefersReducedMotion || saveData || lowCpu || lowMemory;

// Lite mode: no backdrop blur, no canvas/pointer effects, no 3D tilt.
export const isLiteMode = isLowEnd || !canHover;

export const applyPerfClasses = () => {
  const root = document.documentElement;
  root.classList.toggle("perf-lite", isLiteMode);
  root.classList.toggle("perf-low", isLowEnd);
};
