import { A11yModule } from '@angular/cdk/a11y';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFirePerformanceModule } from '@angular/fire/performance';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveComponentModule } from '@ngrx/component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { MatchTableComponent } from './match-table/match-table.component';
import { MatchInputComponent } from './shared/match-input/match-input.component';
import { PokeiconComponent } from './shared/pokeicon/pokeicon.component';
import { PokeselectComponent } from './shared/pokeselect/pokeselect.component';

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
    AngularFirePerformanceModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
