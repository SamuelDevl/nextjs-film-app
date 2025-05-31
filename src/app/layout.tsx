import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/NavBar";
import "keen-slider/keen-slider.min.css";

// layout.tsx nebo globals setup
import { Oswald, DM_Sans, Quicksand, Permanent_Marker } from "next/font/google";

export const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-oswald",
});

export const dmsans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-dmsans",
});

export const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-quicksand",
});

export const marker = Permanent_Marker({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-marker",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${oswald.variable} ${dmsans.variable} ${quicksand.variable} ${marker.variable}`}
    >
      <body>
        <Navbar />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
