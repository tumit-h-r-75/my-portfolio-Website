import { Link } from "react-router";
import { motion } from "framer-motion";
import { FaArrowRight, FaRocket, FaCode, FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const ProjectCard = ({ project }) => {
  // Normalize techStack data
  const techStack = Array.isArray(project.techStack)
    ? (project.techStack.length === 1 && project.techStack[0].includes(",")
        ? project.techStack[0].split(",").map((s) => s.trim())
        : project.techStack)
    : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className="group relative h-[500px] w-full rounded-[2.5rem] bg-[#0d121f] border border-white/5 overflow-hidden transition-all duration-500 hover:border-lime-400/30 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_30px_rgba(163,230,53,0.1)]"
    >
      {/* 1. Full Image Background with Zoom Effect */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 group-hover:blur-[1px]"
        />
        {/* Dynamic Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070b13] via-[#070b13]/70 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* 2. Top Bar: Tech Badge & Quick Actions */}
      <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-20">
        <div className="flex flex-wrap gap-2 max-w-[70%]">
          {techStack.slice(0, 3).map((tech, idx) => (
            <span
              key={idx}
              className="px-3 py-1.5 bg-black/50 backdrop-blur-xl border border-white/10 text-[10px] text-lime-400 font-bold uppercase tracking-wider rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-[-10px] group-hover:translate-y-0"
              style={{ transitionDelay: `${idx * 100}ms` }}
            >
              {tech}
            </span>
          ))}
        </div>
        
        <div className="flex flex-col gap-3">
          {/* Quick Action Buttons */}
          <div className="flex flex-col gap-2 translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 delay-100">
            {project.githubClient && (
              <a 
                href={project.githubClient} 
                target="_blank" 
                rel="noreferrer"
                className="p-3 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl text-white hover:bg-lime-400 hover:text-black transition-all duration-300"
                title="View Code"
              >
                <FaGithub size={18} />
              </a>
            )}
            {project.liveLink && (
              <a 
                href={project.liveLink} 
                target="_blank" 
                rel="noreferrer"
                className="p-3 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl text-white hover:bg-lime-400 hover:text-black transition-all duration-300"
                title="Live Demo"
              >
                <FaExternalLinkAlt size={16} />
              </a>
            )}
          </div>
          
          <div className="p-4 bg-lime-400 rounded-3xl text-black shadow-[0_0_30px_rgba(163,230,53,0.4)] group-hover:rotate-12 transition-transform duration-500">
            <FaRocket size={20} />
          </div>
        </div>
      </div>

      {/* 3. Bottom Content Section */}
      <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-lime-400 text-[10px] font-bold uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="w-8 h-[1px] bg-lime-400/50" />
            <FaCode />
            <span>Featured Project</span>
          </div>
          
          <div className="space-y-1">
            <h3 className="text-3xl md:text-4xl font-black text-white leading-tight tracking-tight group-hover:text-lime-400 transition-colors duration-300">
              {project.name}
            </h3>
            <div className="h-1 w-0 group-hover:w-20 bg-lime-400 transition-all duration-500" />
          </div>
          
          {/* Detailed Info (Reveals on Hover) */}
          <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100 translate-y-4 group-hover:translate-y-0">
            {project.description || "A high-performance solution built with precision, focusing on user experience and modern architecture."}
          </p>

          <div className="pt-4 flex items-center justify-between">
            <Link
              to={`/projects/${project.id}`}
              className="flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 px-8 py-4 rounded-[1.5rem] text-white font-bold group/btn hover:bg-lime-400 hover:text-black hover:border-lime-400 transition-all duration-500"
            >
              EXPLORE CASE STUDY
              <FaArrowRight className="-rotate-45 group-hover/btn:rotate-0 transition-transform duration-500" />
            </Link>
            
            <div className="relative">
               <span className="text-white/5 font-black text-7xl italic group-hover:text-lime-400/10 transition-colors duration-700 select-none">
                0{project.id || 1}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Decorative Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-lime-400/10 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 blur-[80px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      {/* Animated Border Line */}
      <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-transparent via-lime-400 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-1000" />
    </motion.div>
  );
};

export default ProjectCard;
