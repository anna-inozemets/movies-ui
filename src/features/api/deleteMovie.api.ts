const API_URL = import.meta.env.API_URL
const API_TOKEN = import.meta.env.API_TOKEN;

export async function deleteMovieById(id: number): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/movies/${id}`, {
      method: "DELETE",
      headers: {
        'Authorization': API_TOKEN,
      },
    });

    if (!response.ok) {
      console.error(`Error is occured. HTTP ${response.status}`);
    }
  } catch (error: any) {
    console.error(`Error is occured: ${error}`)
  }
}