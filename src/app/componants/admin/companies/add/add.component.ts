import { Component, NgModule , OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Subscription } from "rxjs";
import { FormsModule } from '@angular/forms';
import { Company } from 'src/app/models/Company';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent  implements OnInit  {
  company: Company = new Company();
  imagePreview!: string | ArrayBuffer | null;
  isLoading = false;
  form!: FormGroup;

constructor(private _service : CompanyService,    public route: ActivatedRoute,
  ){}

  onSubmit() {
    if (this.company) {
      this._service.addCompany(this.company)
    }
  }

  ngOnInit() {}


  onImagePicked(event: Event) {
    const file = (event!.target as HTMLInputElement).files![0];
    this.form.patchValue({ image: file });
    this.form!.get("image")!.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.company.icon = reader.result?.toString();
    };
    reader.readAsDataURL(file);
  }

 
  

}
