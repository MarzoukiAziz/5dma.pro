import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
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
  job: Job;
  form!: FormGroup;

  constructor(
    private _service: JobService,
    public route: ActivatedRoute,
    private _componyService: CompanyService
  ) {}

  ngOnInit(): void {
    this._componyService.getAllCompanies().subscribe((res) => {
      this.companies = res;
      console.log(this.companies);
    });
  }

  onSubmit() {
    if (this.job) {
      this._service.addJob(this.job);
    }
  }
}
