import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HTTPToastrInterceptor } from '@app/core/interceptors/http-toastr-interceptor';
import { ErrorInterceptor } from '@app/core/interceptors/error-interceptor';
import { LoaderInterceptor } from '@app/core/interceptors/loader-interceptor'
import { JwtInterceptor } from './jwt-interceptor';
import { HTTPRequestEncodeInterceptor } from './http-request-encode.interceptor';
import { HTTPRequestConfigInterceptor } from './http-request-config.interceptor';

export const HttpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: HTTPRequestConfigInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HTTPRequestEncodeInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HTTPToastrInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }
];
