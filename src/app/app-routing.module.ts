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
import {RecommendationsComponent} from "./recommendations/recommendations.component";
import {ConfirmEmailComponent} from "./confirm-email/confirm-email.component";
import {PasswordResetComponent} from "./password-reset/password-reset.component";
import {ForgotPasswordComponent} from "./forgot-password/forgot-password.component";
import {EditProfileComponent} from "./edit-profile/edit-profile.component";

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
  { path: 'recommendations', component: RecommendationsComponent },
  { path: 'notEnoughPermissions', component: NotEnoughPermissionsComponent },
  { path: 'confirmAccount', component: ConfirmEmailComponent },
  { path: 'resetPassword', component: PasswordResetComponent },
  { path: 'forgotPassword', component: ForgotPasswordComponent},
  { path: "profile", component: EditProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
