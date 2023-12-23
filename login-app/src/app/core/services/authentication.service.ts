import { Injectable } from '@angular/core';
import { AppConstants } from '@app/app.constants';
import DataJson from '@assets/configs/data.json';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  // private congifToken = '';
  private isUserLoggedIn = new BehaviorSubject<boolean>(false);
  public $isUserLoggedIn = this.isUserLoggedIn.asObservable();
  private language = new BehaviorSubject<string>('');
  public $language = this.language.asObservable();
  private userId = new BehaviorSubject<string>('');
  public $userId = this.userId.asObservable();
  private serverNonceAndToken = { bearerToken: '', safeToken: '', sessionToken: '', serverNonce: '' };


  constructor(
    private router: Router
  ) {
    this.setBearertoken = DataJson.BEARER_TOKEN;
  }

  /*
    * This method sets userId, of user.
    */
  set setUserId(userId: string) {
    this.userId.next(userId);
  }

  /*
    * This method sets language, choosen by user.
    */
  set selectedLanguage(lang: string) {
    this.language.next(lang);
    sessionStorage.setItem('language', lang);
  }

  /*
  * This method sets JWT token which is configurable.
  */
  set setBearertoken(token: string) {
    this.serverNonceAndToken.bearerToken = token;
  }

  /*
  * This method sends configurable JWT token.
  * @returns congifToken.
  */
  get getBearertoken() {
    return this.serverNonceAndToken.bearerToken;
  }

  /*
  * This method sets JWT token after login.
  */
  set setLoginSession(isLogin: boolean) {
    this.isUserLoggedIn.next(isLogin);
  }

  /*
  * This method sets server Nonce and token after fetchedToken API.
    @nonceAndToken : safeToken -> string, sessionToken -> string, serverNonce -> string
  */
  set setServerNonceAndToken(nonceAndToken: any) {
    this.serverNonceAndToken = { ...nonceAndToken };
  }

  /*
  * This method returns server Nonce and token.
  */
  get getServerNonceAndToken() {
    return this.serverNonceAndToken;
  }

  /**
   * This method clears sesssion storage, data service and redirects to login page.
   */
  logOut() {
    this.resetToken();
    this.redirectToLogIn();
  }

  resetToken() {
    this.serverNonceAndToken = { bearerToken: '', safeToken: '', sessionToken: '', serverNonce: '' };
  }

  redirectToLogIn() {
    this.router.navigate([`${AppConstants.APP_URLS.MAIN_URL}/${AppConstants.APP_URLS.SUB_URLS.LOGIN}`]);
  }

  redirectToChangePwsd(userId: string) {
    this.router.navigateByUrl(`${AppConstants.APP_URLS.MAIN_URL}/${AppConstants.APP_URLS.SUB_URLS.CHANGE_PSWD}`, { state: { userId } });
  }

}
