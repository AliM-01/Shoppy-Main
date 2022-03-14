import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginPage } from './login/login.page';
import { RegisterPage } from './register/register.page';

const routes: Routes = [
  { path: 'register', component: RegisterPage },
  { path: 'login', component: LoginPage },
  ];

  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class AuthRoutingModule { }
