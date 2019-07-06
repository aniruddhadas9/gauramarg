import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CorouselComponent} from './components/corousel/corousel.component';
import {HomeComponent} from './components/home/home.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NhfamilyComponent} from './components/nhfamily/nhfamily.component';
import {EventsComponent} from './components/events/events.component';
import {HoliComponent} from './components/holi/holi.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {GauraRoutingModule} from './gaura-routing.module';
import {CsvUploadComponent} from './components/csv-upload/csv-upload.component';
import {ProfileComponent} from './components/profile/profile.component';
import {HoliEventsListComponent} from './components/holi-events-list/holi-events-list.component';
import {FilterPipe} from './services/filter-pipe/filter-pipe.service';
import {FileUploadService} from './services/file-upload/file-upload.service';
import {UserManageComponent} from './components/user-manage/user-manage.component';
import {Holi2018ManageComponent} from './components/holi-2018-manage/holi-2018-manage.component';
import {UserListComponent} from './components/user-list/user-list.component';
import {ParkingComponent} from './components/parking/parking.component';
import {HoliService} from './services/holi/holi.service';
import {HoliStaticsComponent} from './components/holi-statics/holi-statics.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {SharedModule} from '../@shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    GauraRoutingModule,
    FontAwesomeModule,
    SharedModule
  ],
  declarations: [
    HomeComponent,
    CorouselComponent,
    NhfamilyComponent,
    EventsComponent,
    HoliComponent,
    CsvUploadComponent,
    ProfileComponent,
    HoliEventsListComponent,
    FilterPipe,
    UserManageComponent,
    Holi2018ManageComponent,
    UserListComponent,
    ParkingComponent,
    HoliStaticsComponent
  ],
  exports: [
    HomeComponent,
    CorouselComponent,
    NhfamilyComponent
  ],
  providers: [
    FileUploadService,
    HoliService
  ]
})
export class GauraModule {

}
