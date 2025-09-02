import { useState } from "react";
import { getMovieById } from "../../features/api/getMovieById.api";
import { deleteMovieById } from "../../features/api/deleteMovie.api";
import './MovieCard.css'

import { type Movie as MovieDetails } from '../../features/types/MovieTypes';

type Props = {
  id: number;
  title: string;
  onDeleted: (id: number) => void;
};

export function MovieCard({ id, title, onDeleted }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState<MovieDetails | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const toggle = async () => {
    const next = !open;
    setOpen(next);
    if (next && !details && !loading) {
      try {
        setLoading(true);
        setError(null);
        const data = await getMovieById(id);
        setDetails(data);
      } catch (e:any) {
        setError(e?.message || "During details are launched error occured");
      } finally {
        setLoading(false);
      }
    }
  };

  const remove = async () => {
    if (!confirm("Видалити цей фільм?")) return;
    try {
      setDeleting(true);
      await deleteMovieById(id);
      onDeleted(id);
    } catch (e:any) {
      alert(e?.message || "Could not delete film");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <article className="movie__card">
      <button
        onClick={toggle}
        aria-expanded={open}
        aria-controls={`m-${id}`}
      >
        <h2>{title}</h2>
        <span className={open ? 'is-open' : ''}>➭</span>
      </button>

      <div
        id={`m-${id}`}
        className={`movie__card-content ${open ? "is-open" : ""}`}
      >
        <div style={{ padding: "8px 0 0" }}>
          {loading && <p>Loading...</p>}
          {error && <p style={{ color: "crimson" }}>{error}</p>}
          {details && (
            <>
              <p><strong>Year:</strong> {details.year}</p>
              <p><strong>Format:</strong> {details.format}</p>
              <p>
                <strong>Actors:</strong>{" "}
                {details.actors && details.actors.length > 0
                  ? details.actors.map(a => a.name).join(", ")
                  : "—"}
              </p>
              <button
                onClick={remove}
                disabled={deleting}
                title="Remove"
                className="delete__button"
              >
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </>
          )}
        </div>
      </div>
    </article>
  );
}
