import { Injectable } from '@angular/core';
import { AppConstants } from '@app/app.constants';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  private isUserLoggedIn = new BehaviorSubject<boolean>(false);
  public $isUserLoggedIn = this.isUserLoggedIn.asObservable();
  private userSessionData = { language: '', userId: '', token: { bearerToken: '', safeToken: '', sessionToken: '', serverNonce: '' }};

  constructor(
    private router: Router
  ) {
  }

  /*
  * This method sets server Nonce and token after fetchedToken API.
    @nonceAndToken : safeToken -> string, sessionToken -> string, serverNonce -> string
  */
  set setUserSessionData(userSessionData: any) {
    this.userSessionData = { ...userSessionData };
  }

  /*
  * This method returns server Nonce and token.
  */
  get getUserSessionData() {
    return this.userSessionData;
  }

  /**
   * This method clears sesssion storage, data service and redirects to login page.
   */
  logOut() {
    this.resetToken();
    // this.redirectToLogIn();
  }

  resetToken() {
    this.userSessionData = { language: '', userId: '', token: { bearerToken: '', safeToken: '', sessionToken: '', serverNonce: '' }};
  }

  navigateToURL(routerUrl: any){
    this.router.navigateByUrl(`${AppConstants.APP_URLS.MAIN_URL}/${routerUrl}`);
  }


}
