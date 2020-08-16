import { Serializable } from '../utils/serializable';
import { Enemy, EnemyJSON, MatchValue } from './enemy';
import { Party, PartyJSON } from './party';
import { Pokemon } from './pokemon';

export type MatchTableJSON = {
  party: PartyJSON;
  enemies: Array<EnemyJSON>;
};

export class MatchTable implements Serializable {
  private constructor(public readonly party: Party, public readonly enemies: Enemy[]) {}

  static create({ party, enemies }: { party: Party; enemies: Enemy[] }): MatchTable {
    return new MatchTable(party, enemies);
  }

  // tslint:disable-next-line: no-any
  static fromJSON(json: MatchTableJSON): MatchTable {
    return new MatchTable(Party.fromJSON(json.party), json.enemies.map(Enemy.fromJSON));
  }

  // tslint:disable-next-line: no-any
  toSerializable(): MatchTableJSON {
    return {
      party: this.party.toSerializable(),
      enemies: this.enemies.map((e) => e.toSerializable()),
    };
  }

  setPartyMember(index: number, pokemon: Pokemon): MatchTable {
    return MatchTable.create({
      party: this.party.setMember(index, pokemon),
      enemies: this.enemies,
    });
  }

  resetMatchesByPartyMemberIndex(partyMemberIndex: number): MatchTable {
    return MatchTable.create({
      party: this.party,
      enemies: this.enemies.map((e) => e.setMatch(partyMemberIndex, null)),
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

  setMatch(enemyIndex: number, matchIndex: number, match: MatchValue): MatchTable {
    this.enemies[enemyIndex] = this.enemies[enemyIndex].setMatch(matchIndex, match);
    return MatchTable.create({
      party: this.party,
      enemies: [...this.enemies],
    });
  }
}
