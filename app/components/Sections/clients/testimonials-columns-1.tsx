"use client";

import React from "react";
import { motion } from "motion/react";

export type Testimonial = {
  text: string;
  image?: string | null;
  name?: string;
  role?: string;
};

type TestimonialsColumnProps = {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
};

export const TestimonialsColumn: React.FC<TestimonialsColumnProps> = ({
  className,
  testimonials,
  duration = 10,
}) => {
  return (
    <div className={className}>
      <motion.div
        animate={{ translateY: "-50%" }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6 bg-white"
      >
        {new Array(2).fill(0).map((_, index) => (
          <React.Fragment key={index}>
            {testimonials.map(({ text, image, name, role }, i) => (
              <div
                className="p-10 rounded-3xl border shadow-lg shadow-gray-200 max-w-xs w-full bg-white"
                key={i}
              >
                <div className="text-gray-800">{text}</div>

                {/* sirf tab dikhao jab kuch info ho */}
                {(image || name || role) && (
                  <div className="flex items-center gap-2 mt-5">
                    {image && (
                      <img
                        width={40}
                        height={40}
                        src={image}
                        alt={name || "Client"}
                        className="h-10 w-10 rounded-full object-cover"
                      />
                    )}

                    {(name || role) && (
                      <div className="flex flex-col">
                        {name && (
                          <div className="font-medium text-gray-900 tracking-tight leading-5">
                            {name}
                          </div>
                        )}
                        {role && (
                          <div className="leading-5 text-gray-600 opacity-80 tracking-tight">
                            {role}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};
