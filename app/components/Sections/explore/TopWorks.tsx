"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

// ================== PROJECT DATA ==================
interface Project {
  id: number;
  serialNumber: string;
  name: string;
  mainImages: string[];
  bottomImages: string[];
  description: string;
  accentColor: string;
  url: string;
}

const projects: Project[] = [
  {
    id: 1,
    serialNumber: "PROJECT 1",
    name: "kabosu",
    mainImages: ["/images/kabosu/1.png", "/images/kabosu/2.png", "/images/kabosu/3.png"],
    bottomImages: ["/images/kabosu/4.png", "/images/kabosu/5.png", "/images/kabosu/6.png"],
    description:
      "Kabosu is a playful yet carefully crafted single‑page experience inspired by the legendary Shiba Inu that became the face of the Doge meme and modern meme‑coin culture. This concept project explores how to turn a meme‑driven community into a polished Web3‑ready brand website with clear token storytelling, on‑chain transparency sections and community highlights. The layout focuses on strong hero visuals, responsive UI and clean typography so holders, traders and new visitors instantly understand what Kabosu stands for without getting lost in noise. This work shows how meme projects can be presented with a professional, product‑grade interface instead of a typical low‑effort landing page. It combines smooth animations, bold branding, and conversion‑focused sections tailored for the next wave of Ethereum‑based meme tokens and NFT experiments.",
    accentColor: "#F59E0B",
    url: "https://example.com/kabosu",
  },
  {
    id: 2,
    serialNumber: "PROJECT 2",
    name: "beauty",
    mainImages: ["/images/beautybliss/1.png", "/images/beautybliss/2.png", "/images/beautybliss/3.png"],
    bottomImages: ["/images/beautybliss/3.png", "/images/beautybliss/4.png"],
    description:
      "BeautyBlussh is a single‑vendor beauty and skincare e‑commerce web app designed for a modern D2C brand that wanted a clean, conversion‑focused storefront instead of a generic template. The project includes a full product catalog with filters, variants and detailed product pages, plus cart, checkout and order tracking flows built to feel fast and mobile‑first. Special attention is given to brand storytelling through rich imagery, soft gradients, and typography that matches the tone of a premium cosmetics label. Under the hood, the app is structured for scalable SEO with clean URLs, meta data and performance‑oriented layouts to help the brand rank for targeted beauty keywords. This case shows how a custom React/Next.js e‑commerce experience can make a small beauty brand look and feel like a polished, established online store from day one.",
    accentColor: "#EC4899",
    url: "https://example.com/beautyblussh",
  },
  {
    id: 3,
    serialNumber: "PROJECT 3",
    name: "deploy",
    mainImages: [
      "/images/deploy/1.png",
      "/images/deploy/2.png",
      "/images/deploy/3.png",
      "/images/deploy/4.png",
    ],
    bottomImages: [
      "/images/deploy/5.png",
      "/images/deploy/6.png",
      "/images/deploy/7.png",
      "/images/deploy/8.png",
    ],
    description:
      "Deploy is a full‑stack dashboard concept for launching and monitoring modern Web3 and SaaS applications without overwhelming the user with raw dev tooling. The interface brings together deployment status, analytics, logs and environment configuration into a single, easy‑to‑scan layout inspired by real CI/CD and DevOps workflows. Each screen is designed to highlight the most important actions first, reducing cognitive load for founders and developers who just want to ship and iterate quickly. The project explores a component‑driven design system with reusable cards, tables and charts that adapt well to dark mode and high‑density data views. This work demonstrates how a complex technical product can still feel visually minimal, fast and human‑friendly while staying ready for real backend integrations and production deployments.",
    accentColor: "#10B981",
    url: "https://example.com/deploy",
  },
  {
    id: 4,
    serialNumber: "PROJECT 4",
    name: "degen",
    mainImages: ["/images/degen/1.png", "/images/degen/3.png", "/images/degen/2.png"],
    bottomImages: ["/images/degen/1.png", "/images/degen/2.png"],
    description:
      "Degen is a Web3‑inspired product concept that reimagines how on‑chain communities discover, track and interact with high‑risk, high‑reward crypto and NFT plays. Instead of a chaotic feed, the interface organizes degen opportunities into curated cards with clear risk labels, token metrics, and direct links to on‑chain explorers. The layout uses bold typography, neon accents and motion to capture the degen culture while still keeping the UI structured and readable. Different sections focus on watchlists, wallet‑connected dashboards and educational tooltips that help new users understand what they are aping into before they commit. This project highlights how thoughtful UX and strong visual design can make speculative Web3 products feel more transparent, trustworthy and usable without killing the fun degen energy people love.",
    accentColor: "#6366F1",
    url: "https://example.com/degen",
  },
];

