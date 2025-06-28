import { useContext } from "react";
import { FaCoffee, FaMusic, FaPlaneDeparture } from "react-icons/fa";
import { GiCricketBat } from "react-icons/gi";
import { motion } from "framer-motion";
import { NavigateContext } from "../context/NavigateProvider";

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
      className="bg-zinc-900 px-4 md:px-10 py-20 rounded-xl m-4 border border-zinc-800 duration-300 hover:shadow-2xl hover:shadow-lime-500"
    >
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-lime-400 uppercase tracking-widest mb-4">
          About Me
        </h2>
        <div className="w-96 h-1 bg-lime-400 mt-4 mx-auto rounded-full" />
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col lg:flex-row items-center gap-12"
      >
        {/* Image Section */}
        <div className="relative group">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 rounded-xl overflow-hidden border-4 border-lime-400 shadow-xl shadow-lime-700/30"
          >
            <img
              className="w-64 md:w-72 rounded-xl object-cover bg-white"
              src="https://i.ibb.co/wFYYyQHc/my-img-removebg-preview.png"
              alt="Tumit Hasan"
            />
          </motion.div>
          <div className="absolute -top-4 left-4 w-64 md:w-72 h-64 md:h-72 border-4 border-lime-500 opacity-20 group-hover:opacity-40 transition duration-500 rounded-xl z-0" />
        </div>

        {/* Text Section */}
        <div className="text-white max-w-2xl space-y-6">
          <h3 className="text-2xl md:text-3xl font-semibold text-lime-400">
            MERN Stack Developer
          </h3>

          <p className="text-gray-300 leading-loose">
            Hello! I'm <span className="font-semibold text-lime-400">Tumit Hasan</span>, a dedicated and results-driven MERN Stack Developer with a deep passion for building interactive, scalable, and modern web applications. My expertise lies in technologies like <span className="text-lime-400 font-semibold">React.js, Node.js, MongoDB, Express.js</span>, and <span className="text-lime-400 font-semibold">Tailwind CSS</span>, which I use to craft seamless and high-performing user experiences.
            <br /><br />
            I specialize in turning ideas into fully functional, visually stunning digital products. Whether it's building responsive frontend interfaces or developing robust backend systems, I always focus on writing clean, efficient, and maintainable code. I love solving real-world problems and continuously strive to improve my skills through hands-on learning and challenges.
            <br /><br />
            Besides coding, I take great interest in creative thinking, collaborative teamwork, and exploring new technologies that push the boundaries of what’s possible on the web. Let’s connect and bring your next big idea to life — with performance, style, and innovation.
          </p>

          <div className="text-gray-400 text-sm space-y-1 pt-4">
            <p><span className="text-lime-400 font-medium">Name:</span> Tumit Hasan</p>
            <p><span className="text-lime-400 font-medium">Nationality:</span> Bangladeshi</p>
            <p><span className="text-lime-400 font-medium">Address:</span> Jashore, Bangladesh</p>
            <p><span className="text-lime-400 font-medium">Phone:</span> +8801611960330</p>
            <p><span className="text-lime-400 font-medium">E-mail:</span> tumithasan@gmail.com</p>
            <p><span className="text-lime-400 font-medium">Education:</span> Diploma in Computer Science & Technology</p>
          </div>
        </div>
      </motion.div>

      {/* Interests */}
      <div className="mt-16 text-white text-center">
        <h3 className="text-3xl md:text-4xl font-bold text-lime-400 uppercase mb-10">
          My Interests
        </h3>

        <div className="flex flex-wrap gap-8 justify-center">
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
              className="w-32 h-32 bg-zinc-800 border border-lime-500 flex flex-col items-center justify-center rounded-xl text-white cursor-pointer shadow-md hover:shadow-lime-300"
            >
              <div className="text-4xl mb-2">{interest.icon}</div>
              <p className="text-base font-medium capitalize">{interest.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
