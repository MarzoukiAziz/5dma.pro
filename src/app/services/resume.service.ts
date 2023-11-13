import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Router } from '@angular/router';

import { environment } from '../environments/environment';
import { Experience, User } from '../models/User';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ResumeService {
  apiUrl = environment.apiUrl + '/resume/';

  constructor(
    private http: HttpClient,
    private router: Router,
    private auth: AuthService
  ) {}

  // Add Experience
  addExperience(userId: string, experience: Experience): Observable<User> {
    const url = `${this.apiUrl}/exp/${this.auth.getUserId()}`;
    return this.http.post<User>(url, experience).pipe(
      catchError((error) => {
        console.error('Error adding experience:', error);
        throw error;
      })
    );
  }

  // Update Experience
  updateExperience(
    userId: string,
    experienceId: string,
    experience: Experience
  ): Observable<User> {
    const url = `${this.apiUrl}/exp/${userId}/${experienceId}`;
    return this.http.put<User>(url, experience).pipe(
      catchError((error) => {
        console.error('Error updating experience:', error);
        throw error;
      })
    );
  }

  // Delete Experience
  deleteExperience(userId: string, experienceId: string): Observable<User> {
    const url = `${this.apiUrl}/delete-experience/${userId}/${experienceId}`;
    return this.http.delete<User>(url).pipe(
      catchError((error) => {
        console.error('Error deleting experience:', error);
        throw error;
      })
    );
  }
}
