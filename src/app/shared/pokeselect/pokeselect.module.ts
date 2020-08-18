import { A11yModule } from '@angular/cdk/a11y';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveComponentModule } from '@ngrx/component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { PokeiconModule } from '../pokeicon/pokeicon.module';
import { PokeselectComponent } from './pokeselect.component';

@NgModule({
  declarations: [PokeselectComponent],
  imports: [CommonModule, PokeiconModule, NzInputModule, NzPopoverModule, A11yModule, ScrollingModule, ReactiveComponentModule],
  exports: [PokeselectComponent],
})
export class PokeselectModule {}
