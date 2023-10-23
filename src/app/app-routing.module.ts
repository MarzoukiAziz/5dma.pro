import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './componants/admin/companies/add/add.component';
import { CompaniesAdminComponent } from './componants/admin/companies/companies-admin/companies-admin.component';
import { CompanyAdminComponent } from './componants/admin/companies/company-admin/company-admin.component';
import { EditCompanyComponent } from './componants/admin/companies/edit-company/edit-company.component';
import { AddJobComponent } from './componants/admin/jobs/add-job/add-job.component';
import { EditJobComponent } from './componants/admin/jobs/edit-job/edit-job.component';
import { JobAdminComponent } from './componants/admin/jobs/job-admin/job-admin.component';
import { JobsAdminComponent } from './componants/admin/jobs/jobs-admin/jobs-admin.component';
import { TemplateComponent } from './componants/common/template/template.component';
import { CompaniesClientComponent } from './componants/companies/companies-client/companies-client.component';
import { CompanyClientComponent } from './componants/companies/company-client/company-client.component';
import { HomeComponent } from './componants/home/home.component';
import { JobDetailComponent } from './componants/jobs/job-detail/job-detail.component';
import { JobsComponent } from './componants/jobs/jobs/jobs.component';

const routes: Routes = [
  {
    path: '',
    component: TemplateComponent,
    children: [
      {
        path: 'admin/company/add',
        component: AddComponent,
      },
      {
        path: 'admin/companies',
        component: CompaniesAdminComponent,
      },
      {
        path: 'admin/company/:id',
        component: CompanyAdminComponent,
      },
      {
        path: 'admin/company/:id/edit',
        component: EditCompanyComponent,
      },

      {
        path: 'admin/job/add',
        component: AddJobComponent,
      },
      {
        path: 'admin/jobs',
        component: JobsAdminComponent,
      },
      {
        path: 'admin/job/:id',
        component: JobAdminComponent,
      },
      {
        path: 'admin/job/:id/edit',
        component: EditJobComponent,
      },
      {
        path: 'entreprises',
        component: CompaniesClientComponent,
      },
      {
        path: 'entreprise/:id',
        component: CompanyClientComponent,
      },
      {
        path: 'offres',
        component: JobsComponent,
      },
      {
        path: 'offre/:id',
        component: JobDetailComponent,
      },
      { path: '', component: HomeComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
