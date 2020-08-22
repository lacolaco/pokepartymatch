import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveComponentModule } from '@ngrx/component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { MatchInputModule } from '../shared/match-input/match-input.module';
import { PokelabelModule } from '../shared/pokelabel/pokelabel.module';
import { PokeselectModule } from '../shared/pokeselect/pokeselect.module';
import { MatchTableComponent } from './match-table.component';

@NgModule({
  declarations: [MatchTableComponent],
  imports: [
    CommonModule,
    ReactiveComponentModule,
    DragDropModule,
    NzButtonModule,
    NzSpinModule,
    PokeselectModule,
    MatchInputModule,
    PokelabelModule,
  ],
  exports: [MatchTableComponent],
})
export class MatchTableModule {}
