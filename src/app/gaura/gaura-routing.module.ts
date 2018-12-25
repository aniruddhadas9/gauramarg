import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HoliComponent} from './components/holi/holi.component';
import {EventsComponent} from './components/events/events.component';
import {NhfamilyComponent} from './components/nhfamily/nhfamily.component';
import {AuthGuardService} from '@candiman/website';
import {ProfileComponent} from './components/profile/profile.component';
import {UserManageComponent} from './components/user-manage/user-manage.component';
import {CsvUploadComponent} from './components/csv-upload/csv-upload.component';
import {Holi2018ManageComponent} from './components/holi-2018-manage/holi-2018-manage.component';
import {ParkingComponent} from './components/parking/parking.component';
import {HoliStaticsComponent} from './components/holi-statics/holi-statics.component';


const gouraRoutes: Routes = [
  {
    path: 'holi',
    component: HoliComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'nhfamily',
    component: NhfamilyComponent
  },
  {
    path: 'parking',
    component: ParkingComponent
  },
  {
    path: 'holi-statics',
    component: HoliStaticsComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'user-manage',
    component: UserManageComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'holi-manage',
    component: Holi2018ManageComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'csv-upload',
    component: CsvUploadComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'events',
    component: EventsComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(gouraRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class GauraRoutingModule {

}

