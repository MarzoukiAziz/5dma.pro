import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TemplateComponent } from './componants/common/template/template.component';
import { HeaderComponent } from './componants/common/header/header.component';
import { FooterComponent } from './componants/common/footer/footer.component';
import { HomeComponent } from './componants/home/home.component';
import { AddComponent } from './componants/admin/companies/add/add.component';
import { FormsModule } from '@angular/forms';
import { CompaniesAdminComponent } from './componants/admin/companies/companies-admin/companies-admin.component';
import { CompanyAdminComponent } from './componants/admin/companies/company-admin/company-admin.component';
import { EditCompanyComponent } from './componants/admin/companies/edit-company/edit-company.component';
import { CompaniesClientComponent } from './componants/companies/companies-client/companies-client.component';
import { CompanyClientComponent } from './componants/companies/company-client/company-client.component';
import { AddJobComponent } from './componants/admin/jobs/add-job/add-job.component';
import { EditJobComponent } from './componants/admin/jobs/edit-job/edit-job.component';
import { JobsAdminComponent } from './componants/admin/jobs/jobs-admin/jobs-admin.component';
import { JobAdminComponent } from './componants/admin/jobs/job-admin/job-admin.component';
import { JobsComponent } from './componants/jobs/jobs/jobs.component';
import { JobDetailComponent } from './componants/jobs/job-detail/job-detail.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatChipsModule } from '@angular/material/chips';
import { JobSearchComponent } from './componants/jobs/job-search/job-search.component';
import { SignupComponent } from './componants/user/signup/signup.component';
import { LoginComponent } from './componants/user/login/login.component';
import { AccountComponent } from './componants/user/account/account.component';
import { ApplicationsComponent } from './componants/user/applications/applications.component';
import { EditUserComponent } from './componants/user/edit-user/edit-user.component';
import { ChangePasswordsComponent } from './componants/user/change-passwords/change-passwords.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth-interceptor';
import { ErrorInterceptor } from './error-interceptor';
import { ToastrModule } from 'ngx-toastr';
import { DashboardComponent } from './componants/admin/dashboard/dashboard.component';
import { UsersComponent } from './componants/admin/users/users.component';
import { NotfoundComponent } from './componants/common/notfound/notfound.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogComponent } from './componants/jobs/dialog/dialog.component';
import { PlansComponent } from './componants/services/plans/plans.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { JobteaserScrapperComponent } from './componants/admin/jobs/jobteaser-scrapper/jobteaser-scrapper.component';

@NgModule({
  declarations: [
    AppComponent,
    TemplateComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AddComponent,
    CompaniesAdminComponent,
    CompanyAdminComponent,
    EditCompanyComponent,
    CompaniesClientComponent,
    CompanyClientComponent,
    AddJobComponent,
    EditJobComponent,
    JobsAdminComponent,
    JobAdminComponent,
    JobsComponent,
    JobDetailComponent,
    JobSearchComponent,
    SignupComponent,
    LoginComponent,
    AccountComponent,
    ApplicationsComponent,
    EditUserComponent,
    ChangePasswordsComponent,
    DashboardComponent,
    UsersComponent,
    NotfoundComponent,
    DialogComponent,
    PlansComponent,
    JobteaserScrapperComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatGridListModule,
    ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
