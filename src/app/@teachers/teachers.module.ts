import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TeacherComponent} from './components/teacher/teacher.component';
import {CourseComponentComponent} from './components/course-component/course-component.component';
import {CoursesComponent} from './components/course/courses.component';
import {StudentsComponent} from './components/students/students.component';
import {RegisterCourseComponent} from './components/register-course/register-course.component';
import {AddStudentToCourseComponent} from './components/add-student-to-course/add-student-to-course.component';
import {TeachderLeftMenuComponent} from './components/teachder-left-menu/teachder-left-menu.component';
import {TeacherRoutingModule} from './teacher-routing.module';
import { TeachderDashboardComponent } from './components/teachder-dashboard/teachder-dashboard.component';

@NgModule({
  declarations: [
    TeacherComponent, CourseComponentComponent, CoursesComponent,
    StudentsComponent, RegisterCourseComponent, AddStudentToCourseComponent, TeachderLeftMenuComponent, TeachderDashboardComponent
  ],
  imports: [
    CommonModule,
    TeacherRoutingModule
  ]
})
export class TeachersModule {
}
