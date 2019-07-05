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

@NgModule({
  declarations: [
    TeacherComponent,
    CoursesComponent,
    RegisterCourseComponent,
    AddStudentToCourseComponent,
    TeachderLeftMenuComponent,
    TeachderDashboardComponent,
    StudentListComponent
  ],
  imports: [
    CommonModule,
    TeacherRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FormlyModule.forRoot(),
    FormlyBootstrapModule,
  ]
})
export class TeachersModule {
}
