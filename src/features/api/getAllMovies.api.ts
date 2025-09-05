import { type Movie, type MoviesPageResponse } from '../types/MovieTypes';
import { API_URL, baseHeaders } from './config.api';

export async function getAllMovies(offset: number = 0, limit: number = 12): Promise<MoviesPageResponse> {
  const url = `${API_URL}/movies?limit=${limit}&offset=${offset}`;

  const response = await fetch(url, { headers: baseHeaders });

  if (!response.ok) {
    throw new Error(`Request failed. HTTP ${response.status}`);
  }

  const json = await response.json();
  const movies: Movie[] = (json.data || []) as Movie[];
  const total: number = (json.meta.total as number) || 0;

  return { movies, total };
}
