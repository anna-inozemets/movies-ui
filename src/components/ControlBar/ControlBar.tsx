import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { importMovies } from '../../features/api/importMovies.api';
import { type MovieTitleSort} from '../../features/types/MovieTypes';
import SearchIcon from '../../assets/search-icon.svg';
import './ControlBar.css';

type Props = {
  onOpenModal: () => void;
  onSearch: (query: string) => void;
  sort: MovieTitleSort;
  onSortChange: (order: MovieTitleSort) => void;
  onImport: () => void;
};

export function ControlBar({ onOpenModal, onSearch, sort, onSortChange, onImport }: Props) {
  const [query, setQuery] = useState('');
  const [loadingImport, setLoadingImport] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const submitSearch = () => onSearch(query.trim());

  const toggleSort = () => {
    const next = sort === 'ASC' ? 'DESC' : 'ASC';
    onSortChange(next);
  };

  const handleImport = async (file: File) => {
    try {
      setLoadingImport(true);
      await importMovies(file);
      toast.success('Movies imported successfully!');
      onImport();
    } catch (error: any) {
      toast.error(error?.message || 'Could not import file');
    } finally {
      setLoadingImport(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  const clearSearch = () => {
    setQuery('');
    onSearch('');
  }

  return (
    <div className="control-bar">
      <div className="container">
        <div className="control-bar__top">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                submitSearch();
              }
            }}
            placeholder="Search..."
          />
          <button onClick={submitSearch}><img src={SearchIcon} alt="search" /></button>
          <button onClick={clearSearch}><span></span><span></span></button>
        </div>

        <div className="control-bar__bottom">
          <button onClick={onOpenModal}>+ Add film</button>
          <button onClick={toggleSort}>Sort {sort === "ASC" ? "A → Z" : "Z → A"}</button>

          <div className="control-bar__import">
            <input
              ref={fileRef}
              type="file"
              accept=".txt"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) {
                  handleImport(file)
                }
              }}
            />
            <button onClick={() => fileRef.current?.click()} disabled={loadingImport}>
              {loadingImport ? "Loading..." : "Import file"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
