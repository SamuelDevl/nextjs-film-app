"use client";

import { useEffect, useState } from "react";
import FilmSlider from "@/components/SlideCard";
import {
  Film,
  getTopRatedFilms,
  getRecentUpadatedFilms,
} from "@/components/GetFilmApi";
import { NavigationCard } from "@/components/Navigation";
import DiscoverSlider from "@/components/SlideDiscover";

export default function HomePage() {
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTopRatedFilms()
      .then((data) => setFilms(data))
      .catch((err) => console.error("Chyba při načítání top filmů:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="p-16 pt-4">
      <div>
        {loading ? (
          <p className="text-gray-500">Načítám...</p>
        ) : films.length > 0 ? (
          <FilmSlider films={films.slice(0, 10)} />
        ) : (
          <p className="text-red-500">Žádné filmy nebyly nalezeny.</p>
        )}
      </div>
      <div className="flex justify-between align-center gap-4 pt-12">
        <NavigationCard
          href="/reviews/kino"
          logoSrc="/logo/net.svg"
          videoSrc="/video/vid.mp4"
        />
        <NavigationCard
          href="/reviews/kino"
          logoSrc="/logo/next.svg"
          videoSrc="/video/vid2.mp4"
        />
        <NavigationCard
          href="/reviews/kino"
          logoSrc="/logo/react.svg"
          videoSrc="/video/vid3.mp4"
        />
        <NavigationCard
          href="/reviews/kino"
          logoSrc="/logo/typescript.svg"
          videoSrc="/video/vid4.mp4"
        />
        <NavigationCard
          href="/reviews/kino"
          logoSrc="/logo/javascript.svg"
          videoSrc="/video/vid.mp4"
        />
        <NavigationCard
          href="/reviews/kino"
          logoSrc="/logo/net.svg"
          videoSrc="/video/vid2.mp4"
        />
      </div>
      <div className="pt-10">
        <DiscoverSlider />
      </div>
    </main>
  );
}
