"use client";

import React from "react";
import { ContainerScroll } from "./container-scroll-animation";

export function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden pb-[10px]">
      <ContainerScroll
        titleComponent={
          <>
            <h2 className="text-[5vw] uppercase font-extrabold text-black/60 dark:text-white">
              A little Story of Mine
            </h2>
          </>
        }
      >
        {/* 
          CHANGES MADE:
          1. h-full w-full: Ensures it fills the card completely.
          2. overflow-y-auto: Adds a scrollbar if text gets too long on weird aspect ratios.
          3. no-scrollbar: (Optional) Hides the scrollbar for a cleaner look (requires custom css or plugin), 
             otherwise standard scrollbar appears.
        */}
        <div className="h-full w-full bg-black rounded-2xl flex flex-col items-center justify-center p-4 md:p-14 overflow-y-auto">
          <div className="max-w-4xl text-center h-full flex flex-col justify-center">
            {/* 
              Responsive Text Sizing:
              - Mobile: text-xs (very small to fit the shrunken card)
              - Tablet: text-lg
              - Desktop: text-3xl
            */}
            <p className="text-xs sm:text-base md:text-3xl leading-relaxed md:leading-relaxed font-serif text-white mb-4 md:mb-8">
              "Two years ago, I began weaving code into canvas but the spark was
              lit much earlier in the quiet of a ninth-grade classroom. It was
              there I caught my first glimpses of logic turning into language, a
              fleeting realization that structure could be art. What started as
              simple curiosity has since bloomed into the craft of digital
              storytelling. From those early days of tracing syntax to the
              complex architecture I build today, every project has been a
              chapter, every bug a lesson in patience, and every launch a
              testament to the art of building."
            </p>
            <p className="text-sm md:text-2xl font-serif text-white/90 font-semibold">
              - Shadmaan Ansari
            </p>
          </div>
        </div>
      </ContainerScroll>
    </div>
  );
}

export default HeroScrollDemo;
