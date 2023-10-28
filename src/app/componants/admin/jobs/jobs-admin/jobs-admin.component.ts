import { Component } from '@angular/core';
import { Job } from 'src/app/models/Job';
import { CompanyService } from 'src/app/services/company.service';
import { map } from 'rxjs/operators';
import { JobService } from 'src/app/services/jobs.service';
@Component({
  selector: 'app-jobs-admin',
  templateUrl: './jobs-admin.component.html',
  styleUrls: ['./jobs-admin.component.css'],
})
export class JobsAdminComponent {
  jobs: Job[];
  jobsCount: number;
  constructor(private _service: JobService) {
    this._service
      .getJobs(12, 1)
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
}
