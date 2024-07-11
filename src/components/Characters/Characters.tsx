import { useSearchParams } from "react-router-dom";
import { UseCharacters } from "../../hooks";
import { CharacterCard } from "../CharacterCard";
import { Dropdown } from "../Dropdown";
import { NotFound } from "../FillerComponent/NotFound";
import { LoadingSpinner } from "../LoadingSpinner";
import { Pagination } from "../Pagination";
import { SearchBar } from "../SearchBar";
import "./Characters.css";

export const Characters = () => {
  const { characters, info, currentPage, isLoading, error } = UseCharacters();
  const [searchParams, setSearchParams] = useSearchParams();

  const displayClear = searchParams.has("status") || searchParams.has("gender");

  const handleClearFilter = () => {
    setSearchParams((prev) => {
      prev.delete("status");
      prev.delete("gender");
      return prev;
    });
  };

  return (
    <div>
      <div className='characters-filter-wrapper'>
        <SearchBar />
        <div className='sub-filter-wrapper'>
          {displayClear && (
            <button className='clear-button' onClick={handleClearFilter}>
              clear filters
            </button>
          )}
          <Dropdown
            options={[
              { label: "Alive", value: "alive" },
              { label: "Dead", value: "dead" },
              { label: "Unknown", value: "unknown" },
            ]}
            queryKey='status'
          />
          <Dropdown
            options={[
              { label: "Female", value: "female" },
              { label: "Male", value: "male" },
              { label: "Genderless", value: "genderless" },
              { label: "Unknown", value: "unknown" },
            ]}
            queryKey='gender'
          />
        </div>
      </div>
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
