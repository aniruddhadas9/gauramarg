import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from './gaura/components/home/home.component';
import {LoginComponent} from './core/components/login/login.component';
import {EventsComponent} from './gaura/components/events/events.component';
import {NhfamilyComponent} from './gaura/components/nhfamily/nhfamily.component';
import {HoliComponent} from './gaura/components/holi/holi.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes/*, { enableTracing: true }*/)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
