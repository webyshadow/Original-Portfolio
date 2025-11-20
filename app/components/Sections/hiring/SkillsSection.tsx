import React from "react";
import { DisplayCardsDemo } from "./Wrapper-skills";

const Skills: React.FC = () => {
  return (
    <section className="h-screen w-full flex bg-white text-black">
      {/* Left vertical label column - 10% width */}
      <div className="h-full w-[25%] flex items-center justify-start">
        <p
          className="
            text-[12vw]
            font-bold
            uppercase
            [writing-mode:vertical-rl]
            rotate-180
          "
        >
          Skills
        </p>
      </div>
      <DisplayCardsDemo/>
    </section>
  );
};

export default Skills;
