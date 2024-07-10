import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ApiResponse, Character } from "../types";
import { fetchData } from "../utils/api";
import CharacterCard from "./CharacterCard";
import "./Characters.css";
import Pagination from "./Pagination";

export const Characters = () => {
  const [characters, setCharacters] = useState<Character[] | null>(null);
  const [info, setInfo] = useState<ApiResponse<Character[]>["info"] | null>(
    null
  );
  const location = useLocation();

  const currentPage =
    Number(new URLSearchParams(location.search).get("page")) || 1;

  const fetchCharacterData = async (pageNumber: number) => {
    console.log(pageNumber);
    try {
      const characterData = await fetchData<Character>("character", {
        page: pageNumber,
      });
      setCharacters(characterData.results);
      setInfo(characterData.info);
    } catch (error) {
      console.error("Error fetching character data:", error);
    }
  };

  useEffect(() => {
    fetchCharacterData(currentPage);
  }, [currentPage]);

  console.log(characters, "characters");

  return (
    <div>
      <div className='character-grid'>
        {characters?.map((character) => {
          return <CharacterCard key={character?.id} character={character} />;
        })}
      </div>
      <Pagination info={info} currentPage={currentPage} />
    </div>
  );
};
