import {InjectionToken, ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {AlertService} from './services/alert.service';
import {AppInitService} from './services/app-init.service';
import {AuthGuardService} from './services/auth-guard.service';
import {UserService} from './services/user.service';
import {AlertsComponent} from './components/alerts/alerts.component';
import {LoginComponent} from './components/login/login.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ReactiveFormsModule} from '@angular/forms';
import {ChangeLocationModelComponent} from './components/change-location-model/change-location-model.component';
import {GoogleMapsAPIWrapper} from '@agm/core';
import {EncryptionService} from './services/encryption.service';
import {MapService} from './services/map.service';
import {HttpClientModule} from '@angular/common/http';
import {AppService} from './services/app.service';
import {NoAuthGuardService} from './services/no-auth-guard.service';
import {GoogleAnalyticsService} from './services/google-analytics.service';
import {RouterModule} from '@angular/router';
import {CsvFileProcessService} from './services/csv-file-process.service';


export const WINDOW = new InjectionToken<any>('A reference to the window');

export function windowFactory() {
  return window;
}


@NgModule({
  imports: [
    RouterModule,
    CommonModule,
    HttpClientModule,
    NgbModule.forRoot(),
    ReactiveFormsModule,
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    AlertsComponent,
    LoginComponent,
    ChangeLocationModelComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    ChangeLocationModelComponent,
    AlertsComponent,
    LoginComponent
  ],
  entryComponents: [ChangeLocationModelComponent]
})
export class CoreModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        AppService,
        AlertService,
        AppInitService,
        AuthGuardService,
        CsvFileProcessService,
        MapService,
        GoogleMapsAPIWrapper,
        NoAuthGuardService,
        {
          provide: WINDOW,
          useFactory: windowFactory
        },
        UserService,
        EncryptionService,
        GoogleAnalyticsService
      ]
    };
  }

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
