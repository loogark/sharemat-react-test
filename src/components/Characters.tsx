import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { ApiResponse, Character } from "../types";
import { fetchData } from "../utils/api";
import CharacterCard from "./CharacterCard";
import "./Characters.css";
import Pagination from "./Pagination";
import SearchBar from "./SearchBar";

export const Characters = () => {
  const [characters, setCharacters] = useState<Character[] | null>(null);
  const [info, setInfo] = useState<ApiResponse<Character[]>["info"] | null>(
    null
  );
  const [searchParams] = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;
  const currentSearch = searchParams.get("name") || "";

  useEffect(() => {
    const fetchCharacterData = async (pageNumber: number) => {
      try {
        const params: { page: number; name?: string } = { page: pageNumber };

        if (currentSearch.trim() !== "") {
          params.name = currentSearch;
        }

        const characterData = await fetchData<Character>("character", params);
        console.log(characterData, "characterData");
        setCharacters(characterData.results);
        setInfo(characterData.info);
      } catch (error) {
        console.error("Error fetching character data:", error);
      }
    };

    fetchCharacterData(currentPage);
  }, [currentPage, currentSearch]);

  console.log(characters, "characters");

  return (
    <div>
      <SearchBar onSearch={() => {}} />
      <div className='character-grid'>
        {characters?.map((character) => {
          return <CharacterCard key={character?.id} character={character} />;
        })}
      </div>
      <Pagination info={info} currentPage={currentPage} />
    </div>
  );
};
