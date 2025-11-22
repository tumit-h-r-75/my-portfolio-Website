import { useContext, useState } from "react";
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
import { Link, NavLink, useLocation } from "react-router";
import logo from "../assets/bigLogo.png";
import { NavigateContext } from "../context/NavigateProvider";

const Navbar = () => {
  const {
    scrollToSection,
    homeRef,
    aboutRef,
    skillRef,
    contactRef,
    portfolioRef,
  } = useContext(NavigateContext);

  const location = useLocation();
  const isHome = location.pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);

  const handleScroll = (ref) => {
    scrollToSection(ref);
    setMenuOpen(false);
  };

  const navItems = (
    <>
      <NavLink
        to="/"
        onClick={() => handleScroll(homeRef)}
        className="hover:text-lime-400 transition flex items-center gap-2"
      >
        <FaHome /> Home
      </NavLink>
      {isHome && (
        <>
          <button
            onClick={() => handleScroll(aboutRef)}
            className="hover:text-lime-400 transition flex items-center gap-2"
          >
            <FaUserAlt /> About
          </button>
          <button
            onClick={() => handleScroll(skillRef)}
            className="hover:text-lime-400 transition flex items-center gap-2"
          >
            <FaLaptopCode /> Skills
          </button>
          <button
            onClick={() => handleScroll(portfolioRef)}
            className="hover:text-lime-400 transition flex items-center gap-2"
          >
            <FaProjectDiagram /> Portfolio
          </button>
        </>
      )}
      {isHome ? (
        <button
          onClick={() => handleScroll(contactRef)}
          className="hover:text-lime-400 transition flex items-center gap-2"
        >
          <FaEnvelopeOpen /> Contact
        </button>
      ) : (
        <NavLink
          to="/contact"
          className="hover:text-lime-400 transition flex items-center gap-2"
        >
          <FaEnvelopeOpen /> Contact
        </NavLink>
      )}
    </>
  );

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-zinc-900 bg-opacity-30 text-white shadow-lg backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" onClick={() => handleScroll(homeRef)}>
          <img src={logo} alt="Logo" className="w-40 sm:w-36 h-20" />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex space-x-6 text-lg font-medium items-center">
          {navItems}
        </nav>

        {/* Download CV Button */}
        <a
          href="https://drive.google.com/file/d/1P61zXG4Ryuh2Z445UwzTpP0Uljt0SvjY/view?usp=sharing"
          target="_blank"
          rel="noreferrer"
          className="btn btn-warning hidden lg:flex text-black gap-2 items-center"
        >
          Download CV <FaDownload />
        </a>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-2xl text-white z-50"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`lg:hidden fixed top-16 left-0 w-full bg-zinc-900 transition-all duration-300 ease-in-out z-40 ${
          menuOpen ? "h-auto opacity-100 py-4" : "h-0 opacity-0 overflow-hidden"
        }`}
      >
        <nav className="flex flex-col gap-4 items-start px-6 text-base font-medium">
          {navItems}
        </nav>
        <a
          href="https://drive.google.com/file/d/1P61zXG4Ryuh2Z445UwzTpP0Uljt0SvjY/view?usp=sharing"
          target="_blank"
          rel="noreferrer"
          className="btn btn-warning w-[90%] mx-auto mt-4 text-black flex justify-center gap-2"
        >
          Download CV <FaDownload />
        </a>
      </div>
    </header>
  );
};

export default Navbar;