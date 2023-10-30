import { Component, OnInit, OnDestroy } from '@angular/core';
import { Job } from 'src/app/models/Job';
import { CompanyService } from 'src/app/services/company.service';
import { map } from 'rxjs/operators';
import { JobService } from 'src/app/services/jobs.service';

import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-jobs-admin',
  templateUrl: './jobs-admin.component.html',
  styleUrls: ['./jobs-admin.component.css'],
})
export class JobsAdminComponent implements OnInit, OnDestroy {
  jobs: Job[];
  jobsCount: number;

  jobsPerPage = 10;
  pageSizeOptions = [6, 12, 24, 32];
  currentPage = 1;
  private postsSub: Subscription;
  constructor(private _service: JobService) {}

  ngOnInit(): void {
    this.postsSub = this._service
      .getAllJobs(this.jobsPerPage, this.currentPage)
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

        console.log(this.jobs);
      });
  }

  onChangedPage(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.jobsPerPage = event.pageSize;
    this.postsSub = this._service
      .getAllJobs(this.jobsPerPage, this.currentPage)
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

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
