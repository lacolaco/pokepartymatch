import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { skip, takeUntil } from 'rxjs/operators';
import { Enemy, MatchValue } from '../domain/enemy';
import { MatchTable } from '../domain/match-table';
import { findPokemon, Pokemon } from '../domain/pokemon';
import { MatchTableStore } from './match-table.store';
import { moveItemInArray } from '@angular/cdk/drag-drop';

// TODO: migrate name to "pokepartymatch"
const localStorageMatchTableKey = 'pokemonbuild.matchTable.v1.1';

@Injectable()
export class MatchTableUsecase implements OnDestroy {
  constructor(private readonly store: MatchTableStore) {}

  private readonly onDestroy$ = new Subject();

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  usePersistedState(): void {
    const stored = localStorage.getItem(localStorageMatchTableKey);
    if (stored) {
      try {
        this.store.update((state) => ({ ...state, matchTable: MatchTable.fromJSON(JSON.parse(stored)) }));
      } catch (e) {
        console.error(e);
      }
    }
  }

  saveMatchTableOnChange(): void {
    this.store
      .select((state) => state.matchTable)
      .pipe(skip(1), takeUntil(this.onDestroy$))
      .subscribe((table) => {
        const json = JSON.stringify(table.toSerializable());
        localStorage.setItem(localStorageMatchTableKey, json);
      });
  }

  sortEnemy(from: number, to: number): void {
    const enemies = [...this.store.value.matchTable.enemies];
    moveItemInArray(enemies, from, to);
    this.store.update((state) => ({
      ...state,
      matchTable: MatchTable.create({ party: state.matchTable.party, enemies }),
    }));
  }

  addEnemy(): void {
    // エースバーン
    const pokemon = findPokemon('815');
    this.store.update((state) => ({ ...state, matchTable: state.matchTable.addEnemy(Enemy.create({ pokemon })) }));
  }

  removeEnemy(index: number): void {
    this.store.update((state) => ({ ...state, matchTable: state.matchTable.removeEnemy(index) }));
  }

  resetPartyMember(index: number): void {
    this.store.update((state) => ({ ...state, matchTable: state.matchTable.resetMatchesByPartyMemberIndex(index) }));
  }

  changePartyPokemon(index: number, pokemon: Pokemon): void {
    this.store.update((state) => ({ ...state, matchTable: state.matchTable.setPartyMember(index, pokemon) }));
  }

  changeEnemyPokemon(index: number, pokemon: Pokemon): void {
    this.store.update((state) => ({
      ...state,
      matchTable: state.matchTable.setEnemy(index, Enemy.create({ pokemon })),
    }));
  }

  changeMatch(enemyIndex: number, matchIndex: number, match: MatchValue): void {
    this.store.update((state) => ({ ...state, matchTable: state.matchTable.setMatch(enemyIndex, matchIndex, match) }));
  }
}
