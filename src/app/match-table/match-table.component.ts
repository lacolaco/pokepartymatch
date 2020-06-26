import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { skip } from 'rxjs/operators';
import { pokemons } from '../data/pokemon-data';
import { Enemy, MatchTable, Party } from '../domain/match-table';
import { Pokemon } from '../domain/pokemon';

@Component({
  selector: 'app-match-table',
  templateUrl: './match-table.component.html',
  styleUrls: ['./match-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatchTableComponent implements OnInit {
  readonly matchTable$ = new BehaviorSubject<MatchTable>(
    MatchTable.create({
      party: Party.create([
        pokemons.find((p) => p.idx === '815')!,
        pokemons.find((p) => p.idx === '887')!,
        pokemons.find((p) => p.idx === '778')!,
        pokemons.find((p) => p.idx === '468')!,
        pokemons.find((p) => p.idx === '530')!,
        pokemons.find((p) => p.idx === '143')!,
      ]),
      enemies: [
        Enemy.create({
          pokemon: pokemons.find((p) => p.idx === '887')!,
          matches: [null, null, null, null, null, null],
        }),
      ],
    })
  );

  constructor() {}

  ngOnInit(): void {
    const stored = localStorage.getItem('pokemonbuild.matchTable.v1');
    if (stored) {
      try {
        this.matchTable$.next(MatchTable.fromJSON(JSON.parse(stored)));
      } catch (e) {
        console.error(e);
      }
    }

    this.matchTable$.pipe(skip(1)).subscribe((table) => {
      localStorage.setItem('pokemonbuild.matchTable.v1', JSON.stringify(table));
    });
  }

  addEnemy(matchTable: MatchTable): void {
    this.matchTable$.next(
      matchTable.addEnemy(
        Enemy.create({
          pokemon: pokemons.find((p) => p.idx === '815')!,
          matches: [null, null, null, null, null, null],
        })
      )
    );
  }

  removeEnemy(matchTable: MatchTable, index: number): void {
    this.matchTable$.next(matchTable.removeEnemy(index));
  }

  changePartyPokemon(matchTable: MatchTable, index: number, pokemon: Pokemon): void {
    this.matchTable$.next(matchTable.setPartyMember(index, pokemon));
  }

  changeEnemyPokemon(matchTable: MatchTable, index: number, pokemon: Pokemon): void {
    this.matchTable$.next(
      matchTable.setEnemy(
        index,
        Enemy.create({
          pokemon,
          matches: matchTable.enemies[index].matches,
        })
      )
    );
  }
}
