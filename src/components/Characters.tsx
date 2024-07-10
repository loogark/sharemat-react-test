import { useEffect, useState } from "react";
import { Character } from "../types";
import { fetchData } from "../utils/api";
import CharacterCard from "./CharacterCard";
import "./Characters.css";

export const Characters = () => {
  const [characters, setCharacters] = useState<Character[] | null>(null);

  const fetchCharacterData = async () => {
    try {
      const characterData = await fetchData<Character>("character", {
        page: 1,
        name: "rick",
        status: "alive",
      });
      setCharacters(characterData.results);
    } catch (error) {
      console.error("Error fetching character data:", error);
    }
  };

  useEffect(() => {
    fetchCharacterData();
  }, []);

  console.log(characters, "characters");

  return (
    <div className='character-grid'>
      {characters?.map((character) => {
        return <CharacterCard key={character?.id} character={character} />;
      })}
    </div>
  );
};
