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
            <h2 className="text-[5vw] uppercase font-extrabold text-black/60 dark:text-white">
              A little Story of Mine
            </h2>
          </>
        }
      >
        <Image
          src="/Screenshot (119).png"
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
