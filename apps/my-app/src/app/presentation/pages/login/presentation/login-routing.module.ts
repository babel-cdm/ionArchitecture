import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LOGIN_ROUTES } from './login-routes';

import { LoginPageComponent } from './login-page/login-page.component';
import { LoginPageComponentModule } from './login-page/login-page.module';

const routes: Routes = [
  {
    path: LOGIN_ROUTES.LOGIN,
    component: LoginPageComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    LoginPageComponentModule
  ],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
