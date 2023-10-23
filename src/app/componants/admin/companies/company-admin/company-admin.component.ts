import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from 'src/app/models/Company';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-company-admin',
  templateUrl: './company-admin.component.html',
  styleUrls: ['./company-admin.component.css'],
})
export class CompanyAdminComponent {
  company: Company = new Company();

  constructor(
    private _service: CompanyService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this._service
      .getCompany(this.route.snapshot.params['id'])
      .subscribe((res) => {
        this.company = res;
      });
  }

  confirmDelete(): void {
    const result = window.confirm('Are you sure you want to delete this item?');

    if (result) {
      this._service
        .deleteCompany(this.company._id.toString())
        .subscribe((res) => {
          this.router.navigate(['/admin/companies']);
        });
      console.log('Item deleted.');
    } else {
      console.log('Deletion cancelled.');
    }
  }
}
