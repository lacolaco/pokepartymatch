import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { MatchInputComponent } from './match-input.component';

@NgModule({
  declarations: [MatchInputComponent],
  imports: [CommonModule, NzButtonModule],
  exports: [MatchInputComponent],
})
export class MatchInputModule {}
