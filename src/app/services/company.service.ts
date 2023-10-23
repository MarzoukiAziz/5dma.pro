import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Router } from '@angular/router';

import { environment } from '../environments/environment';
import { Company } from '../models/Company';

const BACKEND_URL = environment.apiUrl + '/companies/';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  constructor(private http: HttpClient, private router: Router) {}
  addCompany(company: Company) {
    this.http
      .post<{ message: string; company: Company }>(BACKEND_URL, company)
      .subscribe((responseData) => {
        this.router.navigate(['/admin/companies']);
      });
  }

  updateCompany(company: Company) {
    this.http
      .put<Company>(BACKEND_URL + company._id, company)
      .subscribe((res) => {
        this.router.navigate(['/admin/company/' + company._id]);
      });
  }

  getCompanies(
    companiesPerPage: number,
    currentPage: number
  ): Observable<{
    message: string;
    companies: Company[];
    maxcompanies: number;
  }> {
    const queryParams = `?pagesize=${companiesPerPage}&page=${currentPage}`;
    return this.http.get<{
      message: string;
      companies: Company[];
      maxcompanies: number;
    }>(BACKEND_URL + queryParams);
  }

  getCompany(id: string) {
    return this.http.get<Company>(BACKEND_URL + id);
  }

  deleteCompany(id: string) {
    return this.http.delete(BACKEND_URL + id);
  }
}
