import { PokemonData } from './pokemon-data';

export type PartyMembers = PokemonData[];

export class Party {
  private constructor(public readonly members: PartyMembers) {
    this.members = members;
  }

  static create(members: PartyMembers): Party {
    return new Party(members);
  }

  // tslint:disable-next-line: no-any
  static fromJSON(party: any): Party {
    if (!Array.isArray(party.members)) {
      throw new Error('party.members is not an array.');
    }
    return new Party(party.members);
  }

  setMember(index: number, pokemon: PokemonData): Party {
    this.members[index] = pokemon;
    return new Party([...this.members]);
  }
}

export type MatchValue = 'win' | 'loss' | null;

export type Matches = MatchValue[];

export class Enemy {
  private constructor(public readonly pokemon: PokemonData, public readonly matches: Matches) {}

  static create({ pokemon, matches }: { pokemon: PokemonData; matches: Matches }): Enemy {
    return new Enemy(pokemon, matches);
  }

  // tslint:disable-next-line: no-any
  static fromJSON(enemy: any): Enemy {
    if (enemy.pokemon == null || !Array.isArray(enemy.matches)) {
      throw new Error('enemy is not valid.');
    }
    return new Enemy(enemy.pokemon, enemy.matches);
  }
}

export class MatchTable {
  private constructor(public readonly party: Party, public readonly enemies: Enemy[]) {}

  static create({ party, enemies }: { party: Party; enemies: Enemy[] }): MatchTable {
    return new MatchTable(party, enemies);
  }

  // tslint:disable-next-line: no-any
  static fromJSON(stored: any): MatchTable {
    return new MatchTable(
      Party.fromJSON(stored.party),
      // tslint:disable-next-line: no-any
      stored.enemies.map((enemy: any) => Enemy.fromJSON(enemy))
    );
  }

  setPartyMember(index: number, pokemon: PokemonData): MatchTable {
    return MatchTable.create({
      party: this.party.setMember(index, pokemon),
      enemies: this.enemies,
    });
  }

  addEnemy(enemy: Enemy): MatchTable {
    return MatchTable.create({
      party: this.party,
      enemies: [...this.enemies, enemy],
    });
  }

  setEnemy(enemyIndex: number, enemy: Enemy): MatchTable {
    this.enemies[enemyIndex] = enemy;
    return MatchTable.create({
      party: this.party,
      enemies: [...this.enemies],
    });
  }

  removeEnemy(index: number): MatchTable {
    return MatchTable.create({
      party: this.party,
      enemies: this.enemies.filter((_, i) => i !== index),
    });
  }
}
