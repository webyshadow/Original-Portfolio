'use client';

import Hero from './components/HeroSection/Hero';
import { useState } from 'react';
import ScrollProgress from './components/ScrollProgress';

// Import your section components
import ClientSections from './components/Sections/clients/ClientSections';
import HiringSections from './components/Sections/hiring/HIringSections';
import ExploreSections from './components/Sections/explore/ExploreSections';
import MobileView from './components/MobileView'; // Import the new component

export default function Home() {
  const [userType, setUserType] = useState<string>('project');

  return (
    <>
      {/* --- LAPTOP/DESKTOP VIEW (Hidden on small screens, Visible on lg+) --- */}
      <div className="hidden lg:block">
        <ScrollProgress />
        
        <main>
          <Hero userType={userType} setUserType={setUserType} />
          
          {/* Conditional Section Rendering */}
          {userType === 'project' && <ClientSections />}
          {userType === 'hiring' && <HiringSections />}
          {userType === 'explore' && <ExploreSections />}
        </main>
      </div>

      {/* --- MOBILE/TABLET VIEW (Visible on small screens, Hidden on lg+) --- */}
      <div className="block lg:hidden">
        <MobileView />
      </div>
    </>
  );
}
