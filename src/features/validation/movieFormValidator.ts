import { type MovieFormat } from '../types/MovieTypes';

export type MovieFormInput = {
  title: string;
  year: number | '';
  format: MovieFormat;
  actors: string[];
};

export type AddMoviePayload = {
  title: string;
  year: number;
  format: MovieFormat;
  actors: string[];
};

const collapseSpaces = (s: string) => s.replace(/\s+/g, ' ').trim();

export function validateMovieForm(input: MovieFormInput) {
  const errors: string[] = [];

  const title = collapseSpaces(input.title);
  const year =
    typeof input.year === 'number'
      ? input.year
      : input.year === ''
        ? NaN
        : Number(input.year);
  const actors = input.actors.map(collapseSpaces).filter(Boolean);
  const format = input.format;

  if (!title) {
    errors.push("Please, add film's title");
  }

  if (!Number.isFinite(year)) {
    errors.push("Please, add film's release year");
  } else if (year <= 1899 || year >= 2022) {
    errors.push('Year should be between 1900 and 2021');
  }

  if (actors.length === 0) {
    errors.push('Add at least one actor');
  } else {
    const actorRegex = /^[A-Za-z\- ]+$/;
    actors.forEach((actorName) => {
      if (!actorRegex.test(actorName)) {
        errors.push(`Actor name accept letters and '-' only`);
      }
    });
  }

  if (errors.length) {
    return { errors, payload: null as null };
  }

  const payload: AddMoviePayload = { title, year: year as number, format, actors };

  return { errors, payload };
}
