"use client";

import { cn } from "@/lib/utils";
import { Layers, Search, Zap } from "lucide-react";
import type React from "react";

interface HowItWorksProps extends React.HTMLAttributes<HTMLElement> {}

interface StepCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  benefits: string[];
}

const StepCard: React.FC<StepCardProps> = ({
  icon,
  title,
  description,
  benefits,
}) => (
  <div
    className={cn(
      "relative flex flex-col rounded-2xl border border-gray-300 bg-white p-6 text-gray-900 shadow-sm transition-all duration-300 ease-in-out",
      "hover:scale-105 hover:shadow-lg hover:border-gray-400 hover:bg-gray-50",
      "h-full w-full"
    )}
  >
    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 text-primary">
      {icon}
    </div>

    <h3 className="mb-2 text-xl font-semibold text-gray-900">{title}</h3>
    <p className="mb-6 text-gray-500">{description}</p>

    <ul className="space-y-3">
      {benefits.map((benefit, index) => (
        <li key={index} className="flex items-center gap-3">
          <div className="flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
            <div className="h-2 w-2 rounded-full bg-primary" />
          </div>
          <span className="text-gray-500">{benefit}</span>
        </li>
      ))}
    </ul>
  </div>
);

export const HowItWorks: React.FC<HowItWorksProps> = ({
  className,
  ...props
}) => {
  const stepsData = [
    {
      icon: <Search className="h-6 w-6" />,
      title: "Enter your query",
      description:
        "Enter part name or article number, and we'll instantly check availability across thousands of stores.",
      benefits: [
        "Smart search understands even imprecise queries",
        "Automatic city detection",
        "Search history for quick access",
      ],
    },
    {
      icon: <Layers className="h-6 w-6" />,
      title: "Choose the best offer",
      description:
        "Compare prices, location and availability, choose the optimal option.",
      benefits: [
        "Sort by price, distance and rating",
        "Filter by availability and manufacturer",
        "Detailed information about each offer",
      ],
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Contact the store",
      description:
        "Call the store directly or request a callback through our service.",
      benefits: [
        "Direct contact without intermediaries",
        "Parts reservation capability",
        "Route building to store",
      ],
    },
  ];

  return (
    <section
      id="how-it-works"
      className={cn(
        "w-full min-h-screen bg-white py-10 sm:py-14",
        className
      )}
      {...props}
    >
      <div className="container mx-auto px-4">

        {/* Step indicators */}
        <div className="relative mx-auto mb-12 w-full">
          <div
            aria-hidden="true"
            className="absolute left-[16.6667%] top-1/2 h-0.5 w-[66.6667%] -translate-y-1/2 bg-gray-200"
          />
          <div className="relative grid grid-cols-3">
            {stepsData.map((_, index) => (
              <div
                key={index}
                className="flex h-8 w-8 items-center justify-center justify-self-center rounded-full bg-gray-100 font-semibold text-gray-900 ring-4 ring-white"
              >
                {index + 1}
              </div>
            ))}
          </div>
        </div>

        {/* 🔥 Full width + full height grid */}
        <div className="grid w-full h-[75vh] grid-cols-1 gap-8 md:grid-cols-3">
          {stepsData.map((step, index) => (
            <StepCard
              key={index}
              icon={step.icon}
              title={step.title}
              description={step.description}
              benefits={step.benefits}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
