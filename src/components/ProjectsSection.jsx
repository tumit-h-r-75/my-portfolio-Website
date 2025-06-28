import { useContext } from "react";
import ProjectCard from "./ProjectCard";
import projects from "./data/projects";
import { NavigateContext } from "../context/NavigateProvider";
import { motion } from "framer-motion";

const ProjectsSection = () => {
  const { portfolioRef } = useContext(NavigateContext);

  return (
    <section
      ref={portfolioRef}
      className="py-16 px-5 max-w-7xl mx-auto"
    >
      {/* Section Header with animation */}
      <motion.h2
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-4xl font-bold text-lime-400 text-center mb-12 uppercase tracking-wide"
      >
        Projects
      </motion.h2>

      {/* Project Cards Grid */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        viewport={{ once: true }}
        className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      >
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </motion.div>
    </section>
  );
};

export default ProjectsSection;
