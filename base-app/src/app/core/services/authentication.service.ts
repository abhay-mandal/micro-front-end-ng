import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  private userSessionData = new BehaviorSubject<any>({ language: '', userId: '', token: { bearerToken: '', safeToken: '', sessionToken: '', serverNonce: '' } });
  public $userSessionData = this.userSessionData.asObservable();

  constructor() {
  }

  set setUserSessionData(data) {
    this.userSessionData.next(data);
  }

  isUserLoggedIn(): Observable<any> {
    const loginDetails = { token: {}, isLogin: false };
    const loginSubject = new BehaviorSubject<any>(loginDetails);
    this.userSessionData.subscribe(data => {
      loginSubject.next({ loginData: data, isLogin: data?.token?.sessionToken.length > 0 ?? false });
    });
    return loginSubject.asObservable();
  }

}
