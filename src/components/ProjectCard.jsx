import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaArrowRight,
  FaGithub,
  FaExternalLinkAlt,
  FaCheckCircle,
  FaReact,
  FaNodeJs,
  FaFireAlt,
  FaJs,
} from "react-icons/fa";
import { SiMongodb, SiExpress, SiTailwindcss, SiNextdotjs } from "react-icons/si";
import "./ProjectCard.css";

/* map a tech name to a branded icon */
const techIcon = (name) => {
  const n = name.toLowerCase().trim();
  if (n.includes("react")) return <FaReact className="text-cyan-400" />;
  if (n.includes("next")) return <SiNextdotjs className="text-white" />;
  if (n.includes("node")) return <FaNodeJs className="text-green-500" />;
  if (n.includes("mongo")) return <SiMongodb className="text-emerald-400" />;
  if (n.includes("express")) return <SiExpress className="text-zinc-200" />;
  if (n.includes("firebase")) return <FaFireAlt className="text-amber-400" />;
  if (n.includes("tailwind")) return <SiTailwindcss className="text-teal-300" />;
  if (n.includes("javascript")) return <FaJs className="text-yellow-400" />;
  return null;
};

const cleanTechName = (name) => {
  const n = name.toLowerCase();
  if (n.includes("firebase")) return "Firebase";
  if (n.includes("tailwind")) return "Tailwind CSS";
  if (n.includes("next")) return "Next.js";
  if (n.includes("node")) return "Node.js";
  if (n.includes("mongo")) return "MongoDB";
  if (n.includes("express")) return "Express.js";
  if (n.includes("react")) return "React";
  return name.trim();
};

const ProjectCard = ({ project }) => {
  const techStack = Array.isArray(project.techStack)
    ? project.techStack.length === 1 && project.techStack[0].includes(",")
      ? project.techStack[0].split(",").map((s) => s.trim())
      : project.techStack
    : [];

  const chips = techStack.slice(0, 3);
  const features = (project.features || []).slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="h-full"
    >
      <div className="pc-card">
        {/* head */}
        <div className="pc-head">
          <span className="pc-num">0{project.serial || project.id}</span>
          {chips.map((tech, i) => (
            <span key={i} className="pc-chip">
              {techIcon(tech)}
              {cleanTechName(tech)}
            </span>
          ))}
        </div>

        {/* body */}
        <div className="pc-body">
          {/* content */}
          <div className="pc-content">
            <h3 className="pc-title">
              {project.name}
              <span className="dot">.</span>
            </h3>
            <p className="pc-desc">{project.description}</p>

            {features.length > 0 && (
              <ul className="pc-features">
                {features.map((f, i) => (
                  <li key={i} className="pc-feature">
                    <FaCheckCircle className="pc-feature-icon" />
                    {f}
                  </li>
                ))}
              </ul>
            )}

            <div className="pc-actions">
              <Link to={`/projects/${project.id}`} className="pc-view">
                View Project <FaArrowRight />
              </Link>
              {project.githubClient && (
                <a
                  href={project.githubClient}
                  target="_blank"
                  rel="noreferrer"
                  className="pc-icon-btn"
                  aria-label="GitHub repository"
                >
                  <FaGithub />
                </a>
              )}
              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noreferrer"
                  className="pc-icon-btn"
                  aria-label="Live site"
                >
                  <FaExternalLinkAlt size={14} />
                </a>
              )}
            </div>
          </div>

          {/* screenshot */}
          <div className="pc-image">
            <img src={project.image} alt={project.name} loading="lazy" />
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noreferrer"
                className="pc-arrow"
                aria-label="Open live site"
              >
                <FaArrowRight className="-rotate-45" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
