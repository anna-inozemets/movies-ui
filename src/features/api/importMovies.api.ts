const API_URL = import.meta.env.VITE_API_URL
const API_TOKEN = import.meta.env.VITE_API_TOKEN;

export async function importMovies(file: File) {
  try {
    const form = new FormData();
    form.append("movies", file);

    const response = await fetch(`${API_URL}/movies/import`, {
      method: "POST",
      headers: {
        "Authorization": API_TOKEN,
      },
      body: form,
    });

    if (!response.ok) {
      console.error(`Error is occured. HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error: any) {
    console.error(`Error is occured: ${error}`)
  }
}

