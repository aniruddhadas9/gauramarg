import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NewUserComponent} from './components/new-user/new-user.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { SelectCourseComponent } from './components/select-course/select-course.component';

@NgModule({
  declarations: [
    NewUserComponent,
    SelectCourseComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    NewUserComponent
  ]
})
export class SharedModule { }
