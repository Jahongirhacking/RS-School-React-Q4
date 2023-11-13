// Routing
import { Link, useSearchParams } from 'react-router-dom';
// Types
import { IPokemonLocal } from '../../@types/card';
// Styles
import './style.scss';
// Images
import pokemonImage from '../../assets/PokemonImage.jpg';
// API
import { handleImageError } from '../../services/imageError';
import { getDetailsParam } from '../../services/searchParam';

const Card = (props: IPokemonLocal) => {
  const { pokemonName, imgUrl, abilities, height, id } = props;

  const [searchParams] = useSearchParams();
  const linkTo = getDetailsParam(id, searchParams);

  return (
    <article className="card" title="pokemon-card">
      <div className="card__img-container">
        <img
          src={imgUrl}
          alt="pokemon image"
          onError={(e) => {
            handleImageError(e, pokemonImage);
          }}
        />
      </div>
      <section className="info">
        <h2>{pokemonName}</h2>
        <p className="abilities">
          Abilities: <b>{abilities.join(', ')}</b>
        </p>
        <p className="height">
          Height: <b>{height}</b>
        </p>
        <Link className="card__btn btn" to={linkTo} role="button">
          Details
        </Link>
      </section>
    </article>
  );
};
export default Card;
