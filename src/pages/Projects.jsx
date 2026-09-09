import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowLeft, FaSearch, FaTimes } from "react-icons/fa";
import ProjectCard from "../components/ProjectCard";
import SectionHeading from "../components/SectionHeading";
import { publicApi } from "../lib/publicApi";
import { cleanTechName } from "../lib/techIcons";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [activeTech, setActiveTech] = useState("all");

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

  const techOptions = useMemo(() => {
    const seen = new Map();
    projects.forEach((project) => {
      (project.techStack || []).forEach((raw) => {
        raw
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
          .forEach((tech) => {
            const label = cleanTechName(tech);
            if (!seen.has(label.toLowerCase())) seen.set(label.toLowerCase(), label);
          });
      });
    });
    return Array.from(seen.values()).sort((a, b) => a.localeCompare(b));
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesQuery =
        !query.trim() ||
        project.name.toLowerCase().includes(query.trim().toLowerCase()) ||
        project.description.toLowerCase().includes(query.trim().toLowerCase());

      const matchesTech =
        activeTech === "all" ||
        (project.techStack || []).some((raw) =>
          raw
            .split(",")
            .map((t) => cleanTechName(t.trim()).toLowerCase())
            .includes(activeTech.toLowerCase())
        );

      return matchesQuery && matchesTech;
    });
  }, [projects, query, activeTech]);

  return (
    <section className="relative mx-auto max-w-[96rem] px-4 pb-24 pt-28 sm:px-6 md:px-10 md:pt-32">
      <div className="pointer-events-none absolute left-1/2 top-24 h-52 w-[32rem] -translate-x-1/2 rounded-full bg-lime-400/10 blur-[140px]" />

      <Link
        to="/"
        className="relative mb-8 inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-zinc-200 transition hover:border-lime-400/60 hover:text-lime-300"
      >
        <FaArrowLeft className="text-lime-400" /> Back to Home
      </Link>

      <SectionHeading kicker="Full Portfolio" before="All " highlight="Projects" align="center" />
      <p className="mx-auto -mt-8 mb-10 max-w-2xl text-center text-sm md:text-base text-zinc-400">
        Every project I have shipped, in one place. Search by name or filter by technology to find what you&apos;re looking for.
      </p>

      {/* --- filters --- */}
      <div className="relative z-10 mb-12 flex flex-col items-center gap-4">
        <div className="relative w-full max-w-md">
          <FaSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search projects..."
            className="w-full rounded-full border border-white/15 bg-white/[0.04] py-3 pl-11 pr-10 text-sm text-white placeholder:text-zinc-500 outline-none transition focus:border-lime-400/60 focus:bg-white/[0.06]"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
            >
              <FaTimes />
            </button>
          )}
        </div>

        {techOptions.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => setActiveTech("all")}
              className={`rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-widest transition ${
                activeTech === "all"
                  ? "border-lime-400 bg-lime-400 text-black"
                  : "border-white/15 bg-white/[0.03] text-zinc-400 hover:border-lime-400/40 hover:text-lime-300"
              }`}
            >
              All
            </button>
            {techOptions.map((tech) => (
              <button
                key={tech}
                onClick={() => setActiveTech(tech)}
                className={`rounded-full border px-4 py-1.5 text-xs font-bold uppercase tracking-widest transition ${
                  activeTech === tech
                    ? "border-lime-400 bg-lime-400 text-black"
                    : "border-white/15 bg-white/[0.03] text-zinc-400 hover:border-lime-400/40 hover:text-lime-300"
                }`}
              >
                {tech}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* --- grid --- */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 grid items-start gap-6 grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
      >
        {loading && <p className="col-span-full text-center text-zinc-400">Loading projects...</p>}
        {!loading && error && <p className="col-span-full text-center text-red-300">{error}</p>}
        {!loading && !error && filteredProjects.length === 0 && (
          <p className="col-span-full text-center text-zinc-400">No projects match your search.</p>
        )}
        {!loading &&
          !error &&
          filteredProjects.map((project) => <ProjectCard key={project.id} project={project} />)}
      </motion.div>
    </section>
  );
};

export default Projects;
