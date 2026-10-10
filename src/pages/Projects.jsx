import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FaArrowLeft, FaSearch, FaSlidersH, FaTimes } from "react-icons/fa";
import ProjectStack from "../components/ProjectStack/ProjectStack";
import SectionHeading from "../components/SectionHeading";
import SiteLoader from "../components/SiteLoader/SiteLoader";
import { publicApi } from "../lib/publicApi";
import { cleanTechName } from "../lib/techIcons";

// how many of the most-used technologies get a quick chip
const QUICK_FILTERS = 8;

const projectTechs = (project) =>
  (project.techStack || []).flatMap((raw) =>
    raw
      .split(",")
      .map((t) => cleanTechName(t.trim()))
      .filter(Boolean)
  );

const chipClass = (active) =>
  `inline-flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition ${
    active
      ? "border-lime-400 bg-lime-400 text-black"
      : "border-white/12 bg-white/[0.03] text-zinc-300 hover:border-lime-400/50 hover:text-lime-300"
  }`;

const countClass = (active) =>
  `rounded-full px-1.5 text-[10px] font-bold ${active ? "bg-black/15 text-black" : "bg-white/10 text-zinc-400"}`;

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [activeTech, setActiveTech] = useState("all");
  const [panelOpen, setPanelOpen] = useState(false);
  const [techQuery, setTechQuery] = useState("");

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

  // every technology with how many projects use it, most used first
  const techOptions = useMemo(() => {
    const counts = new Map();
    projects.forEach((project) => {
      const seen = new Set();
      projectTechs(project).forEach((label) => {
        const key = label.toLowerCase();
        if (seen.has(key)) return;
        seen.add(key);
        const entry = counts.get(key) || { label, count: 0 };
        entry.count += 1;
        counts.set(key, entry);
      });
    });
    return Array.from(counts.values()).sort((a, b) => b.count - a.count || a.label.localeCompare(b.label));
  }, [projects]);

  const quickTechs = techOptions.slice(0, QUICK_FILTERS);
  const activeIsQuick = activeTech === "all" || quickTechs.some((t) => t.label === activeTech);
  const activeEntry = techOptions.find((t) => t.label === activeTech);

  const panelTechs = useMemo(() => {
    const q = techQuery.trim().toLowerCase();
    return q ? techOptions.filter((t) => t.label.toLowerCase().includes(q)) : techOptions;
  }, [techOptions, techQuery]);

  const filteredProjects = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((project) => {
      const techs = projectTechs(project).map((t) => t.toLowerCase());
      // search also matches technologies (e.g. "react")
      const matchesQuery =
        !q ||
        project.name.toLowerCase().includes(q) ||
        project.description.toLowerCase().includes(q) ||
        techs.some((t) => t.includes(q));
      const matchesTech = activeTech === "all" || techs.includes(activeTech.toLowerCase());
      return matchesQuery && matchesTech;
    });
  }, [projects, query, activeTech]);

  const hasFilters = activeTech !== "all" || query.trim() !== "";

  const pickTech = (tech) => {
    setActiveTech(tech);
    setPanelOpen(false);
    setTechQuery("");
  };

  const clearFilters = () => {
    setActiveTech("all");
    setQuery("");
  };

  return (
    <section className="relative mx-auto max-w-[96rem] px-4 pb-24 pt-28 sm:px-6 md:px-10 md:pt-32">
      <div className="glow-blob left-1/2 top-0 h-[30rem] w-[50rem] max-w-full -translate-x-1/2" />

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
      <div className="relative z-10 mx-auto mb-12 max-w-4xl">
        {/* search + filters toggle */}
        <div className="flex gap-2.5">
          <div className="relative min-w-0 flex-1">
            <FaSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects or tech..."
              className="w-full rounded-full border border-white/15 bg-white/[0.04] py-3 pl-11 pr-10 text-sm text-white placeholder:text-zinc-500 outline-none transition focus:border-lime-400/60 focus:bg-white/[0.06]"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-zinc-500 hover:text-white"
              >
                <FaTimes />
              </button>
            )}
          </div>
          {techOptions.length > QUICK_FILTERS && (
            <button
              onClick={() => setPanelOpen((o) => !o)}
              aria-expanded={panelOpen}
              className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 text-sm font-semibold transition ${
                panelOpen || !activeIsQuick
                  ? "border-lime-400/70 bg-lime-400/10 text-lime-300"
                  : "border-white/15 bg-white/[0.04] text-zinc-300 hover:border-lime-400/50"
              }`}
            >
              <FaSlidersH className="text-lime-400" />
              <span className="hidden sm:inline">Filters</span>
              <span className="rounded-full bg-white/10 px-1.5 text-[10px] font-bold text-zinc-300">
                {techOptions.length}
              </span>
            </button>
          )}
        </div>

        {/* quick chips: one swipeable row on phones, centred on desktop */}
        {techOptions.length > 0 && (
          <div className="-mx-4 mt-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden">
            <button onClick={() => pickTech("all")} className={chipClass(activeTech === "all")}>
              All <span className={countClass(activeTech === "all")}>{projects.length}</span>
            </button>
            {/* a tech picked from the panel shows up here so it is always visible */}
            {!activeIsQuick && activeEntry && (
              <button onClick={() => pickTech("all")} className={chipClass(true)} aria-label={`Remove ${activeEntry.label} filter`}>
                {activeEntry.label} <FaTimes className="text-[10px]" />
              </button>
            )}
            {quickTechs.map((tech) => (
              <button
                key={tech.label}
                onClick={() => pickTech(activeTech === tech.label ? "all" : tech.label)}
                className={chipClass(activeTech === tech.label)}
              >
                {tech.label} <span className={countClass(activeTech === tech.label)}>{tech.count}</span>
              </button>
            ))}
          </div>
        )}

        {/* all technologies (collapsible, searchable) */}
        <AnimatePresence initial={false}>
          {panelOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-4 rounded-2xl border border-white/10 bg-zinc-950/80 p-4">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">All technologies</p>
                  <button
                    onClick={() => setPanelOpen(false)}
                    aria-label="Close filters"
                    className="p-1 text-zinc-500 hover:text-white"
                  >
                    <FaTimes />
                  </button>
                </div>
                <input
                  value={techQuery}
                  onChange={(e) => setTechQuery(e.target.value)}
                  placeholder="Find a technology..."
                  className="mb-3 w-full rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2 text-sm text-white placeholder:text-zinc-500 outline-none focus:border-lime-400/60"
                />
                <div className="flex max-h-56 flex-wrap gap-2 overflow-y-auto pr-1">
                  {panelTechs.map((tech) => (
                    <button
                      key={tech.label}
                      onClick={() => pickTech(tech.label)}
                      className={chipClass(activeTech === tech.label)}
                    >
                      {tech.label} <span className={countClass(activeTech === tech.label)}>{tech.count}</span>
                    </button>
                  ))}
                  {panelTechs.length === 0 && <p className="text-sm text-zinc-500">No technology matches.</p>}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* result summary */}
        {!loading && !error && (
          <div className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-zinc-500">
            <span>
              Showing <span className="font-semibold text-zinc-200">{filteredProjects.length}</span> of {projects.length} projects
              {activeTech !== "all" && (
                <>
                  {" "}with <span className="font-semibold text-lime-300">{activeTech}</span>
                </>
              )}
            </span>
            {hasFilters && (
              <button onClick={clearFilters} className="font-semibold text-lime-400 underline-offset-4 hover:underline">
                Clear filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* --- project list (same cinematic cards as the home page, without the sticky stacking) --- */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10"
      >
        {loading && <SiteLoader messages={["Connecting to server", "Fetching all projects", "Building case files"]} />}
        {!loading && error && <p className="text-center text-red-300">{error}</p>}
        {!loading && !error && filteredProjects.length === 0 && (
          <p className="text-center text-zinc-400">No projects match your search.</p>
        )}
        {!loading && !error && filteredProjects.length > 0 && (
          <ProjectStack projects={filteredProjects} sticky={false} />
        )}
      </motion.div>
    </section>
  );
};

export default Projects;
