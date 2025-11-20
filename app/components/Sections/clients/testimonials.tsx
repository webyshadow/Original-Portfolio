"use client";

import React from "react";
import { motion } from "motion/react";
import { TestimonialsColumn, Testimonial } from "./testimonials-columns-1";

const testimonials: Testimonial[] = [
  {
    text:
      "We hired Shadmaan to design and build a multi‑page marketing site for our startup Webzark. He handled the entire 18‑page dynamic landing experience, from structure and animations to responsive behaviour, and the final result feels like something you’d expect from a funded product team, not a solo developer.",
    name: "Raghav Mishra",
    role: "Founder, Webzark",
  },
  {
    text:
      "For our beauty brand Rushberry we needed an e‑commerce website that didn’t look like a basic template. Shadmaan set up a clean, fast store with proper product pages, filters and a smooth checkout. Our customers immediately commented on how much easier it was to browse and buy.",
    name: "Sarthak Shukla",
    role: "Founder, Rushberry",
  },
  {
    text:
      "He built a voting portal for Future University that our students could actually understand and use without hand‑holding. The interface was simple, mobile‑friendly and stable during peak usage, which was critical for us during election days.",
    name: "Future University",
    role: "Student Affairs",
  },
  {
    text:
      "We later asked him to create an event management web app for Future University as well. The same attention to UX carried over: organizers, volunteers and students all have clear views of schedules, registrations and updates in one place.",
    name: "Future University",
    role: "Events & Activities",
  },
  {
    text:
      "Our web‑based startup needed multiple focused landing pages to test different ideas quickly. Shadmaan delivered each page with clear sections, strong CTAs and good performance scores, which made running campaigns and A/B tests much easier.",
    name: "Mohammad Zahid",
    role: "Founder, Web startup",
  },
  {
    text:
      "For our cold storage business we wanted more than an Excel sheet – we needed a proper system. The 32‑page management panel he built gives us control over inventory, clients, billing and reports in a way that our non‑technical staff can still use comfortably.",
    name: "M. Aijaaz",
    role: "Cold storage business owner",
  },
  {
    text:
      "What I really appreciated was that he didn’t just ‘take requirements’ – he suggested better flows, pointed out edge cases and adjusted the design so the final product matched how we actually work day to day.",
    name: "Shoaib Jamali",
    role: "CIL Manager",
  },
  {
    text:
      "Communication was straightforward: short updates, clear milestones and working links to review progress. We never had to chase for status, which made collaborating remotely feel surprisingly easy.",
    name: "Zaheer Ansari",
    role: "Tour & Travel Agent",
  },
  {
    text:
      "Even after delivery, small improvements kept coming: better loading states, cleaner forms and small design tweaks that made the experience feel more polished without us needing a full redesign.",
    name: "Jammy Singh",
    role: "Orca Steels, HR",
  },
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);

export const TestimonialsSections: React.FC = () => {
  return (
    <section className="bg-white my-20 relative">
      <div className="container z-10 mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.1,
            ease: [0.16, 1, 0.3, 1],
          }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter mt-5 text-center text-gray-900">
            What some of my previous clients say
          </h2>
          <p className="text-center mt-5 text-gray-600 max-w-[460px]">
            Honest feedback from real projects I&apos;ve designed and built.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn
            testimonials={secondColumn}
            className="hidden md:block"
            duration={19}
          />
          <TestimonialsColumn
            testimonials={thirdColumn}
            className="hidden lg:block"
            duration={17}
          />
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSections;
