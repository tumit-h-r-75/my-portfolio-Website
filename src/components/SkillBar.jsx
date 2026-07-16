import { useContext } from "react";
import {
  FaReact,
  FaNodeJs,
  FaHtml5,
  FaJs,
  FaFireAlt,
  FaLock,
  FaWordpress,
  FaDatabase,
  FaCloudDownloadAlt,
} from "react-icons/fa";
import { SiTailwindcss, SiExpress, SiMongodb, SiTypescript, SiNextdotjs, SiAirtable } from "react-icons/si";
import Marquee from "react-fast-marquee";
import { motion } from "framer-motion";
import { NavigateContext } from "../context/NavigateProvider";
import MagicBentoPanel from "./MagicBento/MagicBento";
import DecryptLabel, { DecryptSplitHeading } from "./DecryptLabel";
import SectionHeading from "./SectionHeading";
import BorderGlow, { glowTheme } from "./BorderGlow/BorderGlow";

const frontendSkills = [
  { name: "React.js", icon: FaReact, color: "text-cyan-300" },
  { name: "Next.js", icon: SiNextdotjs, color: "text-white" },
  { name: "TypeScript", icon: SiTypescript, color: "text-blue-400" },
  { name: "JavaScript", icon: FaJs, color: "text-yellow-300" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-teal-300" },
  { name: "HTML5", icon: FaHtml5, color: "text-orange-400" },
];

const backendSkills = [
  { name: "Node.js", icon: FaNodeJs, color: "text-green-400" },
  { name: "Express.js", icon: SiExpress, color: "text-zinc-200" },
  { name: "MongoDB", icon: SiMongodb, color: "text-emerald-400" },
  { name: "Firebase", icon: FaFireAlt, color: "text-amber-300" },
  { name: "JWT", icon: FaLock, color: "text-purple-300" },
];

const cmsSkills = [
  { name: "WordPress", icon: FaWordpress, color: "text-blue-300" },
  { name: "ACF", icon: SiAirtable, color: "text-cyan-300" },
  { name: "Post Get API", icon: FaCloudDownloadAlt, color: "text-lime-300" },
  { name: "SQL", icon: FaDatabase, color: "text-indigo-300" },
];

const allSkills = [...frontendSkills, ...backendSkills, ...cmsSkills];

const SkillBar = () => {
  const { skillRef } = useContext(NavigateContext);

  return (
    <section id="skills" ref={skillRef} className="relative overflow-hidden bg-transparent px-6 py-20 md:py-28 md:px-12">
      <div className="pointer-events-none absolute left-1/2 top-20 h-52 w-[28rem] -translate-x-1/2 rounded-full bg-lime-400/10 blur-[130px]" />
      <div className="max-w-[96rem] mx-auto relative z-10">
        <SectionHeading kicker="What I Do" before="Tech " highlight="Skills" align="center" />
        <p className="mx-auto -mt-8 mb-16 max-w-2xl text-center text-sm md:text-base text-zinc-400">
          Modern frontend, backend, and CMS workflow focused on performance and clean architecture.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-14">
          {[
            { title: "Frontend", skills: frontendSkills },
            { title: "Backend", skills: backendSkills },
            { title: "CMS & Data", skills: cmsSkills },
          ].map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <BorderGlow {...glowTheme} backgroundColor="#0a0a0a" borderRadius={24} className="h-full">
                <MagicBentoPanel className="h-full p-6">
                  <h3 className="mb-4 text-xl font-black text-white">
                    <DecryptLabel text={cat.title} parentClassName="text-white font-black" className="text-white" />
                  </h3>
                  <div className="flex flex-wrap gap-2.5">
                    {cat.skills.map((skill) => (
                      <span key={skill.name} className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-zinc-200">
                        <skill.icon className={skill.color} />
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </MagicBentoPanel>
              </BorderGlow>
            </motion.div>
          ))}
        </div>

        <BorderGlow {...glowTheme} backgroundColor="#0a0a0a" borderRadius={32}>
          <MagicBentoPanel className="relative p-5 md:p-6 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-lime-400/5 via-transparent to-cyan-400/5" />
            <div className="relative z-10 mb-5 flex items-center justify-between">
              <h3 className="text-lg md:text-xl font-black uppercase tracking-[0.2em] text-white">
                <DecryptSplitHeading before="Skill " highlight="Marquee" />
              </h3>
            </div>

            <div className="relative z-10 space-y-4">
              <Marquee pauseOnHover speed={42} gradient={false}>
                {allSkills.map((skill, idx) => (
                  <div
                    key={`${skill.name}-top-${idx}`}
                    className="group mx-2.5 flex min-w-[180px] items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 transition-all duration-300 hover:border-lime-400/50 hover:bg-lime-400/10"
                  >
                    <div className="rounded-xl bg-black/40 p-2">
                      <skill.icon className={`text-xl ${skill.color}`} />
                    </div>
                    <p className="text-sm font-semibold text-zinc-200">{skill.name}</p>
                  </div>
                ))}
              </Marquee>

              <Marquee pauseOnHover speed={34} gradient={false} direction="right">
                {[...allSkills].reverse().map((skill, idx) => (
                  <div
                    key={`${skill.name}-bottom-${idx}`}
                    className="group mx-2.5 flex min-w-[180px] items-center gap-3 rounded-2xl border border-white/10 bg-black/35 px-4 py-3 transition-all duration-300 hover:border-cyan-400/50 hover:bg-cyan-400/10"
                  >
                    <skill.icon className={`text-lg ${skill.color}`} />
                    <p className="text-sm font-semibold text-zinc-200">{skill.name}</p>
                  </div>
                ))}
              </Marquee>
            </div>
          </MagicBentoPanel>
        </BorderGlow>
      </div>
    </section>
  );
};

export default SkillBar;
