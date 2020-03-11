import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NewUserComponent} from './components/new-user/new-user.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { SelectCourseComponent } from './components/select-course/select-course.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';

@NgModule({
  declarations: [
    NewUserComponent,
    SelectCourseComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSidenavModule,
    MatButtonModule,
    MatCheckboxModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    NewUserComponent,
    MatSidenavModule,
    MatButtonModule,
    MatCheckboxModule
  ]
})
export class SharedModule { }
