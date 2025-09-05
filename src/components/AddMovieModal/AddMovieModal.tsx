import { useState } from 'react';
import { toast } from 'react-toastify';
import { validateMovieForm } from '../../features/validation/movieFormValidator';
import { addMovie } from '../../features/api/addMovie.api';
import { type MovieFormat } from '../../features/types/MovieTypes';
import './AddMovieModal.css';

type Props = { open: boolean; onClose: () => void };

export const AddMovieModal = ({ open, onClose }: Props) => {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState<number | ''>('');
  const [format, setFormat] = useState<MovieFormat>('VHS');
  const [actors, setActors] = useState<string[]>(['']);
  const [, setErrors] = useState<string[]>([]);

  const handleActorChange = (i: number, value: string) => {
    const newActors = [...actors];
    newActors[i] = value;
    setActors(newActors);
  };

  const addActor = () => setActors([...actors, '']);
  const removeActor = (actorId: number) => setActors(actors.filter((_, id) => id !== actorId));

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const { errors: nextErrors, payload } = validateMovieForm({ title, year, format, actors });

    if (nextErrors.length || !payload) {
      setErrors(nextErrors);
      nextErrors.forEach(msg => toast.error(msg));
      return;
    }

    try {
      await addMovie(payload);
      toast.success('Movie added successfully');
      setTitle('');
      setYear('');
      setFormat('VHS');
      setActors(['']);
      setErrors([]);
      onClose();
    } catch (error: any) {
      if (error.message === 'MOVIE_EXISTS') {
        toast.error('A movie with this title already exists');
      } else {
        toast.error(error.message || 'Failed to add movie 😢');
      }
    }
  };

  return (
    <div className={`modal ${open ? "is-open" : ""}`}>
      <div className="modal__content">
        <button type="button" className="modal__button-close" onClick={onClose}><span></span><span></span></button>
        <form className="modal__form" onSubmit={handleSubmit}>
          <label htmlFor="title">
            <p>Title*</p>
            <input id="title" type="text" name="title" placeholder="Enter title" value={title} onChange={e => setTitle(e.target.value)} />
          </label>
          <label htmlFor="year">
            <p>Year*</p>
            <input id="year" type="number" name="year" placeholder="Enter release year" value={year} onChange={e => setYear(e.target.value ? Number(e.target.value) : "")} />
          </label>
          <div className="modal__movie-format">
            <label htmlFor="vhs" className={format === "VHS" ? "active" : ""}>
              <input id="vhs" type="radio" name="format" value="VHS" checked={format === "VHS"} onChange={(e) => setFormat(e.target.value as MovieFormat)} />
              <p>VHS</p>
            </label>
            <label htmlFor="dvd" className={format === "DVD" ? "active" : ""}>
              <input id="dvd" type="radio" name="format" value="DVD" checked={format === "DVD"} onChange={(e) => setFormat(e.target.value as MovieFormat)} />
              <p>DVD</p>
            </label>
            <label htmlFor="bluRay" className={format === "Blu-Ray" ? "active" : ""}>
              <input id="bluRay" type="radio" name="format" value="Blu-Ray" checked={format === "Blu-Ray"} onChange={(e) => setFormat(e.target.value as MovieFormat)} />
              <p>Blu-ray</p>
            </label>
          </div>
          <div className="modal_actors">
            <p>Actors*</p>
              {actors.map((actor, i) => (
                <div key={i} className="modal_actor-input-wrapper">
                  <input
                    type="text"
                    value={actor}
                    onChange={e => handleActorChange(i, e.target.value)}
                    placeholder="Enter actor's name"
                  />
                  {actors.length > 1 && (
                    <button type="button" onClick={() => removeActor(i)}>–</button>
                  )}
                </div>
              ))}
              <button type="button" onClick={addActor}>
                + Add actors
              </button>
            </div>
            <button type="submit" className="modal_send">
              Add new film
            </button>
        </form>
      </div>
    </div>
  )
}
