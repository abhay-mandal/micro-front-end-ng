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
import { AuthenticationService } from '../services/authentication.service';
import { sha256 } from 'js-sha256';
import DataJson from '@assets/configs/data.json';


@Injectable()
export class HTTPResponseDecodeInterceptor implements HttpInterceptor {
    constructor(
        private authService: AuthenticationService
    ) { }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {

        let updatedRequest = request.clone();

        const body = { ...request.body };

        updatedRequest = updatedRequest.clone({ body });

        return next.handle(updatedRequest).pipe(
            tap((event: HttpEvent<any>) => {
                if (event instanceof HttpResponse && event.body) {
                    const body = event.body;
                    const serverChecksum = body.checksum;
                    const checksum = this.calculateChecksum(body);
                    this.matchChecksum(serverChecksum, checksum, );
                }
            }));
    }
    
    calculateChecksum(body){
        const nonceAndToken = this.authService.getServerNonceAndToken;
        delete body.checksum;
        const encodedPayload = btoa(body);
        const hashedClientNonce = sha256(nonceAndToken.serverNonce + DataJson.APPZILLON_DIGITAL_BANKING);
        const checksum = sha256(encodedPayload + hashedClientNonce);
        return checksum;
    }

    matchChecksum(serverChecksum: string, checksum: string){
        if(serverChecksum == checksum){
            return true;
        }
    }
}
