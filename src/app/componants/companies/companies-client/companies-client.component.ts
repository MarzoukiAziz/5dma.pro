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
  keywords = '';

  constructor(private _service: CompanyService) {}

  ngOnInit() {
    this.getData();
  }

  onChangedPage(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.companiesPerPage = event.pageSize;
    this.getData();
  }
  onSubmit() {
    this.currentPage = 1;
    this.getData();
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

  getData() {
    this.postsSub = this._service
      .getCompanies(this.companiesPerPage, this.currentPage, this.keywords)
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
}
