import { UseCharacters } from "../hooks/api/useCharacters";
import CharacterCard from "./CharacterCard";
import "./Characters.css";
import LoadingSpinner from "./LoadingSpinner";
import { NotFound } from "./NotFound";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";

export const Characters = () => {
  const { characters, info, currentPage, isLoading, error } = UseCharacters();

  return (
    <div>
      <SearchBar />
      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <NotFound />
      ) : (
        <div>
          <div className='character-grid'>
            {characters?.map((character) => (
              <CharacterCard key={character?.id} character={character} />
            ))}
          </div>
          <Pagination info={info} currentPage={currentPage} />
        </div>
      )}
    </div>
  );
};
