"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiThreedotjs,
  SiFigma,
  SiNodedotjs,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiDocker,
  SiRedux,
  SiCanva,
  SiBlender,
} from "@icons-pack/react-simple-icons";

interface Service {
  id: number;
  title: string;
  shortDescription: string;
  fullDescription: string;
  color: string;
  icon: React.ReactNode;
}

const services: Service[] = [
  {
    id: 1,
    title: "Websites & Landing Pages",
    shortDescription: "Modern, SEO‑friendly websites",
    fullDescription:
      "I build modern, SEO‑friendly websites and high‑converting landing pages using React, Next.js, Tailwind CSS, Framer, Shadcn UI, Spline, and WebGL/Three.js. From personal portfolios to SaaS and startup marketing pages, every site is fully responsive, fast, and enhanced with smooth animations and 3D interactions.",
    color: "portfolio-yellow",
    icon: (
      <div className="flex items-center justify-end gap-1 text-black">
        <SiNextdotjs className="w-4 h-4" />
        <SiReact className="w-4 h-4" />
        <SiTailwindcss className="w-4 h-4" />
        <SiThreedotjs className="w-4 h-4" />
      </div>
    ),
  },
  {
    id: 2,
    title: "UI/UX Product Design",
    shortDescription: "Figma UI/UX for web & mobile",
    fullDescription:
      "I design clean, user‑focused interfaces in Figma, including wireframes, user flows, design systems, and interactive prototypes. The goal is to create intuitive dashboards, web apps, and mobile interfaces that feel polished, consistent, and ready for development handoff.",
    color: "portfolio-pink",
    icon: (
      <div className="flex items-center justify-end gap-1 text-black">
        <SiFigma className="w-4 h-4" />
      </div>
    ),
  },
  {
    id: 3,
    title: "Full‑Stack Web Apps",
    shortDescription: "MERN‑style web applications",
    fullDescription:
      "I develop full‑stack web applications using React, Next.js, Node.js, Express, and databases like MongoDB, PostgreSQL, and MySQL. With modern ORMs, secure REST APIs, authentication, dashboards, Redux state management, and Docker‑ready setups, I ship scalable MERN‑style solutions for real business use cases.",
    color: "portfolio-dark",
    icon: (
      <div className="flex items-center justify-end gap-1 text-black">
        <SiNodedotjs className="w-4 h-4" />
        <SiMongodb className="w-4 h-4" />
        <SiPostgresql className="w-4 h-4" />
        <SiMysql className="w-4 h-4" />
        <SiDocker className="w-4 h-4" />
        <SiRedux className="w-4 h-4" />
      </div>
    ),
  },
  {
    id: 4,
    title: "Mobile App Development",
    shortDescription: "Cross‑platform React Native apps",
    fullDescription:
      "I create cross‑platform mobile applications using React Native with the same backend stack as my web apps. This gives you Android and iOS apps that share business logic, connect to secure APIs, sync with databases, and deliver a smooth, consistent user experience.",
    color: "portfolio-blue",
    icon: (
      <div className="flex items-center justify-end gap-1 text-black">
        {/* React Native icon kisi doosri lib se add kar sakta hai */}
        <SiNodedotjs className="w-4 h-4" />
      </div>
    ),
  },
  {
    id: 5,
    title: "Branding & Graphics",
    shortDescription: "Logos, social posts & 3D",
    fullDescription:
      "I design brand assets like logos, posters, banners, social media creatives, and 3D visuals using Canva, Adobe tools, and Blender. This keeps your website, app UI, and marketing graphics visually aligned with a single consistent brand language.",
    color: "portfolio-green",
    icon: (
      <div className="flex items-center justify-end gap-1 text-black">
        <SiCanva className="w-4 h-4" />
        <SiBlender className="w-4 h-4" />
      </div>
    ),
  },
];

const ServicesCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(2);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => {
      setIsDesktop(window.innerWidth >= 768); // md breakpoint
    };

    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const handleCardClick = (clickedIndex: number) => {
    setActiveIndex(clickedIndex);
  };

  const getCardPosition = (index: number) => {
    const diff = index - activeIndex;
    const totalCards = services.length;

    let position = diff;
    if (Math.abs(diff) > totalCards / 2) {
      position = diff > 0 ? diff - totalCards : diff + totalCards;
    }

    return position;
  };

  const getCardStyle = (index: number) => {
    if (!isDesktop) return {}; // mobile/tablet: koi transform nahi

    const position = getCardPosition(index);
    const isActive = position === 0;
    const isAdjacent = Math.abs(position) === 1;

    const spacing = 190;
    const translateX = position * spacing;

    const scale = isActive ? 1 : 0.85;
    const opacity = Math.abs(position) > 2 ? 0 : 1;

    const baseHeight = 384;
    const height = isActive ? 480 : isAdjacent ? 440 : baseHeight;

    const translateY = isActive ? -96 : isAdjacent ? -56 : 0;

    const zIndex = 10 - Math.abs(position);

    return {
      transform: `translateX(${translateX}px) translateY(${translateY}px) scale(${scale})`,
      opacity,
      zIndex,
      height: `${height}px`,
    };
  };

  return (
    <div className="w-full py-6 sm:py-10 px-1 sm:px-4">
      <div className="max-w-full sm:max-w-7xl mx-auto">
        <div className="relative sm:h-[40vw] flex sm:items-center sm:justify-center">
          <div className="relative w-full sm:max-w-4xl sm:flex sm:items-center sm:justify-center">
            {services.map((service, index) => {
              const position = getCardPosition(index);
              const isActive = position === 0;

              return (
                <div
                  key={service.id}
                  className={cn(
                    "rounded-3xl p-5 sm:p-6 cursor-pointer transition-all duration-700 ease-out flex flex-col bg-card border border-border bg-white text-black",
                    "w-full sm:w-64",
                    "relative sm:absolute",
                    isActive ? "shadow-2xl" : "shadow-lg hover:shadow-xl",
                    "mb-4 sm:mb-0"
                  )}
                  style={getCardStyle(index)}
                  onClick={() => handleCardClick(index)}
                >
                  <div className="flex flex-col h-full">
                    <h3
                      className={cn(
                        "font-bold mb-2 sm:mb-3 transition-all duration-300 text-black",
                        isActive ? "text-lg sm:text-2xl" : "text-base sm:text-xl"
                      )}
                    >
                      {service.title}
                    </h3>

                    <div className="overflow-hidden transition-all duration-500 text-black/80 flex-1">
                      {isActive || !isDesktop ? (
                        <div className="space-y-3 sm:space-y-4 animate-fade-in">
                          <p className="text-sm leading-relaxed">
                            {service.fullDescription}
                          </p>
                        </div>
                      ) : (
                        <p className="text-sm text-black">
                          {service.shortDescription}
                        </p>
                      )}
                    </div>

                    <div className="mt-3 sm:mt-4 pt-2 border-t border-black/5">
                      {service.icon}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation dots */}
        <div className="flex justify-center gap-1.5 sm:gap-2 mt-2 sm:-mt-[7vw]">
          {services.map((_, index) => (
            <button
              key={index}
              onClick={() => handleCardClick(index)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                activeIndex === index
                  ? "bg-black w-6 sm:w-8"
                  : "bg-black/40 hover:bg-black/60 w-2"
              )}
              aria-label={`Go to service ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesCarousel;
