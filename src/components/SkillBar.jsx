import { useContext } from "react";
import {
    FaReact,
    FaNodeJs,
    FaHtml5,
    FaCss3Alt,
    FaJs,
    FaFireAlt,
    FaLock,
} from "react-icons/fa";
import {
    SiTailwindcss,
    SiExpress,
    SiMongodb,
    SiDaisyui,
} from "react-icons/si";
import Marquee from "react-fast-marquee";
import { motion } from "framer-motion";
import { NavigateContext } from "../context/NavigateProvider";

const frontendSkills = [
    { name: "React.js", icon: FaReact, color: "text-cyan-400", hover: "hover:shadow-cyan-400" },
    { name: "JavaScript", icon: FaJs, color: "text-yellow-400", hover: "hover:shadow-yellow-400" },
    { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-teal-300", hover: "hover:shadow-teal-300" },
    { name: "DaisyUI", icon: SiDaisyui, color: "text-purple-300", hover: "hover:shadow-purple-300" },
    { name: "HTML5", icon: FaHtml5, color: "text-orange-500", hover: "hover:shadow-orange-500" },
    { name: "CSS3", icon: FaCss3Alt, color: "text-blue-400", hover: "hover:shadow-blue-400" },
];

const backendSkills = [
    { name: "Node.js", icon: FaNodeJs, color: "text-green-500", hover: "hover:shadow-green-500" },
    { name: "Express.js", icon: SiExpress, color: "text-gray-400", hover: "hover:shadow-gray-400" },
    { name: "MongoDB", icon: SiMongodb, color: "text-green-400", hover: "hover:shadow-green-400" },
    { name: "Firebase", icon: FaFireAlt, color: "text-yellow-500", hover: "hover:shadow-yellow-500" },
    { name: "JWT", icon: FaLock, color: "text-purple-400", hover: "hover:shadow-purple-400" },
];

const allSkills = [...frontendSkills, ...backendSkills];

const SkillBar = () => {
    const { skillRef } = useContext(NavigateContext);

    return (
        <motion.section
            ref={skillRef}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="px-4 sm:px-6 md:px-10 py-12 sm:py-16 rounded-xl my-10 bg-transparent"
        >
            <div className="text-center mb-10">
                <h2 className="text-4xl md:text-5xl font-bold text-lime-400 uppercase tracking-widest mb-3">
                    Skills
                </h2>
                
            </div>
            {/* <div className=" h-1 bg-lime-400 mt-2 mx-auto rounded-full" /> */}

            <div className="mb-10">
                <h3 className="text-2xl text-lime-400 font-semibold mb-4 text-center">
                    Frontend Technologies
                </h3>
                <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                    {frontendSkills.map((skill, idx) => (
                        <motion.button
                            key={idx}
                            whileHover={{ scale: 1.1 }}
                            className={`px-4 py-2 rounded-full border border-lime-400 ${skill.color} bg-zinc-800 text-sm font-semibold shadow-md ${skill.hover} transition duration-300`}
                        >
                            {skill.name}
                        </motion.button>
                    ))}
                </div>
            </div>

            <div className="mb-10">
                <h3 className="text-2xl text-lime-400 font-semibold mb-4 text-center">
                    Backend Technologies
                </h3>
                <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                    {backendSkills.map((skill, idx) => (
                        <motion.button
                            key={idx}
                            whileHover={{ scale: 1.1 }}
                            className={`px-4 py-2 rounded-full border border-lime-400 ${skill.color} bg-zinc-800 text-sm font-semibold shadow-md ${skill.hover} transition duration-300`}
                        >
                            {skill.name}
                        </motion.button>
                    ))}
                </div>
            </div>

            <Marquee pauseOnHover speed={60} gradient={false}>
                {allSkills.map((skill, idx) => {
                    const Icon = skill.icon;
                    return (
                        <motion.div
                            key={idx}
                            whileHover={{ scale: 1.08 }}
                            className={`group w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 m-3 flex flex-col items-center  justify-center bg-zinc-800 border border-lime-400 rounded-xl shadow-md cursor-pointer transition duration-500 hover:shadow-[0_0_25px_#84cc16]`}
                        >
                            <motion.div
                                className={`text-4xl sm:text-5xl mb-2 ${skill.color}`}
                                animate={{ rotateY: 0 }}
                                whileHover={{ rotateY: 360 }}
                                transition={{ duration: 1 }}
                            >
                                <Icon />
                            </motion.div>
                            <p className="text-white text-xs sm:text-sm font-semibold tracking-wide text-center px-1">
                                {skill.name}
                            </p>
                        </motion.div>
                    );
                })}
            </Marquee>

        </motion.section>
    );
};

export default SkillBar;