import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackbarService } from '../shared/service/snackbar.service';
import { User } from '../shared/constants/users.const';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  formLogin!: FormGroup;

  constructor(
    private authService: AuthService, 
    private formBuilder: FormBuilder,
    private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    })
   }

  login(): void {
    if (!this.formLogin.valid) {
      this.snackbarService.openSnackBarError('Form has errors.', 'OK');
    }

    const userRequest: {username: string, password: string} = {
      username: this.formLogin.controls["username"].value,
      password: this.formLogin.controls["password"].value
    }

    this.authService.login(userRequest.username, userRequest.password);
  }

}