// ================== MAIN COMPONENT ==================
export default function TopWorksShowcase() {
  const [showShowcase, setShowShowcase] = useState(false);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowShowcase(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const handleNextProject = () => {
    setCurrentProjectIndex((prev) => (prev + 1) % projects.length);
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Enter" && showShowcase) {
        handleNextProject();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [showShowcase]);

  return (
    <section className="relative w-full min-h-screen bg-white overflow-hidden">
      {/* TOP WORKS intro */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center z-10"
        initial={{ opacity: 0 }}
        animate={{
          opacity: showShowcase ? 0 : 1,
          scale: showShowcase ? 1.2 : 1,
          filter: showShowcase ? "blur(20px)" : "blur(0px)",
        }}
        transition={{
          duration: 1.2,
          ease: [0.76, 0, 0.24, 1],
        }}
        style={{ pointerEvents: showShowcase ? "none" : "auto" }}
      >
        <motion.h2
          className="text-6xl md:text-8xl lg:text-9xl xl:text-[12rem] font-bold tracking-tighter px-4"
          initial={{ opacity: 0, y: 80, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 1.4,
            ease: [0.76, 0, 0.24, 1],
            delay: 0.2,
          }}
        >
          <span className="bg-gradient-to-b from-black via-gray-800 to-gray-400 bg-clip-text text-transparent">
            TOP WORKS
          </span>
        </motion.h2>
        <motion.p
          className="mt-6 text-lg md:text-xl lg:text-2xl text-gray-600 max-w-2xl text-center px-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1.2,
            delay: 0.5,
            ease: [0.76, 0, 0.24, 1],
          }}
        >
          A showcase of my finest creations
        </motion.p>
      </motion.div>

      {/* PROJECT SHOWCASE */}
      {showShowcase && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1.4,
            ease: [0.76, 0, 0.24, 1],
            delay: 0.3,
          }}
        >
          <ProjectShowcase
            project={projects[currentProjectIndex]}
            onNext={handleNextProject}
          />
        </motion.div>
      )}
    </section>
  );
}

