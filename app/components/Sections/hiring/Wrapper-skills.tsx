"use client";

import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

import DisplayCards from "./cards/display-cards";
import DisplayCardsTwo from "./cards/display-cards-two";
import SecondDisplayCards from "./cards/second-one";
import SecondDisplayCardsTwo from "./cards/second-two";
import ThirdDisplayCards from "./cards/third-one";
import ThirdDisplayCardsTwo from "./cards/third-two";
import ForthDisplayCards from "./cards/forth-one";
import ForthDisplayCardsTwo from "./cards/forth-two";
import FifthDisplayCards from "./cards/fifth-one";
import FifthDisplayCardsTwo from "./cards/fifth-two";

const sliderTexts = [
  "Languages",
  "Frameworks & Libraries",
  "UI/UX & Design Tools",
  "Databases & Tools",
  "Styling & Animations",
];

interface VerticalHeadingSliderProps {
  activeIndex: number;
  setActiveIndex: React.Dispatch<React.SetStateAction<number>>;
}

function VerticalHeadingSlider({
  activeIndex,
  setActiveIndex,
}: VerticalHeadingSliderProps) {
  const goUp = () => {
    setActiveIndex((prev) =>
      prev === 0 ? sliderTexts.length - 1 : prev - 1
    );
  };

  const goDown = () => {
    setActiveIndex((prev) =>
      prev === sliderTexts.length - 1 ? 0 : prev + 1
    );
  };

  const getTextAt = (offset: number) => {
    const len = sliderTexts.length;
    const index = (activeIndex + offset + len) % len;
    return sliderTexts[index];
  };

  return (
    <div className="flex w-full max-w-3xl items-center justify-between">
      {/* Left: only 3 visible texts */}
      <div className="flex flex-col gap-1">
        {/* top (previous) */}
        <p className="text-sm opacity-40">
          {getTextAt(-1)}
        </p>

        {/* middle (active) */}
        <p className="text-3xl font-semibold opacity-100">
          {getTextAt(0)}
        </p>

        {/* bottom (next) */}
        <p className="text-sm opacity-40">
          {getTextAt(1)}
        </p>
      </div>

      {/* Right: up/down controls */}
      <div className="flex flex-col items-center gap-2">
        <button
          onClick={goUp}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-white/5 hover:bg-white/10 transition-colors"
        >
          <ChevronUp className="h-4 w-4" />
        </button>
        <button
          onClick={goDown}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30 bg-white/5 hover:bg-white/10 transition-colors"
        >
          <ChevronDown className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function DisplayCardsDemo() {
  const [activeIndex, setActiveIndex] = useState(0);

  const renderCardsForIndex = (index: number) => {
    switch (index) {
      case 0: // Languages
        return (
          <>
            <DisplayCards />
            <DisplayCardsTwo />
          </>
        );
      case 1: // Frameworks & Libraries
        return (
          <>
            <SecondDisplayCards />
            <SecondDisplayCardsTwo />
          </>
        );
      case 2: // UI/UX & Design Tools
        return (
          <>
            <ThirdDisplayCards />
            <ThirdDisplayCardsTwo />
          </>
        );
      case 3: // Databases & Tools
        return (
          <>
            <ForthDisplayCards />
            <ForthDisplayCardsTwo />
          </>
        );
      case 4: // Styling & Animations
        return (
          <>
            <FifthDisplayCards />
            <FifthDisplayCardsTwo />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col pt-10">
      {/* DisplayCards ke just upar vertical heading slider */}
      <div className="flex w-full justify-center pt-[5vw]">
        <VerticalHeadingSlider
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
      </div>

      <div className="flex min-h-[400px] w-full pl-[5vw] pt-[5vw]">
        <div className="flex w-full max-w-3xl gap-[14vw]">
          {renderCardsForIndex(activeIndex)}
        </div>
      </div>
    </div>
  );
}

export { DisplayCardsDemo };
