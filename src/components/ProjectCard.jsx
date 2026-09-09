import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight, FaGithub, FaExternalLinkAlt, FaCheckCircle } from "react-icons/fa";
import { getTechIcon, cleanTechName } from "../lib/techIcons";
import "./ProjectCard.css";

const ProjectCard = ({ project }) => {
  const techStack = Array.isArray(project.techStack)
    ? project.techStack.length === 1 && project.techStack[0].includes(",")
      ? project.techStack[0].split(",").map((s) => s.trim())
      : project.techStack
    : [];

  const chips = techStack.slice(0, 5);
  const extraCount = Math.max(techStack.length - chips.length, 0);
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
        {/* screenshot banner */}
        <Link to={`/projects/${project.id}`} className="pc-banner" aria-label={`Open ${project.name}`}>
          <img src={project.image} alt={project.name} loading="lazy" />
          <div className="pc-banner-fade" />
          <span className="pc-num">0{project.serial || project.id}</span>
          <div className="pc-banner-links">
            {project.githubClient && (
              <a
                href={project.githubClient}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
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
                onClick={(e) => e.stopPropagation()}
                className="pc-icon-btn"
                aria-label="Live site"
              >
                <FaExternalLinkAlt size={13} />
              </a>
            )}
          </div>
        </Link>

        {/* body */}
        <div className="pc-body">
          <div className="pc-tech-row">
            {chips.map((tech, i) => {
              const { Icon, color, label } = getTechIcon(tech);
              return (
                <span key={i} className="pc-chip" title={cleanTechName(tech)}>
                  <Icon style={{ color }} />
                  {label}
                </span>
              );
            })}
            {extraCount > 0 && <span className="pc-chip pc-chip-more">+{extraCount}</span>}
          </div>

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

          <Link to={`/projects/${project.id}`} className="pc-view">
            View Project <FaArrowRight />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
