import { createContext, useRef } from "react";

export const NavigateContext = createContext();

const NavigateProvider = ({ children }) => {
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const skillRef = useRef(null);
  const portfolioRef = useRef(null);
  const contactRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const navInfo = {
    homeRef,
    aboutRef,
    skillRef,
    portfolioRef,
    contactRef,
    scrollToSection,
  };

  return (
    <NavigateContext.Provider value={navInfo}>
      {children}
    </NavigateContext.Provider>
  );
};

export default NavigateProvider;
