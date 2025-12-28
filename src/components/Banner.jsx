import { FaDownload, FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import banner from "../assets/myImg.png";
import { useContext } from "react";
import { motion } from "framer-motion";
import { NavigateContext } from "../context/NavigateProvider";
import { Typewriter } from "react-simple-typewriter";

const Banner = () => {
    const { homeRef, contactRef, scrollToSection } = useContext(NavigateContext);

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.3 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } }
    };

    return (
        <section
            ref={homeRef}
            className="relative min-h-screen flex items-center justify-center px-6 md:px-12 lg:px-24 py-20 overflow-hidden "
        >
            {/* --- Background Aesthetic Elements --- */}
            {/* <div className="absolute top-20 left-10 w-72 h-72 bg-lime-400/10 blur-[120px] rounded-full" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/5 blur-[150px] rounded-full" /> */}
            
            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
                
                {/* --- Left Content Section (Col-7) --- */}
                <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="lg:col-span-7 text-center lg:text-left order-2 lg:order-1"
                >
                    <motion.span 
                        variants={itemVariants}
                        className="inline-block px-4 py-1.5 rounded-full bg-lime-400/10 border border-lime-400/20 text-lime-400 text-sm font-bold tracking-widest uppercase mb-6"
                    >
                        Available for Freelance
                    </motion.span>

                    <motion.h1 
                        variants={itemVariants}
                        className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-[1.1] tracking-tighter"
                    >
                        I Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-emerald-500">Digital</span> <br /> Masterpieces.
                    </motion.h1>
                    
                    <motion.div variants={itemVariants} className="text-xl md:text-2xl text-zinc-400 font-medium mb-8">
                        I am <span className="text-white font-bold">Tumit Hasan</span>, a{" "}
                        <span className="text-lime-400 italic">
                            <Typewriter
                                words={['MERN Stack Developer', 'Solution Architect', 'React Expert', 'Clean Code Enthusiast']}
                                loop={0}
                                cursor
                                cursorStyle="_"
                                typeSpeed={50}
                                deleteSpeed={30}
                                delaySpeed={2000}
                            />
                        </span>
                    </motion.div>

                    <motion.p variants={itemVariants} className="text-zinc-500 text-lg mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                        Transforming complex problems into elegant, high-performance web applications with the 
                        <span className="text-zinc-300 font-semibold"> MERN ecosystem</span>. 
                        Focused on scalability and user-centric design.
                    </motion.p>

                    {/* Action Buttons */}
                    <motion.div variants={itemVariants} className="flex flex-wrap gap-5 justify-center lg:justify-start mb-12">
                        <button
                            onClick={() => scrollToSection(contactRef)}
                            className="relative group px-10 py-4 bg-lime-400 text-black font-black rounded-xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_30px_rgba(163,230,53,0.5)]"
                        >
                            <span className="relative z-10">HIRE ME NOW</span>
                            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                        </button>
                        
                        <a
                            href="https://drive.google.com/file/d/1P61zXG4Ryuh2Z445UwzTpP0Uljt0SvjY/view?usp=sharing"
                            target="_blank"
                            className="flex items-center gap-3 px-8 py-4 border border-zinc-800 text-white font-bold rounded-xl hover:bg-zinc-900 transition-all duration-300"
                        >
                            Get Resume <FaDownload className="text-lime-400 text-sm" />
                        </a>
                    </motion.div>

                    {/* Socials */}
                    <motion.div variants={itemVariants} className="flex items-center justify-center lg:justify-start gap-6">
                        <span className="text-zinc-600 text-sm font-bold uppercase tracking-widest">Follow Me —</span>
                        <div className="flex gap-4">
                            {[
                                { icon: <FaGithub />, link: "https://github.com/tumit-h-r-75" },
                                { icon: <FaLinkedin />, link: "https://www.linkedin.com/in/tumit-hasan-rafi/" },
                                { icon: <FaFacebook />, link: "https://www.facebook.com/tumit.hasan.rafi.2025" }
                            ].map((item, i) => (
                                <a 
                                    key={i} 
                                    href={item.link} 
                                    className="text-zinc-400 hover:text-lime-400 transition-colors text-xl"
                                >
                                    {item.icon}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>

                {/* --- Right Image Section (Col-5) --- */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                    className="lg:col-span-5 flex justify-center lg:justify-end order-1 lg:order-2"
                >
                    <div className="relative">
                        {/* Glowing Backdrop */}
                        <div className="absolute inset-0 bg-lime-400/20 blur-[100px] rounded-full animate-pulse" />
                        
                        {/* Main Image Frame */}
                        <div className="relative z-10 w-72 h-[400px] md:w-96 md:h-[500px] rounded-[3rem] overflow-hidden border-2 border-white/5 bg-zinc-900 group">
                            <img
                                src={banner}
                                alt="Tumit Hasan"
                                className="w-full h-full object-cover object-top transition-transform duration-1000 group-hover:scale-110"
                            />
                            
                            {/* Floating Stats or Glass Badge */}
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[80%] backdrop-blur-xl bg-white/5 border border-white/10 p-4 rounded-2xl text-center">
                                <p className="text-xs text-zinc-400 uppercase font-bold tracking-[0.2em] mb-1">Experience</p>
                                <p className="text-white font-black text-xl">1+ Year Product</p>
                            </div>
                        </div>

                        {/* Geometric Accents */}
                        <div className="absolute -top-10 -left-10 w-24 h-24 border-t-4 border-l-4 border-lime-400 rounded-tl-3xl" />
                        <div className="absolute -bottom-10 -right-10 w-24 h-24 border-b-4 border-r-4 border-zinc-800 rounded-br-3xl" />
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default Banner;