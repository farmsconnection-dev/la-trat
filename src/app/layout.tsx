import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Trattoria Trium | Authentic Sicilian Pizza in Bruges",
  description: "Handcrafted Sicilian pizza from the heart of Bruges. Discover our signature flavors — tap a box to reveal!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..900;1,6..96,400..900&family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Satisfy&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        {/* Critical CSS: ensure hero video + content are visible before JS hydrates */}
        <style dangerouslySetInnerHTML={{ __html: `
          /* Guarantee the video layer is always visible */
          .hero-video {
            opacity: 1 !important;
            filter: brightness(1.2) contrast(1.1) saturate(1.1);
          }

          /* Body must have a dark bg, never transparent */
          body {
            background-color: #0a0a0a;
          }

          /* CSS-only curtain timeout: if JS hasn't removed the curtain after 5s, fade it away */
          @keyframes curtainCssFallback {
            0%, 90% { opacity: 1; }
            100%    { opacity: 0; pointer-events: none; }
          }

          /* The hero overlay must start at correct transparency, not solid black */
          .hero-overlay {
            background: rgba(0,0,0,0.3) !important;
            opacity: 1 !important;
          }
        ` }} />
      </head>
      <body className="overflow-x-hidden bg-[#0a0a0a]" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
