import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { SpinnerService } from '../service/spinner.service';
import { SnackbarService } from '../service/snackbar.service';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable()
export class HttpCustomInterceptor implements HttpInterceptor {

  constructor(private spinnerService: SpinnerService,
    private snackbarService: SnackbarService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.spinnerService.show();
    return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        this.spinnerService.hide();
      }
    }, (err) => {
      if (err.status === 401) {
        this.snackbarService.openSnackBarError(err.message, 'OK');
      }
      this.spinnerService.hide();
    }))
  }
}
