import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../environments/environment';
import { Job } from '../models/Job';

const BACKEND_URL = environment.apiUrl + '/jobs/';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  constructor(private http: HttpClient, private router: Router) {}

  addJob(job: Job) {
    this.http
      .post<{ message: string; job: Job }>(BACKEND_URL, job)
      .subscribe((responseData) => {
        this.router.navigate(['/admin/jobs']);
      });
  }

  updateJob(job: Job) {
    this.http.put<Job>(BACKEND_URL + job._id, job).subscribe((res) => {
      this.router.navigate(['/admin/job/' + job._id]);
    });
  }

  getJobs(
    jobsPerPage: number,
    currentPage: number
  ): Observable<{ message: string; jobs: Job[]; maxJobs: number }> {
    const queryParams = `?pagesize=${jobsPerPage}&page=${currentPage}`;
    return this.http.get<{ message: string; jobs: Job[]; maxJobs: number }>(
      BACKEND_URL + queryParams
    );
  }

  getJob(id: string) {
    return this.http.get<Job>(BACKEND_URL + id);
  }

  deleteJob(id: string) {
    return this.http.delete(BACKEND_URL + id);
  }
}
