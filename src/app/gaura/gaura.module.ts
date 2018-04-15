import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CorouselComponent } from './components/corousel/corousel.component';
import {HomeComponent} from './components/home/home.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NhfamilyComponent } from './components/nhfamily/nhfamily.component';
import { EventsComponent } from './components/events/events.component';
import { HoliComponent } from './components/holi/holi.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {GauraRoutingModule} from './gaura-routing.module';
import { CsvUploadComponent } from './components/csv-upload/csv-upload.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    GauraRoutingModule
  ],
  declarations: [
    HomeComponent,
    CorouselComponent,
    NhfamilyComponent,
    EventsComponent,
    HoliComponent,
    CsvUploadComponent
  ],
  exports: [
    HomeComponent,
    CorouselComponent,
    NhfamilyComponent
  ]
})
export class GauraModule {

}
