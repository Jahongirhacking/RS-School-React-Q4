import { IPokemonLocal } from "../../components/Card/interface";
import { Searchable } from "../../interface";

export interface MainProp extends Searchable {
    isPending: boolean;
    isError: boolean;
};


export type MainState = {
    pokemonsList: IPokemonLocal[];
};