import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuardService, LoginComponent, PrivacyComponent} from '@candiman/website';
import {HomeComponent} from './gaura/components/home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'privacy',
    component: PrivacyComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'student',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./@students/students.module').then(m => m.StudentsModule),
  },
  {
    path: 'teacher',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./@teachers/teachers.module').then(m => m.TeachersModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
