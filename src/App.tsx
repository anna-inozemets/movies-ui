import { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ControlBar } from './components/ControlBar';
import { AddMovieModal } from './components/AddMovieModal';
import { MoviesList } from './components/MovieList';
import { type MovieTitleSort} from './features/types/MovieTypes';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<MovieTitleSort>('ASC');
  const [reloadKey, setReloadKey] = useState(0);

  return (
    <>
      <Header />
      <ControlBar
        onOpenModal={()=> setIsModalOpen(true)}
        onSearch={setQuery}
        sort={sort}
        onSortChange={setSort}
        onImport={() => setReloadKey(k => k + 1)}
      />
      <MoviesList query={query} sort={sort} reloadKey={reloadKey} />
      <AddMovieModal
        open={isModalOpen}
        onClose={()=> {
          setIsModalOpen(false);
          setReloadKey(k => k + 1);
        }}
      />
      <ToastContainer theme="dark" />
      <Footer />
    </>
  );
}
