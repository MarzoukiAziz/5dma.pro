import { Component } from '@angular/core';
import { Job } from 'src/app/models/Job';
import { CompanyService } from 'src/app/services/company.service';
import { map } from 'rxjs/operators';
import { JobService } from 'src/app/services/jobs.service';
import { Router } from '@angular/router';
import { SearchsService } from 'src/app/services/searchs.service';
import { AuthService } from 'src/app/services/auth.service';
import { Search } from 'src/app/models/Search';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  jobs: Job[];
  jobsCount: number;
  keywords = '';
  location = '';
  searchs: Search[] = [];
  constructor(
    private _service: JobService,
    private router: Router,
    private _search: SearchsService,
    private _auth: AuthService
  ) {
    if (this._auth.getIsAuth()) {
      this._search
        .getSearch()
        .pipe(
          map((appsData) => {
            return {
              message: appsData.message,
              searchs: appsData.searchs,
            };
          })
        )
        .subscribe((transformedCompaniesData) => {
          this.searchs = transformedCompaniesData.searchs;
        });
    }

    this._service
      .getJobs(8, 1)
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

  onSubmit() {
    if (this._auth.getIsAuth() && this.keywords != '' && this.location != '') {
      this._search.addSearch(this.keywords, this.location);
    }
    this.router.navigate(['/offres/recherche'], {
      queryParams: { keywords: this.keywords, location: this.location },
    });
  }
  search(s: Search) {
    this.router.navigate(['/offres/recherche'], {
      queryParams: { keywords: s.keys, location: s.place },
    });
  }
}
