import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Enemy, MatchValue } from '../domain/enemy';
import { MatchTable } from '../domain/match-table';
import { Pokemon } from '../domain/pokemon';
import { MatchTableStore } from './match-table.store';
import { MatchTableUsecase } from './match-table.usecase';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-match-table',
  templateUrl: './match-table.component.html',
  styleUrls: ['./match-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MatchTableStore, MatchTableUsecase],
})
export class MatchTableComponent implements OnInit, OnDestroy {
  constructor(private readonly store: MatchTableStore, private readonly usecase: MatchTableUsecase) {}

  readonly matchTable$: Observable<MatchTable> = this.store.select((state) => state.matchTable);

  private readonly onDestroy$ = new Subject();

  ngOnInit(): void {
    this.usecase.usePersistedState();
    this.usecase.saveMatchTableOnChange();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  onEnemyRowDrop(event: CdkDragDrop<unknown[]>): void {
    console.log(event);
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

  trackByForPartyMember(index: number, item: Pokemon): string {
    return `${index}:${item.key}`;
  }

  trackByForEmemies(_: number, item: Enemy): Enemy {
    return item;
  }
}
