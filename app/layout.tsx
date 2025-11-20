import type { Metadata } from "next";
import "./globals.css";
//
//

import { Bebas_Neue } from 'next/font/google';

const bebasNeue = Bebas_Neue({ weight: '400', subsets: ['latin'] });

export const metadata: Metadata = {
  title: "Shadmaan Ansari - Portfolio",
  description: "Full Stack Developer & Designer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={bebasNeue.className}>
      <body className="scrollbar-hide">{children}</body>
    </html>
  );
}
