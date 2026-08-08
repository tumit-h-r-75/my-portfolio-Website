import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { FaArrowRight, FaThLarge } from "react-icons/fa";
import ProjectCard from "./ProjectCard";
import { NavigateContext } from "../context/NavigateProvider";
import SectionHeading from "./SectionHeading";
import Workflow from "./Workflow/Workflow";
import { publicApi } from "../lib/publicApi";

const ProjectsSection = () => {
  const { portfolioRef } = useContext(NavigateContext);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    publicApi
      .getProjects()
      .then((data) => {
        if (mounted) setProjects(data);
      })
      .catch((err) => {
        if (mounted) setError(err.message);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section
      id="portfolio"
      ref={portfolioRef}
      className="py-20 md:py-28 px-4 sm:px-6 md:px-10 max-w-[96rem] mx-auto"
    >
      <Workflow />

      <SectionHeading kicker="Portfolio" before="Featured " highlight="Projects" align="center" />
      <p className="mx-auto -mt-8 mb-14 max-w-2xl text-center text-sm md:text-base text-zinc-400">
        A selection of my recent work. Each project is crafted with passion and built with modern technologies.
      </p>

      {/* Project Cards Grid */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="grid gap-6 grid-cols-1 xl:grid-cols-2"
      >
        {loading && <p className="col-span-full text-center text-zinc-400">Loading projects...</p>}
        {!loading && error && <p className="col-span-full text-center text-red-300">{error}</p>}
        {!loading && !error && projects.length === 0 && (
          <p className="col-span-full text-center text-zinc-400">No projects found in database.</p>
        )}
        {!loading && !error && projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </motion.div>

      {/* View all */}
      <div className="mt-12 flex justify-center">
        <Link
          to="/projects"
          className="group inline-flex items-center gap-3 rounded-full border border-lime-400/40 bg-lime-400/5 px-7 py-3.5 text-sm font-black uppercase tracking-[0.15em] text-lime-300 transition hover:bg-lime-400/10"
        >
          <FaThLarge className="text-lime-400" />
          View All Projects
          <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
};

export default ProjectsSection;
