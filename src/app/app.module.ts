import { registerLocaleData } from '@angular/common';
import ja from '@angular/common/locales/ja';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CloseOutline, PlusOutline } from '@ant-design/icons-angular/icons';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ja_JP, NZ_I18N } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { AppComponent } from './app.component';
import { MatchTableComponent } from './match-table/match-table.component';
import { PokeiconComponent } from './shared/pokeicon/pokeicon.component';
import { PokeselectComponent } from './shared/pokeselect/pokeselect.component';

registerLocaleData(ja);

@NgModule({
  declarations: [AppComponent, PokeiconComponent, PokeselectComponent, MatchTableComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NzSelectModule,
    NzIconModule.forRoot([CloseOutline, PlusOutline]),
    NzButtonModule,
    NzTypographyModule,
    FormsModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: ja_JP }],
  bootstrap: [AppComponent],
})
export class AppModule {}
