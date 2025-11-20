'use client';

import AboutCallouts from "./AboutMeMagnifier";
import AboutZoomPanel from "./AboutMeMagnifier";
import AboutSpotlight from "./AboutMeMagnifier";
import AboutScanline from "./AboutMeMagnifier";
import AboutSection from "./AboutMeMagnifier";
import AboutBlurLens from "./AboutMeMagnifier";
import AboutMeMagnifier from "./AboutMeMagnifier";
import { ExperienceSection } from "./Experience";
import GetInTouch from "./GetInTouch";
import { HeroScrollDemo } from "./story";
import ProjectShowcaseStatic from "./TopWorks";
import TopWorksShowcase from "./TopWorks";
import TopWorks from "./TopWorks";

export default function ExploreSections() {
  return (
    <div className="w-full">
       <AboutSection/>
          <ProjectShowcaseStatic/>
          <HeroScrollDemo/>
    <ExperienceSection/>
    <GetInTouch/>
    </div>
  );
}
