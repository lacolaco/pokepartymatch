import { registerLocaleData } from '@angular/common';
import ja from '@angular/common/locales/ja';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirePerformanceModule } from '@angular/fire/performance';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClearOutline, CloseOutline, PlusOutline } from '@ant-design/icons-angular/icons';
import { ReactiveComponentModule } from '@ngrx/component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ja_JP, NZ_I18N } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { MatchTableComponent } from './match-table/match-table.component';
import { MatchInputComponent } from './shared/match-input/match-input.component';
import { PokeiconComponent } from './shared/pokeicon/pokeicon.component';
import { PokeselectComponent } from './shared/pokeselect/pokeselect.component';

registerLocaleData(ja);

@NgModule({
  declarations: [AppComponent, PokeiconComponent, PokeselectComponent, MatchTableComponent, MatchInputComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveComponentModule,
    NzSelectModule,
    NzIconModule.forRoot([CloseOutline, PlusOutline, ClearOutline]),
    NzButtonModule,
    NzTypographyModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAnalyticsModule,
    AngularFirePerformanceModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: ja_JP }],
  bootstrap: [AppComponent],
})
export class AppModule {}
