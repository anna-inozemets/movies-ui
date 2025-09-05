import { useState } from 'react';
import { toast } from 'react-toastify';
import { Loader } from '../Loader';
import { getMovieById } from '../../features/api/getMovieById.api';
import { deleteMovieById } from '../../features/api/deleteMovie.api';
import { type Movie as MovieDetails } from '../../features/types/MovieTypes';
import './MovieCard.css';

type Props = {
  id: number;
  title: string;
  onDeleted: (id: number) => void;
};

export function MovieCard({ id, title, onDeleted }: Props) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState<MovieDetails | null>(null);
  const [errors, setErrors] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  const toggleOpenCard = async () => {
    const nextOpenState = !open;
    setOpen(nextOpenState);
    if (nextOpenState && !details && !loading) {
      try {
        setLoading(true);
        setErrors(null);
        const data = await getMovieById(id);
        setDetails(data);
      } catch (error:any) {
        setErrors(error.message || 'During details are launched error occured');
        toast.error(error.message || 'During details are launched error occured');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDeleteMovie = async () => {
    if (!confirm('Are you sure you want to delete this movie?')) {
      return;
    }

    try {
      setDeleting(true);
      await deleteMovieById(id);
      onDeleted(id);
      toast.success('Movies deleted successfully!');
    } catch (error:any) {
      toast.error("Could't delete movie");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <article className="movie__card">
      <button onClick={toggleOpenCard} aria-expanded={open} aria-controls={`m-${id}`}>
        <h2>{title}</h2>
        <span className={open ? 'is-open' : ''}>➭</span>
      </button>

      <div id={`m-${id}`} className={`movie__card-content ${open ? "is-open" : ""}`}>
        <div style={{ padding: "8px 0 0" }}>
          {loading && <Loader />}
          {errors && <p>{errors}</p>}
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
              <button onClick={handleDeleteMovie} disabled={deleting} className="delete__button">
                {deleting ? "Deleting..." : "Delete"}
              </button>
            </>
          )}
        </div>
      </div>
    </article>
  );
}
