import { Component, OnInit, OnDestroy } from '@angular/core';
import { Company } from 'src/app/models/Company';
import { CompanyService } from 'src/app/services/company.service';
import { map } from 'rxjs/operators';

import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-companies-client',
  templateUrl: './companies-client.component.html',
  styleUrls: ['./companies-client.component.css'],
})
export class CompaniesClientComponent implements OnInit, OnDestroy {
  companies: Company[];
  companiesCount: number;

  companiesPerPage = 10;
  pageSizeOptions = [6, 12, 24, 32];
  currentPage = 1;
  private postsSub: Subscription;
  constructor(private _service: CompanyService) {}

  ngOnInit() {
    this.postsSub = this._service
      .getCompanies(8, 1)
      .pipe(
        map((companiesData) => {
          return {
            companies: companiesData.companies,
            maxCompanies: companiesData.maxCompanies,
          };
        })
      )
      .subscribe((transformedCompaniesData) => {
        this.companies = transformedCompaniesData.companies;
        this.companiesCount = transformedCompaniesData.maxCompanies;
        console.log(this.companies);
      });
  }

  onChangedPage(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.companiesPerPage = event.pageSize;
    this.postsSub = this._service
      .getCompanies(this.companiesPerPage, this.currentPage)
      .pipe(
        map((companiesData) => {
          return {
            companies: companiesData.companies,
            maxCompanies: companiesData.maxCompanies,
          };
        })
      )
      .subscribe((transformedCompaniesData) => {
        this.companies = transformedCompaniesData.companies;
        this.companiesCount = transformedCompaniesData.maxCompanies;
      });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
