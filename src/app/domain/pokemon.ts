import { pokemons } from '../data/pokemon-data';

export type Pokemon = {
  key: string;
  form: string;
  slug: string;
  idx: string;
  name_jpn: string;
  names: string[];
};

export type PokemonJSON = { key: string; idx: string; form: string };

export function toSerializablePokemonJSON(pokemon: Pokemon): PokemonJSON {
  const { key, idx, form } = pokemon;
  return { key, idx, form };
}

export function fromPokemonJSON({ key, ...fields }: PokemonJSON): Pokemon {
  if (key.includes(':')) {
    // after v1.2
    const [idx, form] = key.split(':');
    return findPokemon(idx, form);
  } else {
    return findPokemon(fields.idx, fields.form);
  }
}

export function findPokemon(idx: string, form: string = '$'): Pokemon {
  const value = pokemons.find((p) => p.idx === idx && p.form === form);
  if (value == null) {
    throw new Error(`PokemonNotFound: ${idx}`);
  }
  return value;
}
