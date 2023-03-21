import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User, USERS } from 'src/app/shared/constants/users.const';
import { SnackbarService } from 'src/app/shared/service/snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isLoggedIn = false;
  public LOGGED_IN_KEY = "USER_LOGGED";

  constructor(private snackbarService: SnackbarService, private router: Router) { }

  login(username: string, password: string): boolean {

    const user: User | null = this.getUser(username);

    if (user && user?.password == password) {
      this.isLoggedIn = true;
      localStorage.setItem(this.LOGGED_IN_KEY, JSON.stringify(user));
      this.snackbarService.openSnackBarSuccess("Logged in!", '');
      this.router.navigate(['home']);
      return true;
    }

    this.snackbarService.openSnackBarError("Failed to login: username or password are not valid", '');
    return false;
  }

  logout(): void {
    this.isLoggedIn = false;
    localStorage.removeItem(this.LOGGED_IN_KEY);
    this.router.navigate(['auth'])
  }

  loggedIn(): boolean {
    return !!localStorage.getItem(this.LOGGED_IN_KEY);
  }

  private getUser(username: string): User | null {
    const findUser = USERS.find(user => username === user.username);
    return findUser || null;
  }

  public getUserLogged(): User | null {
    return JSON.parse(localStorage.getItem(this.LOGGED_IN_KEY)!) as User
  }
}