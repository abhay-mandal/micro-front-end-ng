import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstants } from '@app/app.constants';
import { AuthenticationService } from '../services/authentication.service';
import DataJson from '@assets/configs/data.json';


@Injectable()
export class HTTPRequestConfigInterceptor implements HttpInterceptor {

    constructor(
        private authService: AuthenticationService
    ) {
    }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {

        const clientNonce = Math.random().toString(36).substring(7);

        // Pass headers for API.
        const headers = request.headers
            .set('Content-Type', AppConstants.AUTH_DATA.HEADERS.APP_JSON_CONTENT_TYPE)
            .set('Idempotency-Key', clientNonce);

        let updatedRequest = request.clone({ headers });

        const body = { ...request.body };
        /* Pass common payload append into request body */
        body['deviceId'] = DataJson.API_BODY.DEVICE_ID;
        body['appId'] = DataJson.API_BODY.APP_ID;
        body['tenantId'] = DataJson.API_BODY.TENANT_ID;
        body['requestId'] = DataJson.API_BODY.REQUEST_ID;
        body['externalRefId'] = DataJson.API_BODY.EXTERNAL_REF_ID;
        body['language'] = this.authService.getUserSessionData.language;
        body['userId'] = this.authService.getUserSessionData.userId;

        updatedRequest = updatedRequest.clone({ body });
        return next.handle(updatedRequest);
    }
}
