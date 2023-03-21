import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class AuthguardGuard implements CanActivate {

  constructor(private authService: AuthService, 
    private router: Router,
    private snackbarService: SnackbarService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      
    const isLoggedIn = this.authService.loggedIn();

    if (!isLoggedIn) {
      this.snackbarService.openSnackBarError("You don't have permission to access this route.", "OK");
      this.router.navigate(['auth']);
    }

    return isLoggedIn;
  }

}
