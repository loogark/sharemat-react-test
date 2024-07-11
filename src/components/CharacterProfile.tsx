import React from "react";
import { Link } from "react-router-dom";
import { useCharacterProfile } from "../hooks/api/useCharacterProfile";
import "./CharacterProfile.css";
import { CustomError } from "./CustomError";
import LoadingSpinner from "./LoadingSpinner";

export const CharacterProfile: React.FC = () => {
  const { character, isLoading, backLinkParams, error } = useCharacterProfile();

  if (isLoading) return <LoadingSpinner />;

  if (error || !character) return <CustomError message={error?.message} />;

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
