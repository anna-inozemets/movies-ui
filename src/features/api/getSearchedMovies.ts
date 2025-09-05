import { type Movie, type MoviesPageResponse } from '../types/MovieTypes';
import { API_URL, baseHeaders } from './config.api';

export async function getSearchedMovies(offset: number = 0, limit: number = 12, query: string): Promise<MoviesPageResponse> {
  const normalizedQuery = query.trim();

  const url = `${API_URL}/movies?limit=${limit}&offset=${offset}&search=${encodeURIComponent(normalizedQuery)}`;
  const response = await fetch(url, { headers: baseHeaders });

  if (!response.ok) {
    throw new Error(`Request failed. HTTP ${response.status}`);
  }

  const json = await response.json();
  const movies: Movie[] = (json?.data ?? []) as Movie[];
  const total: number = (json.meta.total as number) ?? movies.length ?? 0;

  return { movies, total };
}