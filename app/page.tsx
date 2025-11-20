'use client';

import Hero from './components/HeroSection/Hero';
import { useState } from 'react';
import ScrollProgress from './components/ScrollProgress';

// Import your section components
import ClientSections from './components/Sections/clients/ClientSections';
import HiringSections from './components/Sections/hiring/HIringSections';
import ExploreSections from './components/Sections/explore/ExploreSections';

export default function Home() {
  const [userType, setUserType] = useState<string>('project');

  return (
    <>
      {/* Scroll Progress Bar */}
      <ScrollProgress />
      
      <main>
        <Hero userType={userType} setUserType={setUserType} />
        
        {/* Conditional Section Rendering */}
        {userType === 'project' && <ClientSections />}
        {userType === 'hiring' && <HiringSections />}
        {userType === 'explore' && <ExploreSections />}
      </main>
    </>
  );
}
