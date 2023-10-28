import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Company } from 'src/app/models/Company';
import { Job } from 'src/app/models/Job';
import { CompanyService } from 'src/app/services/company.service';
import { JobService } from 'src/app/services/jobs.service';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.css'],
})
export class AddJobComponent implements OnInit {
  companies: Company[];
  job: Job = new Job();

  constructor(
    private _service: JobService,
    public route: ActivatedRoute,
    private _componyService: CompanyService
  ) {
    this._componyService.getAllCompanies().subscribe((res) => {
      this.companies = res;
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.job) {
      console.log(this.job);
      this._service.addJob(this.job);
    }
  }

  select(c: Company) {
    this.job.company = c;
  }
}
