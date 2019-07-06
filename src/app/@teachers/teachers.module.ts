import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TeacherComponent} from './components/teacher/teacher.component';
import {CoursesComponent} from './components/courses/courses.component';
import {RegisterCourseComponent} from './components/register-course/register-course.component';
import {AddStudentToCourseComponent} from './components/add-student-to-course/add-student-to-course.component';
import {TeachderLeftMenuComponent} from './components/teachder-left-menu/teachder-left-menu.component';
import {TeacherRoutingModule} from './teacher-routing.module';
import {TeachderDashboardComponent} from './components/teachder-dashboard/teachder-dashboard.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FormlyModule} from '@ngx-formly/core';
import {FormlyBootstrapModule} from '@ngx-formly/bootstrap';
import {StudentListComponent} from './components/student-list/student-list.component';
import { AddNewStudentComponent } from './components/add-new-student/add-new-student.component';
import {SharedModule} from '../@shared/shared.module';

export function minlengthValidationMessage(err, field) {
  return `Should have atleast ${field.templateOptions.minLength} characters`;
}

export function maxlengthValidationMessage(err, field) {
  return `This value should be less than ${field.templateOptions.maxLength} characters`;
}

export function minValidationMessage(err, field) {
  return `This value should be more than ${field.templateOptions.min}`;
}

export function maxValidationMessage(err, field) {
  return `This value should be less than ${field.templateOptions.max}`;
}

@NgModule({
  declarations: [
    TeacherComponent,
    CoursesComponent,
    RegisterCourseComponent,
    AddStudentToCourseComponent,
    TeachderLeftMenuComponent,
    TeachderDashboardComponent,
    StudentListComponent,
    AddNewStudentComponent
  ],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyModule.forRoot({
      validationMessages: [
        { name: 'required', message: 'This field is required' },
        { name: 'minlength', message: minlengthValidationMessage },
        { name: 'maxlength', message: maxlengthValidationMessage },
        { name: 'min', message: minValidationMessage },
        { name: 'max', message: maxValidationMessage },
      ],
    }),
    FormlyBootstrapModule,
    SharedModule
  ]
})
export class TeachersModule {
}
