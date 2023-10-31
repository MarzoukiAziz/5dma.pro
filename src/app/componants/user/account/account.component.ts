import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  user: User;
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.authService.getUser().subscribe((res) => {
      this.user = res;
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
    this.toastr.success('', 'à bientôt');
  }
}
