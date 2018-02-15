import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CorouselComponent } from './components/corousel/corousel.component';
import {HomeComponent} from './home/home.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    NgbModule.forRoot(),
  ],
  declarations: [
    HomeComponent,
    CorouselComponent
  ],
  exports: [
    HomeComponent,
    CorouselComponent
  ]
})
export class GauraModule {

}
