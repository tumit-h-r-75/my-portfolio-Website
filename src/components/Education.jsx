import { useContext } from "react";
import {
  FaUniversity,
  FaMapMarkerAlt,
  FaBookOpen,
  FaCheckCircle,
  FaGraduationCap,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { NavigateContext } from "../context/NavigateProvider";

const Education = () => {
  const { educationRef } = useContext(NavigateContext);

  return (
    <section
      ref={educationRef}
      className="py-16 px-4 sm:px-8 md:px-16 bg-transparent my-10"
    >
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="flex flex-wrap justify-center items-center gap-3 text-lime-400 font-bold uppercase tracking-widest mb-4 text-3xl sm:text-4xl md:text-5xl">
          <FaGraduationCap className="text-lime-400" />
          Education
        </h2>
        <div className="mx-auto w-20 sm:w-52 md:w-96 h-1 bg-lime-400 rounded-full" />
      </div>

      {/* Education Card */}
      <motion.div
        initial={{ opacity: 0, y: 100, scale: 0.9 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        whileHover={{
          scale: 1.02,
          boxShadow: "0 0 35px rgba(132, 204, 22, 0.6)",
          transition: { duration: 0.4 },
        }}
        viewport={{ once: true, amount: 0.4 }}
        className="max-w-5xl mx-auto bg-zinc-800 p-6 sm:p-8 md:p-10 rounded-xl border border-zinc-700 transition-all duration-500"
      >
        {/* Title */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-4">
          <FaUniversity className="text-lime-400 text-2xl sm:text-3xl md:text-4xl" />
          <h3 className="text-white font-semibold text-xl sm:text-2xl md:text-3xl">
            Diploma in Computer Science and Technology
          </h3>
        </div>

        {/* Timeline */}
        <p className="text-gray-400 text-sm sm:text-base md:text-lg mb-3 sm:pl-9">
          Satkhira Govt Polytechnic Institute —{" "}
          <span className="text-lime-400">(2022 - 2025)</span>
        </p>

        {/* Description */}
        <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed text-justify mb-4 sm:pl-9">
          My education focuses on developing a strong foundation in computer science, covering subjects like programming, data structures, algorithms, networking, and software development. Throughout my studies, I have gained both theoretical knowledge and practical experience in various technologies, working on projects that enhance my problem-solving and critical thinking skills.
        </p>
        <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed text-justify mb-6 sm:pl-9">
          This program has helped me understand the fundamentals of system design, database management, and modern web technologies, preparing me for a career in the dynamic field of technology.
        </p>

        {/* Details */}
        <div className="space-y-3 text-gray-300 text-xs sm:text-sm md:text-base sm:pl-9">
          <p>
            <FaMapMarkerAlt className="inline mr-2 text-lime-400" />
            <strong>Location:</strong> Satkhira, Khulna, Bangladesh
          </p>
          <p>
            <FaUniversity className="inline mr-2 text-lime-400" />
            <strong>Institute:</strong> Satkhira Govt Polytechnic Institute
          </p>
          <p>
            <FaBookOpen className="inline mr-2 text-lime-400" />
            <strong>Department:</strong> Computer Science & Technology
          </p>
          <p>
            <FaCheckCircle className="inline mr-2 text-lime-400" />
            <strong>EIIN No:</strong> 132265
          </p>
          <p className="pt-3">
            <span className="text-lime-400 font-semibold">Core Skills Learned:</span><br />
            Python, Java, Data Structure & Algorithm, DBMS, Networking, Computer Architecture, Business Communication, Web Development ( javascript), and more.
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default Education;
