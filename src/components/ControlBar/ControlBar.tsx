import { useRef, useState } from "react";
import { importMovies } from "../../features/api/importMovies.api";
import './ControlBar.css';
import SearchIcon from '../../assets/search-icon.svg';

type Props = {
  onOpenModal: () => void;
  onSearch: (q: string) => void;
  onSortToggle: () => void;
  isAZ: boolean;
  onImport: () => void;
};

export function ControlBar({ onOpenModal, onSearch, onSortToggle, isAZ, onImport }: Props) {
  const [q, setQ] = useState("");

  const [loadingImport, setLoadingImport] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleImport = async (file: File) => {
    try {
      setLoadingImport(true);
      await importMovies(file);
      onImport();
    } catch (e: any) {
      alert(e?.message || "Could not import file");
    } finally {
      setLoadingImport(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  return (
    <div className="control-bar">
      <div className="container">
        <div className="control-bar__top">
          <input
            value={q}
            onChange={(e)=>setQ(e.target.value)}
            onKeyDown={(e)=> e.key === "Enter" && onSearch(q.trim())}
            placeholder="Search (by name or by stars)"
          />
          <button onClick={()=> onSearch(q.trim())}><img src={SearchIcon} alt="search" /></button>
        </div>
        <div className="control-bar__bottom">
          <button onClick={onOpenModal}>+ Add film</button>
          <button onClick={onSortToggle}>Sort {isAZ ? "A→Z" : "Z→A"}</button>
          <div className="control-bar__import">
            <input
              ref={fileRef}
              type="file"
              accept=".txt"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) {
                  handleImport(f);
                };
              }}
            />
            <button onClick={() => fileRef.current?.click()} disabled={loadingImport}>
              {loadingImport ? "Import..." : "Import txt file"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
