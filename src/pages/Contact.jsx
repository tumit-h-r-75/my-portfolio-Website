import { useContext, useRef } from "react";
import { FaFacebook, FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { NavigateContext } from "../context/NavigateProvider";

const Contact = () => {
  const { contactRef } = useContext(NavigateContext);
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm("service_48upolr", "template_llgo81r", form.current, {
        publicKey: "O_KNMjs2MVnNwEPJZ",
      })
      .then(
        () => {
          e.target.reset();
          Swal.fire({
            title: "Message Sent!",
            text: "Thank you for reaching out.",
            icon: "success",
            background: "#111827",
            color: "#ffffff",
            confirmButtonColor: "#84cc16",
          });
        },
        (error) => {
          console.error("FAILED...", error.text);
        }
      );
  };

  return (
    <motion.section
      ref={contactRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, amount: 0.2 }}
      className="py-16 px-4 sm:px-6 md:px-10 lg:px-16 max-w-7xl mx-auto"
    >
      <h2 className="text-3xl sm:text-4xl font-bold text-lime-400 text-center mb-12 uppercase tracking-wide">
        Contact Me
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left Info Panel */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.2 }}
          className="bg-zinc-900 border border-zinc-700 p-6 sm:p-8 rounded-xl shadow-lg space-y-5"
        >
          <h3 className="text-2xl sm:text-3xl font-semibold text-white">Let’s Connect</h3>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Have a project in mind or just want to say hello? I’m always open to new ideas and collaborations.
          </p>

          <div className="text-gray-300 space-y-2 text-sm sm:text-base">
            <p><strong>Email:</strong> tumithasan1@gmail.com</p>
            <p><strong>WhatsApp:</strong> +880 1611-960330</p>
          </div>

          <div className="flex flex-wrap gap-4 pt-4 text-xl">
            <a href="https://github.com/tumit-h-r-75" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-lime-400 transition sm:hover:scale-110">
              <FaGithub />
            </a>
            <a href="https://www.facebook.com/tumit.hasan.rafi.2025" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-lime-400 transition sm:hover:scale-110">
              <FaFacebook />
            </a>
            <a href="https://www.linkedin.com/in/tumit-hasan-rafi/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-lime-400 transition sm:hover:scale-110">
              <FaLinkedin />
            </a>
            <a href="https://wa.me/8801611960330" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-lime-400 transition sm:hover:scale-110">
              <FaWhatsapp />
            </a>
          </div>
        </motion.div>

        {/* Right Contact Form */}
        <motion.form
          ref={form}
          onSubmit={sendEmail}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.2 }}
          className="bg-zinc-900 border border-zinc-700 p-6 sm:p-8 rounded-xl shadow-lg space-y-6"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            <input
              type="text"
              name="name"
              required
              placeholder="Your Name"
              className="w-full p-3 rounded-lg bg-zinc-800 text-white placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-lime-400"
            />
            <input
              type="email"
              name="email"
              required
              placeholder="Your Email"
              className="w-full p-3 rounded-lg bg-zinc-800 text-white placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-lime-400"
            />
          </div>

          <textarea
            name="message"
            required
            placeholder="Your Message"
            className="w-full p-3 h-32 rounded-lg bg-zinc-800 text-white placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-lime-400 resize-none"
          ></textarea>

          <input
            type="submit"
            value="Send Message"
            className="w-full sm:w-auto px-6 py-3 bg-lime-500 hover:bg-lime-600 text-black font-semibold rounded-lg transition hover:shadow-lg hover:shadow-lime-300"
          />
        </motion.form>
      </div>
    </motion.section>
  );
};

export default Contact;
