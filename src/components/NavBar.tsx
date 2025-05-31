"use client";

import Link from "next/link";
import ThemeToggle from "@/app/lib/ThemeToggle";

export default function Navbar() {
  return (
    <nav className="w-full p-4 border-b flex justify-between items-center">
      <div className="text-2xl">🎬 Aplikace Film</div>
      <div className="flex gap-6 font-dmsans">
        <Link href="/">Domů</Link>
        <Link href="/filmy">Filmy</Link>
        <Link href="/oblibene">Oblíbené Filmy</Link>
        <ThemeToggle/>
      </div>
    </nav>
  );
}
