import { Link, useSearchParams } from 'react-router-dom';
import { IPokemonLocal } from './interface';
import { Routes as RoutePaths } from '../../routes';
import './style.scss';

const Card = (props: IPokemonLocal) => {
  const { pokemonName, imgUrl, abilities, height, id } = props;

  const [searchParams] = useSearchParams();

  return (
    <article className="card">
      <div className='card__img-container'>
        <img src={imgUrl} alt="pokemon image" />
      </div>
      <section className='info'>
        <h2>{pokemonName}</h2>
        <p className="abilities">
          Abilities: <b>{abilities.join(', ')}</b>
        </p>
        <p className="height">
          Height: <b>{height}</b>
        </p>
        <Link
          className='card__btn btn'
          to={`${RoutePaths.DETAILS}/${id}/?page=${searchParams.get('page')}`}>
          Details
        </Link>
      </section>
    </article>
  );
}
export default Card;