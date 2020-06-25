import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MatchTable, Party, Enemy } from '../domain/match-table';
import { pokemonData } from '../data/pokemon-data';
import { skip } from 'rxjs/operators';
import { PokemonData } from '../domain/pokemon-data';

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
        pokemonData['815'],
        pokemonData['887'],
        pokemonData['778'],
        pokemonData['468'],
        pokemonData['530'],
        pokemonData['143'],
      ]),
      enemies: [
        Enemy.create({
          pokemon: pokemonData['887'],
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
          pokemon: pokemonData['815'],
          matches: [null, null, null, null, null, null],
        })
      )
    );
  }

  removeEnemy(matchTable: MatchTable, index: number): void {
    this.matchTable$.next(matchTable.removeEnemy(index));
  }

  changePartyPokemon(matchTable: MatchTable, index: number, pokemon: PokemonData): void {
    this.matchTable$.next(matchTable.setPartyMember(index, pokemon));
  }

  changeEnemyPokemon(matchTable: MatchTable, index: number, pokemon: PokemonData): void {
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
