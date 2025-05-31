const FILM_API_KEY = "6ae9c2e656282e027234843013797e06";
const BASE_URL = "https://api.themoviedb.org/3";

/* https://api.themoviedb.org/3/movie/550?api_key=6ae9c2e656282e027234843013797e06 */

export interface Film {
  id: number;
  title: string;
  overview: string;
  vote_average: number;
  release_date: string;
}

export const getFilmById = async (id: number): Promise<Film> => {
  const response = await fetch(
    `${BASE_URL}/movie/${id}/?api_key=&{FIML_API_KEY}`
  );
  if (!response.ok) {
    throw new Error("Chyba při načítání filmu");
  }
  return response.json();
};
