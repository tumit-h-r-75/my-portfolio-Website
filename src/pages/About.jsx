import { useContext } from "react";
import { FaCoffee, FaMusic, FaPlaneDeparture } from "react-icons/fa";
import { GiCricketBat } from "react-icons/gi";
import { motion } from "framer-motion";
import { NavigateContext } from "../context/NavigateProvider";
import aboutImg from "../assets/20250812_174823[1]-Photoroom.png"
const About = () => {
  const { aboutRef } = useContext(NavigateContext);

  const interests = [
    { icon: <GiCricketBat />, label: "Cricket" },
    { icon: <FaCoffee />, label: "Coffee" },
    { icon: <FaPlaneDeparture />, label: "Travel" },
    { icon: <FaMusic />, label: "Music" },
  ];

  return (
    <section
      ref={aboutRef}
      className="relative bg-zinc-900 px-10 sm:px-10 md:px-10 py-16 rounded-xl mx-10 border border-zinc-800 duration-300 hover:shadow-2xl hover:shadow-lime-500 overflow-hidden"
    >

      {/* Falling Lime Bubbles Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {[...Array(25)].map((_, i) => (
          <span
            key={i}
            className="bubble"
            style={{
              left: `${Math.random() * 100}%`,
              width: `${10 + Math.random() * 25}px`,
              height: `${10 + Math.random() * 25}px`,
              animationDuration: `${4 + Math.random() * 6}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></span>
        ))}
      </div>

      {/* Background Animation */}
      <div className="lime-bubbles">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>



      {/* Section Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-lime-400 uppercase tracking-widest mb-4">
          About Me
        </h2>
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col lg:flex-row items-center gap-10 lg:gap-14"
      >
        {/* Image Section */}
        <div className="relative group">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 rounded-xl overflow-hidden border-4 border-lime-400 shadow-xl shadow-lime-700/30"
          >
            <img
              className="w-52 sm:w-60 md:w-72 lg:w-80 xl:w-96 rounded-xl object-cover bg-white object-top"
              src={aboutImg}
              alt="Tumit Hasan"
            />
          </motion.div>
          <div className="absolute -top-4 left-4 w-full h-full border-4 border-lime-500 opacity-20 group-hover:opacity-40 transition duration-500 rounded-xl z-0" />
        </div>

        {/* Text Section */}
        <div className="text-white w-full max-w-3xl space-y-6">
          <h3 className="text-2xl sm:text-3xl font-semibold text-lime-400">
            MERN Stack Developer
          </h3>

          <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed text-justify">
            Hello! I'm <span className="font-semibold text-lime-400">Tumit Hasan</span>, a dedicated and results-driven MERN Stack Developer with a passion for building modern web apps. I specialize in technologies like <span className="text-lime-400 font-semibold">React.js, Node.js, MongoDB, Express.js</span>, and <span className="text-lime-400 font-semibold">Tailwind CSS</span>.
            <br /><br />
            I love turning ideas into responsive, functional digital products. I focus on clean, maintainable code, and real-world solutions. I also enjoy team collaboration and staying updated with new technologies.
          </p>

          {/* Personal Info */}
          <div className="text-gray-400 text-sm sm:text-base space-y-1 pt-2">
            <p><span className="text-lime-400 font-medium">Name:</span> Tumit Hasan</p>
            <p><span className="text-lime-400 font-medium">Nationality:</span> Bangladeshi</p>
            <p><span className="text-lime-400 font-medium">Address:</span> Jashore, Bangladesh</p>
            <p><span className="text-lime-400 font-medium">Phone:</span> +8801611960330</p>
            <p><span className="text-lime-400 font-medium">E-mail:</span> tumithasan1@gmail.com</p>
            <p><span className="text-lime-400 font-medium">Education:</span> Diploma in Computer Science & Technology</p>
          </div>
        </div>
      </motion.div>

      {/* Interests */}
      <div className="mt-16 text-white text-center">
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-lime-400 uppercase mb-8">
          My Interests
        </h3>

        <div className="flex flex-wrap justify-center gap-6 sm:gap-8">
          {interests.map((interest, index) => (
            <motion.div
              key={index}
              whileHover={{
                scale: 1.1,
                boxShadow: "0 0 25px #84cc16",
                backgroundColor: "#84cc16",
                color: "#1f1f1f",
              }}
              transition={{ duration: 0.3 }}
              className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 bg-zinc-800 border border-lime-500 flex flex-col items-center justify-center rounded-xl text-white cursor-pointer shadow-md hover:shadow-lime-300"
            >
              <div className="text-3xl sm:text-4xl mb-2">{interest.icon}</div>
              <p className="text-xs sm:text-sm md:text-base font-medium capitalize">{interest.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
