'use client';

import { HeroCanvas } from './HeroCanvas';
import { useEffect, useState, useCallback, memo } from 'react';
import FigmaHeroBlock from './FigmaHeroBlock';

interface HeroProps {
  userType: string;
  setUserType: (type: string) => void;
}

// Loading Screen Component - Memoized to prevent re-renders
const LoadingScreen = memo(({ loadingProgress }: { loadingProgress: number }) => (
  <div className="absolute inset-0 flex items-center justify-center bg-white z-50">
    <div className="flex flex-col items-center gap-8">
      {/* Animated Logo/Icon */}
      <div className="relative w-20 h-20">
        {/* Outer Ring - Rotating */}
        <div className="absolute inset-0 rounded-full border-[3px] border-gray-200 animate-spin-slow" />
        
        {/* Inner Ring - Counter Rotating */}
        <div className="absolute inset-0 rounded-full border-t-[3px] border-black animate-spin" />
        
        {/* Center Dot - Pulse */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-3 h-3 bg-black rounded-full animate-pulse" />
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
          />
        </div>
        
        {/* Progress Percentage */}
        <p className="text-xs font-light text-gray-500 tabular-nums">
          {Math.round(loadingProgress)}%
        </p>
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

  // Memoized callback for model load
  const handleModelLoaded = useCallback(() => {
    setIsModelLoaded(true);
  }, []);

  // Simulate progress for smooth UX
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
    }, 5500);

    return () => clearTimeout(timer);
  }, [isModelLoaded]);

  return (
    <section className="relative w-full h-screen bg-white overflow-hidden">
      {/* Premium Apple/Google Style Loading Screen */}
      {!isModelLoaded && <LoadingScreen loadingProgress={loadingProgress} />}

      {isVisible && (
        <div className="absolute inset-0" data-canvas>
          <HeroCanvas onModelLoaded={handleModelLoaded} />
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
