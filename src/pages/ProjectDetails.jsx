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
  FaLayerGroup,
} from "react-icons/fa";
import projects from "../components/data/projects";

const ProjectDetails = () => {
  const { id } = useParams();
  const project = projects.find((p) => p.id === parseInt(id));

  if (!project) {
    return (
      <section className="px-6 py-24 text-center">
        <h2 className="mb-4 text-3xl font-black text-white">Project not found</h2>
        <p className="mb-8 text-zinc-400">The project you are looking for does not exist.</p>
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
    <section className="relative mx-auto my-8 max-w-6xl px-6 pb-6 pt-12 md:pt-16">
      <div className="pointer-events-none absolute left-1/2 top-20 h-52 w-[28rem] -translate-x-1/2 rounded-full bg-lime-400/15 blur-[130px]" />
      <div className="pointer-events-none absolute -left-8 top-52 h-44 w-44 rounded-full bg-cyan-400/10 blur-[110px]" />
      <div className="pointer-events-none absolute -right-6 bottom-16 h-52 w-52 rounded-full bg-emerald-400/10 blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-black/15 p-5 shadow-[0_0_60px_rgba(0,0,0,0.35)] backdrop-blur-2xl md:p-8"
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-lime-300/5" />
        <div className="pointer-events-none absolute inset-[1px] rounded-[1.9rem] border border-white/10" />

        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-zinc-200 transition hover:border-lime-400/60 hover:text-lime-300"
          >
            <FaArrowLeft className="text-lime-400" /> Back
          </Link>

          <span className="rounded-full border border-lime-400/30 bg-lime-400/10 px-4 py-1 text-xs font-bold uppercase tracking-[0.2em] text-lime-300">
            Project 0{project.id}
          </span>
        </div>

        <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
          <div className="space-y-6 lg:col-span-7">
            <h1 className="text-4xl font-black leading-tight text-white md:text-5xl">
              <span className="mr-3 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-lime-400 text-black align-middle text-lg">
                <FaLaptopCode />
              </span>
              {project.name}
            </h1>

            <p className="text-[16px] leading-relaxed text-zinc-300 md:text-lg">{project.description}</p>

            <div className="rounded-2xl border border-white/15 bg-white/[0.04] p-5 backdrop-blur-xl">
              <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-lime-300">
                <FaTools /> Tech Stack
              </h2>
              <div className="flex flex-wrap gap-2.5">
                {techItems.map((tech, idx) => (
                  <span
                    key={`${tech}-${idx}`}
                    className="rounded-full border border-lime-400/40 bg-zinc-900/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-lime-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="overflow-hidden rounded-3xl border border-white/15 bg-zinc-900/30 shadow-[0_0_30px_rgba(163,230,53,0.08)]">
              <img
                src={project.image}
                alt={project.name}
                className="h-[260px] w-full object-cover object-top md:h-[360px]"
              />
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-white/15 bg-white/[0.04] p-5 backdrop-blur-xl">
            <h2 className="mb-3 flex items-center gap-2 text-lg font-bold text-lime-300">
              <FaBug /> Challenges Faced
            </h2>
            <p className="leading-relaxed text-zinc-300">{project.challenges}</p>
          </div>

          <div className="rounded-2xl border border-white/15 bg-white/[0.04] p-5 backdrop-blur-xl">
            <h2 className="mb-3 flex items-center gap-2 text-lg font-bold text-lime-300">
              <FaRocket /> Future Plans
            </h2>
            <p className="leading-relaxed text-zinc-300">{project.futurePlans}</p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-4">
          <a
            href={project.liveLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-lime-400 px-5 py-3 text-sm font-black uppercase tracking-wide text-black transition hover:shadow-[0_0_28px_rgba(163,230,53,0.5)]"
          >
            <FaExternalLinkAlt /> Live Site
          </a>
          <a
            href={project.githubClient}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-zinc-900 px-5 py-3 text-sm font-black uppercase tracking-wide text-white transition hover:border-lime-400/50 hover:text-lime-300"
          >
            <FaGithub /> GitHub Repo
          </a>
          <span className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs font-bold uppercase tracking-[0.18em] text-zinc-400">
            <FaLayerGroup className="text-lime-400" /> Built with modern stack
          </span>
        </div>
      </motion.div>
    </section>
  );
};

export default ProjectDetails;
