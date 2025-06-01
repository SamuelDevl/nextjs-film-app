"use client";

import Link from "next/link";
import ThemeToggle from "@/app/lib/ThemeToggle";
import { Home, Film, Star, Clapperboard } from "lucide-react";
import { useState, useEffect } from "react";
import React from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`w-full fixed transition-all px-6 py-4 flex items-center justify-between duration-300 z-50 ${
        scrolled
          ? "bg-white dark:bg-black"
          : "bg-background dark:bg-background top-0"
      }`}
    >
      {/* Logo / Název */}
      <div className="text-2xl font-oswald tracking-wide flex items-center gap-2">
        <Clapperboard className="w-6 h-6 text-primary" />
        <span className="text-primary font-oswald">HotSpot</span>
      </div>

      {/* Navigace */}
      <div className="flex items-center gap-6 font-dmsans text-sm">
        <Link
          href="/"
          className="flex items-center gap-2 hover:text-primary transition"
        >
          <Home className="w-4 h-4" />
          Domů
        </Link>
        <Link
          href="/filmy"
          className="flex items-center gap-2 hover:text-primary transition"
        >
          <Film className="w-4 h-4" />
          Filmy
        </Link>
        <Link
          href="/oblibene"
          className="flex items-center gap-2 hover:text-primary transition"
        >
          <Star className="w-4 h-4" />
          Oblíbené
        </Link>
        <Link
          href="/populární"
          className="flex items-center gap-2 hover:text-primary transition"
        >
          <Star className="w-4 h-4" />
          Populární
        </Link>
        <Link
          href="/watchlist"
          className="flex items-center gap-2 hover:text-primary transition"
        >
          <Star className="w-4 h-4" />
          Watchlist
        </Link>
        <Link
          href="/originals"
          className="flex items-center gap-2 hover:text-primary transition"
        >
          <Star className="w-4 h-4" />
          Originals
        </Link>
        <ThemeToggle />
      </div>
    </nav>
  );
}
