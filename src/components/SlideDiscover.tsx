"use client";

import { useEffect, useState } from "react";
import {
  getRecentUpadatedFilms,
  getFilmsByGenre,
  genres,
  Film,
} from "./GetFilmApi";
import FilmCard from "@/components/FilmCard"; // ✅ import nové FilmCard

export default function DiscoverSlider() {
  const [recentFilms, setRecentFilms] = useState<Film[]>([]);
  const [genreFilms, setGenreFilms] = useState<Record<string, Film[]>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const recent = await getRecentUpadatedFilms();
        setRecentFilms(recent);

        const genreFetches = genres.map(async (genre) => {
          const films = await getFilmsByGenre(genre.id);
          return { name: genre.name, films };
        });

        const genreResults = await Promise.all(genreFetches);

        const results: Record<string, Film[]> = {};
        genreResults.forEach(({ name, films }) => {
          results[name] = films;
        });

        setGenreFilms(results);
      } catch (err) {
        console.error("Chyba při načítání filmů:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  if (loading) {
    return <p className="text-gray-500 dark:text-gray-400">Načítám filmy...</p>;
  }

  return (
    <section className="px-4">
      {/* 🔹 Recently Published */}
      {recentFilms.length > 0 && (
        <div className="mb-10">
          <div className="py-6">
            <h2 className="font-dmsans text-xl font-semibold text-gray-900 dark:text-white">
              Recently Published Films
            </h2>
          </div>

          <div className="flex gap-4 overflow-x-auto p-4 hide-scrollbar">
            {recentFilms
              .filter((movie) => movie.poster_path)
              .map((movie) => (
                <FilmCard key={movie.id} movie={movie} />
              ))}
          </div>
        </div>
      )}

      {/* 🔸 Genre rows */}
      {Object.entries(genreFilms).map(([genreName, films]) => (
        <div key={genreName} className="mb-10">
          <div className="py-4">
            <h2 className="font-dmsans text-xl font-semibold text-gray-900 dark:text-white">
              {genreName} Movies
            </h2>
          </div>

          <div className="flex gap-4 overflow-x-auto p-2 hide-scrollbar">
            {films
              .filter((movie) => movie.poster_path)
              .map((movie) => (
                <FilmCard key={movie.id} movie={movie} />
              ))}
          </div>
        </div>
      ))}
    </section>
  );
}
