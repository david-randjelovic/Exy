import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { SpinnerService } from '../services/spinner.service';
import { NotificationService } from '../services/notification.service';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    private _authService = inject(AuthService);
    private _spinnerService = inject(SpinnerService);
    private _notificationService = inject(NotificationService);

  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('exyt');
    
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    this._spinnerService.showSpinner();
    
    return next.handle(request).pipe(
      tap(
        (event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            this._spinnerService.showSpinner();
          }
        },
        (err: any) => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
              this._spinnerService.hideSpinner();
              this._notificationService.showSnackbar('Error', 'Your session has expired.');
              this._authService.onLogOut();
            }
          }
        }
      ),
      finalize(() => {
          this._spinnerService.hideSpinner();
      })
    );
  }
}