import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {StudentComponent} from './components/student/student.component';
import {StudentDashboardComponent} from './components/student-dashboard/student-dashboard.component';
import {RegisteredCoursesComponent} from './components/registered-courses/registered-courses.component';
import {AddAttendanceByStudentComponent} from './components/add-attendance-by-student/add-attendance-by-student.component';
import {AddPaymentByStudentComponent} from './components/add-payment-by-student/add-payment-by-student.component';
import {AttendanceComponent} from './components/attendance/attendance.component';

const routes: Routes = [
  {
    path: '',
    component: StudentComponent,
    children: [
      {
        path: '',
        component: StudentDashboardComponent,
      },
      {
        path: 'registered-courses',
        component: RegisteredCoursesComponent,
      },
      {
        path: 'attendance',
        component: AttendanceComponent,
      },
      {
        path: 'add-attendance-by-student',
        component: AddAttendanceByStudentComponent,
      },
      {
        path: 'add-payment-by-student',
        component: AddPaymentByStudentComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule {
}
