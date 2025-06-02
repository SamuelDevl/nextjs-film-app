// components/FilmModal.tsx
"use client";

import {
  X,
  Star,
  Calendar,
  Languages,
  ThumbsUp,
} from "lucide-react";
import { Film } from "@/components/GetFilmApi";

export default function FilmModal({
  movie,
  onClose,
}: {
  movie: Film;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl rounded-xl overflow-hidden shadow-xl bg-neutral-900">
        {/* Backdrop image */}
        <div
          className="h-[450px] bg-cover bg-center relative"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-red-400 transition z-20"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="relative z-10 p-6 text-white">
          <h2 className="text-3xl font-semibold mb-3">{movie.title}</h2>
          <p className="text-sm text-gray-300 mb-6 max-w-3xl">
            {movie.overview}
          </p>

          <div className="flex flex-wrap gap-4 text-sm text-gray-300">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400" />
              {movie.vote_average.toFixed(1)} / 10
            </div>
            <div className="flex items-center gap-1">
              <ThumbsUp className="w-4 h-4" />
              {movie.vote_count} hlasů
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {movie.release_date}
            </div>
            <div className="flex items-center gap-1">
              <Languages className="w-4 h-4" />
              {movie.original_language.toUpperCase()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
