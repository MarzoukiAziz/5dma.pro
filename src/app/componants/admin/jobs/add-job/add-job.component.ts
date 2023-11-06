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
      (this.job.contract = 'Stage 4 à 6 mois'),
        (this.job.function = 'Développement Informatique');
      this.job.startingDate = 'Dès que possible';
      this.job.deadline = 'L’offre sera retirée quand le poste sera pourvu.';
      this.job.remote = 'Télétravail ponctuel autorisé';
      this.job.company = res[res.length - 1];
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    if (this.job) {
      this.job.expired = false;
      this._service.addJob(this.job);
    }
  }

  select(c: Company) {
    this.job.company = c;
  }
}
