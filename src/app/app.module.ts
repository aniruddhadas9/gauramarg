import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CoreModule} from './core/core.module';
import {GauraModule} from './gaura/gaura.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AgmCoreModule} from '@agm/core';
import {WebsiteModule} from '@candiman/website';
import {environment} from '../environments/environment';
import {NG_GAPI_CONFIG} from './gaura/services/google/google-api.service';
import {NgGapiClientConfig} from './gaura/services/google/google-api-config.service';

const gapiClientConfig: NgGapiClientConfig = {
  client_id: 'AIzaSyALebVFsDu_P7GwYqDEkJtwZ02A_z2DnTs',
  discoveryDocs: ['https://analyticsreporting.googleapis.com/$discovery/rest?version=v4'],
  scope: [
    'https://www.googleapis.com/auth/analytics.readonly',
    'https://www.googleapis.com/auth/analytics'
  ].join(' ')
};

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
  providers: [
    {
      provide: NG_GAPI_CONFIG,
      useValue: gapiClientConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
