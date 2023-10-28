import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from 'src/app/models/Company';
import { Job } from 'src/app/models/Job';
import { CompanyService } from 'src/app/services/company.service';
import { JobService } from 'src/app/services/jobs.service';
@Component({
  selector: 'app-edit-job',
  templateUrl: './edit-job.component.html',
  styleUrls: ['./edit-job.component.css'],
})
export class EditJobComponent {
  job: Job = new Job();
  companies: Company[];

  constructor(
    private _service: JobService,
    private route: ActivatedRoute,
    private router: Router,
    private _componyService: CompanyService
  ) {}

  ngOnInit(): void {
    this._service.getJob(this.route.snapshot.params['id']).subscribe((res) => {
      this.job = res;
    });

    this._componyService.getAllCompanies().subscribe((res) => {
      this.companies = res;
    });
  }

  onSubmit() {
    this._service.updateJob(this.job);
  }

  select(c: Company) {
    this.job.company = c;
  }
}
