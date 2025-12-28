import { Link } from "react-router";
import { motion } from "framer-motion";
import { FaArrowRight, FaRocket, FaCode } from "react-icons/fa";

const ProjectCard = ({ project }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative h-[450px] w-full rounded-[2.5rem] bg-[#0d121f] border border-white/5 overflow-hidden transition-all duration-700 hover:border-lime-400/50 hover:shadow-[0_0_50px_rgba(163,230,53,0.15)]"
    >
      {/* 1. Full Image Background with Zoom Effect */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:blur-[2px]"
        />
        {/* Dynamic Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070b13] via-[#070b13]/60 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* 2. Top Bar: Tech Badge (Floating) */}
      <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-20">
        <div className="flex gap-2">
          {project.techStack?.slice(0, 3).map((tech, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-black/40 backdrop-blur-xl border border-white/10 text-[10px] text-lime-400 font-bold uppercase tracking-wider rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-[-10px] group-hover:translate-y-0"
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="p-3 bg-lime-400 rounded-2xl text-black scale-0 group-hover:scale-100 transition-transform duration-500 shadow-[0_0_20px_rgba(163,230,53,0.5)]">
          <FaRocket size={16} />
        </div>
      </div>

      {/* 3. Bottom Content Section */}
      <div className="absolute bottom-0 left-0 right-0 p-8 z-20 translate-y-6 group-hover:translate-y-0 transition-transform duration-500">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-lime-400 text-xs font-bold uppercase tracking-[0.2em]">
            <FaCode />
            <span>Project Showcase</span>
          </div>
          
          <h3 className="text-3xl md:text-4xl font-black text-white leading-tight">
            {project.name}
          </h3>
          
          {/* Detailed Info (Reveals on Hover) */}
          <p className="text-gray-400 text-sm md:text-base line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-700 delay-100">
            A high-performance solution built with precision, focusing on user experience and modern architecture.
          </p>

          <div className="pt-6 flex items-center justify-between">
            <Link
              to={`/projects/${project.id}`}
              className="flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 px-6 py-3 rounded-2xl text-white font-bold group/btn hover:bg-lime-400 hover:text-black transition-all duration-300"
            >
              EXPLORE DETAILS
              <FaArrowRight className="-rotate-45 group-hover/btn:rotate-0 transition-transform" />
            </Link>
            
            <span className="text-white/20 font-black text-5xl italic group-hover:text-lime-400/20 transition-colors">
              0{project.id || 1}
            </span>
          </div>
        </div>
      </div>

      {/* 4. Side Decorative Border Glow */}
      <div className="absolute inset-y-0 left-0 w-[2px] bg-lime-400 scale-y-0 group-hover:scale-y-100 transition-transform duration-700 origin-top" />
    </motion.div>
  );
};

export default ProjectCard;