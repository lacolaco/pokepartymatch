import { Injectable } from '@angular/core';
import { Store } from '@lacolaco/reactive-store';
import { environment } from '../../environments/environment';
import { Enemy } from '../domain/enemy';
import { MatchTable } from '../domain/match-table';
import { Party } from '../domain/party';
import { findPokemon } from '../domain/pokemon';

export interface State {
  matchTable: MatchTable;
}

export const initialValue: State = {
  matchTable: MatchTable.create({
    party: Party.create([
      findPokemon('815'),
      findPokemon('887'),
      findPokemon('778'),
      findPokemon('468'),
      findPokemon('530'),
      findPokemon('143'),
    ]),
    enemies: [
      Enemy.create({
        pokemon: findPokemon('887'),
        matches: [null, null, 'win', 'win', null, null],
      }),
    ],
  }),
};

@Injectable()
export class MatchTableStore extends Store<State> {
  constructor() {
    super({ initialValue });
    if (!environment.production) {
      this.storeUpdateChanges.subscribe((update) => {
        // tslint:disable-next-line: no-console
        console.debug(`[MatchTableStore]`, update);
      });
    }
  }
}
