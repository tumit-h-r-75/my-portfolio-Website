import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight, FaThLarge } from "react-icons/fa";
import ProjectStack from "./ProjectStack/ProjectStack";
import { NavigateContext } from "../context/NavigateContext";
import { publicApi } from "../lib/publicApi";

const HOME_PREVIEW_COUNT = 5;

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

  const previewProjects = projects.slice(0, HOME_PREVIEW_COUNT);
  const remaining = Math.max(projects.length - HOME_PREVIEW_COUNT, 0);

  return (
    <section
      id="portfolio"
      ref={portfolioRef}
      className="psc-section py-20 md:py-28 px-4 sm:px-6 md:px-10 max-w-[96rem] mx-auto"
    >
      {/* cinematic heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="psc-head"
      >
        <div>
          <p className="psc-kicker">Featured Work</p>
          <h2 className="psc-heading">
            <span className="light">Selected Works.</span>
            <span className="accent">Built to Perform.</span>
          </h2>
        </div>
        <p className="psc-head-copy">
          Scroll through the case files — each project is shipped with clean architecture, fast
          performance and real features people actually use.
        </p>
      </motion.div>

      {loading && <p className="text-center text-zinc-400">Loading projects...</p>}
      {!loading && error && <p className="text-center text-red-300">{error}</p>}
      {!loading && !error && previewProjects.length === 0 && (
        <p className="text-center text-zinc-400">No projects found in database.</p>
      )}
      {!loading && !error && previewProjects.length > 0 && <ProjectStack projects={previewProjects} />}

      {/* View all */}
      <div className="mt-14 flex flex-col items-center gap-3">
        <Link
          to="/projects"
          className="group inline-flex items-center gap-3 rounded-full border border-lime-400/40 bg-lime-400/5 px-7 py-3.5 text-sm font-black uppercase tracking-[0.15em] text-lime-300 transition hover:bg-lime-400/10"
        >
          <FaThLarge className="text-lime-400" />
          View All Projects
          <FaArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
        {!loading && !error && remaining > 0 && (
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-zinc-500">
            +{remaining} more project{remaining > 1 ? "s" : ""} in the full portfolio
          </p>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
