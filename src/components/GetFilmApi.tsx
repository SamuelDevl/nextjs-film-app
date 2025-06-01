const FILM_API_KEY = "6ae9c2e656282e027234843013797e06";
const BASE_URL = "https://api.themoviedb.org/3";

export interface Film {
  id: number;
  title: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  original_language: string;
  popularity: number;
  release_date: string;
  poster_path: string;
  backdrop_path: string;
}

export const getTopRatedFilms = async (): Promise<Film[]> => {
  const response = await fetch(
    `${BASE_URL}/movie/top_rated?api_key=${FILM_API_KEY}&language=cs-CZ&page=1`
  );

  if (!response.ok) {
    throw new Error("Chyba při načítání top filmů");
  }

  const data = await response.json();
  return data.results;
};
