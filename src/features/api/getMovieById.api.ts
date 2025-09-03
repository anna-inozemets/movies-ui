import { type Movie } from '../types/MovieTypes';

const API_URL = import.meta.env.VITE_API_URL
const API_TOKEN = import.meta.env.VITE_API_TOKEN;

export async function getMovieById(id: number): Promise<Movie> {
   try {
    const response = await fetch(`${API_URL}/movies/${id}`, {
      headers: {
        'Authorization': API_TOKEN
      }
    });

    if (!response.ok) {
      console.error(`Error is occured. HTTP ${response.status}`);
    }
    const json = await response.json();

    return json?.data as Movie;
  } catch (error: any) {
    console.error(`Error is occured: ${error}`);
    return Promise.reject(error);
  }
}