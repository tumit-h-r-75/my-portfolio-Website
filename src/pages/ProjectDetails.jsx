import { useEffect, useMemo, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaTools,
  FaBug,
  FaRocket,
  FaExternalLinkAlt,
  FaGithub,
  FaArrowLeft,
  FaArrowRight,
  FaLayerGroup,
  FaCheckCircle,
} from "react-icons/fa";
import DecryptLabel from "../components/DecryptLabel";
import { publicApi } from "../lib/publicApi";
import { getTechIcon, cleanTechName } from "../lib/techIcons";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const project = useMemo(
    () => projects.find((p) => String(p.id) === String(id)),
    [projects, id]
  );

  const goToPortfolio = () => {
    navigate("/");
    setTimeout(() => {
      document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" });
    }, 400);
  };

  // Scroll to top whenever a different project is opened
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [id]);

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

  const currentIndex = projects.findIndex((p) => String(p.id) === String(id));
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject =
    currentIndex >= 0 && currentIndex < projects.length - 1
      ? projects[currentIndex + 1]
      : null;

  if (loading) {
    return (
      <section className="px-6 py-24 text-center">
        <p className="text-zinc-400">Loading project...</p>
      </section>
    );
  }

  if (error || !project) {
    return (
      <section className="px-6 py-24 text-center">
        <h2 className="mb-4 text-3xl font-black text-white">
          <DecryptLabel text="Project not found" parentClassName="text-white font-black" className="text-white" />
        </h2>
        <p className="mb-8 text-zinc-400">{error || "The project you are looking for does not exist."}</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-xl border border-lime-400/40 bg-lime-400/10 px-5 py-3 font-semibold text-lime-300 transition hover:bg-lime-400 hover:text-black"
        >
          <FaArrowLeft /> Back to Home
        </Link>
      </section>
    );
  }

  const techItems = Array.isArray(project.techStack)
    ? project.techStack.flatMap((item) =>
        typeof item === "string" ? item.split(",").map((part) => part.trim()).filter(Boolean) : []
      )
    : [];

  return (
    <section className="relative mx-auto my-8 max-w-[80rem] px-4 pb-6 pt-24 sm:px-6 md:pt-28">
      <div className="glow-blob left-1/2 top-0 h-[30rem] w-[44rem] max-w-full -translate-x-1/2 [--glow-blob-color:rgba(163,230,53,0.15)]" />
      <div className="glow-blob -left-40 top-32 h-96 w-96 [--glow-blob-color:rgba(34,211,238,0.1)]" />
      <div className="glow-blob -right-40 bottom-0 h-[26rem] w-[26rem] [--glow-blob-color:rgba(52,211,153,0.1)]" />

      {/* --- top bar --- */}
      <div className="relative mb-6 flex flex-wrap items-center justify-between gap-4">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-zinc-200 transition hover:border-lime-400/60 hover:text-lime-300"
        >
          <FaArrowLeft className="text-lime-400" /> All Projects
        </Link>
        <span className="rounded-full border border-lime-400/30 bg-lime-400/10 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-lime-300">
          Project 0{project.serial || project.id}
        </span>
      </div>

      {/* --- hero banner --- */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative mb-6 overflow-hidden rounded-[2rem] border border-white/15 bg-zinc-900/30 shadow-[0_0_60px_rgba(0,0,0,0.35)]"
      >
        <img
          src={project.image}
          alt={project.name}
          className="h-[240px] w-full object-cover object-top md:h-[420px]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
          <h1 className="text-3xl font-black leading-tight text-white md:text-5xl">
            <DecryptLabel text={project.name} parentClassName="text-white font-black" className="text-white" />
            <span className="text-lime-400">.</span>
          </h1>
        </div>
      </motion.div>

      {/* --- main grid: content + sticky sidebar --- */}
      <div className="grid gap-6 lg:grid-cols-12 lg:items-start">
        <div className="space-y-6 lg:col-span-8">
          <div className="rounded-2xl border border-white/15 bg-white/[0.04] p-5 backdrop-blur-xl md:p-6">
            <h2 className="mb-3 text-lg font-bold text-lime-300">
              <DecryptLabel text="Overview" parentClassName="text-lime-300 font-bold" className="text-lime-300" />
            </h2>
            <p className="text-[16px] leading-relaxed text-zinc-300">{project.description}</p>
          </div>

          {project.features?.length > 0 && (
            <div className="rounded-2xl border border-white/15 bg-white/[0.04] p-5 backdrop-blur-xl md:p-6">
              <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-lime-300">
                <FaLayerGroup /> <DecryptLabel text="Key Features" parentClassName="text-lime-300 font-bold" className="text-lime-300" />
              </h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {project.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                    <FaCheckCircle className="mt-0.5 shrink-0 text-lime-400" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-white/15 bg-white/[0.04] p-5 backdrop-blur-xl">
              <h2 className="mb-3 flex items-center gap-2 text-lg font-bold text-lime-300">
                <FaBug /> <DecryptLabel text="Challenges Faced" parentClassName="text-lime-300 font-bold" className="text-lime-300" />
              </h2>
              <p className="leading-relaxed text-zinc-300">{project.challenges || "—"}</p>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/[0.04] p-5 backdrop-blur-xl">
              <h2 className="mb-3 flex items-center gap-2 text-lg font-bold text-lime-300">
                <FaRocket /> <DecryptLabel text="Future Plans" parentClassName="text-lime-300 font-bold" className="text-lime-300" />
              </h2>
              <p className="leading-relaxed text-zinc-300">{project.futurePlans || "—"}</p>
            </div>
          </div>
        </div>

        {/* --- sidebar --- */}
        <div className="space-y-5 lg:sticky lg:top-28 lg:col-span-4">
          <div className="rounded-2xl border border-white/15 bg-white/[0.04] p-5 backdrop-blur-xl">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-lime-300">
              <FaTools /> <DecryptLabel text="Tech Stack" parentClassName="text-lime-300 font-bold" className="text-lime-300" />
            </h2>
            <div className="flex flex-wrap gap-2.5">
              {techItems.map((tech, idx) => {
                const { Icon, color, label } = getTechIcon(tech);
                return (
                  <span
                    key={`${tech}-${idx}`}
                    title={cleanTechName(tech)}
                    className="inline-flex items-center gap-2 rounded-full border border-lime-400/40 bg-zinc-900/80 px-3 py-1.5 text-xs font-semibold text-lime-200"
                  >
                    <Icon style={{ color }} />
                    {label}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-3 rounded-2xl border border-white/15 bg-white/[0.04] p-5 backdrop-blur-xl">
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-lime-400 px-5 py-3 text-sm font-black uppercase tracking-wide text-black transition hover:shadow-[0_0_28px_rgba(163,230,53,0.5)]"
              >
                <FaExternalLinkAlt /> Live Site
              </a>
            )}
            {project.githubClient && (
              <a
                href={project.githubClient}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-zinc-900 px-5 py-3 text-sm font-black uppercase tracking-wide text-white transition hover:border-lime-400/50 hover:text-lime-300"
              >
                <FaGithub /> GitHub Repo
              </a>
            )}
            <button
              onClick={goToPortfolio}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/12 bg-white/[0.03] px-5 py-3 text-xs font-black uppercase tracking-[0.18em] text-zinc-300 transition hover:border-lime-400/50 hover:text-lime-300"
            >
              <FaLayerGroup className="text-lime-400" /> Back to Portfolio
            </button>
          </div>
        </div>
      </div>

      {/* --- Prev / Next project navigation --- */}
      <div className="relative mt-6 grid gap-4 sm:grid-cols-2">
        {prevProject ? (
          <Link
            to={`/projects/${prevProject.id}`}
            className="group flex items-center gap-4 rounded-2xl border border-white/12 bg-white/[0.03] p-4 backdrop-blur-xl transition hover:border-lime-400/50 hover:bg-lime-400/[0.06]"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/12 bg-white/5 text-lime-400 transition group-hover:-translate-x-1">
              <FaArrowLeft />
            </span>
            <span className="min-w-0">
              <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
                Previous
              </span>
              <span className="block truncate font-bold text-zinc-100 group-hover:text-lime-300">
                {prevProject.name}
              </span>
            </span>
          </Link>
        ) : (
          <span className="hidden sm:block" />
        )}

        {nextProject ? (
          <Link
            to={`/projects/${nextProject.id}`}
            className="group flex items-center justify-end gap-4 rounded-2xl border border-white/12 bg-white/[0.03] p-4 text-right backdrop-blur-xl transition hover:border-lime-400/50 hover:bg-lime-400/[0.06]"
          >
            <span className="min-w-0">
              <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
                Next
              </span>
              <span className="block truncate font-bold text-zinc-100 group-hover:text-lime-300">
                {nextProject.name}
              </span>
            </span>
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/12 bg-white/5 text-lime-400 transition group-hover:translate-x-1">
              <FaArrowRight />
            </span>
          </Link>
        ) : (
          <span className="hidden sm:block" />
        )}
      </div>
    </section>
  );
};

export default ProjectDetails;
