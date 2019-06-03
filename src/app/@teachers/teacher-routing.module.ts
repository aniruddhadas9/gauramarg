import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {TeacherComponent} from './components/teacher/teacher.component';
import {CoursesComponent} from './components/course/courses.component';
import {StudentsComponent} from './components/students/students.component';

const routes: Routes = [
  {
    path: '',
    component: TeacherComponent,
    children: [
      {
        path: '',
        component: CoursesComponent,
      },
      {
        path: 'students',
        component: StudentsComponent,
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
