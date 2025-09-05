import { type Movie, type MoviesPageResponse, type MovieTitleSort } from '../types/MovieTypes';
import { API_URL, baseHeaders } from './config.api';

export async function getSortedMovies(offset: number = 0, limit: number = 12, sort: MovieTitleSort): Promise<MoviesPageResponse> {
  const url = `${API_URL}/movies?limit=${limit}&offset=${offset}&sort=title&order=${sort}`;
  const response = await fetch(url, { headers: baseHeaders });

  if (!response.ok) {
    throw new Error(`Request failed. HTTP ${response.status}`);
  }

  const json = await response.json();
  const movies: Movie[] = (json?.data ?? []) as Movie[];
  const total: number = (json.meta.total as number) ?? movies.length ?? 0;

  return { movies, total };
}