import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/services/auth.service';
import { SpinnerService } from './shared/service/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(public authService: AuthService, public spinnerService: SpinnerService) { }
  
  ngOnInit(): void {
  }

  title = 'test-aycron';

  logout(): void { 
    this.authService.logout();
  }

}
