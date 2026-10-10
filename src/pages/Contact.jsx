import { useContext, useState } from "react";
import {
  FaEnvelope,
  FaFacebook,
  FaGithub,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaShieldAlt,
  FaWhatsapp,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { NavigateContext } from "../context/NavigateContext";
import { publicApi } from "../lib/publicApi";

// SweetAlert2 is only downloaded when someone actually submits the form
const loadSwal = () => import("sweetalert2").then((m) => m.default);

const contactMethods = [
  { label: "Email", value: "tumithasan1@gmail.com", icon: <FaEnvelope />, href: "mailto:tumithasan1@gmail.com" },
  { label: "WhatsApp", value: "+880 1611-960330", icon: <FaWhatsapp />, href: "https://wa.me/8801611960330" },
  { label: "Location", value: "Satkhira, Bangladesh (GMT+6)", icon: <FaMapMarkerAlt /> },
];

const socialLinks = [
  { label: "GitHub", icon: <FaGithub />, link: "https://github.com/tumit-h-r-75" },
  { label: "LinkedIn", icon: <FaLinkedin />, link: "https://www.linkedin.com/in/tumit-hasan-rafi/" },
  { label: "Facebook", icon: <FaFacebook />, link: "https://www.facebook.com/tumit.hasan.rafi.2025" },
];

const fieldClass =
  "w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-lime-400/70 focus:bg-white/[0.05]";
const labelClass = "mb-2 block text-xs font-medium text-zinc-400";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
};

const Contact = () => {
  const { contactRef } = useContext(NavigateContext);
  const [sending, setSending] = useState(false);

  // Sends the form to the backend (/api/contact), which emails it via Nodemailer
  const sendEmail = async (e) => {
    e.preventDefault();
    if (sending) return;

    const formEl = e.currentTarget;
    const payload = Object.fromEntries(new FormData(formEl).entries());

    setSending(true);
    const Swal = await loadSwal();
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

    try {
      const result = await publicApi.sendContactMessage(payload);
      formEl.reset();

      const successMessage = result.autoReplySent
        ? "Thank you! I've received your message and sent a confirmation to your email. I'll get back to you soon."
        : "Thank you! I've received your message. I'll get back to you soon.";

      Swal.fire({
        title: "Message Sent!",
        text: successMessage,
        icon: "success",
        background: "#18181b",
        color: "#fff",
        confirmButtonColor: "#84cc16",
      });
    } catch (error) {
      console.error("FAILED TO SEND MESSAGE:", error);
      Swal.fire({
        title: "Oops!",
        text: error.message || "Something went wrong while sending your message. Please try again or contact me directly via email.",
        icon: "error",
        background: "#18181b",
        color: "#fff",
        confirmButtonColor: "#ef4444",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <section ref={contactRef} id="contact" className="relative px-4 py-20 sm:px-6 md:px-10 md:py-28">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
        {/* ---------- left: intro + direct contacts ---------- */}
        <motion.div {...fadeUp} className="lg:col-span-5">
          <div className="mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.3em] text-lime-400">
            <span className="h-px w-10 bg-lime-400" />
            Get in touch
          </div>

          <h2 className="text-4xl font-black leading-tight text-white md:text-5xl">
            Let&apos;s build <span className="text-lime-400">something great</span> together.
          </h2>

          <p className="mt-5 max-w-md leading-relaxed text-zinc-400">
            Have a project, a role or just a question? Send a message — I&apos;ll get back to you as soon as I can.
          </p>

          <p className="mt-5 inline-flex items-center gap-2.5 text-sm text-zinc-300">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime-400 opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-lime-400" />
            </span>
            Available for new projects · usually replies within 2 hours
          </p>

          <ul className="mt-9 divide-y divide-white/[0.06] border-y border-white/[0.06]">
            {contactMethods.map((item) => {
              const Row = item.href ? "a" : "div";
              return (
                <li key={item.label}>
                  <Row
                    {...(item.href
                      ? {
                          href: item.href,
                          target: item.href.startsWith("http") ? "_blank" : undefined,
                          rel: item.href.startsWith("http") ? "noreferrer" : undefined,
                        }
                      : {})}
                    className="group flex items-center gap-4 py-4"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/[0.04] text-lime-400">
                      {item.icon}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500">
                        {item.label}
                      </span>
                      <span
                        className={`block truncate text-sm font-semibold text-zinc-100 ${
                          item.href ? "transition group-hover:text-lime-300" : ""
                        }`}
                      >
                        {item.value}
                      </span>
                    </span>
                  </Row>
                </li>
              );
            })}
          </ul>

          <div className="mt-7 flex gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.link}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-zinc-400 transition hover:border-lime-400/60 hover:text-lime-400"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </motion.div>

        {/* ---------- right: form ---------- */}
        <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.08 }} className="lg:col-span-7">
          <form
            onSubmit={sendEmail}
            className="rounded-3xl border border-white/10 bg-zinc-950/70 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.35)] sm:p-8"
          >
            {/* Spam trap: hidden from people, bots fill it → backend ignores the message */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute -left-[9999px] h-px w-px opacity-0"
            />

            <h3 className="text-xl font-bold text-white">Send a message</h3>
            <p className="mt-1 text-sm text-zinc-500">Tell me a little about your project or idea.</p>

            <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className={labelClass}>Full name</label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  required
                  maxLength={100}
                  placeholder="John Doe"
                  className={fieldClass}
                />
              </div>
              <div>
                <label htmlFor="contact-email" className={labelClass}>Email address</label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  required
                  maxLength={200}
                  placeholder="john@example.com"
                  className={fieldClass}
                />
              </div>
            </div>

            <div className="mt-5">
              <label htmlFor="contact-subject" className={labelClass}>
                Subject <span className="text-zinc-600">(optional)</span>
              </label>
              <input
                id="contact-subject"
                type="text"
                name="subject"
                maxLength={200}
                placeholder="Project inquiry"
                className={fieldClass}
              />
            </div>

            <div className="mt-5">
              <label htmlFor="contact-message" className={labelClass}>Message</label>
              <textarea
                id="contact-message"
                name="message"
                required
                maxLength={5000}
                rows={5}
                placeholder="How can I help you?"
                className={`${fieldClass} resize-none`}
              />
            </div>

            <button
              type="submit"
              disabled={sending}
              className="mt-6 flex w-full items-center justify-center gap-3 rounded-xl bg-lime-400 px-6 py-3.5 text-sm font-bold text-black transition hover:bg-lime-300 disabled:cursor-wait disabled:opacity-70"
            >
              {sending ? "Sending..." : "Send message"}
              <FaPaperPlane className="text-sm" />
            </button>

            <p className="mt-4 flex items-center justify-center gap-2 text-xs text-zinc-500">
              <FaShieldAlt className="text-lime-400/80" />
              Your details stay private — no spam, ever.
            </p>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
