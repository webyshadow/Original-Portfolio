import type { Metadata } from "next";
import "./globals.css";
import { Bebas_Neue } from 'next/font/google';

// Font optimization with display swap
const bebasNeue = Bebas_Neue({ 
  weight: '400', 
  subsets: ['latin'],
  display: 'swap', // Prevent FOIT (Flash of Invisible Text)
  variable: '--font-bebas',
  preload: true,
});

// Complete SEO Metadata
export const metadata: Metadata = {
  // Basic Meta Tags
  title: {
    default: "Shadmaan Ansari - Full Stack Developer & UI/UX Designer",
    template: "%s | Shadmaan Ansari"
  },
  description: "Portfolio of Shadmaan Ansari - Full Stack MERN Developer & UI/UX Designer specializing in React, Next.js, TypeScript, and modern web development. Based in India, available for freelance projects and full-time opportunities.",
  
  // Keywords for SEO
  keywords: [
    "Shadmaan Ansari",
    "Full Stack Developer",
    "MERN Stack Developer",
    "React Developer",
    "Next.js Developer",
    "UI/UX Designer",
    "TypeScript Developer",
    "Web Developer India",
    "Frontend Developer",
    "Backend Developer",
    "Freelance Developer",
    "Portfolio Website",
    "Node.js Developer",
    "Tailwind CSS",
    "MongoDB Developer"
  ],

  // Author & Creator
  authors: [{ name: "Shadmaan Ansari", url: "https://shadmaanansari.com" }],
  creator: "Shadmaan Ansari",
  publisher: "Shadmaan Ansari",

  // Open Graph (Facebook, LinkedIn)
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://shadmaanansari.com",
    siteName: "Shadmaan Ansari Portfolio",
    title: "Shadmaan Ansari - Full Stack Developer & UI/UX Designer",
    description: "Portfolio of Shadmaan Ansari - Full Stack MERN Developer & UI/UX Designer specializing in React, Next.js, TypeScript, and modern web development.",
    images: [
      {
        url: "https://shadmaanansari.com/og-image.jpg", // 1200x630px recommended
        width: 1200,
        height: 630,
        alt: "Shadmaan Ansari - Full Stack Developer Portfolio",
      }
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary_large_image",
    site: "@xhadmaan", // Your Twitter handle
    creator: "@xhadmaan",
    title: "Shadmaan Ansari - Full Stack Developer & UI/UX Designer",
    description: "Portfolio of Shadmaan Ansari - Full Stack MERN Developer & UI/UX Designer specializing in React, Next.js, TypeScript.",
    images: ["https://shadmaanansari.com/twitter-image.jpg"], // 1200x600px recommended
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },


  // Icons & Manifest
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', type: 'image/png', sizes: '32x32' },
    ],
    apple: '/apple-icon.png',
  },
  manifest: '/manifest.json',

  // Additional
  metadataBase: new URL('https://shadmaanansari.com'), // Replace with your actual domain
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={bebasNeue.variable}>
      <head>
        {/* Preconnect to external domains for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Theme Color for Mobile Browsers */}
        <meta name="theme-color" content="#000000" />
        
        {/* Viewport for responsive design */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        
        {/* JSON-LD Structured Data for better SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Shadmaan Ansari",
              "url": "https://shadmaanansari.com",
              "image": "https://shadmaanansari.com/me.3.webp",
              "jobTitle": "Full Stack Developer & UI/UX Designer",
              "worksFor": {
                "@type": "Organization",
                "name": "Webseeder Technologies"
              },
              "sameAs": [
                "https://github.com/webyshadow",
                "https://linkedin.com/in/shadmaan-ansari",
                "https://t.me/WebyShadow"
              ],
              "knowsAbout": [
                "React.js",
                "Next.js",
                "TypeScript",
                "Node.js",
                "MongoDB",
                "UI/UX Design",
                "Full Stack Development"
              ],
              "alumniOf": {
                "@type": "EducationalOrganization",
                "name": "Future University"
              },
              "address": {
                "@type": "PostalAddress",
                "addressRegion": "UP",
                "addressCountry": "India"
              },
              "email": "ansari.shaws@gmail.com"
            })
          }}
        />
      </head>
      <body className="scrollbar-hide">{children}</body>
    </html>
  );
}
