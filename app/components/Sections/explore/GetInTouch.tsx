'use client';

import { Great_Vibes } from 'next/font/google';

const greatVibes = Great_Vibes({ 
  subsets: ['latin'],
  weight: ['400']
});

export default function GetInTouch() {
  const contacts = [
    { label: 'Email', value: 'hello@shadmaan.dev', href: 'mailto:hello@shadmaan.dev' },
    { label: 'Phone', value: '+91 123 456 7890', href: 'tel:+911234567890' },
    { label: 'LinkedIn', value: 'linkedin.com/in/shadmaan', href: 'https://linkedin.com/in/shadmaan' },
    { label: 'GitHub', value: 'github.com/shadmaan', href: 'https://github.com/shadmaan' },
    { label: 'Twitter', value: '@shadmaan_dev', href: 'https://twitter.com/shadmaan_dev' },
  ];

  return (
    <section className="relative w-full h-screen overflow-hidden">
        
      {/* Top Half - GET with Contact Links */}
      <div className="h-1/2 w-full bg-white flex items-start overflow-hidden px-8 pt-0 relative">
        {/* GET Text */}
        <h2 
          className="font-black leading-none tracking-tighter text-black"
          style={{ 
            fontFamily: 'Bebas Neue, sans-serif',
            fontSize: 'clamp(200px, 28vw, 600px)',
            lineHeight: '1'
          }}
        >
          GET
        </h2>

        {/* Contact Links - Right Side */}
        <div className="absolute right-12 top-1/2 -translate-y-1/2 space-y-4">
          {contacts.map((contact, index) => (
            <a
              key={contact.label}
              href={contact.href}
              className="group block text-right"
              style={{ 
                animationDelay: `${index * 100}ms`,
                opacity: 0,
                animation: 'fadeInRight 0.5s ease forwards'
              }}
            >
              <div className="text-xs font-semibold text-gray-400 mb-1 uppercase tracking-wider">
                {contact.label}
              </div>
              <div className="text-lg font-medium text-gray-800 group-hover:text-black transition-colors relative">
                {contact.value}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black group-hover:w-full transition-all duration-300"></span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Bottom Half - IN TOUCH! with "thank you" overlay */}
      <div className="h-1/2 w-full bg-black flex items-center overflow-hidden px-8 relative">
        {/* Thank You Text - Overlaid on IN TOUCH! */}
        <p 
          className={`${greatVibes.className} absolute z-10`}
          style={{
            fontSize: 'clamp(80px, 12vw, 180px)',
            color: 'rgb(240, 129, 15)',
            top: '15%',
            left: '8%'
          }}
        >
          thank you
        </p>

        {/* IN TOUCH! Text */}
        <h2 
          className="font-black leading-none tracking-normal text-white relative z-0"
          style={{ 
            fontFamily: 'Bebas Neue, sans-serif',
            fontSize: 'clamp(150px, 26vw, 500px)',
            lineHeight: '1'
          }}
        >
          IN TOUCH!
        </h2>
      </div>

      <style>{`
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
}
