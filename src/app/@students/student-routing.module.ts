import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {StudentComponent} from './components/student/student.component';
import {StudentDashboardComponent} from './components/student-dashboard/student-dashboard.component';
import {MarkAttendanceComponent} from './components/mark-attendance/mark-attendance.component';

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
        path: 'mark-attendance',
        component: MarkAttendanceComponent,
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
