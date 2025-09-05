import { API_URL, baseHeaders } from './config.api';

export async function importMovies(file: File) {
  const form = new FormData();
  form.append("movies", file);

  const response = await fetch(`${API_URL}/movies/import`, {
    method: "POST",
    headers: baseHeaders,
    body: form,
  });

  if (!response.ok) {
    throw new Error(`Request failed. HTTP ${response.status}`);
  }

  return await response.json();
}

