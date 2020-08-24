import { Clipboard } from '@angular/cdk/clipboard';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { Injectable, OnDestroy } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Subject } from 'rxjs';
import { skip, takeUntil } from 'rxjs/operators';
import { Enemy, MatchValue } from '../../domain/enemy';
import { MatchTable } from '../../domain/match-table';
import { findPokemon, Pokemon } from '../../domain/pokemon';
import { MatchTableRepository } from '../../repository/match-table';
import { SearchParams } from '../../utils/search-params';
import { MatchTableStore } from './match-table.store';

@Injectable({ providedIn: 'root' })
export class MatchTableUsecase implements OnDestroy {
  constructor(
    private readonly store: MatchTableStore,
    private readonly matchTableRepository: MatchTableRepository,
    private readonly searchParams: SearchParams,
    private readonly notification: NzNotificationService,
    private readonly clipboard: Clipboard
  ) {}

  get readonly$() {
    return this.store.select((state) => state.restoreFromRemote);
  }

  private readonly onDestroy$ = new Subject();

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  async restoreState() {
    const id = this.searchParams.get('id');
    if (id) {
      this.store.startLoading();
      const matchTable = await this.matchTableRepository.findById(id);
      if (matchTable) {
        this.store.update((state) => ({ ...state, matchTable, restoreFromRemote: true }));
        this.notification.info(
          'データを復元しました',
          '「コピーして編集」ボタンを押すと編集可能になります。既存のローカルデータは上書きされます。',
          { nzDuration: 0 }
        );
      } else {
        this.notification.error('復元データが見つかりませんでした', '');
        this.searchParams.delete('id');
      }
      this.store.finishLoading();
    } else {
      const matchTable = this.matchTableRepository.getLocalSave();
      if (matchTable) {
        this.store.updateMatchTable(() => matchTable);
      }
    }
  }

  startLocalAutoSave(): void {
    this.store
      .select((state) => state.matchTable)
      .pipe(skip(1), takeUntil(this.onDestroy$))
      .subscribe((matchTable) => {
        if (this.store.value.restoreFromRemote) {
          return;
        }
        this.matchTableRepository.setLocalSave(matchTable);
        this.searchParams.delete('id');
      });
  }

  saveMatchTable() {
    const matchTable = this.store.value.matchTable;
    this.matchTableRepository.save(matchTable).then((newId) => {
      this.searchParams.set('id', newId);
      this.clipboard.copy(location.href);
      this.notification.info(
        '保存しました！',
        '復元用URLをクリップボードにコピーしました。URLをブラウザで開くと保存時の状態を復元できます。'
      );
    });
  }

  startEditing() {
    const matchTable = this.store.value.matchTable;
    this.matchTableRepository.setLocalSave(matchTable);
    this.store.update((state) => ({ ...state, restoreFromRemote: false }));
    this.searchParams.delete('id');
  }

  sortEnemy(from: number, to: number): void {
    this.store.updateMatchTable((matchTable) => {
      const enemies = [...matchTable.enemies];
      moveItemInArray(enemies, from, to);
      return MatchTable.create({ party: matchTable.party, enemies });
    });
  }

  addEnemy(): void {
    this.store.updateMatchTable((matchTable) => matchTable.addEnemy(Enemy.create({ pokemon: findPokemon('001') })));
  }

  removeEnemy(index: number): void {
    this.store.updateMatchTable((matchTable) => matchTable.removeEnemy(index));
  }

  resetPartyMember(index: number): void {
    this.store.updateMatchTable((matchTable) => matchTable.resetMatchesByPartyMemberIndex(index));
  }

  changePartyPokemon(index: number, pokemon: Pokemon): void {
    this.store.updateMatchTable((matchTable) => matchTable.setPartyMember(index, pokemon));
  }

  changeEnemyPokemon(index: number, pokemon: Pokemon): void {
    this.store.updateMatchTable((matchTable) => matchTable.setEnemy(index, Enemy.create({ pokemon })));
  }

  changeMatch(enemyIndex: number, matchIndex: number, match: MatchValue): void {
    this.store.updateMatchTable((matchTable) => matchTable.setMatch(enemyIndex, matchIndex, match));
  }
}
