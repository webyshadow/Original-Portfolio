'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

// ================== PROJECT DATA ==================
interface Project {
  id: number;
  serialNumber: string;
  name: string;
  mainImages: string[]; // Multiple images for slideshow
  bottomImages: string[]; // Multiple images for slideshow
  description: string;
  accentColor: string;
}

const projects: Project[] = [
    {
    id: 1,
    serialNumber: 'PROJECT 1',
    name: 'kabosu',
    mainImages: [
      '/images/kabosu/1.png',
      '/images/kabosu/2.png',
      '/images/kabosu/3.png',
    ],
    bottomImages: [
      '/images/kabosu/4.png',
      '/images/kabosu/5.png',
      '/images/kabosu/6.png',
    ],
    description:
      'Degen is an innovative digital art platform that revolutionizes blockchain-based creations. It seamlessly integrates generative algorithms with user-driven creative controls, empowering artists to explore limitless possibilities in digital expression. The platform fosters a vibrant community where creators and collectors interact directly, ensuring authenticity and provenance through decentralized ledgers. With a focus on user experience, Degen offers intuitive tools for designing, minting, and trading unique digital assets, pushing the boundaries of art ownership in the Web3 era. This project highlights collaboration between artists and technologists to pioneer new frontiers in creative blockchain applications Degen is an innovative digital art platform that revolutionizes blockchain-based creations. ',
    accentColor: '#F59E0B',
  },

  {
    id: 2,
    serialNumber: 'PROJECT 2',
    name: 'beauty',
    mainImages: [
      '/images/beautybliss/1.png',
      '/images/beautybliss/2.png',
      '/images/beautybliss/3.png',
    ],
    bottomImages: [
      '/images/beautybliss/3.png',
      '/images/beautybliss/4.png',
    ],
    description:
      'Degen is an innovative digital art platform that revolutionizes blockchain-based creations. It seamlessly integrates generative algorithms with user-driven creative controls, empowering artists to explore limitless possibilities in digital expression. The platform fosters a vibrant community where creators and collectors interact directly, ensuring authenticity and provenance through decentralized ledgers. With a focus on user experience, Degen offers intuitive tools for designing, minting, and trading unique digital assets, pushing the boundaries of art ownership in the Web3 era. This project highlights collaboration between artists and technologists to pioneer new frontiers in creative blockchain applications Degen is an innovative digital art platform that revolutionizes blockchain-based creations. ',
    accentColor: '#EC4899',
  },
  {
    id: 3,
    serialNumber: 'PROJECT 3',
    name: 'deploy',
    mainImages: [
      '/images/deploy/1.png',
      '/images/deploy/2.png',
      '/images/deploy/3.png',
      '/images/deploy/4.png',
    ],
    bottomImages: [
      '/images/deploy/5.png',
      '/images/deploy/6.png',
      '/images/deploy/7.png',
      '/images/deploy/8.png',
    ],
    description:
      'Degen is an innovative digital art platform that revolutionizes blockchain-based creations. It seamlessly integrates generative algorithms with user-driven creative controls, empowering artists to explore limitless possibilities in digital expression. The platform fosters a vibrant community where creators and collectors interact directly, ensuring authenticity and provenance through decentralized ledgers. With a focus on user experience, Degen offers intuitive tools for designing, minting, and trading unique digital assets, pushing the boundaries of art ownership in the Web3 era. This project highlights collaboration between artists and technologists to pioneer new frontiers in creative blockchain applications Degen is an innovative digital art platform that revolutionizes blockchain-based creations. ',
    accentColor: '#10B981',
  },
    {
    id: 4,
    serialNumber: 'PROJECT 4',
    name: 'degen',
    mainImages: [
      '/images/degen/1.png',
      '/images/degen/3.png',
      '/images/degen/2.png',
    ],
    bottomImages: [
      '/images/degen/1.png',
      '/images/degen/2.png',
    ],
    description:
      'Degen is an innovative digital art platform that revolutionizes blockchain-based creations. It seamlessly integrates generative algorithms with user-driven creative controls, empowering artists to explore limitless possibilities in digital expression. The platform fosters a vibrant community where creators and collectors interact directly, ensuring authenticity and provenance through decentralized ledgers. With a focus on user experience, Degen offers intuitive tools for designing, minting, and trading unique digital assets, pushing the boundaries of art ownership in the Web3 era. This project highlights collaboration between artists and technologists to pioneer new frontiers in creative blockchain applications Degen is an innovative digital art platform that revolutionizes blockchain-based creations.  ',
    accentColor: '#6366F1',
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

  // Enter key listener
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && showShowcase) {
        handleNextProject();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showShowcase]);

  return (
    <section className="relative w-full min-h-screen bg-white overflow-hidden">
      {/* ========== TOP WORKS SECTION ========== */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center z-10"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: showShowcase ? 0 : 1,
          scale: showShowcase ? 1.2 : 1,
          filter: showShowcase ? 'blur(20px)' : 'blur(0px)'
        }}
        transition={{ 
          duration: 1.2,
          ease: [0.76, 0, 0.24, 1]
        }}
        style={{ pointerEvents: showShowcase ? 'none' : 'auto' }}
      >
        <motion.h2
          className="text-6xl md:text-8xl lg:text-9xl xl:text-[12rem] font-bold tracking-tighter px-4"
          initial={{ opacity: 0, y: 80, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 1.4, 
            ease: [0.76, 0, 0.24, 1],
            delay: 0.2
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
            ease: [0.76, 0, 0.24, 1]
          }}
        >
          A showcase of my finest creations
        </motion.p>
      </motion.div>

      {/* ========== PROJECT SHOWCASE SECTION ========== */}
      {showShowcase && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 1.4,
            ease: [0.76, 0, 0.24, 1],
            delay: 0.3
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
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHoveringImage, setIsHoveringImage] = useState(false);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [bottomImageIndex, setBottomImageIndex] = useState(0);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Auto-slideshow intervals updated for slower speed
  useEffect(() => {
    const interval = setInterval(() => {
      setMainImageIndex((prev) => (prev + 1) % project.mainImages.length);
    }, 8000); // 8 seconds

    return () => clearInterval(interval);
  }, [project.mainImages.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setBottomImageIndex((prev) => (prev + 1) % project.bottomImages.length);
    }, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, [project.bottomImages.length]);

  // Reset image indices when project changes
  useEffect(() => {
    setMainImageIndex(0);
    setBottomImageIndex(0);
  }, [project.id]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isHoveringImage) {
        setCursorPosition({
          x: e.clientX,
          y: e.clientY,
        });
      }
    };

    if (isHoveringImage) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isHoveringImage]);

  return (
    <AnimatePresence mode="wait">
      <motion.section 
        key={project.id}
        className='flex flex-col lg:flex-row w-full min-h-screen overflow-hidden'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Left Side - Images */}
        <motion.div 
          className='w-full lg:w-[70%] xl:w-[75%]'
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ 
            duration: 1.2,
            ease: [0.76, 0, 0.24, 1],
            delay: 0.2
          }}
        >
          <div className='relative w-full h-screen'>
            {/* Cursive Project Name */}
            <motion.div 
              className='absolute right-[5vw] top-[65%] -translate-y-1/2 pointer-events-none z-10 max-w-[35vw] lg:max-w-[30vw] break-words'
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 1.2,
                ease: [0.76, 0, 0.24, 1],
                delay: 0.8
              }}
            >
              <h2
                className='text-4xl md:text-5xl lg:text-6xl xl:text-[10vw] leading-tight'
                style={{
                  fontFamily: '"Great Vibes", cursive',
                  color: 'rgb(240, 129, 15)',
                  textShadow: '0 0 20px rgba(240, 129, 15, 0.6), 0 0 40px rgba(240, 129, 15, 0.4), 0 0 60px rgba(240, 129, 15, 0.2)'
                }}
              >
                {project.name}
              </h2>
            </motion.div>

            {/* Background Text */}
            <motion.div 
              className='absolute -top-4 w-full h-full'
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              transition={{ 
                duration: 1.5,
                ease: [0.76, 0, 0.24, 1],
                delay: 0.3
              }}
            >
              <h3 
                className='text-[15vw] lg:text-[18vw] text-center font-black tracking-wider text-black' 
                style={{ fontFamily: 'Bebas Neue, sans-serif'}}
              >
                {project.serialNumber}
              </h3>
            </motion.div>

            {/* Images Container */}
            <div 
              ref={imageContainerRef}
              className='absolute top-[12vw] lg:top-[12vw] right-0 lg:right-[5vw] xl:right-[7vw] w-full px-6 lg:px-12'
              onMouseEnter={() => setIsHoveringImage(true)}
              onMouseLeave={() => setIsHoveringImage(false)}
              style={{ cursor: isHoveringImage ? 'none' : 'auto' }}
            >
              <div className='flex justify-center'>
                <div className='relative w-[90%] lg:w-[85%] xl:w-[80%]'>
                  {/* Main Image with Slideshow */}
                  <motion.div 
                    className='relative w-full aspect-video overflow-hidden'
                    initial={{ opacity: 0, scale: 0.9, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ 
                      duration: 1.3,
                      ease: [0.76, 0, 0.24, 1],
                      delay: 0.5
                    }}
                  >
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={`main-${mainImageIndex}`}
                        src={project.mainImages[mainImageIndex]}
                        alt={`${project.name} main ${mainImageIndex + 1}`}
                        className='w-full h-full object-cover rounded-lg lg:rounded-none absolute inset-0'
                        width={1920}
                        height={1080}
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ 
                          duration: 1,
                          ease: [0.76, 0, 0.24, 1]
                        }}
                      />
                    </AnimatePresence>
                  </motion.div>

                  {/* Bottom Image with Slideshow */}
                  <motion.div 
                    className='absolute -bottom-8 lg:-bottom-12 left-4 lg:left-8 w-[35%] lg:w-[30%] aspect-video overflow-hidden'
                    initial={{ opacity: 0, scale: 0.8, y: 30 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ 
                      duration: 1.2,
                      ease: [0.76, 0, 0.24, 1],
                      delay: 0.7
                    }}
                  >
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={`bottom-${bottomImageIndex}`}
                        src={project.bottomImages[bottomImageIndex]}
                        alt={`${project.name} detail ${bottomImageIndex + 1}`}
                        className='w-full h-full object-cover rounded-lg lg:rounded-none absolute inset-0'
                        width={1920}
                        height={1080}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ 
                          duration: 0.8,
                          ease: [0.76, 0, 0.24, 1]
                        }}
                      />
                    </AnimatePresence>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Side - Description */}
        <motion.div 
          className='w-full lg:w-[30%] xl:w-[25%] bg-white flex flex-col px-6 lg:px-0'
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ 
            duration: 1.2,
            ease: [0.76, 0, 0.24, 1],
            delay: 0.4
          }}
        >
          <div className='h-[85%] w-full flex justify-center items-center py-8 lg:py-0'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 1,
                ease: [0.76, 0, 0.24, 1],
                delay: 0.6
              }}
              className='max-w-md lg:max-w-none'
            >
              <h4 className='text-black w-full lg:w-[18vw] xl:w-[15vw] text-sm lg:text-sm leading-relaxed'>
                {project.description}
              </h4>
            </motion.div>
          </div>
          <div className='h-[15%] w-full flex justify-center items-center pb-8 lg:pb-0'>
            <motion.button 
              onClick={onNext}
              className='bg-black text-white px-6 lg:px-8 py-3 rounded-md flex items-center gap-2 hover:bg-gray-800 transition-colors text-sm'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 1,
                ease: [0.76, 0, 0.24, 1],
                delay: 0.8
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              next project
              <ArrowRight size={18} />
            </motion.button>
          </div>
        </motion.div>
      </motion.section>
    </AnimatePresence>
  );
}
