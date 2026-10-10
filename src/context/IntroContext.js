import { createContext } from "react";

// true once the intro preloader starts opening — hero animations wait for it,
// so they play in view instead of behind the loading screen.
export const IntroContext = createContext(true);
