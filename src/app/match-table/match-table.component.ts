import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Enemy, MatchValue } from '../domain/enemy';
import { Pokemon } from '../domain/pokemon';
import { MatchTableStore } from './match-table.store';
import { MatchTableUsecase } from './match-table.usecase';

@Component({
  selector: 'app-match-table',
  templateUrl: './match-table.component.html',
  styleUrls: ['./match-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MatchTableStore, MatchTableUsecase],
})
export class MatchTableComponent implements OnInit, OnDestroy {
  constructor(private readonly store: MatchTableStore, private readonly usecase: MatchTableUsecase) {}

  readonly state$ = this.store.valueChanges.pipe(
    map((state) => ({
      matchTable: state.matchTable,
      matchTableLoading: state.matchTableLoading !== 0,
      readonly: state.restoreFromRemote,
    }))
  );

  private readonly onDestroy$ = new Subject();

  ngOnInit(): void {
    this.usecase.restoreState().then(() => {
      this.usecase.startLocalAutoSave();
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  save() {
    this.usecase.saveMatchTable();
  }

  startEditing() {
    this.usecase.startEditing();
  }

  onEnemyRowDrop(event: CdkDragDrop<unknown[]>): void {
    this.usecase.sortEnemy(event.previousIndex, event.currentIndex);
  }

  addEnemy(): void {
    this.usecase.addEnemy();
  }

  removeEnemy(index: number): void {
    this.usecase.removeEnemy(index);
  }

  resetPartyMember(index: number): void {
    this.usecase.resetPartyMember(index);
  }

  changePartyPokemon(index: number, pokemon: Pokemon): void {
    this.usecase.changePartyPokemon(index, pokemon);
  }

  changeEnemyPokemon(index: number, pokemon: Pokemon): void {
    this.usecase.changeEnemyPokemon(index, pokemon);
  }

  changeMatch(enemyIndex: number, matchIndex: number, match: MatchValue): void {
    this.usecase.changeMatch(enemyIndex, matchIndex, match);
  }

  trackByForPartyMember(index: number, _: Pokemon) {
    return index;
  }

  trackByForEmemies(_: number, item: Enemy) {
    return item;
  }
}
