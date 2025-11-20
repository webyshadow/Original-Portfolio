'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface FigmaHeroBlockProps {
  userType: string;
  setUserType: (type: string) => void;
}

export default function FigmaHeroBlock({ userType, setUserType }: FigmaHeroBlockProps) {
  const [hoveredButton, setHoveredButton] = useState<string>('project');
  const [displayedText, setDisplayedText] = useState('');
  const [suggestionText, setSuggestionText] = useState('');
  const [animationPhase, setAnimationPhase] = useState(0);
  const [shadmoanPhase, setShadmoanPhase] = useState(0);
  const [subtitlePhase, setSubtitlePhase] = useState(0);
  const [locationPhase, setLocationPhase] = useState(0);
  const [imageBlur, setImageBlur] = useState(8);
  const [imageOpacity, setImageOpacity] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [isSuggestionFlipping, setIsSuggestionFlipping] = useState(false);

  const fullText = "How can I help you today?";
  
  const getSuggestionText = () => {
    if (userType === 'hiring') return "Every needed thing is below";
    if (userType === 'explore') return "Everything you need to know is below";
    return hoveredButton === 'project' 
      ? "Not a Client? Try switching Explore / Hiring"
      : hoveredButton === 'hiring'
      ? "Ah you want to recruit me!"
      : "So you wanna know about me?";
  };

  const handleUserTypeSelect = (type: string) => {
    if (type !== userType) {
      if (type === 'hiring' || type === 'explore') {
        setIsFlipping(true);
        setIsSuggestionFlipping(true);
        
        setTimeout(() => {
          setUserType(type);
          setIsFlipping(false);
          setIsSuggestionFlipping(false);
        }, 300);
      } else {
        setUserType(type);
        setSuggestionText('');
        const newSuggestion = "Not a Client? Try switching Explore / Hiring";
        
        let suggestionIndex = 0;
        const suggestionInterval = setInterval(() => {
          if (suggestionIndex <= newSuggestion.length) {
            setSuggestionText(newSuggestion.slice(0, suggestionIndex));
            suggestionIndex++;
          } else {
            clearInterval(suggestionInterval);
          }
        }, 30);
      }
    }
  };

  const getMainText = () => {
    if (userType === 'hiring') return 'Go ahead Recruiter! Scroll now';
    if (userType === 'explore') return 'Go ahead Stalker! Scroll now';
    return 'How can I help you today?';
  };

  const getAnsariColor = () => {
    if (userType === 'hiring') return '#426e86';
    if (userType === 'explore') return '#f0810f';
    return 'black';
  };

  // Animation flow with Apple-style easing
  useEffect(() => {
    const appleEasing = [0.76, 0, 0.24, 1]; // Apple's cubic-bezier

    // 1. I AM
    const phase1Timeout = setTimeout(() => {
      setAnimationPhase(1);
    }, 100);

    // 2. Full Stack Dev
    const phase2Timeout = setTimeout(() => {
      setSubtitlePhase(1);
    }, 700);

    // Designer
    const phase2bTimeout = setTimeout(() => {
      setSubtitlePhase(2);
    }, 1050);

    // UI/UX
    const phase2cTimeout = setTimeout(() => {
      setSubtitlePhase(3);
    }, 1400);

    // 3. Image appears + SHADMAAN slides in
    const phase3Timeout = setTimeout(() => {
      setImageOpacity(1);
      setShadmoanPhase(1);
    }, 1750);

    // 4. ANSARI appears
    const phase4Timeout = setTimeout(() => {
      setShadmoanPhase(2);
    }, 2150);

    // 4.5. Location appears
    const phase4bTimeout = setTimeout(() => {
      setLocationPhase(1);
    }, 2400);

    // 5. Buttons appear
    const phase5Timeout = setTimeout(() => {
      setAnimationPhase(2);
    }, 2500);

    // 6. Typing effect + Image clears
    const phase6Timeout = setTimeout(() => {
      let index = 0;
      const typeInterval = setInterval(() => {
        if (index <= fullText.length) {
          setDisplayedText(fullText.slice(0, index));
          index++;
        } else {
          clearInterval(typeInterval);
        }
      }, 50);

      setImageBlur(0);

      setTimeout(() => {
        const initialSuggestion = "Not a Client? Try switching Explore / Hiring";
        let suggestionIndex = 0;
        const suggestionInterval = setInterval(() => {
          if (suggestionIndex <= initialSuggestion.length) {
            setSuggestionText(initialSuggestion.slice(0, suggestionIndex));
            suggestionIndex++;
          } else {
            clearInterval(suggestionInterval);
          }
        }, 30);
      }, fullText.length * 50 + 300);
    }, 2900);

    return () => {
      clearTimeout(phase1Timeout);
      clearTimeout(phase2Timeout);
      clearTimeout(phase2bTimeout);
      clearTimeout(phase2cTimeout);
      clearTimeout(phase3Timeout);
      clearTimeout(phase4Timeout);
      clearTimeout(phase4bTimeout);
      clearTimeout(phase5Timeout);
      clearTimeout(phase6Timeout);
    };
  }, []);

  useEffect(() => {
    if (animationPhase >= 2 && displayedText === fullText && userType === 'project') {
      setSuggestionText('');
      const newSuggestion = getSuggestionText();
      let suggestionIndex = 0;
      const suggestionInterval = setInterval(() => {
        if (suggestionIndex <= newSuggestion.length) {
          setSuggestionText(newSuggestion.slice(0, suggestionIndex));
          suggestionIndex++;
        } else {
          clearInterval(suggestionInterval);
        }
      }, 30);

      return () => clearInterval(suggestionInterval);
    }
  }, [hoveredButton, animationPhase, displayedText, userType]);

  return (
    <section className="relative w-full h-screen bg-white overflow-hidden">
      <div className="flex h-full">
        {/* Left Column - Content */}
        <div className="w-full lg:items-start xl:w-[54%] flex flex-col justify-center xl:items-end pl-12 pr-0">
          <div>
            {/* I AM */}
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: animationPhase >= 1 ? 1 : 0, y: animationPhase >= 1 ? 0 : -20 }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="text-lg font-light tracking-widest text-gray-500 mb-4"
            >
              I AM
            </motion.p>

            {/* Main Heading */}
            <div>
              <h1 
                className="text-[200px] font-black leading-[0.75] tracking-tighter text-black"
                style={{ fontFamily: 'Bebas Neue, sans-serif', letterSpacing: '-0.02em' }}
              >
                {/* SHADMAAN */}
                <motion.span
                  initial={{ opacity: 0, x: -80 }}
                  animate={{ opacity: shadmoanPhase >= 1 ? 1 : 0, x: shadmoanPhase >= 1 ? 0 : -80 }}
                  transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                  className="inline-block"
                >
                  SHADMAAN
                </motion.span>
                <br />
                
                {/* ANSARI with Subtitle */}
                <div className="flex items-center gap-4">
                  {/* ANSARI */}
                  <motion.span
                    initial={{ opacity: 0, x: -80 }}
                    animate={{ 
                      opacity: shadmoanPhase >= 2 ? 1 : 0, 
                      x: shadmoanPhase >= 2 ? 0 : -80 
                    }}
                    transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                    className="inline-block"
                    style={{
                      color: getAnsariColor(),
                      transition: 'color 0.8s cubic-bezier(0.76, 0, 0.24, 1)'
                    }}
                  >
                    ANSARI
                  </motion.span>
                  
                  {/* Subtitle */}
                  <div className="flex flex-col gap-0 ml-8">
                    <motion.span
                      initial={{ opacity: 0, y: -16 }}
                      animate={{ opacity: subtitlePhase >= 1 ? 1 : 0, y: subtitlePhase >= 1 ? 0 : -16 }}
                      transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                      className="text-lg font-semibold text-gray-800 tracking-wide leading-4"
                    >
                      FULL STACK DEV
                    </motion.span>

                    <motion.span
                      initial={{ opacity: 0, y: -16 }}
                      animate={{ opacity: subtitlePhase >= 2 ? 1 : 0, y: subtitlePhase >= 2 ? 0 : -16 }}
                      transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                      className="text-lg font-semibold text-gray-800 tracking-wide leading-4"
                    >
                      DESIGNER
                    </motion.span>

                    <motion.span
                      initial={{ opacity: 0, y: -16 }}
                      animate={{ opacity: subtitlePhase >= 3 ? 1 : 0, y: subtitlePhase >= 3 ? 0 : -16 }}
                      transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
                      className="text-lg font-semibold text-gray-800 tracking-wide leading-4"
                    >
                      UI/UX
                    </motion.span>
                  </div>
                </div>
              </h1>
            </div>
            
            {/* Location */}
            <motion.p
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: locationPhase >= 1 ? 1 : 0, y: locationPhase >= 1 ? 0 : -16 }}
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
              className="text-lg font-light tracking-[0.91vw] text-gray-500"
            >
              BASED IN UP, INDIA.
            </motion.p>

            <div className="mb-16"></div>

            {/* Question Text */}
            <div className="min-h-[40px] ml-3 max-w-md">
              {userType === 'hiring' || userType === 'explore' ? (
                <motion.p
                  key={userType}
                  initial={{ opacity: 0, rotateX: -90 }}
                  animate={{ opacity: 1, rotateX: 0 }}
                  exit={{ opacity: 0, rotateX: 90 }}
                  transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                  className="text-2xl font-light text-gray-600 text-left"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {getMainText()}
                </motion.p>
              ) : (
                <p className="text-2xl font-light text-gray-600 text-left transition-opacity duration-300">
                  {displayedText}
                  <span className={`animate-pulse ${displayedText === fullText ? 'opacity-0' : 'opacity-100'}`}>|</span>
                </p>
              )}
            </div>

            {/* Suggestion Text */}
            <div className="min-h-[24px] ml-3 max-w-md mb-8">
              {userType === 'hiring' || userType === 'explore' ? (
                <motion.p
                  key={userType}
                  initial={{ opacity: 0, rotateX: -90 }}
                  animate={{ opacity: 1, rotateX: 0 }}
                  exit={{ opacity: 0, rotateX: 90 }}
                  transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
                  className="text-sm font-light text-gray-500 text-left"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  {getSuggestionText()}
                </motion.p>
              ) : (
                <p className="text-sm font-light text-gray-500 text-left">
                  {suggestionText}
                  <span className={`animate-pulse ${suggestionText === getSuggestionText() ? 'opacity-0' : 'opacity-100'}`}>|</span>
                </p>
              )}
            </div>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: animationPhase >= 2 ? 1 : 0, y: animationPhase >= 2 ? 0 : 20 }}
              transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
            >
              <div className="flex gap-6 flex-wrap mb-4">
                <motion.button
                  onClick={() => handleUserTypeSelect('hiring')}
                  onMouseEnter={() => setHoveredButton('hiring')}
                  onMouseLeave={() => setHoveredButton(userType)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2, ease: [0.76, 0, 0.24, 1] }}
                  className={`relative px-8 py-3 text-sm font-semibold transition-all duration-300 rounded-full border-2 ${
                    userType === 'hiring'
                      ? 'bg-black text-white border-black'
                      : 'text-black border-gray-300 hover:border-black hover:bg-gray-100'
                  }`}
                >
                  HIRING
                </motion.button>

                <motion.button
                  onClick={() => handleUserTypeSelect('project')}
                  onMouseEnter={() => setHoveredButton('project')}
                  onMouseLeave={() => setHoveredButton(userType)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2, ease: [0.76, 0, 0.24, 1] }}
                  className={`relative px-8 py-3 text-sm font-semibold transition-all duration-300 rounded-full border-2 ${
                    userType === 'project'
                      ? 'bg-black text-white border-black'
                      : 'text-black border-gray-300 hover:border-black hover:bg-gray-100'
                  }`}
                >
                  PROJECT
                </motion.button>

                <motion.button
                  onClick={() => handleUserTypeSelect('explore')}
                  onMouseEnter={() => setHoveredButton('explore')}
                  onMouseLeave={() => setHoveredButton(userType)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.2, ease: [0.76, 0, 0.24, 1] }}
                  className={`relative px-8 py-3 text-sm font-semibold transition-all duration-300 rounded-full border-2 ${
                    userType === 'explore'
                      ? 'bg-black text-white border-black'
                      : 'text-black border-gray-300 hover:border-black hover:bg-gray-100'
                  }`}
                >
                  EXPLORE
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Column - Image */}
        <div className="hidden xl:flex w-[46%] items-center justify-end overflow-visible relative pr-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ 
              opacity: imageOpacity, 
              scale: imageOpacity === 1 ? 1 : 0.95,
              filter: `blur(${imageBlur}px)` 
            }}
            transition={{ 
              duration: 1.4, 
              ease: [0.76, 0, 0.24, 1],
              filter: { duration: 0.7 }
            }}
            className="relative w-full h-full"
          >
            <img
              src="/me.3.png"
              alt="Shadmaan Ansari"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
