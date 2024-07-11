import { UseCharacters } from "../../hooks";
import { CharacterCard } from "../CharacterCard";
import { NotFound } from "../FillerComponent/NotFound";
import { LoadingSpinner } from "../LoadingSpinner";
import { Pagination } from "../Pagination";
import { SearchBar } from "../SearchBar";
import "./Characters.css";

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
