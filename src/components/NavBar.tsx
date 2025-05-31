"use client";

import Link from "next/link";
import ThemeToggle from "@/app/lib/ThemeToggle";
import { Home, Film, Star, Clapperboard } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="w-full px-6 py-4 bg-background text-foreground flex items-center justify-between">
      {/* Logo / Název */}
      <div className="text-2xl font-oswald tracking-wide flex items-center gap-2">
        <Clapperboard className="w-6 h-6 text-primary" />
        <span className="text-primary font-oswald">HotSpot</span>
      </div>

      {/* Navigace */}
      <div className="flex items-center gap-6 font-dmsans text-sm">
        <Link href="/" className="flex items-center gap-2 hover:text-primary transition">
          <Home className="w-4 h-4" />
          Domů
        </Link>
        <Link href="/filmy" className="flex items-center gap-2 hover:text-primary transition">
          <Film className="w-4 h-4" />
          Filmy
        </Link>
        <Link href="/oblibene" className="flex items-center gap-2 hover:text-primary transition">
          <Star className="w-4 h-4" />
          Oblíbené
        </Link>
        <ThemeToggle />
      </div>
    </nav>
  );
}
