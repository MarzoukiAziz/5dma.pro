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
import { AppsService } from 'src/app/services/apps.service';
import { map } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css'],
})
export class JobDetailComponent {
  job?: Job;
  content!: SafeHtml;
  ids: any = [];
  applied = false;

  constructor(
    private _service: JobService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private sanitizer: DomSanitizer,
    private _app: AppsService,
    private _auth: AuthService
  ) {}

  ngOnInit(): void {
    this._service.getJob(this.route.snapshot.params['id']).subscribe((res) => {
      this.job = res;
      this.content = this.sanitizer.bypassSecurityTrustHtml(this.job.details);
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
            if (this.ids.includes(this.job._id)) {
              this.applied = true;
            }
          });
      }
    });
  }

  openDialog(): void {
    if (this.applied) {
      return;
    }
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '60rem',
      data: this.job,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
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
