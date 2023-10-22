import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TemplateComponent } from './componants/common/template/template.component';
import { HomeComponent } from './componants/home/home.component';

const routes: Routes = [
  {
    path: '', 
    component: TemplateComponent,
    children: [
      { path: '', component: HomeComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
