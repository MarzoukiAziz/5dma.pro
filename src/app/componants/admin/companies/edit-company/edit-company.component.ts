import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Company } from 'src/app/models/Company';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.css'],
})
export class EditCompanyComponent {
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

  onSubmit() {
    this._service.updateCompany(this.company);
  }
}
