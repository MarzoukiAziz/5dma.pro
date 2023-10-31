import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './componants/admin/companies/add/add.component';
import { CompaniesAdminComponent } from './componants/admin/companies/companies-admin/companies-admin.component';
import { CompanyAdminComponent } from './componants/admin/companies/company-admin/company-admin.component';
import { EditCompanyComponent } from './componants/admin/companies/edit-company/edit-company.component';
import { DashboardComponent } from './componants/admin/dashboard/dashboard.component';
import { AddJobComponent } from './componants/admin/jobs/add-job/add-job.component';
import { EditJobComponent } from './componants/admin/jobs/edit-job/edit-job.component';
import { JobAdminComponent } from './componants/admin/jobs/job-admin/job-admin.component';
import { JobsAdminComponent } from './componants/admin/jobs/jobs-admin/jobs-admin.component';
import { UsersComponent } from './componants/admin/users/users.component';
import { TemplateComponent } from './componants/common/template/template.component';
import { CompaniesClientComponent } from './componants/companies/companies-client/companies-client.component';
import { CompanyClientComponent } from './componants/companies/company-client/company-client.component';
import { HomeComponent } from './componants/home/home.component';
import { JobDetailComponent } from './componants/jobs/job-detail/job-detail.component';
import { JobSearchComponent } from './componants/jobs/job-search/job-search.component';
import { JobsComponent } from './componants/jobs/jobs/jobs.component';
import { AccountComponent } from './componants/user/account/account.component';
import { ChangePasswordsComponent } from './componants/user/change-passwords/change-passwords.component';
import { EditUserComponent } from './componants/user/edit-user/edit-user.component';
import { LoginComponent } from './componants/user/login/login.component';
import { SignupComponent } from './componants/user/signup/signup.component';

const routes: Routes = [
  {
    path: 'inscription',
    component: SignupComponent,
  },
  {
    path: 'connexion',
    component: LoginComponent,
  },

  {
    path: '',
    component: TemplateComponent,
    children: [
      {
        path: 'moncompte',
        component: AccountComponent,
      },
      {
        path: 'modifier-info',
        component: EditUserComponent,
      },
      {
        path: 'modifier-mdp',
        component: ChangePasswordsComponent,
      },
      {
        path: 'admin',
        component: DashboardComponent,
      },
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
        path: 'admin/users',
        component: UsersComponent,
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
        path: 'offres/recherche',
        component: JobSearchComponent,
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
