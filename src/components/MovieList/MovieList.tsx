import { useEffect, useState } from 'react';
import { Pagination } from '../Pagination'
import { MovieCard } from '../MovieCard';
import { Loader } from '../Loader';
import { useMovies } from '../../features/hooks/useMovies';
import { type MovieTitleSort } from '../../features/types/MovieTypes'
import './MovieList.css';

type Props = {
  query?: string;
  sort?: MovieTitleSort;
  reloadKey?: number;
};

export function MoviesList({ query = '', sort = 'ASC', reloadKey = 0 }: Props) {
  const [basedPage, setBasedPage] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);
  const limit = 12;
  const offset = basedPage * limit;
  const normalizedQuery = query.trim();
  const combinedRefreshKey = reloadKey + refreshKey;
  const { movies, total, loading, error } = useMovies({ offset, limit, query: normalizedQuery, sort, refreshKey: combinedRefreshKey });
  const pageCount = Math.max(1, Math.ceil(total / limit));

  useEffect(() => {
    if (basedPage > 0 && basedPage >= pageCount) {
      setBasedPage(Math.max(0, pageCount - 1));
    }
  }, [pageCount, basedPage]);

  useEffect(() => {
    setBasedPage(0);
  }, [normalizedQuery, sort, reloadKey]);

  if (loading) {
    return (
      <Loader />
    )
  }

  if (error) {
    return (
    <div className='error'>
      <p>Sorry, the error is occured😢</p>
    </div>
    )
  }

  if (movies.length === 0) {
    return (
      <div className='movie__list--empty'>
        <p>List is empty 🙈</p>
      </div>
    );
  }

  const handleDeleted = () => {
    if (movies.length === 1 && basedPage > 0) {
      setBasedPage(previousPage => Math.max(0, previousPage - 1));
    } else {
      setRefreshKey(key => key + 1);
    }
  };

  return (
    <div className="movie__list">
      <div className="container">
        {movies.map((m) => (
          <MovieCard key={m.id} id={m.id} title={m.title} onDeleted={handleDeleted} />
        ))}
      </div>
      {pageCount > 1 && (
        <Pagination pageCount={pageCount} basedPage={basedPage} onChange={setBasedPage} disabled={loading} />
      )}
    </div>
  );
}

