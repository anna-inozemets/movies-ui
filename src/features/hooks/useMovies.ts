import { useEffect, useState } from 'react';
import { getAllMovies } from '../api/getAllMovies.api';
import { getSearchedMovies } from '../api/getSearchedMovies';
import { getSortedMovies } from '../api/getSortedMovies';
import { type Movie, type MovieTitleSort } from '../types/MovieTypes';

type Params = {
  offset?: number;
  limit?: number;
  query?: string;
  sort?: MovieTitleSort;
  refreshKey?: number;
};

export function useMovies({ offset = 0, limit = 12, query, sort, refreshKey = 0 }: Params) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        setLoading(true);
        setError(null);

        let result;
        if (query && query.trim()) {
          result = await getSearchedMovies(offset, limit, query);
        } else if (sort) {
          result = await getSortedMovies(offset, limit, sort);
        } else {
          result = await getAllMovies(offset, limit);
        }

        if (!cancelled) {
          setMovies(result.movies);
          setTotal(result.total);
        }
      } catch (e) {
        if (!cancelled) setError(e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => { cancelled = true };
  }, [offset, limit, query, sort, refreshKey]);

  return { movies, total, loading, error };
}
