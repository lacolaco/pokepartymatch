import { A11yModule } from '@angular/cdk/a11y';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { registerLocaleData } from '@angular/common';
import ja from '@angular/common/locales/ja';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirestoreModule, Settings as FirestoreSettings, SETTINGS as FIRESTORE_SETTINGS } from '@angular/fire/firestore';
import { AngularFirePerformanceModule } from '@angular/fire/performance';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveComponentModule } from '@ngrx/component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ja_JP, NZ_I18N } from 'ng-zorro-antd/i18n';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
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
    NzInputModule,
    NzButtonModule,
    NzTypographyModule,
    NzPopoverModule,
    A11yModule,
    ScrollingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    AngularFirePerformanceModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: ja_JP },
    {
      provide: FIRESTORE_SETTINGS,
      useValue: environment.production
        ? undefined
        : ({
            host: 'localhost:8080',
            ssl: false,
          } as FirestoreSettings),
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
