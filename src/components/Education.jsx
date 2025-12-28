import { useContext } from "react";
import {
  FaUniversity,
  FaMapMarkerAlt,
  FaBookOpen,
  FaCheckCircle,
  FaGraduationCap,
  FaCalendarAlt,
  FaCogs
} from "react-icons/fa";
import { motion } from "framer-motion";
import { NavigateContext } from "../context/NavigateProvider";

const Education = () => {
  const { educationRef } = useContext(NavigateContext);

  const coreSkills = [
    "Python", "Java", "DSA", "DBMS", "Networking", 
    "Computer Architecture", "Business Communication", "JavaScript"
  ];

  return (
    <section
      ref={educationRef}
      id="education"
      className="py-28 px-6 md:px-12 bg-transparent"
    >
      <div className="max-w-6xl mx-auto">
        
        {/* --- Header Section (Refined & Clean) --- */}
        <div className="flex flex-col items-start mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 text-lime-400 mb-4"
          >
            <div className="w-10 h-[1px] bg-lime-400"></div>
            <span className="text-sm font-bold tracking-[0.3em] uppercase">Qualifications</span>
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
            Education<span className="text-lime-400">.</span>
          </h2>
        </div>

        {/* --- Education Content --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Side: Timeline Detail */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="lg:col-span-8 space-y-8"
          >
            <div className="group relative">
                {/* Vertical Decorative Bar */}
                <div className="absolute -left-6 top-0 bottom-0 w-[2px] bg-gradient-to-b from-lime-400 to-transparent"></div>
                
                <div className="space-y-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <h3 className="text-2xl md:text-4xl font-bold text-gray-100 group-hover:text-lime-400 transition-colors duration-300">
                            Diploma in Computer Science <br /> & Technology
                        </h3>
                        <div className="text-lime-400 font-mono text-lg flex items-center gap-2 bg-lime-400/5 px-4 py-1 rounded-full border border-lime-400/20 w-fit">
                            <FaCalendarAlt size={14}/> 2022 — 2025
                        </div>
                    </div>

                    <div className="space-y-4">
                        <p className="text-gray-400 text-lg leading-relaxed text-justify">
                            My education focuses on developing a strong foundation in <span className="text-white border-b border-lime-400/30 font-medium">computer science</span>, covering subjects like programming, data structures, algorithms, networking, and software development. 
                        </p>
                        <p className="text-gray-400 text-lg leading-relaxed text-justify">
                            Throughout my studies, I have gained both theoretical knowledge and practical experience in various technologies, working on projects that enhance my problem-solving and critical thinking skills. This program has helped me understand the fundamentals of system design, database management, and modern web technologies.
                        </p>
                    </div>

                    {/* Skill Tags - Very Minimalist */}
                    <div className="pt-6">
                        <h4 className="text-sm uppercase tracking-widest text-gray-500 font-bold mb-4 flex items-center gap-2">
                           <FaCogs className="text-lime-400" /> Core Competencies
                        </h4>
                        <div className="flex flex-wrap gap-2">
                            {coreSkills.map((skill, i) => (
                                <span key={i} className="px-3 py-1 bg-zinc-900 border border-zinc-800 text-gray-400 text-sm rounded hover:border-lime-400/50 hover:text-white transition-all">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
          </motion.div>

          {/* Right Side: Institution Meta Data */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="lg:col-span-4 bg-[#0a0a0a] border border-zinc-800 p-8 rounded-3xl sticky top-24"
          >
            <div className="space-y-8">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-lime-400 rounded-xl flex items-center justify-center text-black shadow-[0_10px_30px_rgba(163,230,53,0.2)]">
                        <FaUniversity size={24} />
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 uppercase tracking-widest font-bold">Institute</p>
                        <p className="text-white font-bold leading-tight">Satkhira Govt <br /> Polytechnic Institute</p>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="flex items-start gap-4">
                        <FaMapMarkerAlt className="mt-1 text-lime-400" />
                        <div>
                            <p className="text-xs text-gray-500 uppercase font-bold">Location</p>
                            <p className="text-gray-300 text-sm">Satkhira, Khulna, Bangladesh</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <FaBookOpen className="mt-1 text-lime-400" />
                        <div>
                            <p className="text-xs text-gray-500 uppercase font-bold">Department</p>
                            <p className="text-gray-300 text-sm">Computer Science & Tech</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <FaCheckCircle className="mt-1 text-lime-400" />
                        <div>
                            <p className="text-xs text-gray-500 uppercase font-bold">EIIN</p>
                            <p className="text-gray-300 text-sm tracking-widest">132265</p>
                        </div>
                    </div>
                </div>

                {/* Subtle Status Indicator */}
                <div className="pt-6 border-t border-zinc-800">
                    <div className="flex items-center gap-2">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-lime-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-lime-400"></span>
                        </span>
                        <span className="text-sm text-gray-400 font-medium">Currently Enrolled</span>
                    </div>
                </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Education;