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
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // মেনু ক্লোজ করার জন্য এবং স্ক্রল করার ফাংশন
  const handleScroll = (ref) => {
    setMenuOpen(false); // মেনু আগে ক্লোজ হবে
    setTimeout(() => {
      scrollToSection(ref);
    }, 300); // অ্যানিমেশন শেষ হওয়ার জন্য সামান্য দেরি
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
        ? "bg-black/80 backdrop-blur-xl border-b border-white/10 py-3 shadow-2xl" 
        : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 flex justify-between items-center">
        
        {/* --- Logo --- */}
        <Link to="/" onClick={() => handleScroll(homeRef)} className="relative shrink-0 z-[110]">
          <img 
            src={logo} 
            alt="Logo" 
            className={`transition-all duration-500 object-contain ${scrolled ? "w-32" : "w-40"}`} 
          />
        </Link>

        {/* --- Desktop Nav --- */}
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
              <span className="absolute bottom-0 left-1/2 w-0 h-[2.5px] bg-lime-400 transition-all duration-300 group-hover:w-full group-hover:left-0" />
            </button>
          ))}
        </nav>

        {/* --- Actions --- */}
        <div className="flex items-center gap-4 z-[110]">
          <motion.a
            whileHover={{ y: -3, scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="YOUR_RESUME_LINK"
            target="_blank"
            className="hidden sm:flex items-center gap-2 bg-lime-400 text-black px-6 py-2.5 rounded-full font-black text-[11px] uppercase tracking-widest hover:bg-white transition-colors"
          >
            Resume <FaDownload />
          </motion.a>

          {/* Toggle Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center text-white text-2xl focus:outline-none"
          >
            {menuOpen ? <FaTimes className="text-lime-400" /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* --- Off-canvas Mobile Menu --- */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop (কালো আবছা পর্দা) */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] lg:hidden"
            />

            {/* Side Menu Panel */}
            <motion.div
              initial={{ x: "100%" }} // ডান পাশ থেকে আসবে
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-screen w-[80%] max-w-[350px] bg-[#0a0a0a] border-l border-white/10 z-[100] lg:hidden flex flex-col p-10 pt-32"
            >
              <div className="flex flex-col gap-6">
                {navLinks.map((item, idx) => (
                  <motion.button
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    key={idx}
                    onClick={() => handleScroll(item.ref)}
                    className="flex items-center gap-4 text-2xl font-bold uppercase tracking-tighter text-zinc-400 hover:text-lime-400 transition-colors text-left"
                  >
                    <span className="text-lime-400 text-xl">{item.icon}</span>
                    {item.label}
                  </motion.button>
                ))}
                
                <motion.a
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  href="YOUR_RESUME_LINK"
                  className="mt-10 bg-lime-400 text-black py-4 rounded-xl font-black text-center text-sm uppercase flex items-center justify-center gap-2"
                >
                  Download Resume <FaDownload />
                </motion.a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;