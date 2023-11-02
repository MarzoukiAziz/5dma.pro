import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Router } from '@angular/router';

import { environment } from '../environments/environment';
import { App } from '../models/App';
import { AuthService } from './auth.service';
import { Job } from '../models/Job';

const BACKEND_URL = environment.apiUrl + '/apps/';
@Injectable({
  providedIn: 'root',
})
export class AppsService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private auth: AuthService
  ) {}

  addApp(data: Job) {
    const app = new App();
    app.job = data;

    this.auth.getUser().subscribe((res) => {
      app.user = res;
      this.http
        .post<{ message: string; app: App }>(BACKEND_URL, app)
        .subscribe((res) => {});
    });
  }

  updateApp(app: App): Observable<App> {
    console.log(app);
    return this.http.put<App>(BACKEND_URL + app._id, app);
  }

  getApps(
    appsPerPage: number,
    currentPage: number,
    status: string
  ): Observable<{
    message: string;
    apps: App[];
    maxApps: number;
  }> {
    const queryParams = `?pagesize=${appsPerPage}&page=${currentPage}&status=${status}&uid=${this.auth.getUserId()}`;
    return this.http.get<{
      message: string;
      apps: App[];
      maxApps: number;
    }>(BACKEND_URL + 'filtrer' + queryParams);
  }

  getCount(): Observable<{
    message: string;
    sent: number;
    interview: number;
    rejected: number;
  }> {
    const queryParams = `?uid=${this.auth.getUserId()}`;

    return this.http.get<{
      message: string;
      sent: number;
      interview: number;
      rejected: number;
    }>(BACKEND_URL + 'count' + queryParams);
  }

  getApp(id: string) {
    return this.http.get<App>(BACKEND_URL + id);
  }

  deleteApp(id: string) {
    return this.http.delete(BACKEND_URL + id);
  }
}
