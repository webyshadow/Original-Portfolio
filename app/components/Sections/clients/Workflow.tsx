"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Layers, Search, Zap } from "lucide-react";
import type React from "react";

interface HowItWorksProps extends React.HTMLAttributes<HTMLElement> {}

interface StepCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  benefits: string[];
  children?: React.ReactNode;
}

const SERVICE_OPTIONS = [
  "Next.js website / landing page",
  "Full‑stack web app (dashboard / SaaS)",
  "React Native mobile app",
  "UI/UX design (Figma)",
  "Branding & graphics (logo / 3D)",
];

const StepCard: React.FC<StepCardProps> = ({
  icon,
  title,
  description,
  benefits,
  children,
}) => (
  <div
    className={cn(
      "relative flex flex-col rounded-2xl border border-gray-300 bg-white p-5 text-gray-900 shadow-sm transition-all duration-300 ease-in-out",
      "hover:scale-105 hover:shadow-lg hover:border-gray-400 hover:bg-gray-50",
      "h-full w-full text-[13px] leading-snug"
    )}
  >
    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-black text-primary">
      {icon}
    </div>

    <h3 className="mb-1 text-base font-semibold text-gray-900">
      {title}
    </h3>
    <p className="mb-3 text-[12px] text-gray-500">{description}</p>

    <ul className="mb-4 space-y-2">
      {benefits.map((benefit, index) => (
        <li key={index} className="flex items-center gap-2">
          <div className="flex h-3.5 w-3.5 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
            <div className="h-1.5 w-1.5 rounded-full bg-primary" />
          </div>
          <span className="text-[12px] text-gray-500">{benefit}</span>
        </li>
      ))}
    </ul>

    {children}
  </div>
);

export const HowItWorks: React.FC<HowItWorksProps> = ({
  className,
  ...props
}) => {
  const [selectedService, setSelectedService] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [projectOverview, setProjectOverview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );

  const stepsDataBase = [
    {
      icon: <Search className="h-5 w-5" />,
      title: "Pick service & email",
      description:
        "Choose how you want to work with me and share the email where I should reply.",
      benefits: [
        "Select the service that matches your idea.",
        "Add your primary email for my response.",
        "This gives me a quick, clear starting point.",
      ],
    },
    {
      icon: <Layers className="h-5 w-5" />,
      title: "Add a short overview",
      description:
        "Explain your project in a few lines so I understand what you want to build.",
      benefits: [
        "Describe your product and target users.",
        "Mention any features or tech you prefer.",
        "More context = better plan and estimate.",
      ],
    },
    {
      icon: <Zap className="h-5 w-5" />,
      title: "Send details to Shadmaan",
      description:
        "Send everything in one click so I can contact you with a clear next step.",
      benefits: [
        "Your info goes directly to my inbox.",
        'I reply from "ansari.shaws@gmail.com".',
        "Then we move to call, scope and build.",
      ],
    },
  ];

  const handleSubmit = async () => {
    if (!selectedService || !clientEmail) {
      setSubmitStatus("error");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service: selectedService,
          email: clientEmail,
          overview: projectOverview,
        }),
      });

      if (!res.ok) throw new Error("Request failed");

      setSubmitStatus("success");
      setSelectedService("");
      setClientEmail("");
      setProjectOverview("");
    } catch (e) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

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
        <div className="relative mx-auto mb-10 w-full">
          <div
            aria-hidden="true"
            className="absolute left-[16.6667%] top-1/2 h-0.5 w-[66.6667%] -translate-y-1/2 bg-gray-200"
          />
          <div className="relative grid grid-cols-3">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className="flex h-8 w-8 items-center justify-center justify-self-center rounded-full bg-gray-100 text-sm font-semibold text-gray-900 ring-4 ring-white"
              >
                {step}
              </div>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="grid w-full h-[70vh] grid-cols-1 gap-6 md:grid-cols-3">
          {/* Card 1 */}
          <StepCard
            icon={stepsDataBase[0].icon}
            title={stepsDataBase[0].title}
            description={stepsDataBase[0].description}
            benefits={stepsDataBase[0].benefits}
          >
            <div className="mt-auto space-y-3">
              <div className="space-y-1">
                <label className="text-[12px] font-medium text-gray-700">
                  Project type
                </label>
                <select
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-[12px] text-gray-900 shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                >
                  <option value="">Choose a service…</option>
                  {SERVICE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-[12px] font-medium text-gray-700">
                  Your email
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-[12px] text-gray-900 shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                />
              </div>
            </div>
          </StepCard>

          {/* Card 2 */}
          <StepCard
            icon={stepsDataBase[1].icon}
            title={stepsDataBase[1].title}
            description={stepsDataBase[1].description}
            benefits={stepsDataBase[1].benefits}
          >
            <div className="mt-auto space-y-1">
              <label className="text-[12px] font-medium text-gray-700">
                Project overview (optional)
              </label>
              <textarea
                rows={4}
                placeholder="A few lines about your idea, users and key features…"
                className="w-full resize-none rounded-lg border border-gray-300 bg-white px-3 py-2 text-[12px] text-gray-900 shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                value={projectOverview}
                onChange={(e) => setProjectOverview(e.target.value)}
              />
            </div>
          </StepCard>

          {/* Card 3 – CTA button yahan hai */}
          <StepCard
            icon={stepsDataBase[2].icon}
            title={stepsDataBase[2].title}
            description={stepsDataBase[2].description}
            benefits={stepsDataBase[2].benefits}
          >
            <div className="mt-auto space-y-2">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={cn(
                  "inline-flex w-full items-center justify-center rounded-lg px-4 py-2.5 text-[13px] font-semibold text-white shadow-sm transition",
                  "bg-black hover:bg-black/90 disabled:cursor-not-allowed disabled:bg-primary/60"
                )}
              >
                {isSubmitting
                  ? "Sending your details…"
                  : "Ask Shadmaan to contact me"}
              </button>

              {submitStatus === "error" && (
                <p className="text-[11px] text-red-500">
                  Select a project type and enter a valid email before sending.
                </p>
              )}

              {submitStatus === "success" && (
                <p className="text-[11px] text-emerald-600">
                  Done! I’ll reply from "ansari.shaws@gmail.com" as soon as
                  possible.
                </p>
              )}
            </div>
          </StepCard>
        </div>
      </div>
    </section>
  );
};
