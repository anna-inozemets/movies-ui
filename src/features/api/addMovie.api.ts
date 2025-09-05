import { type MoviePayload } from '../types/MovieTypes'
import { API_URL, baseHeaders } from './config.api';


export async function addMovie(payload: MoviePayload) {
  const response = await fetch(`${API_URL}/movies`, {
    method: 'POST',
    headers: {
      ...baseHeaders,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Request failed. HTTP ${response.status}`);
  }

  const data = await response.json();

  if (data.status === 0) {
    throw new Error(data.error.code || 'Unknown server error');
  }

  return data;
}
