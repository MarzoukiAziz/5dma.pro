import { Component } from '@angular/core';
import { Job } from 'src/app/models/Job';
import { CompanyService } from 'src/app/services/company.service';
import { map } from 'rxjs/operators';
import { JobService } from 'src/app/services/jobs.service';
import { Router } from '@angular/router';
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
  constructor(private _service: JobService, private router: Router) {
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
    this.router.navigate(['/offres/recherche'], {
      queryParams: { keywords: this.keywords, location: this.location },
    });
  }
}
