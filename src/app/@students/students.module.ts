import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StudentComponent} from './components/student/student.component';
import {AttendanceComponent} from './components/attendance/attendance.component';
import {RegisteredCoursesComponent} from './components/registered-courses/registered-courses.component';
import {StudentDashboardComponent} from './components/student-dashboard/student-dashboard.component';
import {StudentRoutingModule} from './student-routing.module';
import {AddPaymentByStudentComponent} from './components/add-payment-by-student/add-payment-by-student.component';
import {AddAttendanceByStudentComponent} from './components/add-attendance-by-student/add-attendance-by-student.component';
import {StudentLeftMenuComponent} from './components/student-left-menu/student-left-menu.component';

@NgModule({
  declarations: [
    StudentComponent,
    AttendanceComponent,
    RegisteredCoursesComponent,
    StudentDashboardComponent,
    AddPaymentByStudentComponent,
    AddAttendanceByStudentComponent,
    StudentLeftMenuComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule
  ]
})
export class StudentsModule {
}
