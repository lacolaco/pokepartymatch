import { PokemonJSON, Pokemon, toSerializablePokemonJSON, fromPokemonJSON } from './pokemon';
import { Serializable } from './utils/serializable';

export type MatchValue = 'win' | 'loss' | null;

export type Matches = MatchValue[];

const emptyMatches: Matches = [null, null, null, null, null, null];

export type EnemyJSON = {
  pokemon: PokemonJSON;
  matches: Matches;
};

export class Enemy implements Serializable {
  private constructor(public readonly pokemon: Pokemon, public readonly matches: Matches) {}

  static create({ pokemon, matches }: { pokemon: Pokemon; matches?: Matches }): Enemy {
    return new Enemy(pokemon, matches ?? emptyMatches);
  }

  // tslint:disable-next-line: no-any
  static fromJSON(enemy: EnemyJSON): Enemy {
    if (enemy.pokemon == null || !Array.isArray(enemy.matches)) {
      throw new Error('enemy is not valid.');
    }
    return new Enemy(fromPokemonJSON(enemy.pokemon), enemy.matches);
  }

  toSerializable(): EnemyJSON {
    return {
      pokemon: toSerializablePokemonJSON(this.pokemon),
      matches: this.matches,
    };
  }

  get hasNoWinMatch(): boolean {
    return this.matches.every((match) => match !== 'win');
  }

  setMatch(index: number, match: MatchValue): Enemy {
    this.matches[index] = match;
    return Enemy.create({
      pokemon: this.pokemon,
      matches: [...this.matches],
    });
  }
}
