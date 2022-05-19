import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RegisterComponent} from "./register/register.component";
import {LoginComponent} from "./login/login.component";
import {GeneralErrorPageComponent} from "./general-error-page/general-error-page.component";
import {EditProjectComponent} from "./edit-project/edit-project.component";
import {NavbarComponent} from "./navbar/navbar.component";
import {AdminDashboardComponent} from "./admin-dashboard/admin-dashboard.component";
import {AddUserComponent} from "./add-user/add-user.component";
import {AuthGuard} from "./_services/auth/guards/auth.guard";
import {NotEnoughPermissionsComponent} from "./not-enough-permissions/not-enough-permissions.component";
import {AllProjectsComponent} from "./all-projects/all-projects.component";
import {HomePageComponent} from "./home-page/home-page.component";
import {UpdateProjectComponent} from "./update-project/update-project.component";
import {CreateProjectComponent} from "./create-project/create-project.component";

const routes: Routes = [
  { path: "", component: HomePageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'error', component: GeneralErrorPageComponent },
  { path: 'addProject', component: CreateProjectComponent, canActivate: [AuthGuard],
    data: { expectedRoles: ['ADMIN', 'STUDENT', 'PROFESSOR']} },
  { path: "updateProject/:id", component: UpdateProjectComponent },
  { path: 'nav', component:NavbarComponent },
  { path: 'adminDashboard', component: AdminDashboardComponent, canActivate: [AuthGuard],
    data: {expectedRoles: ['ADMIN']}},
  { path: 'adminDashboard/addUser', component: AddUserComponent },
  { path: 'viewProjects', component: AllProjectsComponent},
  { path: 'notEnoughPermissions', component: NotEnoughPermissionsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
