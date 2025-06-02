// app/favorites/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getFilmById } from "@/components/GetFilmApi";
import { createClient } from "@supabase/supabase-js";
import FilmCard from "@/components/FilmCard";
import { Film } from "@/components/GetFilmApi";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function getFavorites(email: string): Promise<Film[]> {
  const { data: favoriteRows, error } = await supabase
    .from("favorites")
    .select("film_id")
    .eq("user_email", email);

  if (error || !favoriteRows) return [];

  const films: Film[] = [];

  for (const row of favoriteRows) {
    try {
      const film = await getFilmById(row.film_id);
      films.push(film);
    } catch (err) {
      console.error(`❌ Nepodařilo se načíst film ${row.film_id}`, err);
    }
  }

  return films;
}

export default async function FavoritesPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return (
      <div className="p-4 pt-20 max-w-7xl mx-auto text-gray-500 dark:text-gray-400">
        <p>Nejsi přihlášený.</p>
      </div>
    );
  }

  const favorites = await getFavorites(session.user.email);

  return (
    <div className="p-4 pt-20 max-w-7xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
        Moje oblíbené filmy
      </h2>

      {favorites.length === 0 ? (
        <p className="text-sm text-gray-400">Nemáš žádné oblíbené filmy.</p>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-2 sm:gap-4">
          {favorites.map((movie) => (
            <FilmCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}
