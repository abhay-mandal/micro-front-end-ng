import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastMessageService } from '@app/core/services/toast-message.service';
import { AppConstants } from '@app/app.constants';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    INTERNAL_SERVER_HTTP_ERROR_CODE = 500;
    UNAUTHORISED_SERVER_HTTP_ERROR_CODE = 401;

    constructor(
        private router: Router,
        private toastMsg: ToastMessageService,
        private authService: AuthenticationService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                catchError((error: HttpErrorResponse) => {
                    const apiUrlShowingInlineMessages = [];
                    const err = error.error;
                    if (!apiUrlShowingInlineMessages.find(element => request.url.indexOf(element) > -1) && err) {
                        const errorStatus = error.status;
                        const message = { shortMsg: err?.errorMessage, detail: err?.detail };
                        switch (errorStatus) {
                            case this.UNAUTHORISED_SERVER_HTTP_ERROR_CODE:
                                this.toastMsg.showToastMessageByType(AppConstants.ALERT_TYPE.ERROR, message);
                                this.authService.logOut();
                                break;
                            case this.INTERNAL_SERVER_HTTP_ERROR_CODE:
                                this.toastMsg.showToastMessageByType(AppConstants.ALERT_TYPE.ERROR, message);
                                // this.router.navigate([]);
                                break;
                            default:
                                // const message = "";
                                if (err.status == AppConstants.HTTP_MESSAGE_TYPE.FAIL) {
                                    this.toastMsg.showToastMessageByType(AppConstants.ALERT_TYPE.ERROR, message);
                                } else if (err.status == AppConstants.HTTP_MESSAGE_TYPE.WARN) {
                                    this.toastMsg.showToastMessageByType(AppConstants.ALERT_TYPE.WARN, message);
                                }
                                break;
                        }
                    }
                    return throwError(error);
                })
            );
    }
}
