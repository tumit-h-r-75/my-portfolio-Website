import { useContext, useRef } from "react";
import {
  FaBolt,
  FaCheck,
  FaClock,
  FaEnvelope,
  FaFacebook,
  FaFolderOpen,
  FaGithub,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaRegEdit,
  FaRegUser,
  FaShieldAlt,
  FaWhatsapp,
} from "react-icons/fa";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { NavigateContext } from "../context/NavigateProvider";
import MagicBentoPanel from "../components/MagicBento/MagicBento";
import DecryptLabel from "../components/DecryptLabel";
import BorderGlow from "../components/BorderGlow/BorderGlow";
import { glowTheme } from "../components/BorderGlow/glowTheme";

const Contact = () => {
  const { contactRef } = useContext(NavigateContext);
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Sending Message...",
      text: "Please wait while we process your request.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
      background: "#18181b",
      color: "#fff",
    });

    const sendToOwner = emailjs.sendForm(
      "service_48upolr",
      "template_llgo81r",
      form.current,
      { publicKey: "O_KNMjs2MVnNwEPJZ" }
    );

    const sendToUser = emailjs.sendForm(
      "service_48upolr",
      "template_auto_reply",
      form.current,
      { publicKey: "O_KNMjs2MVnNwEPJZ" }
    ).catch((err) => {
      console.warn("Auto-reply failed (Template might not be set up yet):", err);
      return null;
    });

    Promise.all([sendToOwner, sendToUser]).then(
      ([, userRes]) => {
        e.target.reset();

        let successMessage = "Thank you! I've received your message. I'll get back to you soon.";
        if (userRes) {
          successMessage = "Thank you! I've received your message and sent a confirmation to your email. I'll get back to you soon.";
        }

        Swal.fire({
          title: "Message Sent!",
          text: successMessage,
          icon: "success",
          background: "#18181b",
          color: "#fff",
          confirmButtonColor: "#84cc16",
        });
      },
      (error) => {
        console.error("FAILED TO SEND OWNER NOTIFICATION:", error);
        Swal.fire({
          title: "Oops!",
          text: "Something went wrong while sending your message. Please try again or contact me directly via email.",
          icon: "error",
          background: "#18181b",
          color: "#fff",
          confirmButtonColor: "#ef4444",
        });
      }
    );
  };

  const contactCards = [
    {
      label: "Email",
      value: "tumithasan1@gmail.com",
      helper: "Click to mail",
      icon: <FaEnvelope />,
      href: "mailto:tumithasan1@gmail.com",
    },
    {
      label: "WhatsApp",
      value: "+880 1611-960330",
      helper: "Chat with me",
      icon: <FaWhatsapp />,
      href: "https://wa.me/8801611960330",
    },
    {
      label: "Location",
      value: "Satkhira, Bangladesh",
      helper: "Local time: GMT +6",
      icon: <FaMapMarkerAlt />,
    },
  ];

  const socialLinks = [
    { label: "GitHub", icon: <FaGithub />, link: "https://github.com/tumit-h-r-75" },
    { label: "LinkedIn", icon: <FaLinkedin />, link: "https://www.linkedin.com/in/tumit-hasan-rafi/" },
    { label: "Facebook", icon: <FaFacebook />, link: "https://www.facebook.com/tumit.hasan.rafi.2025" },
  ];

  const trustItems = [
    { icon: <FaShieldAlt />, title: "100% Privacy", text: "Your data is safe" },
    { icon: <FaClock />, title: "Quick Response", text: "I'll reply soon" },
    { icon: <FaCheck />, title: "No Spam", text: "Only real replies" },
  ];

  return (
    <section
      ref={contactRef}
      id="contact"
      className="contact-neon-section relative overflow-hidden px-4 py-20 sm:px-6 md:px-10 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-32 top-0 h-72 w-72 rounded-full border border-lime-400/10" />
        <div className="absolute bottom-0 left-0 h-56 w-56 rounded-full border border-lime-400/20 blur-[1px]" />
        <span className="absolute left-[8%] top-[10%] h-2 w-2 rounded-full bg-lime-400 shadow-[0_0_24px_rgba(163,230,53,.95)]" />
        <span className="absolute right-[9%] top-[18%] h-1.5 w-1.5 rounded-full bg-lime-400 shadow-[0_0_20px_rgba(163,230,53,.9)]" />
        <span className="absolute bottom-[19%] left-[42%] h-1.5 w-1.5 rounded-full bg-lime-400 shadow-[0_0_18px_rgba(163,230,53,.8)]" />
      </div>

      <div className="relative mx-auto max-w-[96rem]">
        <div className="pointer-events-none absolute -top-20 left-0 select-none text-[7rem] font-black uppercase leading-none text-lime-400/[0.035] sm:text-[10rem] lg:text-[13rem]">
          Contact
        </div>

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55 }}
            className="lg:col-span-6"
          >
            <div className="mb-8 inline-flex items-center gap-3 text-xs font-bold uppercase tracking-[0.4em] text-lime-400">
              <span className="h-3 w-3 rounded-full bg-lime-400 shadow-[0_0_20px_rgba(163,230,53,.95)]" />
              <span className="h-px w-12 bg-lime-400" />
              Get In Touch
            </div>

            <h2 className="max-w-3xl text-4xl font-black uppercase leading-[0.95] text-white sm:text-5xl md:text-6xl xl:text-7xl">
              Let's build <span className="text-lime-400">something great</span> together.
            </h2>

            <div className="mt-7 flex flex-wrap gap-3">
              <div className="inline-flex min-h-14 items-center gap-3 rounded-xl border border-lime-400/20 bg-lime-400/[0.06] px-5 text-sm font-semibold text-white shadow-[0_0_28px_rgba(163,230,53,.08)]">
                <span className="h-3 w-3 rounded-full bg-lime-400 shadow-[0_0_18px_rgba(163,230,53,.9)]" />
                Available for new opportunities
              </div>
              <div className="inline-flex min-h-14 items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-5 text-xs text-zinc-400">
                <span className="grid h-9 w-9 place-items-center rounded-lg border border-lime-400/20 text-lime-400">
                  <FaBolt />
                </span>
                <span>
                  Usually replies <strong className="block text-lime-400">within 2 hours</strong>
                </span>
              </div>
            </div>

            <p className="mt-7 max-w-xl text-base leading-8 text-zinc-400 md:text-lg">
              I&apos;m currently looking for new opportunities. Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
              {contactCards.map((item) => {
                const CardTag = item.href ? "a" : "div";

                return (
                  <MagicBentoPanel
                    key={item.label}
                    as={CardTag}
                    href={item.href}
                    target={item.href?.startsWith("http") ? "_blank" : undefined}
                    rel={item.href?.startsWith("http") ? "noreferrer" : undefined}
                    className="group min-h-48 rounded-2xl border border-white/10 bg-zinc-950/70 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,.08)]"
                  >
                    <div className="relative z-10 flex h-full flex-col justify-between">
                      <div className="flex items-start justify-between gap-3">
                        <span className="grid h-12 w-12 place-items-center rounded-full border border-lime-400/20 bg-lime-400/[0.06] text-xl text-lime-400 shadow-[0_0_24px_rgba(163,230,53,.16)] transition-transform group-hover:scale-110">
                          {item.icon}
                        </span>
                        {item.href && (
                          <span className="grid h-8 w-8 place-items-center rounded-full border border-lime-400/20 text-xs text-lime-400 transition-transform group-hover:translate-x-1">
                            <FaCheck />
                          </span>
                        )}
                      </div>

                      <div className="min-w-0">
                        <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-zinc-500">{item.label}</p>
                        <p className="mt-2 break-words text-sm font-bold leading-5 text-white">{item.value}</p>
                        <p className="mt-3 text-sm text-zinc-500">{item.helper}</p>
                      </div>
                    </div>
                  </MagicBentoPanel>
                );
              })}
            </div>

            <div className="mt-7 flex items-center gap-4">
              <span className="h-px flex-1 border-t border-dashed border-lime-400/20" />
              <span className="text-xs font-bold uppercase tracking-[0.35em] text-lime-400">Let&apos;s Connect</span>
              <span className="h-px flex-1 border-t border-dashed border-lime-400/20" />
            </div>

            <div className="mt-7 flex justify-center gap-8 sm:justify-start">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.link}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="group grid gap-3 text-center text-xs text-zinc-500"
                >
                  <span className="grid h-16 w-16 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-2xl text-white shadow-[inset_0_1px_0_rgba(255,255,255,.08)] transition-all group-hover:border-lime-400/50 group-hover:text-lime-400 group-hover:shadow-[0_0_28px_rgba(163,230,53,.18)]">
                    {social.icon}
                  </span>
                  <span>{social.label}</span>
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="lg:col-span-6"
          >
            <BorderGlow {...glowTheme} backgroundColor="#050607" borderRadius={32} animated>
              <MagicBentoPanel
                as="form"
                ref={form}
                onSubmit={sendEmail}
                className="rounded-[2rem] border border-white/10 bg-[linear-gradient(145deg,rgba(24,24,27,.88),rgba(3,4,5,.95))] p-5 shadow-[0_24px_90px_rgba(0,0,0,.45)] sm:p-7 md:p-10"
              >
                <div className="relative z-10">
                  <div className="mb-9 flex items-center justify-between gap-5">
                    <div className="flex items-center gap-5">
                      <span className="grid h-16 w-16 shrink-0 place-items-center rounded-full border border-lime-400/20 bg-lime-400/[0.06] text-3xl text-lime-400 shadow-[0_0_32px_rgba(163,230,53,.16)]">
                        <FaPaperPlane />
                      </span>
                      <div>
                        <h3 className="text-2xl font-black uppercase text-white">Send me a message</h3>
                        <p className="mt-1 text-sm text-zinc-400 md:text-base">Tell me about your project or idea.</p>
                      </div>
                    </div>
                    <div className="hidden gap-2 sm:flex">
                      <span className="h-2 w-2 rounded-full border border-lime-400" />
                      <span className="h-2 w-2 rounded-full border border-lime-400" />
                      <span className="h-2 w-2 rounded-full border border-lime-400" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-500">Full Name</label>
                      <div className="group flex min-h-16 items-center rounded-xl border border-white/10 bg-white/[0.04] px-5 transition-colors focus-within:border-lime-400/80">
                        <input
                          type="text"
                          name="name"
                          required
                          placeholder="e.g. John Doe"
                          className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-500 md:text-base"
                        />
                        <FaRegUser className="ml-3 shrink-0 text-xl text-lime-400" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-500">Email Address</label>
                      <div className="group flex min-h-16 items-center rounded-xl border border-white/10 bg-white/[0.04] px-5 transition-colors focus-within:border-lime-400/80">
                        <input
                          type="email"
                          name="email"
                          required
                          placeholder="e.g. john@example.com"
                          className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-500 md:text-base"
                        />
                        <FaEnvelope className="ml-3 shrink-0 text-xl text-lime-400" />
                      </div>
                    </div>
                  </div>

                  <div className="mt-7 space-y-2">
                    <label className="text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-500">Subject (Optional)</label>
                    <div className="group flex min-h-16 items-center rounded-xl border border-white/10 bg-white/[0.04] px-5 transition-colors focus-within:border-lime-400/80">
                      <input
                        type="text"
                        name="subject"
                        placeholder="e.g. Project Inquiry"
                        className="w-full bg-transparent text-sm text-white outline-none placeholder:text-zinc-500 md:text-base"
                      />
                      <FaFolderOpen className="ml-3 shrink-0 text-xl text-lime-400" />
                    </div>
                  </div>

                  <div className="mt-7 space-y-2">
                    <label className="text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-500">Your Message</label>
                    <div className="group flex min-h-40 rounded-xl border border-white/10 bg-white/[0.04] p-5 transition-colors focus-within:border-lime-400/80">
                      <textarea
                        name="message"
                        required
                        placeholder="How can I help you?"
                        className="h-32 w-full resize-none bg-transparent text-sm text-white outline-none placeholder:text-zinc-500 md:text-base"
                      ></textarea>
                      <FaRegEdit className="mt-auto shrink-0 text-xl text-lime-400" />
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="mt-8 flex min-h-16 w-full items-center justify-center gap-4 rounded-xl bg-lime-400 px-6 text-sm font-black uppercase tracking-[0.2em] text-black shadow-[0_16px_45px_rgba(163,230,53,.28)] transition-colors hover:bg-lime-300"
                  >
                    <DecryptLabel text="Send Message" animateOn="hover" sequential={false} maxIterations={8} speed={35} parentClassName="text-black font-black" className="text-black" encryptedClassName="text-zinc-700" />
                    <FaPaperPlane className="shrink-0 text-base" />
                  </motion.button>

                  <div className="mt-8 grid grid-cols-1 rounded-xl border border-white/10 bg-white/[0.025] p-4 text-sm sm:grid-cols-3">
                    {trustItems.map((item) => (
                      <div key={item.title} className="flex items-center gap-3 border-white/10 py-2 sm:border-l sm:px-5 first:sm:border-l-0">
                        <span className="text-2xl text-lime-400">{item.icon}</span>
                        <span>
                          <strong className="block font-semibold text-zinc-200">{item.title}</strong>
                          <span className="text-xs text-zinc-500">{item.text}</span>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </MagicBentoPanel>
            </BorderGlow>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
