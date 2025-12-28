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
      className="py-20 px-6 md:px-12 max-w-7xl mx-auto"
    >
      {/* Section Header */}
      <div className="mb-16">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="text-3xl md:text-5xl font-bold text-white uppercase tracking-tight"
        >
          Let’s Work <span className="text-lime-400 font-light italic">Together</span>
        </motion.h2>
        <div className="w-20 h-1 bg-lime-400 mt-4" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Side: Contact Details (Clickable) */}
        <div className="lg:col-span-5 space-y-6">
          <p className="text-zinc-400 text-lg max-w-md leading-relaxed">
            I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I’ll try my best to get back to you!
          </p>

          <div className="space-y-4">
            {/* Email - Clickable */}
            <a 
              href="mailto:tumithasan1@gmail.com" 
              className="flex items-center gap-4 p-5 bg-zinc-900/50 border border-zinc-800 rounded-2xl hover:border-lime-400/50 transition-all group"
            >
              <div className="text-lime-400 text-xl group-hover:scale-110 transition-transform">
                <FaEnvelope />
              </div>
              <div>
                <p className="text-xs uppercase font-bold text-zinc-500 tracking-widest">Mail Me</p>
                <p className="text-zinc-200 font-medium">tumithasan1@gmail.com</p>
              </div>
            </a>

            {/* WhatsApp - Clickable */}
            <a 
              href="https://wa.me/8801611960330" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-4 p-5 bg-zinc-900/50 border border-zinc-800 rounded-2xl hover:border-lime-400/50 transition-all group"
            >
              <div className="text-lime-400 text-xl group-hover:scale-110 transition-transform">
                <FaWhatsapp />
              </div>
              <div>
                <p className="text-xs uppercase font-bold text-zinc-500 tracking-widest">WhatsApp</p>
                <p className="text-zinc-200 font-medium">+880 1611-960330</p>
              </div>
            </a>

            {/* Location - Static but Professional */}
            <div className="flex items-center gap-4 p-5 bg-zinc-900/50 border border-zinc-800 rounded-2xl">
              <div className="text-lime-400 text-xl">
                <FaMapMarkerAlt />
              </div>
              <div>
                <p className="text-xs uppercase font-bold text-zinc-500 tracking-widest">Location</p>
                <p className="text-zinc-200 font-medium">Satkhira, Bangladesh</p>
              </div>
            </div>
          </div>

          {/* Social Links - All Clickable */}
          <div className="flex gap-4 pt-4">
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
                className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center text-xl text-zinc-400 hover:text-lime-400 hover:border-lime-400 transition-all"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Right Side: Clean Professional Form */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-7"
        >
          <form
            ref={form}
            onSubmit={sendEmail}
            className="bg-zinc-900/30 border border-zinc-800 p-8 md:p-10 rounded-[2rem] space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase ml-1">Full Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. John Doe"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-4 text-white outline-none focus:border-lime-400 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase ml-1">Email Address</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="e.g. john@example.com"
                  className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-4 text-white outline-none focus:border-lime-400 transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-500 uppercase ml-1">Message</label>
              <textarea
                name="message"
                required
                placeholder="How can I help you?"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-4 h-40 text-white outline-none focus:border-lime-400 transition-colors resize-none"
              ></textarea>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="w-full md:w-auto px-10 py-4 bg-lime-400 hover:bg-lime-500 text-black font-bold uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-3 shadow-lg shadow-lime-900/20"
            >
              Send Message
              <FaPaperPlane className="text-sm" />
            </motion.button>
          </form>
        </motion.div>

      </div>
    </section>
  );
};

export default Contact;