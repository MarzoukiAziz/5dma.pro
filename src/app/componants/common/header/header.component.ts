import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  connected = false;
  constructor(private auth: AuthService) {
    this.connected = this.auth.getIsAuth();
  }
}
