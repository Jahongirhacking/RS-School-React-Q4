import { Link, useLoaderData, useNavigation, useParams, useSearchParams } from "react-router-dom";
import { LoaderFunction } from "react-router-dom";
// Types
import { IProperties } from "../../services/interface";
// Styles
import "./style.scss";
// API
import { fetchProperties } from "../../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
// Images
import unknownImage from "../../assets/unknown.png";
import { handleImageError } from "../../services/imageError";
import { getCardsParam } from "../../services/searchParam";

const Aside = () => {
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const details = useLoaderData() as IProperties;
    const { state } = useNavigation();

    const linkTo = getCardsParam(searchParams);

    const PokemonDetails = state === "loading"
        ? <FontAwesomeIcon icon={faSpinner} spin size="2x" />
        : (
            <>
                <img
                    src={details.sprite}
                    alt={details.name}
                    onError={(e) => { handleImageError(e, unknownImage) }}
                />
                <div className="aside__info">
                    <h3>Name: <span>{details.name}</span></h3>
                    <p>ID: {id}</p>
                    <p>Height: <span>{details.height}</span></p>
                    <p>Abilities: <span>{details.abilities.join(", ")}</span></p>
                    <p>Types: <span>{details.types.join(", ")}</span></p>
                </div>
                <Link
                    className="aside__close-btn btn"
                    to={linkTo}>
                    Close
                </Link>

            </>
        )

    return (
        <aside className="aside">
            {PokemonDetails}
        </aside>
    )
}

interface ParamProps {
    params: { id: string };
}

export const fetchPropertiesLoader: LoaderFunction<ParamProps> = async ({ params }): Promise<IProperties> => {
    const { id } = params;
    const properties = await fetchProperties(Number(id), () => { })
    return properties
}

export default Aside