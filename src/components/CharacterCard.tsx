import { Link, useSearchParams } from "react-router-dom";
import { Character } from "../types";
import "./CharacterCard.css";

interface Props {
  character: Character;
}

const CharacterCard = ({ character }: Props) => {
  const { id, name, status, gender, species, location, image, origin } =
    character;
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");
  const nameQuery = searchParams.get("name");

  return (
    <Link
      className='character-link'
      to={`/character/${id}`}
      state={{ page, name: nameQuery }}
      key={character.id}
    >
      <article className='character-card'>
        <img src={image} alt={name} className='character-image' />
        <div className='character-info'>
          <h2>{name}</h2>
          <p className='status'>
            <span
              className={`character-status-icon ${status.toLowerCase()}`}
            ></span>
            {status} - {species}
          </p>
          <p>Gender:</p>
          <p className='location'>{gender}</p>
          <p>Last known location:</p>
          <p className='location'>{location.name}</p>
          <p>Origin:</p>
          <p className='origin'>{origin.name}</p>
        </div>
      </article>
    </Link>
  );
};

export default CharacterCard;
