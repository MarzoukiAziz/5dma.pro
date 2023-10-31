import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-change-passwords',
  templateUrl: './change-passwords.component.html',
  styleUrls: ['./change-passwords.component.css'],
})
export class ChangePasswordsComponent {
  user: User;
  old = '';
  newnew = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.authService.getUser().subscribe((res) => {
      this.user = res;
      console.log(this.user);
    });
  }

  submit() {
    this.authService.updatePassword(this.old, this.newnew).subscribe((res) => {
      this.router.navigate(['/moncompte']);
      this.toastr.success('Vos Mot de passe a été changé!', 'Succés');
    });
  }
}
