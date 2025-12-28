'use client';

import { HeroCanvas } from './HeroCanvas';
import { useEffect, useState, useCallback, memo } from 'react';
import FigmaHeroBlock from './FigmaHeroBlock';

interface HeroProps {
  userType: string;
  setUserType: (type: string) => void;
}

// Loading Screen - Same Component
const LoadingScreen = memo(({ loadingProgress, isLoaded }: { loadingProgress: number, isLoaded: boolean }) => (
  // Added transition-opacity here to fade out smoothly instead of disappearing instantly
  <div 
    className={`absolute inset-0 flex items-center justify-center bg-white z-50 transition-opacity duration-700 ease-out
      ${isLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'}
    `}
  >
    <div className="flex flex-col items-center gap-8">
      {/* ... (Your Loader Content) ... */}
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 rounded-full border-[3px] border-gray-200 animate-spin-slow" />
        <div className="absolute inset-0 rounded-full border-t-[3px] border-black animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 bg-black rounded-full animate-pulse" />
        </div>
      </div>
      <div className="flex flex-col items-center gap-3">
        <p className="text-sm font-medium text-gray-900 tracking-wide animate-fade-in">Loading Experience</p>
        <div className="w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-black rounded-full transition-all duration-300 ease-out" style={{ width: `${loadingProgress}%` }} />
        </div>
        <p className="text-xs font-light text-gray-500 tabular-nums">{Math.round(loadingProgress)}%</p>
      </div>
    </div>
  </div>
));
LoadingScreen.displayName = 'LoadingScreen';

export default function Hero({ userType, setUserType }: HeroProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [showUI, setShowUI] = useState(false);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isVideoFinished, setIsVideoFinished] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  // New State: To unmount loader ONLY after fade out is done
  const [removeLoader, setRemoveLoader] = useState(false);

  const handleModelLoaded = useCallback(() => {
    setIsModelLoaded(true);
    // Wait 700ms for fade out animation, then remove form DOM
    setTimeout(() => setRemoveLoader(true), 700);
  }, []);

  // Loading Progress Logic
  useEffect(() => {
    if (isModelLoaded) return;
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 90) return prev;
        return prev + Math.random() * 10;
      });
    }, 200);
    return () => clearInterval(interval);
  }, [isModelLoaded]);

  useEffect(() => {
    if (isModelLoaded) setLoadingProgress(100);
  }, [isModelLoaded]);

  // Main Sequence Logic
  useEffect(() => {
    if (!isModelLoaded || !isVideoFinished) return;

    // 1. Start Fade Out (1.5s before end)
    const fadeTimer = setTimeout(() => {
      setIsFadingOut(true);
    }, 3700); 

    // 2. Hide Canvas & Show UI
    const endTimer = setTimeout(() => {
      setIsVisible(false); // Unmount Canvas
      setShowUI(true);     // Mount UI
    }, 4000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(endTimer);
    };
  }, [isModelLoaded, isVideoFinished]);

  return (
    <section className="relative w-full h-screen bg-white overflow-hidden">
      
      {/* 1. Loading Screen - Only removed from DOM after fade animation */}
      {!removeLoader && (
        <LoadingScreen 
          loadingProgress={loadingProgress} 
          isLoaded={isModelLoaded} // Pass state to trigger fade class
        />
      )}

      {/* 2. Video Overlay */}
      {isModelLoaded && !isVideoFinished && (
        // Added fade-in animation for video entry
        <div className="absolute inset-0 z-40 bg-white flex items-center justify-center animate-fade-in duration-500">
          <video
            src="/sign-imp.mp4" 
            autoPlay
            muted
            playsInline
            className="h-64 w-auto md:h-96 object-contain" 
            onEnded={() => setIsVideoFinished(true)}
          />
        </div>
      )}

      {/* 3. Hero Canvas */}
      {/* 
         - duration-1000 for Entry (Video -> Canvas)
         - duration-[1500ms] for Exit (Canvas -> UI)
      */}
      {isVisible && (
        <div 
          className={`absolute inset-0 transition-opacity ease-in-out
            ${!isVideoFinished ? 'opacity-0 duration-1000' : (isFadingOut ? 'opacity-0 duration-[1500ms]' : 'opacity-100 duration-1000')}
          `} 
          data-canvas
        >
          <HeroCanvas onModelLoaded={handleModelLoaded} startAnimation={isVideoFinished} />
        </div>
      )}

      {/* 4. Final UI */}
      {showUI && (
        // Added duration-1000 for smooth UI entry
        <div className="absolute inset-0 z-50 animate-fade-in duration-1000">
          <FigmaHeroBlock userType={userType} setUserType={setUserType} />
        </div>
      )}
    </section>
  );
}
