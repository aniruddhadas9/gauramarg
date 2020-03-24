import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {GauraModule} from './gaura/gaura.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AgmCoreModule} from '@agm/core';
import {HttpInterceptorService, WebsiteModule} from '@candiman/website';
import {environment} from '../environments/environment';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthModule} from './auth/auth.module';
import {ApiModule, Configuration} from './@restapi';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';

export function ApiConfig() {
  return new Configuration({basePath: environment.restUrl});
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    // SocialLoginModule,
    WebsiteModule.forRoot({
      loginUrl: environment.restUrl + '/authentication/login',
      alertDelayInSeconds: 7
    }),
    ApiModule.forRoot(ApiConfig),
    GauraModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBMIoVYsqVdrlm_IwdKSkLEhpMH7JtEIT8',
      libraries: [
        'places'
      ]
    }),
    BrowserAnimationsModule,
    HttpClientModule,
    // AuthModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
