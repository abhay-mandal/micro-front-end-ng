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
import { sha256 } from 'js-sha256';
import DataJson from '@assets/configs/data.json';


@Injectable()
export class HTTPRequestEncodeInterceptor implements HttpInterceptor {
    constructor(
        private authService: AuthenticationService
    ) { }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {

        let updatedRequest = request.clone();
        const clientNonce = updatedRequest.headers.get('Idempotency-Key');

        const body = { ...request.body };
        const userData = this.authService.getUserSessionData;

        if (body && userData.token.serverNonce) {
            /* Calculate checksum and append into request body */
            body['safeToken'] = userData.token.safeToken;
            body['sessionToken'] = userData.token.sessionToken;
            body['serverNonce'] = userData.token.serverNonce;

            let sortedBody = {};
            Object.keys(body).sort().forEach((key) => {
                sortedBody[key] = body[key];
                if (typeof (body[key]) === 'object') {
                    Object.keys(body[key]).sort().forEach((objKey, index) => {
                        if (index == 0) {
                            sortedBody[key] = {};
                        }
                        sortedBody[key][objKey] = body[key][objKey];
                    });
                }
            });

            const encodedPayload = btoa(JSON.stringify(sortedBody));
            // console.log(JSON.stringify(sortedBody));
            // console.log('encodedPayload', encodedPayload);

            const hashedClientNonce = sha256(clientNonce + userData.token.serverNonce + DataJson.APPZILLON_DIGITAL_BANKING);
            const checksum = sha256(encodedPayload + hashedClientNonce);
            body['checksum'] = checksum;

            updatedRequest = updatedRequest.clone({ body });
        }

        return next.handle(updatedRequest);
    }
}
