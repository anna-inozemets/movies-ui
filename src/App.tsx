import { useState } from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ControlBar } from "./components/ControlBar";
import { AddMovieModal } from "./components/AddMovieModal";
import { MoviesList } from "./components/MovieList";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [sortAZ, setSortAZ] = useState(true);
  const [reloadKey, setReloadKey] = useState(0);

  return (
    <>
      <Header />

      <ControlBar
        onOpenModal={()=> setIsModalOpen(true)}
        onSearch={setQuery}
        onSortToggle={()=> setSortAZ(s => !s)}
        isAZ={sortAZ}
        onImport={() => setReloadKey(k => k + 1)}
      />

      <MoviesList query={query} sortAZ={sortAZ} reloadKey={reloadKey} />

      <AddMovieModal
        open={isModalOpen}
        onClose={()=> {
          setIsModalOpen(false)
          setReloadKey(k => k + 1)
        }}
      />

      <Footer />
    </>
  );
}
