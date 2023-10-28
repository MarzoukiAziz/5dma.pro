import { Component } from '@angular/core';
import { Company } from 'src/app/models/Company';
import { CompanyService } from 'src/app/services/company.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-companies-admin',
  templateUrl: './companies-admin.component.html',
  styleUrls: ['./companies-admin.component.css'],
})
export class CompaniesAdminComponent {
  companies: Company[];
  companiesCount: number;
  constructor(private _service: CompanyService) {
    this._service
      .getCompanies(8, 1)
      .pipe(
        map((companiesData) => {
          return {
            companies: companiesData.companies,
            maxCompanies: companiesData.maxcompanies,
          };
        })
      )
      .subscribe((transformedCompaniesData) => {
        this.companies = transformedCompaniesData.companies;
        this.companiesCount = transformedCompaniesData.maxCompanies;
      });
  }
}
