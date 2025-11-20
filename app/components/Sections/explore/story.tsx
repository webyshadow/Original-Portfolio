"use client";

import React from "react";
import { ContainerScroll } from "./container-scroll-animation";
import Image from "next/image";

export function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden pb-[10px] ">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold text-black dark:text-white">
              Unleash the power of <br />
              <span className="mt-1 text-4xl font-bold leading-none md:text-[6rem]">
                Scroll Animations
              </span>
            </h1>
            <p className="mt-4 max-w-xl text-sm text-neutral-600 dark:text-neutral-300 md:text-base">
              Smooth perspective transforms and scroll-based 3D card motion
              built with Framer Motion and Tailwind CSS.
            </p>
          </>
        }
      >
        <Image
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4"
          alt="Dashboard preview"
          height={720}
          width={1400}
          className="mx-auto h-full rounded-2xl object-cover object-left-top"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}

export default HeroScrollDemo;
