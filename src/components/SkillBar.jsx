import { useContext } from "react";
import { 
    FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaJs, FaFireAlt, FaLock 
} from "react-icons/fa";
import { 
    SiTailwindcss, SiExpress, SiMongodb, SiDaisyui, SiTypescript, SiNextdotjs 
} from "react-icons/si";
import Marquee from "react-fast-marquee";
import { motion } from "framer-motion";
import { NavigateContext } from "../context/NavigateProvider";

const frontendSkills = [
    { name: "React.js", icon: FaReact, color: "text-cyan-400", hex: "#22d3ee" },
    { name: "Next.js", icon: SiNextdotjs, color: "text-white", hex: "#ffffff" },
    { name: "TypeScript", icon: SiTypescript, color: "text-blue-500", hex: "#3b82f6" },
    { name: "JavaScript", icon: FaJs, color: "text-yellow-400", hex: "#facc15" },
    { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-teal-300", hex: "#5eead4" },
    { name: "HTML5", icon: FaHtml5, color: "text-orange-500", hex: "#f97316" },
];

const backendSkills = [
    { name: "Node.js", icon: FaNodeJs, color: "text-green-500", hex: "#22c55e" },
    { name: "Express.js", icon: SiExpress, color: "text-gray-300", hex: "#d1d5db" },
    { name: "MongoDB", icon: SiMongodb, color: "text-green-400", hex: "#4ade80" },
    { name: "Firebase", icon: FaFireAlt, color: "text-yellow-500", hex: "#eab308" },
    { name: "JWT", icon: FaLock, color: "text-purple-400", hex: "#c084fc" },
];

const allSkills = [...frontendSkills, ...backendSkills];

const SkillBar = () => {
    const { skillRef } = useContext(NavigateContext);

    return (
        <section
            id="skills"
            ref={skillRef}
            className="relative py-24 px-6 md:px-12 bg-transparent overflow-hidden"
        >
            <div className="max-w-7xl mx-auto relative z-10">
                {/* Section Header */}
                <div className="text-center mb-20">
                    <motion.h2 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter"
                    >
                        Tech <span className="text-lime-400">Skills</span>
                    </motion.h2>
                    <div className="w-20 h-1 bg-lime-400 mx-auto mt-4 rounded-full shadow-[0_0_15px_#84cc16]" />
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
                    {/* Frontend & Backend Containers */}
                    {[
                        { title: "Frontend", skills: frontendSkills },
                        { title: "Backend & Tools", skills: backendSkills }
                    ].map((cat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            whileHover={{ y: -5 }}
                            transition={{ duration: 0.5, delay: i * 0.2 }}
                            className="group relative p-8 rounded-[2rem] bg-[#0d121f] border border-white/5 shadow-2xl overflow-hidden transition-all duration-500 hover:border-lime-400/30"
                        >
                            {/* Inner Subtle Glow */}
                            <div className="absolute inset-0 bg-gradient-to-br from-lime-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            
                            <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-4 relative z-10">
                                <span className="p-2 rounded-lg bg-lime-400/10 text-lime-400 text-sm">0{i+1}</span>
                                {cat.title}
                            </h3>
                            
                            <div className="flex flex-wrap gap-3 relative z-10">
                                {cat.skills.map((skill, idx) => (
                                    <motion.div
                                        key={idx}
                                        whileHover={{ scale: 1.1, backgroundColor: "rgba(163, 230, 53, 0.1)" }}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-xl border border-white/5 bg-white/5 text-sm font-semibold transition-all duration-300 hover:border-lime-400/50 cursor-default ${skill.color}`}
                                    >
                                        <skill.icon />
                                        <span className="text-gray-200">{skill.name}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Marquee Section with High-End Cards */}
                <div className="relative py-10 group">
                    {/* Masking sides for smooth fade */}
                    <div className="absolute inset-y-0 left-0 w-24  z-10 " />
                    <div className="absolute inset-y-0 right-0 w-24  z-10" />
                    
                    <Marquee pauseOnHover speed={40} gradient={false}>
                        {allSkills.map((skill, idx) => {
                            const Icon = skill.icon;
                            return (
                                <motion.div
                                    key={idx}
                                    whileHover={{ y: -10 }}
                                    className="relative mx-4 w-36 h-44 md:w-44 md:h-52 flex flex-col items-center justify-center bg-[#0d121f] border border-white/10 rounded-[2.5rem] transition-all duration-500 hover:border-lime-400 group/card"
                                    style={{
                                        boxShadow: "0 10px 30px -15px rgba(0,0,0,0.7)"
                                    }}
                                >
                                    {/* Skill Icon with dynamic glow on hover */}
                                    <div className={`relative p-5 rounded-2xl bg-white/5 mb-4 transition-all duration-500 group-hover/card:bg-transparent`}>
                                        <Icon 
                                            className={`text-5xl md:text-6xl transition-all duration-500 ${skill.color} group-hover/card:drop-shadow-[0_0_15px_rgba(132,204,22,0.6)] group-hover/card:scale-110`} 
                                        />
                                    </div>
                                    
                                    <p className="text-gray-400 group-hover/card:text-white text-xs md:text-sm font-bold uppercase tracking-widest transition-colors">
                                        {skill.name}
                                    </p>

                                    {/* Bottom Accent Line */}
                                    <div className="absolute bottom-6 w-8 h-1 bg-gray-800 rounded-full group-hover/card:w-16 group-hover/card:bg-lime-400 transition-all duration-500" />
                                </motion.div>
                            );
                        })}
                    </Marquee>
                </div>
            </div>
        </section>
    );
};

export default SkillBar;