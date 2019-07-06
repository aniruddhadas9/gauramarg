import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NewUserComponent} from './components/new-user/new-user.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    NewUserComponent
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
