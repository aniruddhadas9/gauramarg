import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentComponent } from './components/student/student.component';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { MarkAttendanceComponent } from './components/mark-attendance/mark-attendance.component';
import { RegisteredCoursesComponent } from './components/registered-courses/registered-courses.component';
import { StudentDashboardComponent } from './components/student-dashboard/student-dashboard.component';
import {StudentRoutingModule} from './student-routing.module';
import { AddPaymentByStudentComponent } from './components/add-payment-by-student/add-payment-by-student.component';
import { AddAttendanceByStudentComponent } from './components/add-attendance-by-student/add-attendance-by-student.component';

@NgModule({
  declarations: [
    StudentComponent, AttendanceComponent,
    MarkAttendanceComponent, RegisteredCoursesComponent,
     StudentDashboardComponent,
     AddPaymentByStudentComponent,
     AddAttendanceByStudentComponent],
  imports: [
    CommonModule,
    StudentRoutingModule
  ]
})
export class StudentsModule { }
