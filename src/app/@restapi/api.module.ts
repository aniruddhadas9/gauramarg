import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';


import { AddressService } from './api/address.service';
import { AttendanceService } from './api/attendance.service';
import { CourseService } from './api/course.service';
import { CourseRegistrationService } from './api/courseRegistration.service';
import { DashboardService } from './api/dashboard.service';
import { FileService } from './api/file.service';
import { HoliService } from './api/holi.service';
import { PaymentService } from './api/payment.service';
import { UserService } from './api/user.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: [
    AddressService,
    AttendanceService,
    CourseService,
    CourseRegistrationService,
    DashboardService,
    FileService,
    HoliService,
    PaymentService,
    UserService ]
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders<ApiModule> {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
