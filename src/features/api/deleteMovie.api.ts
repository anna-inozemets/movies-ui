import { API_URL, baseHeaders } from './config.api';

export async function deleteMovieById(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/movies/${id}`, {
    method: "DELETE",
    headers: baseHeaders,
  });

  if (!response.ok) {
    throw new Error(`Request failed. HTTP ${response.status}`);
  }
}