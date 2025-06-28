import { useParams, Link } from "react-router";
import { motion } from "framer-motion";
import {
  FaLaptopCode,
  FaTools,
  FaBug,
  FaRocket,
  FaExternalLinkAlt,
  FaGithub,
  FaArrowLeft,
} from "react-icons/fa";
import projects from "../components/data/projects";

const ProjectDetails = () => {
  const { id } = useParams();
  const project = projects.find((p) => p.id === parseInt(id));

  if (!project) return <p>Project not found</p>;

  return (
    <motion.section
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      whileHover={{
        boxShadow: "0px 0px 30px rgba(132, 204, 22, 0.5)",
        transition: { duration: 0.4 },
      }}
      className="max-w-4xl mx-auto p-6 sm:p-10 bg-zinc-900 rounded-xl my-10 border border-zinc-700"
    >
      {/* Project Title */}
      <h1 className="text-4xl font-bold text-lime-400 mb-6 flex items-center gap-3">
        <FaLaptopCode className="text-lime-400" /> {project.name}
      </h1>

      {/* Image */}
      <img
        src={project.image}
        alt={project.name}
        className="w-full max-h-[400px] object-cover rounded mb-6 border border-zinc-800"
      />

      {/* Description */}
      <p className="text-gray-300 mb-6 text-[17px] leading-relaxed">{project.description}</p>

      {/* Tech Stack */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-lime-400 mb-2 flex items-center gap-2">
          <FaTools /> Tech Stack:
        </h2>
        <div className="flex flex-wrap gap-3">
          {(project.techStack || []).map((tech, idx) => (
            <span
              key={idx}
              className="bg-zinc-800 text-lime-300 border border-lime-400 px-3 py-1 text-sm rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Challenges */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-lime-400 mb-2 flex items-center gap-2">
          <FaBug /> Challenges:
        </h2>
        <p className="text-gray-300 leading-relaxed">{project.challenges}</p>
      </div>

      {/* Future Plans */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-lime-400 mb-2 flex items-center gap-2">
          <FaRocket /> Future Plans:
        </h2>
        <p className="text-gray-300 leading-relaxed">{project.futurePlans}</p>
      </div>

      {/* Links */}
      <div className="flex gap-4 flex-wrap mb-4">
        <a
          href={project.liveLink}
          target="_blank"
          rel="noreferrer"
          className="btn btn-success text-white flex items-center gap-2 shadow hover:shadow-lime-300 transition"
        >
          <FaExternalLinkAlt /> Live Site
        </a>
        <a
          href={project.githubClient}
          target="_blank"
          rel="noreferrer"
          className="btn btn-warning text-black flex items-center gap-2 shadow hover:shadow-yellow-300 transition"
        >
          <FaGithub /> GitHub
        </a>
      </div>

    </motion.section>
  );
};

export default ProjectDetails;
