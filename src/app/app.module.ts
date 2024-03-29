import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { GeneralErrorPageComponent } from './general-error-page/general-error-page.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSliderModule} from "@angular/material/slider";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatBadgeModule} from "@angular/material/badge";
import {MatInputModule} from "@angular/material/input";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatStepperModule} from "@angular/material/stepper";
import {MatSelectModule} from "@angular/material/select";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatChipsModule} from "@angular/material/chips";
import {MatIconModule} from "@angular/material/icon";
import { NavbarComponent } from './navbar/navbar.component';
import {CdkTableModule} from "@angular/cdk/table";
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import { AddUserComponent } from './add-user/add-user.component';
import { AllUsersComponent } from './all-users/all-users.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import { EditUserDialogComponent } from './edit-user-dialog/edit-user-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {AuthInterceptor} from "./_helpers/auth.interceptor";
import { NotEnoughPermissionsComponent } from './not-enough-permissions/not-enough-permissions.component';
import { AllProjectsComponent } from './all-projects/all-projects.component';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatTabsModule} from "@angular/material/tabs";
import { HomePageComponent } from './home-page/home-page.component';
import { DownloadDialogComponent } from './download-dialog/download-dialog.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { UpdateProjectComponent } from './update-project/update-project.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { ProjectRatingComponent } from './project-rating/project-rating.component';
import { SearchProjectsFormComponent } from './search-projects-form/search-projects-form.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { RecommendationsComponent } from './recommendations/recommendations.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { PasswordResetComponent } from './password-reset/password-reset.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { NgChartsModule } from 'ng2-charts';
import { ProjectsStatsComponent } from './projects-stats/projects-stats.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    GeneralErrorPageComponent,
    EditProjectComponent,
    NavbarComponent,
    AdminDashboardComponent,
    AddUserComponent,
    AllUsersComponent,
    EditUserDialogComponent,
    NotEnoughPermissionsComponent,
    AllProjectsComponent,
    HomePageComponent,
    DownloadDialogComponent,
    UpdateProjectComponent,
    CreateProjectComponent,
    ProjectRatingComponent,
    SearchProjectsFormComponent,
    EditProfileComponent,
    RecommendationsComponent,
    ConfirmEmailComponent,
    PasswordResetComponent,
    ForgotPasswordComponent,
    ProjectsStatsComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatSliderModule,
        MatCardModule,
        MatFormFieldModule,
        MatButtonModule,
        MatBadgeModule,
        MatInputModule,
        MatCheckboxModule,
        MatStepperModule,
        MatSelectModule,
        MatAutocompleteModule,
        MatChipsModule,
        MatIconModule,
        CdkTableModule,
        MatSidenavModule,
        MatListModule,
        MatPaginatorModule,
        MatTableModule,
        MatDialogModule,
        MatGridListModule,
        MatTabsModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
        NgChartsModule,
    ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
