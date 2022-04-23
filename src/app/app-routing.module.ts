import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {GeneralErrorPageComponent} from "./general-error-page/general-error-page.component";
import {AddProjectComponent} from "./add-project/add-project.component";
import {NavbarComponent} from "./navbar/navbar.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'error', component: GeneralErrorPageComponent },
  { path: 'add-project', component: AddProjectComponent },
  { path: 'nav', component:NavbarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
