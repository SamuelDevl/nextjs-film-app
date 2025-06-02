"use client";

import { useEffect, useState } from "react";
import { getAllFilms, searchFilms, Film } from "@/components/GetFilmApi";
import FilmCard from "@/components/FilmCard";
import Spinner from "@/components/Spinner";

export default function FilmsPage() {
  const [films, setFilms] = useState<Film[]>([]);
  const [searchResults, setSearchResults] = useState<Film[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const fetchFilms = async (pageToFetch: number) => {
    setLoading(true);
    try {
      const newFilms = await getAllFilms(pageToFetch);
      setFilms((prev) => {
        const allFilms = [...prev, ...newFilms];
        const uniqueMap = new Map<number, Film>();
        for (const film of allFilms) {
          uniqueMap.set(film.id, film);
        }
        return Array.from(uniqueMap.values());
      });
    } catch (error) {
      console.error("Chyba při fetchování filmů:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFilms(page);
  }, [page]);

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      if (searchTerm.trim().length > 0) {
        setIsSearching(true);
        try {
          const results = await searchFilms(searchTerm);
          setSearchResults(results);
        } catch (error) {
          console.error("Chyba při hledání:", error);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  const activeList = searchTerm.length > 0 ? searchResults : films;

  return (
    <div className="p-4 pt-20 max-w-7xl mx-auto">
      {/* Hlavní nadpis + vyhledávání */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
        <h2 className="text-2xl font-dmsans text-gray-900 dark:text-white">
          Seznam všech filmů
        </h2>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Hledat film..."
          className="w-full md:w-72 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-neutral-900 text-gray-900 dark:text-white"
        />
      </div>

      {isSearching && <Spinner />}

      {!isSearching && activeList.length > 0 ? (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-4">
          {activeList
            .filter((movie) => movie.poster_path)
            .map((movie) => (
              <FilmCard key={movie.id} movie={movie} />
            ))}
        </div>
      ) : null}

      {!isSearching && activeList.length === 0 && (
        <p className="text-center text-sm text-gray-500 mt-10">
          Žádné filmy nenalezeny.
        </p>
      )}

      {searchTerm.length === 0 && (
        <div className="flex justify-center mt-10">
          {loading ? (
            <Spinner />
          ) : (
            <button
              onClick={() => setPage((prev) => prev + 1)}
              className="px-6 py-2 rounded-lg bg-blue-600 text-white dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 transition disabled:opacity-50"
            >
              Načíst další
            </button>
          )}
        </div>
      )}
    </div>
  );
}
