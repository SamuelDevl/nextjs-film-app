"use client";

import Link from "next/link";
import { Film } from "./GetFilmApi";

interface Props {
  film: Film;
}

export default function FilmCard({ film }: Props) {
  return (
    <div className="border p-4 rounded shadow-md max-w-sm bg-white dark:bg-zinc-800 text-black dark:text-white font-quicksand transition-colors">
      <h2 className="text-xl font-oswald font-bold mb-2">{film.title}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{film.release_date}</p>
      <p className="mb-4 line-clamp-4">{film.overview}</p>
      <p className="font-semibold">Hodnocení: {film.vote_average}</p>
      <Link
        href={`/film/${film.id}`}
        className="text-blue-500 dark:text-blue-300 underline mt-2 inline-block"
      >
        Detail filmu
      </Link>
    </div>
  );
}
