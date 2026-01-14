import { useContext, useRef } from "react";
import { FaFacebook, FaGithub, FaLinkedin, FaWhatsapp, FaEnvelope, FaPaperPlane, FaMapMarkerAlt } from "react-icons/fa";
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
            title: "Success!",
            text: "Your message has been sent.",
            icon: "success",
            background: "#18181b",
            color: "#fff",
            confirmButtonColor: "#84cc16",
          });
        },
        (error) => console.error("FAILED...", error.text)
      );
  };

  return (
    <section
      ref={contactRef}
      id="contact"
      className="py-16 md:py-24 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto overflow-hidden"
    >
      {/* Section Header */}
      <div className="mb-12 md:mb-16">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-2xl sm:text-3xl md:text-5xl font-bold text-white uppercase tracking-tight"
        >
          Let’s Work <span className="text-lime-400 font-light italic">Together</span>
        </motion.h2>
        <div className="w-16 md:w-20 h-1 bg-lime-400 mt-3 md:mt-4" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
        
        {/* Left Side: Contact Details */}
        <div className="lg:col-span-5 space-y-5 md:space-y-6">
          <p className="text-zinc-400 text-base md:text-lg max-w-md leading-relaxed">
            I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I’ll try my best to get back to you!
          </p>

          <div className="space-y-3 md:space-y-4">
            {/* Email - Clickable */}
            <a 
              href="mailto:tumithasan1@gmail.com" 
              className="flex items-center gap-4 p-4 md:p-5 bg-zinc-900/50 border border-zinc-800 rounded-xl md:rounded-2xl hover:border-lime-400/50 transition-all group"
            >
              <div className="text-lime-400 text-lg md:text-xl group-hover:scale-110 transition-transform shrink-0">
                <FaEnvelope />
              </div>
              <div className="min-w-0"> {/* text overflow protection */}
                <p className="text-[10px] md:text-xs uppercase font-bold text-zinc-500 tracking-widest">Mail Me</p>
                <p className="text-zinc-200 text-sm md:text-base font-medium truncate">tumithasan1@gmail.com</p>
              </div>
            </a>

            {/* WhatsApp - Clickable */}
            <a 
              href="https://wa.me/8801611960330" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-4 p-4 md:p-5 bg-zinc-900/50 border border-zinc-800 rounded-xl md:rounded-2xl hover:border-lime-400/50 transition-all group"
            >
              <div className="text-lime-400 text-lg md:text-xl group-hover:scale-110 transition-transform shrink-0">
                <FaWhatsapp />
              </div>
              <div>
                <p className="text-[10px] md:text-xs uppercase font-bold text-zinc-500 tracking-widest">WhatsApp</p>
                <p className="text-zinc-200 text-sm md:text-base font-medium">+880 1611-960330</p>
              </div>
            </a>

            {/* Location */}
            <div className="flex items-center gap-4 p-4 md:p-5 bg-zinc-900/50 border border-zinc-800 rounded-xl md:rounded-2xl">
              <div className="text-lime-400 text-lg md:text-xl shrink-0">
                <FaMapMarkerAlt />
              </div>
              <div>
                <p className="text-[10px] md:text-xs uppercase font-bold text-zinc-500 tracking-widest">Location</p>
                <p className="text-zinc-200 text-sm md:text-base font-medium">Satkhira, Bangladesh</p>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap gap-3 md:gap-4 pt-2">
            {[
              { icon: <FaGithub />, link: "https://github.com/tumit-h-r-75" },
              { icon: <FaLinkedin />, link: "https://www.linkedin.com/in/tumit-hasan-rafi/" },
              { icon: <FaFacebook />, link: "https://www.facebook.com/tumit.hasan.rafi.2025" }
            ].map((social, idx) => (
              <a 
                key={idx}
                href={social.link} 
                target="_blank" 
                rel="noreferrer"
                className="w-10 h-10 md:w-12 md:h-12 bg-zinc-900 border border-zinc-800 rounded-lg md:rounded-xl flex items-center justify-center text-lg text-zinc-400 hover:text-lime-400 hover:border-lime-400 transition-all"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-7"
        >
          <form
            ref={form}
            onSubmit={sendEmail}
            className="bg-zinc-900/30 border border-zinc-800 p-6 md:p-10 rounded-[1.5rem] md:rounded-[2rem] space-y-5 md:space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
              <div className="space-y-2">
                <label className="text-[10px] md:text-xs font-bold text-zinc-500 uppercase ml-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. John Doe"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 md:px-5 md:py-4 text-white text-sm md:text-base outline-none focus:border-lime-400 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] md:text-xs font-bold text-zinc-500 uppercase ml-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="e.g. john@example.com"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 md:px-5 md:py-4 text-white text-sm md:text-base outline-none focus:border-lime-400 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] md:text-xs font-bold text-zinc-500 uppercase ml-1">Message</label>
              <textarea
                name="message"
                required
                placeholder="How can I help you?"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 md:px-5 md:py-4 h-32 md:h-40 text-white text-sm md:text-base outline-none focus:border-lime-400 transition-colors resize-none"
              ></textarea>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full sm:w-max px-8 py-3.5 md:px-10 md:py-4 bg-lime-400 hover:bg-lime-500 text-black font-bold text-xs md:text-sm uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-3 shadow-lg shadow-lime-900/20"
            >
              <span>Send Message</span>
              <FaPaperPlane className="text-xs shrink-0" />
            </motion.button>
          </form>
        </motion.div>

      </div>
    </section>
  );
};

export default Contact;