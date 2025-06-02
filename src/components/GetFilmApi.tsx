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

export interface Genre {
  id: number;
  name: string;
}

export const genres: Genre[] = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Krimi" },
  { id: 10749, name: "Romantic" },
  { id: 99, name: "Dokument" },
  { id: 14, name: "Fantasy" },
];

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

export const getRecentUpadatedFilms = async (): Promise<Film[]> => {
  const responseRecent = await fetch(
    `${BASE_URL}/movie/now_playing?api_key=${FILM_API_KEY}&language=cs-CZ&page=1&region=CZ`
  );

  if (!responseRecent.ok) {
    throw new Error("Chyba při načítání now playing filmů");
  }

  const dataRecent = await responseRecent.json();
  return dataRecent.results;
};

export const getFilmsByGenre = async (genreID: number): Promise<Film[]> => {
  const response = await fetch(
    `${BASE_URL}/discover/movie?api_key=${FILM_API_KEY}&language=cs-CZ&with_genres=${genreID}&sort_by=popularity.desc&page=1`
  );

  if (!response.ok) {
    throw new Error("Chyba při načítání filmů podle žánru");
  }

  const data = await response.json();
  return data.results;
};

export const getAllFilms = async (page = 1): Promise<Film[]> => {
  const response = await fetch(
    `${BASE_URL}/discover/movie?api_key=${FILM_API_KEY}&language=cs-CZ&page=${page}&sort_by=popularity.desc`
  );

  if (!response.ok) {
    throw new Error("Chyba při načítání filmů");
  }

  const data = await response.json();
  return data.results;
};

export const searchFilms = async (query: string): Promise<Film[]> => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${FILM_API_KEY}&language=cs-CZ&query=${encodeURIComponent(
      query
    )}`
  );

  if (!response.ok) {
    throw new Error("Chyba při hledání filmů");
  }

  const data = await response.json();
  return data.results;
};

// GetFilmApi.ts
export const getFilmById = async (id: number): Promise<Film> => {
  const res = await fetch(
    `${BASE_URL}/movie/${id}?api_key=${FILM_API_KEY}&language=cs-CZ`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Chyba při načítání filmu");
  }

  return res.json();
};
