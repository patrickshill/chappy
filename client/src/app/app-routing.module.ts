import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SiteComponent } from './site/site.component';
import { ChappComponent } from './chapp/chapp.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { SplashPageComponent } from './splash-page/splash-page.component';

const routes: Routes = [
  { path:"", redirectTo: '/home/splash', pathMatch: 'full'},
  { path:"home", component: SiteComponent, children: [
    { path: "splash", component: SplashPageComponent },
    { path: "login", component: LoginComponent },
    { path: "registration", component: RegistrationComponent }
  ]},
  { path:"chapp", component: ChappComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
