import React from "react";
import { Link } from "react-router-dom";
import { useCharacterProfile } from "../hooks/api/useCharacterProfile";
import "./CharacterProfile.css";

export const CharacterProfile: React.FC = () => {
  const { character, isLoading, backLinkParams } = useCharacterProfile();

  if (isLoading) return <div>Loading...</div>;

  if (!character) return <div>Character not found</div>;

  return (
    <div className='character-profile-container'>
      <Link className='go-back-button' to={`/${backLinkParams}`}>
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
