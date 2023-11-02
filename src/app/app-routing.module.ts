import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './auth/admin.guard';
import { AuthGuard } from './auth/auth.guard';
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
import { NotfoundComponent } from './componants/common/notfound/notfound.component';
import { TemplateComponent } from './componants/common/template/template.component';
import { CompaniesClientComponent } from './componants/companies/companies-client/companies-client.component';
import { CompanyClientComponent } from './componants/companies/company-client/company-client.component';
import { HomeComponent } from './componants/home/home.component';
import { JobDetailComponent } from './componants/jobs/job-detail/job-detail.component';
import { JobSearchComponent } from './componants/jobs/job-search/job-search.component';
import { JobsComponent } from './componants/jobs/jobs/jobs.component';
import { PlansComponent } from './componants/services/plans/plans.component';
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
        canActivate: [AuthGuard],
      },
      {
        path: 'modifier-info',
        component: EditUserComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'modifier-mdp',
        component: ChangePasswordsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'services',
        component: PlansComponent,
      },
      {
        path: 'admin',
        component: DashboardComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'admin/company/add',
        component: AddComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'admin/companies',
        component: CompaniesAdminComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'admin/company/:id',
        component: CompanyAdminComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'admin/company/:id/edit',
        component: EditCompanyComponent,
        canActivate: [AdminGuard],
      },

      {
        path: 'admin/job/add',
        component: AddJobComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'admin/jobs',
        component: JobsAdminComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'admin/job/:id',
        component: JobAdminComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'admin/job/:id/edit',
        component: EditJobComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'admin/users',
        component: UsersComponent,
        canActivate: [AdminGuard],
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
      { path: '**', component: NotfoundComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, AdminGuard],
})
export class AppRoutingModule {}
