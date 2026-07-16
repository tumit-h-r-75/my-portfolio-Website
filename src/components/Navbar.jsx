import { useState, useEffect } from "react";
import {
  FaDownload,
  FaBars,
  FaTimes,
  FaHome,
  FaUserAlt,
  FaLaptopCode,
  FaGraduationCap,
  FaCodeBranch,
  FaProjectDiagram,
  FaEnvelopeOpen,
} from "react-icons/fa";
import { Link, useNavigate, useLocation } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/Purple and White Modern Computer Service and Repair Logo -Photoroom.png";
import DecryptLabel from "./DecryptLabel";

const navLinks = [
  { label: "Home", icon: <FaHome />, id: "home" },
  { label: "About", icon: <FaUserAlt />, id: "about" },
  { label: "Skills", icon: <FaLaptopCode />, id: "skills" },
  { label: "Education", icon: <FaGraduationCap />, id: "education" },
  { label: "Journey", icon: <FaCodeBranch />, id: "journey" },
  { label: "Projects", icon: <FaProjectDiagram />, id: "portfolio" },
  { label: "Contact", icon: <FaEnvelopeOpen />, id: "contact" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToId = (id) => {
    if (id === "home") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Works from any route: if not on Home, go Home first, then scroll.
  const handleNav = (id) => {
    setMenuOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => scrollToId(id), 400);
    } else {
      setTimeout(() => scrollToId(id), 250);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
        scrolled
          ? "bg-black/80 backdrop-blur-xl py-3 shadow-2xl"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-[88rem] mx-auto px-6 md:px-10 lg:px-12 flex justify-between items-center">
        {/* --- Logo --- */}
        <Link
          to="/"
          onClick={() => handleNav("home")}
          className="relative shrink-0 z-[110]"
        >
          <img
            src={logo}
            alt="Logo"
            className={`transition-all duration-500 object-contain ${
              scrolled ? "w-28" : "w-36"
            }`}
          />
        </Link>

        {/* --- Desktop Nav --- */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-6">
          {navLinks.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNav(item.id)}
              className="relative py-2 text-[11px] xl:text-[12px] font-black uppercase tracking-[0.12em] text-zinc-400 hover:text-white transition-all group flex items-center gap-1.5"
            >
              <span className="text-lime-400 group-hover:-translate-y-1 transition-transform duration-300">
                {item.icon}
              </span>
              <DecryptLabel
                text={item.label}
                animateOn="hover"
                sequential={false}
                maxIterations={8}
                speed={35}
                parentClassName="text-inherit group-hover:text-white"
                className="text-inherit group-hover:text-white"
              />
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
            <DecryptLabel
              text="Resume"
              animateOn="hover"
              sequential={false}
              maxIterations={6}
              speed={30}
              parentClassName="text-black"
              className="text-black"
              encryptedClassName="text-zinc-600"
            />{" "}
            <FaDownload />
          </motion.a>

          {/* Toggle Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center text-white text-2xl focus:outline-none"
            aria-label="Toggle menu"
          >
            {menuOpen ? <FaTimes className="text-lime-400" /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* --- Off-canvas Mobile Menu --- */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] lg:hidden"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-screen w-[80%] max-w-[350px] bg-[#0a0a0a] border-l border-white/10 z-[100] lg:hidden flex flex-col p-10 pt-28 overflow-y-auto"
            >
              <div className="flex flex-col gap-5">
                {navLinks.map((item, idx) => (
                  <motion.button
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.08 }}
                    key={item.id}
                    onClick={() => handleNav(item.id)}
                    className="flex items-center gap-4 text-xl font-bold uppercase tracking-tight text-zinc-400 hover:text-lime-400 transition-colors text-left"
                  >
                    <span className="text-lime-400 text-lg">{item.icon}</span>
                    <DecryptLabel
                      text={item.label}
                      animateOn="hover"
                      sequential={false}
                      maxIterations={8}
                      speed={35}
                      parentClassName="text-inherit"
                      className="text-inherit"
                    />
                  </motion.button>
                ))}

                <motion.a
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  href="YOUR_RESUME_LINK"
                  className="mt-8 bg-lime-400 text-black py-4 rounded-xl font-black text-center text-sm uppercase flex items-center justify-center gap-2"
                >
                  <DecryptLabel
                    text="Download Resume"
                    animateOn="view"
                    parentClassName="text-black font-black"
                    className="text-black"
                    encryptedClassName="text-zinc-600"
                  />{" "}
                  <FaDownload />
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
