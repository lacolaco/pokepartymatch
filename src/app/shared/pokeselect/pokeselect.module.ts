import { A11yModule } from '@angular/cdk/a11y';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveComponentModule } from '@ngrx/component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { PokeiconModule } from '../pokeicon/pokeicon.module';
import { PokepickerItemDirective } from './pokepicker/pokepicker-item.directive';
import { PokepickerComponent } from './pokepicker/pokepicker.component';
import { PokeselectComponent } from './pokeselect.component';

@NgModule({
  declarations: [PokeselectComponent, PokepickerItemDirective, PokepickerComponent],
  imports: [
    CommonModule,
    PokeiconModule,
    NzInputModule,
    NzPopoverModule,
    NzTypographyModule,
    A11yModule,
    ScrollingModule,
    ReactiveComponentModule,
  ],
  exports: [PokeselectComponent],
})
export class PokeselectModule {}
