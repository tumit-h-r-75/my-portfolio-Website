import { useContext } from "react";
import ProjectCard from "./ProjectCard";
import projects from "./data/projects";
import { NavigateContext } from "../context/NavigateProvider";
import { motion } from "framer-motion";
import SectionHeading from "./SectionHeading";
import Workflow from "./Workflow/Workflow";

const ProjectsSection = () => {
  const { portfolioRef } = useContext(NavigateContext);

  return (
    <section
      ref={portfolioRef}
      className="py-20 md:py-28 px-4 sm:px-6 md:px-10 max-w-7xl mx-auto"
    >
      <Workflow />

      <SectionHeading kicker="Portfolio" before="Featured " highlight="Projects" align="center" />

      {/* Project Cards Grid */}
      <motion.div
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        viewport={{ once: true }}
        className="grid gap-6 grid-cols-1 sm:grid-cols-1 md:grid-cols-2"
      >
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </motion.div>
    </section>
  );
};

export default ProjectsSection;
