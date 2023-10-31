import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent {
  user: User;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    if (!this.authService.getIsAuth) {
      this.router.navigate(['/connexion']);
    }

    this.authService.getUser().subscribe((res) => {
      this.user = res;
      console.log(this.user);
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/connexion']);
  }
}
