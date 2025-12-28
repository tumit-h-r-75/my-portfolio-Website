import { useContext, useState, useEffect } from "react";
import {
  FaDownload,
  FaBars,
  FaTimes,
  FaHome,
  FaUserAlt,
  FaLaptopCode,
  FaProjectDiagram,
  FaEnvelopeOpen,
} from "react-icons/fa";
import { Link, useLocation } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/Purple and White Modern Computer Service and Repair Logo -Photoroom.png";
import { NavigateContext } from "../context/NavigateProvider";

const Navbar = () => {
  const { scrollToSection, homeRef, aboutRef, skillRef, contactRef, portfolioRef } = useContext(NavigateContext);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = (ref) => {
    scrollToSection(ref);
    setMenuOpen(false);
  };

  const navLinks = [
    { label: "Home", icon: <FaHome />, ref: homeRef },
    { label: "About", icon: <FaUserAlt />, ref: aboutRef },
    { label: "Skills", icon: <FaLaptopCode />, ref: skillRef },
    { label: "Portfolio", icon: <FaProjectDiagram />, ref: portfolioRef },
    { label: "Contact", icon: <FaEnvelopeOpen />, ref: contactRef },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
        scrolled 
        ? "bg-black/60 backdrop-blur-xl border-b border-white/10 py-3 shadow-2xl" 
        : "bg-transparent py-6"
      }`}
    >
      {/* Container 7xl Content Centered */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 flex justify-between items-center">
        
        {/* --- Logo Area --- */}
        <Link to="/" onClick={() => handleScroll(homeRef)} className="relative shrink-0">
          <img 
            src={logo} 
            alt="Logo" 
            className={`transition-all duration-500 object-contain ${scrolled ? "w-32 md:w-36" : "w-44 md:w-52"}`} 
          />
        </Link>

        {/* --- Desktop Navigation --- */}
        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleScroll(item.ref)}
              className="relative py-2 text-[13px] font-black uppercase tracking-[0.2em] text-zinc-400 hover:text-white transition-all group flex items-center gap-2"
            >
              <span className="text-lime-400 group-hover:-translate-y-1 transition-transform duration-300">
                {item.icon}
              </span>
              {item.label}
              
              {/* Animated Underline (Center to Outer) */}
              <span className="absolute bottom-0 left-1/2 w-0 h-[2.5px] bg-lime-400 transition-all duration-300 group-hover:w-full group-hover:left-0" />
            </button>
          ))}
        </nav>

        {/* --- Action Area --- */}
        <div className="flex items-center gap-4">
          <motion.a
            whileHover={{ y: -3, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="https://drive.google.com/file/d/1P61zXG4Ryuh2Z445UwzTpP0Uljt0SvjY/view?usp=sharing"
            target="_blank"
            className="hidden sm:flex items-center gap-2 bg-lime-400 text-black px-8 py-3 rounded-full font-black text-[11px] uppercase tracking-widest transition-all shadow-[0_10px_20px_rgba(163,230,53,0.3)] hover:bg-white"
          >
            Resume <FaDownload />
          </motion.a>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden w-12 h-12 flex items-center justify-center text-white text-2xl"
          >
            {menuOpen ? <FaTimes className="text-lime-400" /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* --- Mobile Fullscreen Overlay --- */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 h-screen w-full bg-[#050505]/fb backdrop-blur-3xl z-[90] flex flex-col items-center justify-center lg:hidden px-10"
          >
            <div className="flex flex-col gap-8 w-full text-center">
              {navLinks.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleScroll(item.ref)}
                  className="text-4xl font-black uppercase tracking-tighter text-zinc-600 hover:text-lime-400 transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <a
                href="https://drive.google.com/file/d/1P61zXG4Ryuh2Z445UwzTpP0Uljt0SvjY/view?usp=sharing"
                className="mt-6 bg-lime-400 text-black py-4 rounded-xl font-black text-center text-lg uppercase mx-auto w-full max-w-xs"
              >
                Get Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;