import { Component } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { AppsService } from 'src/app/services/apps.service';
import { App } from 'src/app/models/App';
import { AuthService } from 'src/app/services/auth.service';
import { Job } from 'src/app/models/Job';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],
})
export class DialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _appService: AppsService
  ) {}

  createApplication() {
    const j = this.data as Job;
    this._appService.addApp(j);
  }
}
