// Routing
import {
  Link,
  useLoaderData,
  useNavigation,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { LoaderFunction } from 'react-router-dom';
// Types
import { IProperties } from '../../@types/service';
// Styles
import './style.scss';
// API
import { fetchProperties } from '../../services/api';
import { getCardsParam } from '../../services/searchParam';
// FontAwesome Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
// Images
import unknownImage from '../../assets/unknown.png';
import { handleImageError } from '../../services/imageError';

const Aside = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const details = useLoaderData() as IProperties;
  const { state } = useNavigation(); // idle -> submitting -> loading -> idle

  const linkTo = getCardsParam(searchParams);

  // check state and pending status
  const PokemonDetails =
    state === 'loading' ? (
      <FontAwesomeIcon icon={faSpinner} spin size="2x" />
    ) : (
      <>
        <img
          src={details.sprite}
          alt={details.name}
          onError={(e) => {
            handleImageError(e, unknownImage);
          }}
        />
        <div className="aside__info">
          <h3>
            Name: {details.name}
          </h3>
          <p>ID: {id}</p>
          <p>
            Height: {details.height}
          </p>
          <p>
            Abilities: {details.abilities.join(', ')}
          </p>
          <p>
            Types: {details.types.join(', ')}
          </p>
        </div>
        <Link className="aside__close-btn btn" to={linkTo}>
          Close
        </Link>
      </>
    );

  return (
    <aside className="aside" role="banner">
      {PokemonDetails}
    </aside>
  );
};

interface ParamProps {
  params: { id: string };
}

// loader function to get details
export const fetchPropertiesLoader: LoaderFunction<ParamProps> = async ({
  params,
}): Promise<IProperties> => {
  const { id } = params;
  const properties = await fetchProperties(Number(id), () => { });
  return properties;
};

export default Aside;
