import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
@Component({
  selector: 'body',
  template: '<router-outlet></router-outlet>',
})

// Initialize Firebase
export class AppComponent {
  title = '5dma';

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.autoAuthUser();
  }
}
