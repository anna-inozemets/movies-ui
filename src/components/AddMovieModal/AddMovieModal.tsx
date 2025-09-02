import { useState } from 'react';
import './AddMovieModal.css';
import { addMovie } from '../../features/api/addMovie.api';

import { type MovieFormat } from '../../features/types/MovieTypes';

type Props = {
  open: boolean;
  onClose: () => void;
};

export const AddMovieModal = ({ open, onClose }: Props) => {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState<number | ''>('');
  const [format, setFormat] = useState<MovieFormat>('VHS');
  const [actors, setActors] = useState<string[]>(['']);
  const [errors, setErrors] = useState<string[]>([]);

  const handleActorChange = (i: number, value: string) => {
    const newActors = [...actors];
    newActors[i] = value;
    setActors(newActors);
  };

  const addActor = () => setActors([...actors, ""]);
  const removeActor = (i: number) => setActors(actors.filter((_, idx) => idx !== i));

  const collapseSpaces = (s: string) => s.replace(/\s+/g, " ").trim();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors: string[] = [];

    // нормалізація
    const normalizedTitle = collapseSpaces(title);
    const normalizedYear = typeof year === "number" ? year : Number(year);
    const normalizedActors = actors
      .map(a => collapseSpaces(a))
      .filter(a => a.length > 0);

    // валідації
    if (!normalizedTitle) {
      nextErrors.push("Please, add film's title");
    }

    if (!Number.isFinite(normalizedYear)) {
      nextErrors.push("The year should be a number");
    } else {
      if (normalizedYear < 1895) nextErrors.push("The year couldn't be less than 1895");
      if (normalizedYear > 2035) nextErrors.push("The year couldn't be more than 2035");
    }

    if (normalizedActors.length === 0) {
      nextErrors.push("Add at least one actor");
    }

    if (!["VHS", "DVD", "Blu-Ray"].includes(format)) {
      nextErrors.push("Chose one of the format");
    }

    if (nextErrors.length) {
      setErrors(nextErrors);
      console.log(errors);
      return;
    }

    const payload = {
      title: normalizedTitle,
      year: normalizedYear,
      format,
      actors: normalizedActors
    };

    try {
      await addMovie(payload);
    } catch {
      console.log('erroe')
    } finally {
      setTitle('');
      setYear('');
      setFormat('VHS');
      setActors(['']);
      setErrors([]);
      onClose();
    }
  };

  return (
    <div className={`modal ${open ? "is-open" : ""}`}>
      <div className="modal__content">
        <button type="button" className="modal__button-close" onClick={onClose}><span></span><span></span></button>
        <form className="modal__form" onSubmit={handleSubmit}>
          <label htmlFor="title">
            <p>Title</p>
            <input id="title" type="text" name="title" placeholder="Enter film's title here" value={title} onChange={e => setTitle(e.target.value)} />
          </label>
          <label htmlFor="year">
            <p>Year</p>
            <input id="year" type="number" name="year" min="1895" max="2035" placeholder="Enter film's foundation year here" value={year} onChange={e => setYear(e.target.value ? Number(e.target.value) : "")} />
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
            <p>Actors</p>
              {actors.map((actor, i) => (
                <div key={i} className="modal_actor-input-wrapper">
                  <input
                    type="text"
                    value={actor}
                    onChange={e => handleActorChange(i, e.target.value)}
                    placeholder="Name Surname"
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
              Зберегти
            </button>
        </form>
      </div>
    </div>
  )
}
