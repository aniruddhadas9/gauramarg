import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {TeacherComponent} from './components/teacher/teacher.component';
import {CoursesComponent} from './components/courses/courses.component';
import {TeachderDashboardComponent} from './components/teachder-dashboard/teachder-dashboard.component';
import {RegisterCourseComponent} from './components/register-course/register-course.component';
import {AddStudentToCourseComponent} from './components/add-student-to-course/add-student-to-course.component';
import {StudentListComponent} from './components/student-list/student-list.component';
import {AddNewStudentComponent} from './components/add-new-student/add-new-student.component';
import {AddAttendanceByTeacherComponent} from './components/add-attendance-by-teacher/add-attendance-by-teacher.component';
import {ViewAttendanceByTeacherComponent} from './components/view-attendance-by-teacher/view-attendance-by-teacher.component';

const routes: Routes = [
  {
    path: '',
    component: TeacherComponent,
    children: [
      {
        path: '',
        component: TeachderDashboardComponent,
      },
      {
        path: 'register-course',
        component: RegisterCourseComponent,
      },
      {
        path: 'add-student',
        component: AddStudentToCourseComponent,
      },
      {
        path: 'add-new-student',
        component: AddNewStudentComponent,
      },
      {
        path: 'course-list',
        component: CoursesComponent,
      },
      {
        path: 'student-list',
        component: StudentListComponent,
      },
      {
        path: 'add-attendance',
        component: AddAttendanceByTeacherComponent,
      },
      {
        path: 'view-attendance',
        component: ViewAttendanceByTeacherComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule {
}
