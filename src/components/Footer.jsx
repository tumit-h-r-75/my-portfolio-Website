import { NavLink } from "react-router";
import logo from "../assets/Purple and White Modern Computer Service and Repair Logo -Photoroom.png";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt, FaHome, FaUserAlt, FaCode, FaEnvelope, FaGithub, FaLinkedin, FaFacebook } from "react-icons/fa";
import { useContext } from "react";
import { motion } from "framer-motion";
import { NavigateContext } from "../context/NavigateProvider";

const Footer = () => {
  const { scrollToSection, homeRef, aboutRef, skillRef, contactRef } = useContext(NavigateContext);

  const socialLinks = [
    { icon: <FaGithub />, link: "https://github.com/tumit-h-r-75" },
    { icon: <FaLinkedin />, link: "https://www.linkedin.com/in/tumit-hasan-rafi/" },
    { icon: <FaFacebook />, link: "https://www.facebook.com/tumit.hasan.rafi.2025" },
  ];

  return (
    <footer className="relative bg-[#050505] pt-20 pb-10 overflow-hidden border-t border-white/5">
      {/* Background Subtle Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[100px] bg-lime-400/10 blur-[80px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          
          {/* 1. Branding Section (Col-5) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="md:col-span-5 space-y-6"
          >
            <img className="w-48 lg:w-56" src={logo} alt="Tumit Dev Logo" />
            <p className="text-zinc-400 text-base max-w-sm leading-relaxed">
              Building high-performance MERN Stack applications with a focus on clean code and exceptional user experience. Let's create something extraordinary together.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-lime-400 hover:border-lime-400 transition-all duration-300 shadow-lg hover:shadow-lime-400/20"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>

          {/* 2. Quick Access (Col-3) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="md:col-span-3"
          >
            <h3 className="text-white font-bold text-lg mb-6 uppercase tracking-widest italic border-l-4 border-lime-400 pl-3">
              Navigation
            </h3>
            <ul className="space-y-4">
              {[
                { label: "Home", icon: <FaHome />, action: () => scrollToSection(homeRef) },
                { label: "About Me", icon: <FaUserAlt />, action: () => scrollToSection(aboutRef) },
                { label: "My Skills", icon: <FaCode />, action: () => scrollToSection(skillRef) },
                { label: "Contact", icon: <FaEnvelope />, action: () => scrollToSection(contactRef) },
              ].map((item, idx) => (
                <li key={idx}>
                  <button
                    onClick={item.action}
                    className="group flex items-center gap-3 text-zinc-400 hover:text-lime-400 transition-all duration-300"
                  >
                    <span className="text-sm group-hover:scale-125 transition-transform">{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* 3. Contact Info (Col-4) - All Clickable */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-4"
          >
            <h3 className="text-white font-bold text-lg mb-6 uppercase tracking-widest italic border-l-4 border-lime-400 pl-3">
              Connect Directly
            </h3>
            <div className="space-y-5">
              {/* Location Link (Google Maps) */}
              <a 
                href="https://www.google.com/maps/search/Jashore,+Khulna,+Bangladesh" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex items-start gap-4 group cursor-pointer"
              >
                <div className="w-10 h-10 shrink-0 flex items-center justify-center rounded-xl bg-lime-400/10 border border-lime-400/20 text-lime-400 group-hover:bg-lime-400 group-hover:text-black transition-all shadow-[0_0_15px_rgba(163,230,53,0.1)]">
                  <FaLocationDot />
                </div>
                <div>
                  <p className="text-xs text-zinc-500 uppercase font-bold tracking-tighter">Location</p>
                  <p className="text-zinc-300 group-hover:text-white transition-colors">Jashore, Khulna, Bangladesh</p>
                </div>
              </a>

              {/* Email Link */}
              <a href="mailto:tumithasan1@gmail.com" className="flex items-start gap-4 group cursor-pointer">
                <div className="w-10 h-10 shrink-0 flex items-center justify-center rounded-xl bg-lime-400/10 border border-lime-400/20 text-lime-400 group-hover:bg-lime-400 group-hover:text-black transition-all shadow-[0_0_15px_rgba(163,230,53,0.1)]">
                  <MdEmail />
                </div>
                <div>
                  <p className="text-xs text-zinc-500 uppercase font-bold tracking-tighter">Email Me</p>
                  <p className="text-zinc-300 group-hover:text-lime-400 transition-colors">tumithasan1@gmail.com</p>
                </div>
              </a>

              {/* Phone Link */}
              <a href="tel:+8801611960330" className="flex items-start gap-4 group cursor-pointer">
                <div className="w-10 h-10 shrink-0 flex items-center justify-center rounded-xl bg-lime-400/10 border border-lime-400/20 text-lime-400 group-hover:bg-lime-400 group-hover:text-black transition-all shadow-[0_0_15px_rgba(163,230,53,0.1)]">
                  <FaPhoneAlt />
                </div>
                <div>
                  <p className="text-xs text-zinc-500 uppercase font-bold tracking-tighter">Call Now</p>
                  <p className="text-zinc-300 group-hover:text-lime-400 transition-colors">+880 1611-960330</p>
                </div>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-zinc-500 text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} <span className="text-white font-bold">Tumit Hasan</span>. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-lime-400 rounded-full animate-pulse" />
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Available for hire</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;