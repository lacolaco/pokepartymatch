import { Pokemon, findPokemon, PokemonJSON, toSerializablePokemonJSON } from './pokemon';
import { Serializable } from './utils/serializable';

export type PartyJSON = { members: Array<PokemonJSON> };

export class Party implements Serializable {
  private constructor(public members: Pokemon[]) {
    this.members = members;
  }

  static create(members: Pokemon[]): Party {
    return new Party(members);
  }

  static fromJSON(json: PartyJSON): Party {
    if (json == null) {
      throw new Error('Unexpected value');
    }
    if (!Array.isArray(json.members)) {
      throw new Error('party.members is not an array.');
    }
    const pokemons = json.members.map(({ key, ...fields }) => {
      if (key.includes(':')) {
        // after v1.2
        const [idx, form] = key.split(':');
        return findPokemon(idx, form);
      } else {
        return findPokemon(fields.idx, fields.form);
      }
    });
    return new Party(pokemons);
  }

  toSerializable(): PartyJSON {
    return {
      members: this.members.map(toSerializablePokemonJSON),
    };
  }

  setMember(index: number, pokemon: Pokemon): Party {
    this.members[index] = pokemon;
    return this;
  }
}
