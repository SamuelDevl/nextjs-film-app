"use client";

import { useEffect, useState } from "react";
import FilmSlider from "@/components/SlideCard";
import { Film, getTopRatedFilms } from "@/components/GetFilmApi";

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
    <main className="p-6 pt-10">
      {loading ? (
        <p className="text-gray-500">Načítám...</p>
      ) : films.length > 0 ? (
        <FilmSlider films={films.slice(0, 10)} />
      ) : (
        <p className="text-red-500">Žádné filmy nebyly nalezeny.</p>
      )}
    </main>
  );
}
