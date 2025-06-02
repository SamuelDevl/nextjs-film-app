import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { createClient } from "@supabase/supabase-js";
import FilmCard from "@/components/FilmCard";
import { Film, getFilmById } from "@/components/GetFilmApi";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function getWatchlist(email: string): Promise<Film[]> {
  const { data: watchlistRows, error } = await supabase
    .from("watchlist")
    .select("film_id")
    .eq("user_email", email);

  if (error || !watchlistRows) return [];

  const films: Film[] = [];

  for (const row of watchlistRows) {
    try {
      const film = await getFilmById(row.film_id);
      films.push(film);
    } catch (err) {
      console.error(`❌ Chyba při načítání filmu ID ${row.film_id}:`, err);
    }
  }

  return films;
}

export default async function WatchlistPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return (
      <div className="p-4 pt-20 max-w-7xl mx-auto text-gray-500 dark:text-gray-400">
        <p>Nejsi přihlášený.</p>
      </div>
    );
  }

  const watchlist = await getWatchlist(session.user.email);

  return (
    <div className="p-4 pt-20 max-w-7xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
        Můj watchlist
      </h2>

      {watchlist.length === 0 ? (
        <p className="text-sm text-gray-400">Nemáš žádné filmy ve watchlistu.</p>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-2 sm:gap-4">
          {watchlist.map((movie) => (
            <FilmCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}
