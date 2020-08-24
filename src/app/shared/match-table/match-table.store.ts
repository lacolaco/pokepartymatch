import { Injectable } from '@angular/core';
import { Store } from '@lacolaco/reactive-store';
import { environment } from '../../../environments/environment';
import { createExampleMatchTable, MatchTable } from '../../domain/match-table';

export interface State {
  matchTable: MatchTable;
  matchTableLoading: number;
  restoreFromRemote: boolean;
}

export const initialValue: State = {
  matchTable: createExampleMatchTable(),
  matchTableLoading: 0,
  restoreFromRemote: false,
};

@Injectable({ providedIn: 'root' })
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

  startLoading() {
    this.update((state) => ({ ...state, matchTableLoading: state.matchTableLoading + 1 }));
  }

  finishLoading() {
    this.update((state) => ({ ...state, matchTableLoading: state.matchTableLoading - 1 }));
  }

  updateMatchTable(update: (current: MatchTable) => MatchTable) {
    this.update((state) => ({ ...state, matchTable: update(state.matchTable) }));
  }
}
