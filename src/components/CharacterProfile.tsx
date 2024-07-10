import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Character } from "../types";
import { fetchData } from "../utils/api";
import "./CharacterProfile.css";

export const CharacterProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<Character | null>(null);

  const location = useLocation();
  const page = location.state?.page || 1;

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
    <div className='character-profile-container'>
      <Link className='go-back-button' to={`/?page=${page}`}>
        Back to all characters
      </Link>
      <h1>{character.name}</h1>
      <div className='character-wall'>
        <div className='image-container'>
          <img
            className='profile-image'
            src={character.image}
            alt={character.name}
          />
        </div>
        <div className='character-stats'>
          <div className='character-status'>
            <p>Status: {character.status}</p>
            <div
              className={`character-status-icon ${character.status.toLowerCase()}`}
            ></div>
          </div>

          <p>Species: {character.species}</p>
          <p>Gender: {character.gender}</p>
          <p>Origin: {character.origin.name}</p>
          <p>No.of Episodes: {character.episode.length}</p>
        </div>
      </div>
    </div>
  );
};
