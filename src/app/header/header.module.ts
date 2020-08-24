import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ReactiveComponentModule } from '@ngrx/component';

@NgModule({
  declarations: [HeaderComponent],
  imports: [CommonModule, ReactiveComponentModule, NzButtonModule],
  exports: [HeaderComponent],
})
export class HeaderModule {}
