import { Component, OnInit, OnDestroy } from '@angular/core';
import { Job } from 'src/app/models/Job';
import { map } from 'rxjs/operators';
import { JobService } from 'src/app/services/jobs.service';

import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { AuthService } from 'src/app/services/auth.service';
import { SearchsService } from 'src/app/services/searchs.service';
import { AppsService } from 'src/app/services/apps.service';
import { load } from 'dotenv';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css'],
})
export class JobsComponent implements OnInit, OnDestroy {
  jobs: Job[] = [];
  jobsCount: number = 0;

  jobsPerPage = 12;
  pageSizeOptions = [6, 12, 24, 32];
  currentPage = 1;
  private postsSub: Subscription;
  location = '';
  keywords = '';
  range = '';
  ids: any = [];
  loading = true;

  constructor(
    private _service: JobService,
    private _auth: AuthService,
    private _search: SearchsService,
    private _app: AppsService
  ) {}

  ngOnInit() {
    if (this._auth.getIsAuth()) {
      this._app
        .getIds()
        .pipe(
          map((jobsData) => {
            return {
              ids: jobsData.ids,
            };
          })
        )
        .subscribe((transformedCompaniesData) => {
          this.ids = transformedCompaniesData.ids;
          this.getData();
        });
    } else {
      this.getData();
    }
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
    if (this._auth.getIsAuth()) {
      this._search.addSearch(this.keywords, this.location);
    }
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
    this.loading = true;
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
        this.loading = false;
      });
  }

  transform(value: Date): string {
    const currentDateTime = new Date();
    value = new Date(value);

    const diffInSeconds = Math.floor(
      (currentDateTime.getTime() - value.getTime()) / 1000
    );

    const years = Math.floor(diffInSeconds / 31536000);
    const months = Math.floor((diffInSeconds % 31536000) / 2628000);
    const days = Math.floor(((diffInSeconds % 31536000) % 2628000) / 86400);
    const hours = Math.floor(
      (((diffInSeconds % 31536000) % 2628000) % 86400) / 3600
    );
    const minutes = Math.floor(
      ((((diffInSeconds % 31536000) % 2628000) % 86400) % 3600) / 60
    );
    const seconds =
      ((((diffInSeconds % 31536000) % 2628000) % 86400) % 3600) % 60;

    let result = '';

    if (months > 0) {
      result += `il y a ${months} mois`;
    } else if (days == 1) {
      result += `hier `;
    } else if (days > 1) {
      result += `il y a ${days} jours `;
    } else if (days == 0 && hours == 1) {
      result += `il y a ${hours} heure `;
    } else if (days == 0 && hours > 1) {
      result += `il y a ${hours} heures `;
    } else if (minutes > 0 && hours == 0) {
      result += `il y a ${minutes} minutes `;
    }

    if (result === '') {
      result = 'maintenant';
    }
    return result;
  }
}
