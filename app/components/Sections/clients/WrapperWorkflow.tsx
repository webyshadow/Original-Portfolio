import React from "react";
import { HowItWorks } from "./Workflow";

const HowIWorkSection: React.FC = () => {
  return (
    <section className="h-screen w-full flex bg-white text-black">
      {/* Left vertical label column - 10% width */}
      <div className="h-full w-[25%] flex items-center justify-center">
        <p
          className="
            text-[5vw]
            font-bold
            uppercase
            [writing-mode:vertical-rl]
            rotate-180
          "
        >
          How I Work
        </p>
      </div>

      <HowItWorks/>
    </section>
  );
};

export default HowIWorkSection;
