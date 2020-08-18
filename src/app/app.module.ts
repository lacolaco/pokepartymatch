import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirePerformanceModule } from '@angular/fire/performance';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveComponentModule } from '@ngrx/component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { MatchTableComponent } from './match-table/match-table.component';
import { MatchInputModule } from './shared/match-input/match-input.module';
import { PokeiconModule } from './shared/pokeicon/pokeicon.module';
import { PokeselectModule } from './shared/pokeselect/pokeselect.module';
import { PokelabelModule } from './shared/pokelabel/pokelabel.module';

@NgModule({
  declarations: [AppComponent, MatchTableComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveComponentModule,
    PokeiconModule,
    PokeselectModule,
    MatchInputModule,
    PokelabelModule,
    NzButtonModule,
    NzTypographyModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAnalyticsModule,
    AngularFirePerformanceModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
