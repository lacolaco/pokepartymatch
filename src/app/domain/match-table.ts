import { Serializable } from './utils/serializable';
import { Enemy, EnemyJSON, MatchValue } from './enemy';
import { Party, PartyJSON } from './party';
import { Pokemon, findPokemon } from './pokemon';

export type MatchTableJSON = {
  party: PartyJSON;
  enemies: Array<EnemyJSON>;
};

export class MatchTable implements Serializable {
  private constructor(public readonly party: Party, public readonly enemies: Enemy[]) {}

  static create({ party, enemies }: { party: Party; enemies: Enemy[] }): MatchTable {
    return new MatchTable(party, enemies);
  }

  static fromJSON(json: MatchTableJSON): MatchTable {
    return new MatchTable(Party.fromJSON(json.party), json.enemies.map(Enemy.fromJSON));
  }

  clone({ party, enemies }: { party?: Party; enemies?: Enemy[] }): MatchTable {
    return MatchTable.create({ party: party ?? this.party, enemies: enemies ?? this.enemies });
  }

  toSerializable(): MatchTableJSON {
    return {
      party: this.party.toSerializable(),
      enemies: this.enemies.map((e) => e.toSerializable()),
    };
  }

  setPartyMember(index: number, pokemon: Pokemon): MatchTable {
    return this.clone({
      party: this.party.setMember(index, pokemon),
    });
  }

  resetMatchesByPartyMemberIndex(partyMemberIndex: number): MatchTable {
    return this.clone({
      enemies: this.enemies.map((e) => e.setMatch(partyMemberIndex, null)),
    });
  }

  addEnemy(enemy: Enemy): MatchTable {
    return this.clone({
      enemies: [...this.enemies, enemy],
    });
  }

  setEnemy(enemyIndex: number, enemy: Enemy): MatchTable {
    this.enemies[enemyIndex] = enemy;
    return this.clone({
      enemies: [...this.enemies],
    });
  }

  removeEnemy(index: number): MatchTable {
    return this.clone({
      enemies: this.enemies.filter((_, i) => i !== index),
    });
  }

  setMatch(enemyIndex: number, matchIndex: number, match: MatchValue): MatchTable {
    this.enemies[enemyIndex] = this.enemies[enemyIndex].setMatch(matchIndex, match);
    return this.clone({
      enemies: [...this.enemies],
    });
  }
}

export function createExampleMatchTable(): MatchTable {
  return MatchTable.create({
    party: Party.create([
      findPokemon('815'), // エースバーン
      findPokemon('887'), // ドラパルト
      findPokemon('778'), // ミミッキュ
      findPokemon('468'), // トゲキッス
      findPokemon('530'), // ドリュウズ
      findPokemon('143'), // カビゴン
    ]),
    enemies: [
      Enemy.create({
        pokemon: findPokemon('887'), // ドラパルト
        matches: [null, null, 'win', 'win', null, null],
      }),
    ],
  });
}
