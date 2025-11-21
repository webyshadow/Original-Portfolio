'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, ArrowUpRight, Mail, Github, Linkedin, Twitter, Send, 
  Download, Code2, Terminal, Phone, Monitor, Smartphone, PenTool, Database, CheckCircle 
} from 'lucide-react';

// --- DATA SECTION (Moved outside component to prevent recreation on every render) ---

const projects = [
  { title: "Kabosu", category: "Web3 Branding", link: "https://kabosutoken.io/", live: true },
  { title: "BeautyBlussh", category: "E-Commerce App", link: "https://beauty-bliss-the-beauty-brand.netlify.app/", live: true },
  { title: "Deploy", category: "SaaS Dashboard", link: "https://deployyyyyyy.netlify.app/", live: true },
  { title: "Degen", category: "Web3 Concept", link: "https://degen-subdomain.netlify.app/", live: true },
];

const experience = [
  {
    role: "Software Developer Intern",
    company: "Webseeder Technologies",
    time: "2024 – Present",
    desc: "Building production-ready web apps with reusable components.",
  },
  {
    role: "Freelance Developer",
    company: "International Clients",
    time: "2022 – Present",
    desc: "End-to-end development of dashboards and landing pages.",
  },
];

const skills = {
  frontend: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  backend: ["Node.js", "Express", "MongoDB", "PostgreSQL", "Prisma"],
};

const contactsList = [
  { label: 'Email', value: 'ansari.shaws@gmail.com', href: 'mailto:ansari.shaws@gmail.com', icon: <Mail size={18}/> },
  { label: 'Telegram', value: 'WebyShadow', href: 'https://t.me/WebyShadow', icon: <Send size={18}/> },
  { label: 'LinkedIn', value: 'shadmaan-ansari', href: 'https://linkedin.com/in/shadmaan-ansari', icon: <Linkedin size={18}/> },
  { label: 'GitHub', value: 'webyshadow', href: 'https://github.com/webyshadow', icon: <Github size={18}/> },
];

const services = [
  { 
    id: 1, 
    title: "Websites & Landing Pages", 
    desc: "Modern, SEO-friendly websites using React, Next.js & Tailwind.",
    icon: <Monitor size={20} className="text-orange-500" />
  },
  { 
    id: 2, 
    title: "UI/UX Product Design", 
    desc: "Clean, user-focused interfaces in Figma for web & mobile.",
    icon: <PenTool size={20} className="text-pink-500" />
  },
  { 
    id: 3, 
    title: "Full-Stack Web Apps", 
    desc: "MERN-style scalable web applications with secure APIs.",
    icon: <Database size={20} className="text-blue-500" />
  },
  { 
    id: 4, 
    title: "Mobile App Development", 
    desc: "Cross-platform React Native apps sharing backend logic.",
    icon: <Smartphone size={20} className="text-green-500" />
  },
];

const testimonials = [
  { text: "The final result feels like something you'd expect from a funded product team, not a solo developer.", name: "Raghav Mishra", role: "Founder, Webzark" },
  { text: "Our customers immediately commented on how much easier it was to browse and buy.", name: "Sarthak Shukla", role: "Founder, Rushberry" },
  { text: "The interface was simple, mobile-friendly and stable during peak usage.", name: "Future University", role: "Student Affairs" },
];

const workflow = [
  { step: "01", title: "Pick a Service", desc: "Choose how you want to work with me." },
  { step: "02", title: "Short Overview", desc: "Explain your project in a few lines." },
  { step: "03", title: "Send Details on my Email", desc: "I review and we start building." },
];

// Memoized motion variants (prevent recreation on every render)
const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 }
};

const headerMotion = {
  initial: { y: -50 },
  animate: { y: 0 },
  exit: { y: -50 }
};

