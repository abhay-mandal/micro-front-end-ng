import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})

export class HttpService {
  BASE_URL = environment.AUTH_URL;

  constructor(private http: HttpClient) { }

  private formatErrors(error: any) {
    return throwError(error.error);
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${this.BASE_URL}${path}`,
      { params, observe: 'response' })
      .pipe(catchError(this.formatErrors));
  }

  put(path: string, body: object = {}): Observable<any> {
    return this.http.put(`${this.BASE_URL}${path}`,
      JSON.stringify(body), { observe: 'response' })
      .pipe(catchError(this.formatErrors));
  }

  post(path: string, body: object = {}): Observable<any> {
    return this.http.post(`${this.BASE_URL}${path}`, body)
      .pipe(
        catchError(this.formatErrors)
      );
  }

  delete(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.delete(`${this.BASE_URL}${path}`, { params })
      .pipe(catchError(this.formatErrors));
  }

}
