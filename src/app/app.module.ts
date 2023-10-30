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
import { HttpClientModule } from '@angular/common/http';
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
