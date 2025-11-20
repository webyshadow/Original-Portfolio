'use client';

import { HeroCanvas } from './HeroCanvas';
import { useEffect, useState } from 'react';
import FigmaHeroBlock from './FigmaHeroBlock';

interface HeroProps {
  userType: string;
  setUserType: (type: string) => void;
}

export default function Hero({ userType, setUserType }: HeroProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [showUI, setShowUI] = useState(false);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);

  // Simulate progress for smooth UX (optional)
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

  // Model load hone par progress complete karo
  useEffect(() => {
    if (isModelLoaded) {
      setLoadingProgress(100);
    }
  }, [isModelLoaded]);

  // Model load hone ke baad animation complete hone par UI show karo
  useEffect(() => {
    if (!isModelLoaded) return;

    const timer = setTimeout(() => {
      setIsVisible(false);
      setShowUI(true);
    }, 7500);

    return () => clearTimeout(timer);
  }, [isModelLoaded]);

  return (
    <section className="relative w-full h-screen bg-white overflow-hidden">
      {/* Premium Apple/Google Style Loading Screen */}
      {!isModelLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-white z-50">
          <div className="flex flex-col items-center gap-8">
            {/* Animated Logo/Icon */}
            <div className="relative">
              {/* Outer Ring - Rotating */}
              <div className="w-20 h-20 rounded-full border-[3px] border-gray-200 absolute animate-spin-slow"></div>
              
              {/* Inner Ring - Counter Rotating */}
              <div className="w-20 h-20 rounded-full border-t-[3px] border-black absolute animate-spin"></div>
              
              {/* Center Dot - Pulse */}
              <div className="w-20 h-20 flex items-center justify-center">
                <div className="w-3 h-3 bg-black rounded-full animate-pulse"></div>
              </div>
            </div>

            {/* Loading Text with Fade Animation */}
            <div className="flex flex-col items-center gap-3">
              <p className="text-sm font-medium text-gray-900 tracking-wide animate-fade-in">
                Loading Experience
              </p>
              
              {/* Progress Bar - Apple Style */}
              <div className="w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-black rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${loadingProgress}%` }}
                ></div>
              </div>
              
              {/* Progress Percentage */}
              <p className="text-xs font-light text-gray-500 tabular-nums">
                {Math.round(loadingProgress)}%
              </p>
            </div>
          </div>
        </div>
      )}

      {isVisible && (
        <div className="absolute inset-0" data-canvas>
          <HeroCanvas onModelLoaded={() => setIsModelLoaded(true)} />
        </div>
      )}

      {showUI && (
        <div className="absolute inset-0">
          <FigmaHeroBlock userType={userType} setUserType={setUserType} />
        </div>
      )}
    </section>
  );
}
