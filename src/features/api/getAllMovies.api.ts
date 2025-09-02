import { type Movie } from '../types/MovieTypes';

const API_URL = import.meta.env.VITE_API_URL
const API_TOKEN = import.meta.env.VITE_API_TOKEN;

export async function getAllMovies(query?: string): Promise<Movie[]> {
  try {
    const urlTitle =
      query && query.trim()
        ? `${API_URL}/movies?title=${encodeURIComponent(query.trim())}`
        : `${API_URL}/movies`;

    const response1 = await fetch(urlTitle, {
      headers: {
        'Authorization': API_TOKEN,
      },
    });

    if (!response1.ok) {
      console.error(`Error is occured. HTTP ${response1.status}`);
    }

    const resul1 = await response1.json();
    let merged: Movie[] = (resul1?.data ?? []) as Movie[];

    if (query && query.trim()) {
      const response2 = await fetch(
        `${API_URL}/movies?actor=${encodeURIComponent(query.trim())}`,
        {
          headers: {
            'Authorization': API_TOKEN,
          },
        }
      );

      if (response2.ok) {
        const resul2 = await response2.json();
        const byActor: Movie[] = (resul2?.data ?? []) as Movie[];
        const map = new Map<number, Movie>();

        for (const m of [...merged, ...byActor]) {
          map.set(m.id, m);
        }

        merged = Array.from(map.values());
      }
    }

    return merged;
  } catch (error: any) {
    console.error(`Error is occured: ${error}`);
    return Promise.reject(error);
  }
}

