"use client";

import { useEffect, useMemo, useState } from "react";
import { animate, motion, useMotionValue } from "motion/react";

type ExperienceItem = {
  id: string;
  role: string;
  company: string;
  years: string;
  description: string;
};

const EXPERIENCE_ITEMS: ExperienceItem[] = [
  {
    id: "exp-1",
    role: "Full‑Stack Developer",
    company: "Freelance • Remote",
    years: "2023 – Present",
    description:
      "Building end‑to‑end web apps with Next.js, React, Tailwind and REST/GraphQL APIs.",
  },
  {
    id: "exp-2",
    role: "Frontend Developer Intern",
    company: "Webseeder Technologies",
    years: "2024",
    description:
      "Implemented pixel‑perfect UIs, animations and dashboards using React, Redux and Tailwind.",
  },
  {
    id: "exp-3",
    role: "UI/UX & 3D Enthusiast",
    company: "Personal Projects",
    years: "2022 – Present",
    description:
      "Experimenting with 3D, motion, and interaction‑driven interfaces using R3F, GSAP and design tools.",
  },
];

const WORD = "Experience";

export function ExperienceSection() {
  const sectionId = "experience-section";

  // Motion value jo final assembled word hold karega
  const text = useMotionValue("");
  // React state jo har character ka visible / hidden track karega
  const [visibleMap, setVisibleMap] = useState<boolean[]>(
    () => Array.from(WORD).map(() => false)
  );

  // Characters + unka random order (stable via useMemo)
  const chars = useMemo(() => Array.from(WORD), []);
  const indices = useMemo(
    () => chars.map((_, i) => i).sort(() => Math.random() - 0.5),
    [chars]
  );

  useEffect(() => {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          // Start with empty text and all hidden
          text.set("");
          setVisibleMap(Array.from(chars).map(() => false));

          // Letter‑by‑letter random fade‑in (indices randomised)
          indices.forEach((charIndex, order) => {
            const delay = 150 * order; // 150ms gap per letter

            setTimeout(() => {
              setVisibleMap((prev) => {
                const next = [...prev];
                next[charIndex] = true;
                return next;
              });

              // Jab is index tak ke saare letters visible ho jayein to text rebuild karo
              setTimeout(() => {
                text.set(
                  chars
                    .map((c, i) => (visibleMap[i] || i === charIndex ? c : ""))
                    .join("")
                );
              }, 10);
            }, delay);
          });

          // Safety: end me full word set kar do
          setTimeout(() => {
            text.set(WORD);
            setVisibleMap(Array.from(chars).map(() => true));
          }, 150 * chars.length + 200);

          observer.disconnect();
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [chars, indices, text, sectionId]);

  return (
    <section
      id={sectionId}
      className="relative h-dvh w-full bg-white text-black overflow-hidden"
    >
      {/* Top strip */}
      <div className="relative h-[30%] flex items-center justify-center bg-black">
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative"
        >
          <div className="flex gap-[1vw] justify-center">
            {chars.map((char, index) => (
              <motion.span
                key={`${char}-${index}`}
                initial={{ opacity: 0, y: 10 }}
                animate={
                  visibleMap[index]
                    ? { opacity: 1, y: 0 }
                    : { opacity: 0, y: 10 }
                }
                transition={{
                  duration: 0.35,
                  delay: indices.indexOf(index) * 0.15,
                  ease: "easeOut",
                }}
                className="text-3xl md:text-[10vw] uppercase font-extrabold text-white"
                style={{ letterSpacing: "1vw" }}
              >
                {char}
              </motion.span>
            ))}
          </div>

          {/* Decorative subtle gradient underline */}
          <div className="pointer-events-none absolute inset-x-8 -bottom-2 h-[2px] bg-gradient-to-r from-zinc-500/0 via-zinc-400/70 to-zinc-500/0" />
        </motion.div>
      </div>

      {/* Bottom area */}
      <div className="relative h-[70%] flex items-start justify-center">
        <PendulumTimeline items={EXPERIENCE_ITEMS} />
      </div>
    </section>
  );
}

type PendulumTimelineProps = {
  items: ExperienceItem[];
};

function PendulumTimeline({ items }: PendulumTimelineProps) {
  const ref = (node: HTMLDivElement | null) => {
    // no-op
  };

  return (
    <div
      ref={ref}
      className="relative flex h-full w-full max-w-5xl items-start justify-center"
    >
      <div className="flex gap-10 md:gap-16">
        {items.map((item, index) => {
          const delay = 0.35 + index * 0.18;
          const duration = 3 + index * 0.4;
          const maxAngle = 8 + index * 2;

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay }}
              className="relative flex flex-col items-center"
            >
              {/* Pivot cap */}
              <div className="h-3 w-[3px] rounded-full bg-zinc-300/90 shadow-[0_0_10px_rgba(148,163,184,0.6)]" />

              {/* Thread + card swinging group */}
              <motion.div
                animate={{ rotate: [-maxAngle, maxAngle] }}
                transition={{
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                  duration,
                }}
                style={{ transformOrigin: "50% 0px" }}
                className="mt-1 flex flex-col items-center"
              >
                {/* Thread */}
                <div className="h-32 md:h-40 w-[2px] bg-gradient-to-b from-zinc-300 via-zinc-500 to-zinc-700" />

                {/* Card */}
                <div className="mt-3 w-52 md:w-64 rounded-2xl border border-zinc-700/80 bg-zinc-900/90 px-4 py-4 shadow-[0_18px_45px_rgba(0,0,0,0.75)] backdrop-blur-md text-white">
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">
                    {item.years}
                  </p>
                  <h3 className="mt-2 text-lg md:text-xl font-semibold text-zinc-50">
                    {item.role}
                  </h3>
                  <p className="text-sm text-zinc-400">{item.company}</p>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-300">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
