import { UseCharacters } from "../hooks/api/useCharacters";
import CharacterCard from "./CharacterCard";
import "./Characters.css";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";

export const Characters = () => {
  const { characters, info, currentPage } = UseCharacters();

  return (
    <div>
      <SearchBar />
      <div className='character-grid'>
        {characters?.map((character) => {
          return <CharacterCard key={character?.id} character={character} />;
        })}
      </div>
      <Pagination info={info} currentPage={currentPage} />
    </div>
  );
};
