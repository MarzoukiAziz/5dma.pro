import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Company } from 'src/app/models/Company';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  company: Company = new Company();

  constructor(private _service: CompanyService, public route: ActivatedRoute) {}

  onSubmit() {
    if (this.company) {
      this._service.addCompany(this.company);
    }
  }

  ngOnInit() {}
}
