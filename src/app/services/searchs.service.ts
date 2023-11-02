import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Search } from '../models/Search';
import { AuthService } from './auth.service';

const BACKEND_URL = environment.apiUrl + '/searchs/';
@Injectable({
  providedIn: 'root',
})
export class SearchsService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private auth: AuthService
  ) {}

  addSearch(keys: string, place: string) {
    const s = new Search();
    s.keys = keys;
    s.place = place;
    s.date = new Date();

    return this.auth.getUser().subscribe((res) => {
      s.user = res;
      this.http
        .post<{ message: string; s: Search }>(BACKEND_URL, s)
        .subscribe((res) => {});
    });
  }

  getSearch(): Observable<{
    message: string;
    searchs: Search[];
  }> {
    const queryParams = `?uid=${this.auth.getUserId()}`;
    return this.http.get<{
      message: string;
      searchs: Search[];
    }>(BACKEND_URL + queryParams);
  }

  deleteSearch(id: string) {
    return this.http.delete(BACKEND_URL + id);
  }
}
