'use client';

import { ExperienceSection } from "../explore/Experience";
import DisplayCards from "./cards/display-cards";
import GetInTouch from "./Resume";
import Resume from "./Resume";
import Skills from "./SkillsSection";
import TopWorksShowcase from "./TopWorksBlue";

export default function HiringSections() {
  
  return (
    <div className="w-full">
      <TopWorksShowcase/>
      <Skills/>
      <ExperienceSection/>
      <GetInTouch/>
    </div>
  );
}
