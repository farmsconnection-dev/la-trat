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
    <html lang="en" className="scroll-smooth">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
