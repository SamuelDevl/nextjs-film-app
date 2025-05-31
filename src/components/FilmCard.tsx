"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { getFilmById } from "./GetFilmApi";
import { Film } from "./GetFilmApi";

interface Props {
  id: number;
  name: string;
}

export default function FilmCard({ id }: Props) {
  const [film, setFilm] = useState<Film | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFilms();
  }, []);

  const fetchFilms = async () => {
    setLoading(true);
    try {
      const film = await getFilmById(id);
      setFilm(film);
    } catch (err) {
      console.log("Chyba při fetchování dat", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border p-4 rounded shadow-md max-w-sm">
      {loading ? (
        <p>Načítám...</p>
      ) : film ? (
        <>
          <h2 className="text-xl font-bold mb-2">{film.title}</h2>
          <p className="text-sm text-gray-600 mb-2">{film.release_date}</p>
          <p className="mb-4">{film.overview}</p>
          <p className="font-semibold">Hodnocení: {film.vote_average}</p>
          <Link
            href={`/film/${film.id}`}
            className="text-blue-500 underline mt-2 inline-block"
          >
            Detail filmu
          </Link>
        </>
      ) : (
        <p>Film nebyl nalezen.</p>
      )}
    </div>
  );
}
