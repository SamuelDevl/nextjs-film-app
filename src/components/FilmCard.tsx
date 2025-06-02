"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { supabase } from "@/lib/supabaseUser";
import { Eye, EyeOff, Star, Heart, HeartOff } from "lucide-react";
import FilmModal from "@/components/FilmModal";
import { Film } from "@/components/GetFilmApi";

export default function FilmCard({ movie }: { movie: Film }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isWatchlist, setIsWatchlist] = useState(false);
  const { data: session } = useSession();

  // ✅ Zjisti, zda film je v oblíbených nebo watchlistu
  useEffect(() => {
    const checkStatus = async () => {
      if (!session?.user?.email) return;

      const { data: favData } = await supabase
        .from("favorites")
        .select("film_id")
        .eq("user_email", session.user.email)
        .eq("film_id", movie.id)
        .maybeSingle();

      const { data: watchData } = await supabase
        .from("watchlist")
        .select("film_id")
        .eq("user_email", session.user.email)
        .eq("film_id", movie.id)
        .maybeSingle();

      setIsFavorite(!!favData);
      setIsWatchlist(!!watchData);
    };

    checkStatus();
  }, [session?.user?.email, movie.id]);

  const handleFavorite = async () => {
    const nextState = !isFavorite;
    setIsFavorite(nextState);

    if (session?.user?.email) {
      if (nextState) {
        await supabase
          .from("favorites")
          .upsert([{ user_email: session.user.email, film_id: movie.id }], {
            onConflict: "user_email,film_id",
          });
      } else {
        await supabase
          .from("favorites")
          .delete()
          .eq("user_email", session.user.email)
          .eq("film_id", movie.id);
      }
    }
  };

  const handleWatchlist = async () => {
    const nextState = !isWatchlist;
    setIsWatchlist(nextState);

    if (session?.user?.email) {
      if (nextState) {
        await supabase
          .from("watchlist")
          .upsert([{ user_email: session.user.email, film_id: movie.id }], {
            onConflict: "user_email,film_id",
          });
      } else {
        await supabase
          .from("watchlist")
          .delete()
          .eq("user_email", session.user.email)
          .eq("film_id", movie.id);
      }
    }
  };

  return (
    <>
      <div
        onClick={() => setIsModalOpen(true)}
        className="min-w-[140px] max-w-[140px] flex-shrink-0 cursor-pointer group relative"
      >
        <div className="relative rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-[1.04] border border-gray-200 dark:border-white/10 hover:border-gray-400 dark:hover:border-white/30 bg-white dark:bg-transparent">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-[210px] object-cover transition-opacity duration-300 group-hover:opacity-60"
          />

          {/* Hover Overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center px-2 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/50 text-white">
            <h3 className="text-xs font-medium mb-1">{movie.title}</h3>
            <p className="text-xs flex items-center gap-1 text-white">
              <Star className="w-4 h-4 text-purple-400" />
              {movie.vote_average.toFixed(1)} / 10
            </p>
          </div>

          {/* Akce */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute top-2 right-2 flex flex-col gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <button onClick={handleFavorite}>
              {isFavorite ? (
                <Heart className="w-5 h-5 text-red-500" />
              ) : (
                <Heart className="w-5 h-5 text-white" />
              )}
            </button>
            <button onClick={handleWatchlist}>
              {isWatchlist ? (
                <Eye className="w-5 h-5 text-blue-400" />
              ) : (
                <Eye className="w-5 h-5 text-white" />
              )}
            </button>
          </div>
        </div>

        <p className="mt-2 text-sm font-oswald text-gray-900 dark:text-white text-center truncate">
          {movie.title}
        </p>
      </div>

      {isModalOpen && (
        <FilmModal movie={movie} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}
