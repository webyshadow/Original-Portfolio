'use client';

import AppleStyleDock from "./demo";
import TestimonialsSections from "./testimonials";
import ServicesCarousel from "./WhatIdo";
import WhatIdoWrapper from "./WhatIdoWrapper";
import { HowItWorks } from "./Workflow";
import TopWorksShowcase from "../explore/TopWorks";
import HowIWorkSection from "./WrapperWorkflow";
import Blank from "./Blank";
import GetInTouch from "./GetInTouchMain";

export default function ClientSections() {
  return (
    <div className="relative w-full">
      <WhatIdoWrapper/>
      <Blank/>
      <HowIWorkSection/>
      <TopWorksShowcase/>
      <TestimonialsSections/>
      <GetInTouch/>
    </div>
  );
}