// ================== PROJECT SHOWCASE ==================
function ProjectShowcase({ project, onNext }: { project: Project; onNext: () => void }) {
  const [isHoveringImage, setIsHoveringImage] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [bottomImageIndex, setBottomImageIndex] = useState(0);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // slideshows
  useEffect(() => {
    const interval = setInterval(
      () => setMainImageIndex((prev) => (prev + 1) % project.mainImages.length),
      8000
    );
    return () => clearInterval(interval);
  }, [project.mainImages.length]);

  useEffect(() => {
    const interval = setInterval(
      () => setBottomImageIndex((prev) => (prev + 1) % project.bottomImages.length),
      10000
    );
    return () => clearInterval(interval);
  }, [project.bottomImages.length]);

  useEffect(() => {
    setMainImageIndex(0);
    setBottomImageIndex(0);
  }, [project.id]);

  // mouse move listener (global, but sphere is inside image container only)
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isHoveringImage) {
        setCursorPosition({ x: e.clientX, y: e.clientY });
      }
    };

    if (isHoveringImage) {
      window.addEventListener("mousemove", handleMouseMove);
    }
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isHoveringImage]);

  const handleSphereClick = () => {
    if (!project.url) return;
    window.open(project.url, "_blank", "noopener,noreferrer");
  };

  return (
    <AnimatePresence mode="wait">
      <motion.section
        key={project.id}
        className="flex flex-col lg:flex-row w-full min-h-screen overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Left Side - Images */}
        <motion.div
          className="w-full lg:w-[70%] xl:w-[75%]"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 1.2,
            ease: [0.76, 0, 0.24, 1],
            delay: 0.2,
          }}
        >
          <div className="relative w-full h-screen">
            {/* Cursive Project Name */}
            <motion.div
              className="absolute right-[5vw] top-[65%] -translate-y-1/2 pointer-events-none z-10 max-w-[35vw] lg:max-w-[30vw] break-words"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 1.2,
                ease: [0.76, 0, 0.24, 1],
                delay: 0.8,
              }}
            >
              <h2
                className="text-4xl md:text-5xl lg:text-6xl xl:text-[10vw] leading-tight"
                style={{
                  fontFamily: '"Great Vibes", cursive',
                  color: "rgb(240, 129, 15)",
                  textShadow:
                    "0 0 20px rgba(240, 129, 15, 0.6), 0 0 40px rgba(240, 129, 15, 0.4), 0 0 60px rgba(240, 129, 15, 0.2)",
                }}
              >
                {project.name}
              </h2>
            </motion.div>

            {/* Background Text */}
            <motion.div
              className="absolute -top-4 w-full h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{
                duration: 1.5,
                ease: [0.76, 0, 0.24, 1],
                delay: 0.3,
              }}
            >
              <h3
                className="text-[15vw] lg:text-[18vw] text-center font-black tracking-wider text-black"
                style={{ fontFamily: "Bebas Neue, sans-serif" }}
              >
                {project.serialNumber}
              </h3>
            </motion.div>

            {/* Images + custom cursor */}
            <div
              ref={imageContainerRef}
              className="absolute top-[12vw] lg:top-[12vw] right-0 lg:right-[5vw] xl:right-[7vw] w-full px-6 lg:px-12"
              onMouseEnter={() => setIsHoveringImage(true)}
              onMouseLeave={() => setIsHoveringImage(false)}
              style={{ cursor: isHoveringImage ? "none" : "auto" }}
            >
              <div className="flex justify-center">
                <div className="relative w-[90%] lg:w-[85%] xl:w-[80%]">
                  {/* Main Image */}
                  <motion.div
                    className="relative w-full aspect-video overflow-hidden"
                    initial={{ opacity: 0, scale: 0.9, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{
                      duration: 1.3,
                      ease: [0.76, 0, 0.24, 1],
                      delay: 0.5,
                    }}
                  >
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={`main-${mainImageIndex}`}
                        src={project.mainImages[mainImageIndex]}
                        alt={`${project.name} main ${mainImageIndex + 1}`}
                        className="w-full h-full object-cover rounded-lg lg:rounded-none absolute inset-0"
                        width={1920}
                        height={1080}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{
                          duration: 1,
                          ease: [0.76, 0, 0.24, 1],
                        }}
                      />
                    </AnimatePresence>
                  </motion.div>

                  {/* Bottom Image */}
                  <motion.div
                    className="absolute -bottom-8 lg:-bottom-12 left-4 lg:left-8 w-[35%] lg:w-[30%] aspect-video overflow-hidden"
                    initial={{ opacity: 0, scale: 0.8, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{
                      duration: 1.2,
                      ease: [0.76, 0, 0.24, 1],
                      delay: 0.7,
                    }}
                  >
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={`bottom-${bottomImageIndex}`}
                        src={project.bottomImages[bottomImageIndex]}
                        alt={`${project.name} detail ${bottomImageIndex + 1}`}
                        className="w-full h-full object-cover rounded-lg lg:rounded-none absolute inset-0"
                        width={1920}
                        height={1080}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{
                          duration: 0.8,
                          ease: [0.76, 0, 0.24, 1],
                        }}
                      />
                    </AnimatePresence>
                  </motion.div>

                  {/* Custom cursor sphere */}
                  {isHoveringImage && (
                    <motion.button
                      type="button"
                      onClick={handleSphereClick}
                      className="fixed z-50 flex items-center justify-center rounded-full bg-white text-black text-[11px] uppercase tracking-[0.16em] pointer-events-auto shadow-lg"
                      style={{
                        top: cursorPosition.y,
                        left: cursorPosition.x,
                        width: 90,
                        height: 90,
                        transform: "translate(-50%, -50%)",
                      }}
                      initial={{ opacity: 0, scale: 0.4 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.4 }}
                      transition={{ duration: 0.18, ease: [0.76, 0, 0.24, 1] }}
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.92 }}
                    >
                      <span className="text-center leading-tight">
                        view
                        <br />
                        project
                      </span>
                    </motion.button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Description */}
        <motion.div
          className="w-full lg:w-[30%] xl:w-[25%] bg-white flex flex-col px-6 lg:px-0"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 1.2,
            ease: [0.76, 0, 0.24, 1],
            delay: 0.4,
          }}
        >
          <div className="h-[85%] w-full flex justify-center items-center py-8 lg:py-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                ease: [0.76, 0, 0.24, 1],
                delay: 0.6,
              }}
              className="max-w-md lg:max-w-none"
            >
              <h4 className="text-black/70 w-full lg:w-[15vw] xl:w-[13vw] text-xs leading-relaxed">
                {project.description}
              </h4>
            </motion.div>
          </div>
          <div className="h-[15%] w-full flex justify-center items-center pb-[2vw]">
            <motion.button
              onClick={onNext}
              className="bg-black text-white px-6 lg:px-8 py-3 rounded-md flex items-center gap-2 hover:bg-gray-800 transition-colors text-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                ease: [0.76, 0, 0.24, 1],
                delay: 0.8,
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Next Project
              <ArrowRight size={18} />
            </motion.button>
          </div>
        </motion.div>
      </motion.section>
    </AnimatePresence>
  );
}
