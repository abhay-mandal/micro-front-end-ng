import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
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
        const body = { ...request.body };

        const nonceAndToken = this.authService.getServerNonceAndToken;
        if (body && nonceAndToken.serverNonce) {

            const clientNonce = updatedRequest.headers.get('Idempotency-Key');
            console.log('clientNonce', clientNonce);

            /* Calculate checksum and append into request body */
            body['safeToken'] = nonceAndToken.safeToken;
            body['sessionToken'] = nonceAndToken.sessionToken;
            body['serverNonce'] = nonceAndToken.serverNonce;

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

            const hashedClientNonce = sha256(clientNonce + nonceAndToken.serverNonce + DataJson.APPZILLON_DIGITAL_BANKING);
            const checksum = sha256(encodedPayload + hashedClientNonce);
            body['checksum'] = checksum;

            updatedRequest = request.clone({ body });
        }

        return next.handle(updatedRequest);
    }
}
