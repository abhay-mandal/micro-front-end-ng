import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse
} from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ToastMessageService } from '@app/core/services/toast-message.service';
import { AppConstants } from '@app/app.constants';
import { AuthenticationService } from '../services/authentication.service';


@Injectable()
export class HTTPToastrInterceptor implements HttpInterceptor {
    STATUS_CODES = [200, 201];
    constructor(
        private toastMsgService: ToastMessageService,
        private authService: AuthenticationService
    ) { }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {  

        const updatedRequest = request.clone();

        return next.handle(updatedRequest).pipe(
            tap((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse && this.STATUS_CODES.includes(event.status) && event.body) {
                    const apiUrlShowingInlineMessages = AppConstants.API_URLS_SHOWING_INLINE_MESSAGES;
                    if (!apiUrlShowingInlineMessages.find(element => event.url.indexOf(element) > -1)) {
                        const body = event.body;
                        if (body.status == AppConstants.HTTP_MESSAGE_TYPE.FAIL && body.errorCode) {
                            const message = { shortMsg: body?.errorMessage, detail: body?.detail };
                            switch (body?.errorCode) {
                                case AppConstants.STATUS_CODE.APZ_CODE.PSWD_EXP:
                                    this.toastMsgService.showToastMessageByType(AppConstants.ALERT_TYPE.ERROR, message);
                                    this.authService.redirectToChangePwsd(updatedRequest.body?.userId);
                                    break;
                                default:
                                    this.toastMsgService.showToastMessageByType(AppConstants.ALERT_TYPE.ERROR, message);
                                    break;
                            }
                            // need to check with back end team
                            // } else if (body.status == AppConstants.HTTP_MESSAGE_TYPE.SUCCESS && body.httpStatus == AppConstants.STATUS_CODE.CREATED) {
                        } else if (body.status == AppConstants.HTTP_MESSAGE_TYPE.SUCCESS) {
                            if (!event.url.includes(AppConstants.API_ENDPOINTS.AUTH.GET_TOKEN)) {
                                const message = { shortMsg: body?.message, detail: body?.detail };
                                this.toastMsgService.showToastMessageByType(AppConstants.ALERT_TYPE.SUCCESS, message);
                            }
                        }
                    }
                }
            }));
    }
}
