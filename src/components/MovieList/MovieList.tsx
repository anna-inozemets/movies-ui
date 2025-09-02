import { useEffect, useState } from "react";
import { getAllMovies } from "../../features/api/getAllMovies.api";
import { MovieCard } from "../MovieCard";
import { type Movie } from '../../features/types/MovieTypes';
import './MovieList.css'

type Props = {
  query: string;
  sortAZ: boolean;
  reloadKey?: number;
};

export function MoviesList({ query, sortAZ, reloadKey = 0 }: Props) {
  const [items, setItems] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAll = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllMovies(query);

      data.sort((a, b) => a.title.localeCompare(b.title, "uk", { sensitivity: "base" }));
      if (!sortAZ) data.reverse();

      setItems(data);
    } catch (e: any) {
      setError(e?.message || "Не вдалося завантажити фільми");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAll(); }, [query, sortAZ, reloadKey]);

  const handleDeleted = (id: number) => {
    setItems(prev => prev.filter(m => m.id !== id));
  };

  if (loading) return <p style={{ padding: 16 }}>Loading...</p>;
  if (error) return <p style={{ padding: 16, color: "crimson" }}>Error: {error}</p>;
  if (items.length === 0) return <div style={{ padding: 16 }}><p>List is empty.</p></div>;

  return (
    <div className="movie__list">
      <div className="container">
        {items.map(m => (
          <MovieCard key={m.id} id={m.id} title={m.title} onDeleted={handleDeleted} />
        ))}
      </div>
    </div>
  );
}
