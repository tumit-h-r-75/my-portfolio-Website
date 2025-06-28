import { Link } from "react-router";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

const ProjectCard = ({ project }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.4 }}
      className="bg-zinc-800 rounded-xl overflow-hidden border border-zinc-700 shadow-md group relative max-w-full"
    >
      {/* Image Section with Hover Button */}
      <div className="relative w-full h-40 sm:h-48 md:h-56 overflow-hidden rounded-t-xl">
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Overlay Blur Effect */}
        <div className="absolute inset-0 bg-opacity-20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-xl" />

        {/* View Detail Button */}
        <motion.div
          initial={{ opacity: 0, y: 30, rotate: -10 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 px-2"
        >
          <Link
            to={`/projects/${project.id}`}
            className="bg-lime-400 text-zinc-900 px-4 py-2 rounded-full font-semibold flex items-center gap-2 hover:shadow-[0_0_15px_#a3e635] transition text-xs sm:text-sm md:text-base"
          >
            View Details <FaArrowRight />
          </Link>
        </motion.div>
      </div>

      {/* Tech Stack */}
      <div className="px-4 sm:px-5 py-3 sm:py-4">
        <div className="flex flex-wrap gap-2 mb-3 sm:mb-4 justify-center">
          {project.techStack?.map((tech, idx) => (
            <span
              key={idx}
              className="text-xs sm:text-sm md:text-base bg-zinc-700 text-lime-300 px-2 py-1 rounded-full hover:shadow-[0_0_10px_#84cc16] transition-all duration-300 truncate"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Project Title */}
        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white text-center truncate">
          {project.name}
        </h3>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
