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
import { AddProjectComponent } from './add-project/add-project.component';
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


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    GeneralErrorPageComponent,
    AddProjectComponent,
    NavbarComponent,
    AdminDashboardComponent,
    AddUserComponent,
    AllUsersComponent,
    EditUserDialogComponent,
    NotEnoughPermissionsComponent,
    AllProjectsComponent,
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
        MatTabsModule
    ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
