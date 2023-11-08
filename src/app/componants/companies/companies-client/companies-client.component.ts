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
  companies1: Company[];

  companies2: Company[];

  loading = true;
  companiesCount: number;
  companiesPerPage = 20;
  pageSizeOptions = [20, 40];
  currentPage = 1;
  private postsSub: Subscription;
  keywords = '';
  pageEvent: PageEvent;
  constructor(private _service: CompanyService) {}

  ngOnInit() {
    this.getData();
  }

  onChangedPage(event: PageEvent): PageEvent {
    this.currentPage = event.pageIndex + 1;
    this.companiesPerPage = event.pageSize;
    this.getData();
    return event;
  }

  onSubmit() {
    this.currentPage = 1;
    this.getData();
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

  getData() {
    this.loading = true;
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
        this.companies1 = this.companies.slice(0, 10);
        this.companies2 = this.companies.slice(10, 20);

        this.loading = false;
      });
  }
}
