import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ROLES, User } from '../constants/users.const';
import { AuthService } from 'src/app/auth/services/auth.service';
import { SnackbarService } from './snackbar.service';

@Injectable({
  providedIn: 'root'
})
export class NwcGuard implements CanActivate {

  constructor(private authService: AuthService,
    private snackbarService: SnackbarService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const user: User = this.authService.getUserLogged()!;
      if (user.role !== ROLES.MANAGER) {
        this.snackbarService.openSnackBarError("You can't access to this section.", 'OK');
        return false;
      }
      return true
  }
  
}
