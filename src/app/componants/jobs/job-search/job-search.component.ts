import { Component, OnInit, OnDestroy } from '@angular/core';
import { Job } from 'src/app/models/Job';
import { CompanyService } from 'src/app/services/company.service';
import { map } from 'rxjs/operators';
import { JobService } from 'src/app/services/jobs.service';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-job-search',
  templateUrl: './job-search.component.html',
  styleUrls: ['./job-search.component.css'],
})
export class JobSearchComponent {
  jobs: Job[];
  jobsCount: number;

  jobsPerPage = 12;
  pageSizeOptions = [6, 12, 24, 32];
  currentPage = 1;
  private postsSub: Subscription;
  location = '';
  keywords = '';
  range = '';

  constructor(
    private _service: JobService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.keywords = params['keywords'];
      this.location = params['location'];
      this.getData();
    });
  }

  onChangedPage(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.jobsPerPage = event.pageSize;
    this.getData();
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }

  onSubmit() {
    this.currentPage = 1;
    this.getData();
  }

  day() {
    this.range = '1';
    this.getData();
  }
  week() {
    this.range = '7';
    this.getData();
  }
  month() {
    this.range = '30';
    this.getData();
  }

  getData() {
    this.postsSub = this._service
      .filtrerJobs(
        this.jobsPerPage,
        this.currentPage,
        this.keywords,
        this.location,
        false,
        this.range
      )
      .pipe(
        map((jobsData) => {
          return {
            jobs: jobsData.jobs,
            jobsCount: jobsData.maxJobs,
          };
        })
      )
      .subscribe((transformedCompaniesData) => {
        this.jobs = transformedCompaniesData.jobs;
        this.jobsCount = transformedCompaniesData.jobsCount;
      });
  }
}
