import { Component, Output, EventEmitter, ViewEncapsulation, OnInit } from '@angular/core';
import { AuthenticationService } from './core/services/authentication.service';
import { TranslateService } from '@ngx-translate/core';
import { HttpService } from './core/services/http.service';
import { AppConstants } from './app.constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class AppComponent implements OnInit {
  languages: any = AppConstants.LANGUAGES;
  DEFAULT_LANGUAGE: string = AppConstants.DEFAULT_LANGUAGE;
  selectedLanguage = '';

  @Output() loginEvent: EventEmitter<any> = new EventEmitter();

  constructor(
    private authService: AuthenticationService,
    private translate: TranslateService,
    private httpServ: HttpService
  ) {
    const langs = Object.keys(this.languages);
    translate.addLangs(langs);
  }

  ngOnInit(): void {
    this.authService.selectedLanguage = sessionStorage.getItem('language') || AppConstants.DEFAULT_LANGUAGE;
    this.authService.$language.subscribe(lang => {
      this.onLangChange(lang);
      this.selectedLanguage = lang;
    });
    this.getTokenApi();
    this.authService.$isUserLoggedIn.subscribe(isLogin => {
      if (isLogin) {
        this.authService.$userId.subscribe(userId => {
          if (userId) {
            this.sendData(userId, this.authService.getServerNonceAndToken);
          }
        });
      }
    });
  }

  getTokenApi() {
    this.httpServ.post(AppConstants.API_ENDPOINTS.AUTH.GET_TOKEN)
      .subscribe(
        response => {
          if (response.httpStatus == AppConstants.STATUS_CODE.CREATED) {
            const serverNonceAndToken = { bearerToken: this.authService.getBearertoken, safeToken: response.safeToken, sessionToken: response.sessionToken, serverNonce: response.serverNonce };
            this.authService.setServerNonceAndToken = serverNonceAndToken;
          }
        });
  }

  sendData(userId, token) {
    const data = { language: this.selectedLanguage, userId, token };
    this.loginEvent.next(data);
  }

  onLangChange(language) {
    this.translate.setDefaultLang(language);
  }

}
