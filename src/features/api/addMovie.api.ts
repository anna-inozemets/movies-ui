import { type MoviePayload } from '../types/MovieTypes'

const API_URL = import.meta.env.VITE_API_URL
const API_TOKEN = import.meta.env.VITE_API_TOKEN;


export async function addMovie(payload: MoviePayload) {
  try {
    const response = await fetch(`${API_URL}/movies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': API_TOKEN,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.error(`Error is occured. HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error: any) {
    console.error(`Error is occured: ${error}`)
  }
}

