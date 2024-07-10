import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Character } from "../types";
import { fetchData } from "../utils/api";
import "./CharacterDetail.css";

export const CharacterDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<Character | null>(null);

  useEffect(() => {
    const loadCharacter = async () => {
      try {
        const data = await fetchData<Character>(`character/${id}`);
        setCharacter(data);
      } catch (error) {
        console.error("Failed to fetch character:", error);
      }
    };

    loadCharacter();
  }, [id]);

  if (!character) {
    return <div>Loading...</div>;
  }

  return (
    <div className='character-details'>
      <h1>{character.name}</h1>
      {/* Display other character details here */}
    </div>
  );
};
