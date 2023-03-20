import { Component } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { SpinnerService } from './shared/service/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private authService: AuthService, public spinnerService: SpinnerService) { }

  title = 'test-aycron';

  logout(): void {
    this.authService.logout();
  }

  isLoggedIn() {
    return this.authService.isLoggedIn;
  }
}
