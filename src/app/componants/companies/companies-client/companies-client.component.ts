import { Component } from '@angular/core';
import { Company } from 'src/app/models/Company';
import { CompanyService } from 'src/app/services/company.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-companies-client',
  templateUrl: './companies-client.component.html',
  styleUrls: ['./companies-client.component.css'],
})
export class CompaniesClientComponent {
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
        console.log(this.companies);
      });
  }
}
