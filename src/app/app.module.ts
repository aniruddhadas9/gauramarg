import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {CoreModule} from './core/core.module';
import {GauraModule} from './gaura/gaura.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AgmCoreModule} from '@agm/core';
import {WebsiteModule} from '@candiman/website';
import {environment} from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule.forRoot(),
    WebsiteModule.forRoot({
      loginUrl: environment.restUrl + '/user/login',
      alertDelayInSeconds: 7
    }),
    GauraModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBMIoVYsqVdrlm_IwdKSkLEhpMH7JtEIT8',
      libraries: [
        'places'
      ]
    }),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