export default function MobileView() {
  const [view, setView] = useState<'home' | 'work_about' | 'exp_contact'>('home');

  // Memoized callbacks to prevent unnecessary re-renders
  const goBack = useCallback(() => setView('home'), []);
  const goToExpContact = useCallback(() => setView('exp_contact'), []);
  const goToWorkAbout = useCallback(() => setView('work_about'), []);

  // Memoized components to prevent re-creation
  const headerContent = useMemo(() => (
    view !== 'home' && (
      <motion.div 
        {...headerMotion}
        className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 px-5 py-4 flex justify-between items-center shadow-sm"
      >
        <button onClick={goBack} className="flex items-center gap-2 text-sm font-bold uppercase">
          <ArrowLeft size={18} /> Back
        </button>
      </motion.div>
    )
  ), [view, goBack]);

  return (
    <div className="min-h-screen w-full bg-white text-black font-sans">
      
      {/* --- HEADER --- */}
      <AnimatePresence>
        {headerContent}
      </AnimatePresence>

      {/* --- MAIN CONTENT --- */}
      <main className="w-full">
        <AnimatePresence mode="wait">
          
          {/* 1. HOME SCREEN */}
          {view === 'home' && (
            <motion.div key="home" {...pageTransition} className="h-screen flex flex-col justify-center px-6">
              <div className="mb-12">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-2">Portfolio</p>
                <h1 className="text-5xl font-black uppercase leading-[0.9] tracking-tighter mb-4">
                  Shadmaan <br /><span className="text-gray-500">Ansari</span>
                </h1>
                <p className="text-sm text-gray-600 max-w-[250px]">
                  Full Stack Developer & UI/UX Designer.
                </p>
              </div>
              <div className="flex flex-col gap-3 w-full">
                <button onClick={goToExpContact} className="w-full bg-black text-white py-4 px-6 rounded-xl flex justify-between items-center shadow-xl active:scale-95 transition-all">
                  <span className="font-bold uppercase tracking-wider text-sm">Hiring / Recruiter</span>
                  <span className="text-gray-400 text-xs">Resume & Skills</span>
                </button>
                <button onClick={goToWorkAbout} className="w-full border border-gray-200 py-4 px-6 rounded-xl flex justify-between items-center active:bg-gray-50 active:scale-95 transition-all">
                  <span className="font-bold uppercase tracking-wider text-sm">Client / Project</span>
                  <span className="text-gray-400 text-xs">Services & Work</span>
                </button>
              </div>
            </motion.div>
          )}

          {/* 2. CLIENT / PROJECT VIEW */}
          {view === 'work_about' && (
            <motion.div key="work" {...pageTransition} className="pt-24 px-6 pb-12 min-h-screen">
              
              {/* Intro */}
              <section className="mb-10">
                <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">What I Do</h2>
                <div className="grid grid-cols-1 gap-3">
                  {services.map((service) => (
                    <div key={service.id} className="p-4 rounded-xl border border-gray-100 bg-gray-50 flex items-start gap-4">
                      <div className="p-2 bg-white rounded-lg shadow-sm">{service.icon}</div>
                      <div>
                        <h3 className="font-bold text-sm mb-1">{service.title}</h3>
                        <p className="text-xs text-gray-500 leading-relaxed">{service.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <hr className="border-gray-100 my-8"/>

              {/* How I Work */}
              <section className="mb-10">
                <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">How It Works</h2>
                <div className="flex flex-col gap-4">
                  {workflow.map((flow, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <span className="text-2xl font-black text-gray-200">{flow.step}</span>
                      <div>
                        <h3 className="font-bold text-sm">{flow.title}</h3>
                        <p className="text-xs text-gray-500">{flow.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <hr className="border-gray-100 my-8"/>
              
              {/* Top Works */}
              <section className="mb-12">
                <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Top Works</h2>
                <div className="flex flex-col gap-4">
                  {projects.map((proj, i) => (
                    <a 
                      href={proj.link} 
                      key={i} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block p-5 bg-black text-white rounded-2xl active:scale-[0.98] shadow-lg transition-transform"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-bold uppercase mb-1">{proj.title}</h3>
                          <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">{proj.category}</p>
                        </div>
                        <ArrowUpRight size={20} className="text-gray-400"/>
                      </div>
                    </a>
                  ))}
                </div>
              </section>

              <hr className="border-gray-100 my-8"/>

              {/* Testimonials */}
              <section className="mb-12">
                <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Client Love</h2>
                <div className="flex flex-col gap-4">
                  {testimonials.map((test, i) => (
                    <div key={i} className="p-5 border border-gray-100 rounded-2xl bg-white shadow-sm">
                      <p className="text-sm text-gray-600 italic mb-4">"{test.text}"</p>
                      <div>
                        <p className="text-xs font-bold uppercase">{test.name}</p>
                        <p className="text-[10px] text-gray-400 uppercase">{test.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <hr className="border-gray-100 my-8"/>

              {/* Contact */}
              <section>
                <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Start a Project</h2>
                <div className="space-y-4">
                  <a href="mailto:ansari.shaws@gmail.com" className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl active:bg-gray-50 shadow-sm transition-colors">
                    <div className="bg-black text-white p-3 rounded-full"><Mail size={20}/></div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase font-bold">Email Me</p>
                      <p className="font-bold">ansari.shaws@gmail.com</p>
                    </div>
                  </a>
                  
                  <div className="flex gap-3 mt-4">
                    {contactsList.slice(1).map((contact, i) => (
                       <a 
                         key={i} 
                         href={contact.href} 
                         target="_blank" 
                         rel="noopener noreferrer"
                         className="flex-1 py-4 flex justify-center items-center border border-gray-200 rounded-xl active:bg-gray-100 text-gray-700 transition-colors"
                       >
                        {contact.icon}
                       </a>
                    ))}
                  </div>
                </div>
              </section>

            </motion.div>
          )}

          {/* 3. HIRING / RECRUITER PAGE */}
          {view === 'exp_contact' && (
            <motion.div key="exp" {...pageTransition} className="pt-24 px-6 pb-12 min-h-screen">
              
              <div className="mb-10">
                <a 
                  href="/Shadmaan-Ansari-MERN-STACK.pdf" 
                  download="Shadmaan_Ansari_Resume.pdf" 
                  className="flex items-center justify-center gap-3 w-full bg-black text-white py-4 rounded-xl shadow-lg active:scale-95 transition-transform"
                >
                  <Download size={20} />
                  <span className="font-bold uppercase tracking-wide text-sm">Download Resume</span>
                </a>
              </div>

              <section className="mb-10">
                <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Technical Skills</h2>
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-2 mb-3 text-sm font-bold"><Code2 size={16}/> Frontend</div>
                    <div className="flex flex-wrap gap-2">
                      {skills.frontend.map(skill => (
                        <span key={skill} className="px-3 py-1 bg-gray-100 text-xs font-semibold rounded-md text-gray-700 border border-gray-200">{skill}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-3 text-sm font-bold"><Terminal size={16}/> Backend</div>
                    <div className="flex flex-wrap gap-2">
                      {skills.backend.map(skill => (
                        <span key={skill} className="px-3 py-1 bg-gray-100 text-xs font-semibold rounded-md text-gray-700 border border-gray-200">{skill}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              <hr className="border-gray-100 my-8"/>

              <section className="mb-10">
                 <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Live Projects</h2>
                 <div className="grid grid-cols-1 gap-3">
                    {projects.map((proj, i) => (
                      <a 
                        href={proj.link} 
                        key={i} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                      >
                         <div>
                            <h3 className="font-bold text-sm">{proj.title}</h3>
                            <p className="text-[10px] text-gray-500 uppercase">{proj.category}</p>
                         </div>
                         <div className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">
                            Live <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                         </div>
                      </a>
                    ))}
                 </div>
              </section>

              <hr className="border-gray-100 my-8"/>

              <section className="mb-10">
                <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Experience</h2>
                <div className="flex flex-col gap-8 border-l-2 border-gray-100 pl-6 ml-2">
                  {experience.map((exp, i) => (
                    <div key={i} className="relative">
                      <div className="absolute -left-[31px] top-1 w-4 h-4 bg-white rounded-full border-4 border-black"></div>
                      <h3 className="text-lg font-bold">{exp.role}</h3>
                      <p className="text-sm text-gray-500 mb-2">{exp.company}</p>
                      <p className="text-xs font-bold bg-black text-white inline-block px-2 py-0.5 rounded mb-2">{exp.time}</p>
                      <p className="text-sm text-gray-600 leading-relaxed">{exp.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Connect Section for Recruiters */}
              <section>
                <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Connect</h2>
                <div className="flex flex-wrap gap-3">
                  {contactsList.map((contact, i) => (
                    <a 
                      key={i} 
                      href={contact.href} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex-grow flex items-center justify-center gap-2 px-4 py-3 border border-gray-200 rounded-lg active:bg-gray-50 min-w-[140px] transition-colors"
                    >
                      {contact.icon}
                      <span className="text-sm font-bold">{contact.label}</span>
                    </a>
                  ))}
                </div>
              </section>

            </motion.div>
          )}

        </AnimatePresence>
      </main>
    </div>
  );
}
