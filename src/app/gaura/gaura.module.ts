import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CorouselComponent } from './components/corousel/corousel.component';
import {HomeComponent} from './components/home/home.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NhfamilyComponent } from './components/nhfamily/nhfamily.component';
import { EventsComponent } from './components/events/events.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule.forRoot(),
  ],
  declarations: [
    HomeComponent,
    CorouselComponent,
    NhfamilyComponent,
    EventsComponent
  ],
  exports: [
    HomeComponent,
    CorouselComponent,
    NhfamilyComponent
  ]
})
export class GauraModule {

}
