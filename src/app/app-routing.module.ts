import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent, PrivacyComponent} from '@candiman/website';
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
    loadChildren: './auth/auth.module#AuthModule',
  },
  {
    path: 'student',
    loadChildren: () => import('./@students/students.module').then(m => m.StudentsModule),
  },
  {
    path: 'teacher',
    loadChildren: () => import('./@teachers/teachers.module').then(m => m.TeachersModule),
  },
  {
    path: 'auth',
    loadChildren: './auth/auth.module#AuthModule',
  },
  /*{
    path: 'auth',
    component: NbAuthComponent,
    children: [
      {
        path: '',
        component: NbLoginComponent,
      },
      {
        path: 'login',
        component: NbLoginComponent,
      },
      {
        path: 'register',
        component: NbRegisterComponent,
      },
      {
        path: 'logout',
        component: NbLogoutComponent,
      },
      {
        path: 'request-password',
        component: NbRequestPasswordComponent,
      },
      {
        path: 'reset-password',
        component: NbResetPasswordComponent,
      },
    ],
  },*/
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
