import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
@Component({
  selector: 'body',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent {
  title = '5dma';
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.autoAuthUser();
    const firebaseConfig = {
      apiKey: 'AIzaSyCi3Kwi3ESW0DwgOzqDsw0qoE0Mqe7iY1Y',
      authDomain: 'flutter-pro-51469.firebaseapp.com',
      databaseURL: 'https://flutter-pro-51469.firebaseio.com',
      projectId: 'flutter-pro-51469',
      storageBucket: 'flutter-pro-51469.appspot.com',
      messagingSenderId: '928732786533',
      appId: '1:928732786533:web:832d8d74c6688e561fbb8c',
      measurementId: 'G-08KVRCRMY0',
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
  }
}
