import { type Movie } from '../types/MovieTypes';
import { API_URL, baseHeaders } from './config.api';

export async function getMovieById(id: number): Promise<Movie> {
  const response = await fetch(`${API_URL}/movies/${id}`, { headers: baseHeaders });

  if (!response.ok) {
    throw new Error(`Request failed. HTTP ${response.status}`);
  }
  const json = await response.json();

  return json?.data as Movie;
}