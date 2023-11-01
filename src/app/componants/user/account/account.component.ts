import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { AppsService } from 'src/app/services/apps.service';
import { Subscription } from 'rxjs';
import { App } from 'src/app/models/App';
import { PageEvent } from '@angular/material/paginator';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  user: User;
  appsCount: number = 0;
  apps: App[];
  appsPerPage = 12;
  pageSizeOptions = [6, 12, 24, 32];
  currentPage = 1;
  private postsSub: Subscription;

  constructor(
    private authService: AuthService,
    private appService: AppsService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.authService.getUser().subscribe((res) => {
      this.user = res;
      this.getData();
    });
  }

  onChangedPage(event: PageEvent) {
    this.currentPage = event.pageIndex + 1;
    this.appsPerPage = event.pageSize;
    this.getData();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
    this.toastr.success('', 'à bientôt');
  }

  getData() {
    this.postsSub = this.appService
      .getApps(this.appsPerPage, this.currentPage, 'all')
      .pipe(
        map((appsData) => {
          return {
            message: appsData.message,
            apps: appsData.apps,
            appsCount: appsData.maxApps,
          };
        })
      )
      .subscribe((transformedCompaniesData) => {
        this.apps = transformedCompaniesData.apps;
        this.appsCount = transformedCompaniesData.appsCount;
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
