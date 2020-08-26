import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAnalyticsModule } from '@angular/fire/analytics';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule, Settings as FirestoreSettings, SETTINGS as FIRESTORE_SETTINGS } from '@angular/fire/firestore';
import { AngularFirePerformanceModule } from '@angular/fire/performance';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzNotificationModule } from 'ng-zorro-antd/notification';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { MatchTableModule } from './match-table/match-table.module';
import { HeaderModule } from './header/header.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HeaderModule,
    MatchTableModule,
    NzNotificationModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAnalyticsModule,
    AngularFireAuthModule,
    AngularFirePerformanceModule,
    AngularFirestoreModule,
  ],
  providers: [
    {
      provide: FIRESTORE_SETTINGS,
      useValue: environment.production ? undefined : ({ host: 'localhost:8080', ssl: false } as FirestoreSettings),
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
