import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Job } from 'src/app/models/Job';
import { JobService } from 'src/app/services/jobs.service';
import {
  DomSanitizer,
  SafeHtml,
  SafeResourceUrl,
} from '@angular/platform-browser';

import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css'],
})
export class JobDetailComponent {
  job?: Job;
  content!: SafeHtml;

  constructor(
    private _service: JobService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this._service.getJob(this.route.snapshot.params['id']).subscribe((res) => {
      this.job = res;
      this.content = this.sanitizer.bypassSecurityTrustHtml(this.job.details);
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '60rem',
      data: this.job,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
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
      result += `hier`;
    } else if (days > 1) {
      result += `il y a ${days} jours`;
    } else if (days == 0 && hours >= 1) {
      result += `il y a ${hours} heures`;
    } else if (minutes > 0 && hours == 0) {
      result += `il y a ${minutes} minutes`;
    }

    if (result === '') {
      result = 'maintenant';
    }
    return result;
  }
}
