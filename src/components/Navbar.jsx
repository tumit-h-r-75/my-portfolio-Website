import { useContext, useState } from "react";
import { FaDownload, FaBars, FaTimes } from "react-icons/fa";
import { Link, NavLink, useLocation } from "react-router";
import logo from "../assets/TumitDev-logo-removebg-preview.png"
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
    setMenuOpen(false); // close on mobile
  };

  const navItems = (
    <>
      <NavLink
        to="/"
        onClick={() => handleScroll(homeRef)}
        className="hover:text-blue-400 transition"
      >
        Home
      </NavLink>
      {isHome && (
        <>
          <button onClick={() => handleScroll(aboutRef)} className="hover:text-blue-400 transition">About</button>
          <button onClick={() => handleScroll(skillRef)} className="hover:text-blue-400 transition">Skills</button>
          <button onClick={() => handleScroll(portfolioRef)} className="hover:text-blue-400 transition">Portfolio</button>
        </>
      )}
      {isHome ? (
        <button onClick={() => handleScroll(contactRef)} className="hover:text-blue-400 transition">Contact</button>
      ) : (
        <NavLink to="/contact" className="hover:text-blue-400 transition">Contact</NavLink>
      )}
    </>
  );

  return (
    <header className="fixed w-full z-50 bg-zinc-900 bg-opacity-90 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" onClick={() => handleScroll(homeRef)}>
          <img src={logo} alt="Logo" className="w-36 h-20 sm:w-40" />
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex space-x-6 text-lg font-medium">
          {navItems}
        </nav>

        {/* Download Button */}
        <a
          href="https://docs.google.com/document/d/120Q6nTObOvUmssKj0_qgXzFP980s19Oe/edit"
          target="_blank"
          className="btn btn-secondary hidden sm:flex gap-2 items-center"
        >
          Download CV <FaDownload />
        </a>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden text-xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-zinc-800 px-6 py-4 space-y-4 text-base font-medium">
          {navItems}
          <a
            href="https://drive.google.com/file/d/1RsJJs2JCPBGSGRNbm8k_ngUz2ezyLjbx/view?usp=sharing"
            target="_blank"
            className="btn btn-secondary w-full mt-2 flex justify-center gap-2"
          >
            Download CV <FaDownload />
          </a>
        </div>
      )}
    </header>
  );
};

export default Navbar;
