"use client";

import Link from "next/link";
import ThemeToggle from "@/lib/ThemeToggle";
import {
  Home,
  Film,
  Star,
  Clapperboard,
  LogIn,
  LogOut,
  User,
} from "lucide-react";
import { useState, useEffect } from "react";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { data: session, status } = useSession();

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
          href="/films"
          className="flex items-center gap-2 hover:text-primary transition"
        >
          <Film className="w-4 h-4" />
          Filmy
        </Link>
        <Link
          href="/favorites"
          className="flex items-center gap-2 hover:text-primary transition"
        >
          <Star className="w-4 h-4" />
          Oblíbené
        </Link>
        <Link
          href="/popular"
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
        {status === "authenticated" ? (
          <button
            onClick={() => signOut()}
            className="flex items-center gap-2 hover:text-red-500 transition"
          >
            <LogOut className="w-4 h-4" />
            Odhlásit{" "}
            {session?.user?.name && `(${session.user.name.split(" ")[0]})`}
          </button>
        ) : (
          <button
            onClick={() => signIn("google")}
            className="flex items-center gap-2 hover:text-green-500 transition"
          >
            <LogIn className="w-4 h-4" />
            Přihlásit se
          </button>
        )}
      </div>
    </nav>
  );
}
