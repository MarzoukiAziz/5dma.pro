import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Job } from 'src/app/models/Job';
import { JobService } from 'src/app/services/jobs.service';
import {
  DomSanitizer,
  SafeHtml,
  SafeResourceUrl,
} from '@angular/platform-browser';

@Component({
  selector: 'app-job-admin',
  templateUrl: './job-admin.component.html',
  styleUrls: ['./job-admin.component.css'],
})
export class JobAdminComponent {
  job: Job = new Job();
  content!: SafeHtml;

  constructor(
    private _service: JobService,
    private route: ActivatedRoute,
    private router: Router,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this._service.getJob(this.route.snapshot.params['id']).subscribe((res) => {
      this.job = res;
      this.content = this.sanitizer.bypassSecurityTrustHtml(this.job.details);
    });
  }

  confirmDelete(): void {
    const result = window.confirm('Are you sure you want to delete this job?');

    if (result) {
      this._service.deleteJob(this.job._id.toString()).subscribe((res) => {
        this.router.navigate(['/admin/jobs']);
      });
      console.log('Job deleted.');
    } else {
      console.log('Deletion cancelled.');
    }
  }
}
