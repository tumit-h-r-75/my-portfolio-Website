import { Link } from "react-router";
import { motion } from "framer-motion";
import { FaArrowRight, FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import MagicBentoPanel from "./MagicBento/MagicBento";
import DecryptLabel from "./DecryptLabel";
import BorderGlow, { glowTheme } from "./BorderGlow/BorderGlow";

const ProjectCard = ({ project }) => {
  const techStack = Array.isArray(project.techStack)
    ? (project.techStack.length === 1 && project.techStack[0].includes(",")
        ? project.techStack[0].split(",").map((s) => s.trim())
        : project.techStack)
    : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ y: -8 }}
      className="group relative h-[420px] md:h-[480px] overflow-hidden transition-shadow duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_30px_rgba(163,230,53,0.1)]"
    >
      <BorderGlow {...glowTheme} backgroundColor="#0d121f" borderRadius={40} className="h-full w-full overflow-hidden">
        <MagicBentoPanel className="relative flex flex-col h-full overflow-hidden p-6 md:p-8">

          {/* Background Image Layer */}
          <div className="absolute inset-0 overflow-hidden -z-10">
            <img
              src={project.image}
              alt={project.name}
              className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-[1.03] group-hover:blur-[2px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0d121f] via-[#0d121f]/60 to-transparent opacity-95 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute inset-0 bg-gradient-to-br from-lime-400/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>

          {/* 1. Tech Stack - Always Visible */}
          <div className="flex flex-wrap gap-2 mb-auto">
            {techStack.slice(0, 2).map((tech, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 bg-lime-400/15 backdrop-blur-sm border border-lime-400/30 text-[9px] text-lime-400 font-bold uppercase tracking-wider rounded-lg hover:bg-lime-400/25 transition-colors duration-300"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* 2. Main Content */}
          <div className="relative z-10 space-y-3 md:space-y-4">
            {/* Title */}
            <div className="space-y-2">
              <h3 className="text-2xl md:text-3xl font-black text-white leading-tight group-hover:text-lime-400 transition-colors duration-300">
                <DecryptLabel
                  text={project.name}
                  parentClassName="text-white font-black"
                  className="text-white group-hover:text-lime-400"
                />
              </h3>
              <div className="h-1 w-12 bg-gradient-to-r from-lime-400 to-transparent rounded-full group-hover:w-20 transition-all duration-500" />
            </div>

            {/* Description - Visible with better visibility */}
            <p className="text-zinc-300 text-sm md:text-base leading-relaxed line-clamp-3 group-hover:text-zinc-200 transition-colors duration-300">
              {project.description || "A high-performance solution built with precision and modern architecture."}
            </p>

            {/* Action Buttons & Links */}
            <div className="flex items-center justify-between gap-3 pt-4 border-t border-white/5">
              <Link
                to={`/projects/${project.id}`}
                className="flex items-center gap-2 text-white font-bold text-sm group/btn hover:text-lime-400 transition-colors duration-300"
              >
                <span>VIEW PROJECT</span>
                <FaArrowRight className="text-xs -rotate-45 group-hover/btn:rotate-0 transition-transform duration-300" />
              </Link>

              {/* Quick Action Buttons */}
              <div className="flex gap-2">
                {project.githubClient && (
                  <a
                    href={project.githubClient}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 md:p-2.5 text-white/60 hover:text-lime-400 hover:bg-lime-400/10 rounded-lg transition-all duration-300 border border-white/10 hover:border-lime-400/30 backdrop-blur-sm"
                    title="View Code"
                  >
                    <FaGithub size={16} />
                  </a>
                )}
                {project.liveLink && (
                  <a
                    href={project.liveLink}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 md:p-2.5 text-white/60 hover:text-lime-400 hover:bg-lime-400/10 rounded-lg transition-all duration-300 border border-white/10 hover:border-lime-400/30 backdrop-blur-sm"
                    title="Live Demo"
                  >
                    <FaExternalLinkAlt size={15} />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* 3. Index Number - Bottom Right */}
          <div className="absolute bottom-4 right-6 md:bottom-6 md:right-8 text-white/8 font-black text-6xl md:text-7xl italic group-hover:text-lime-400/15 transition-colors duration-700 select-none pointer-events-none">
            0{project.id || 1}
          </div>

          {/* 4. Decorative Glow on Hover */}
          <div className="absolute top-1/4 right-0 w-40 h-40 bg-lime-400/10 blur-[100px] rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-700 pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-500/5 blur-[80px] rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none" />
        </MagicBentoPanel>
      </BorderGlow>
    </motion.div>
  );
};

export default ProjectCard;
