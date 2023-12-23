import { Component, Input, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppConstants } from './app.constants';
import DataJson from '@assets/configs/data.json';
import { AuthenticationService } from './core/services/authentication.service';
import { environment } from '@env/environment';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  language: any = AppConstants.LANGUAGES;
  @Input() user_session_data: string;
  userSessionData: any = {};

  constructor(
    private translate: TranslateService,
    private authService: AuthenticationService
  ) {
    translate.addLangs(['en', 'mn']);
  }

  ngOnInit() {
    // this needs to be remove once development is done
    // if (!environment.production) {
    //   this.user_session_data = JSON.stringify(DataJson.LOGIN_DATA);
    // }
    this.user_session_data = JSON.stringify(DataJson.LOGIN_DATA);

    console.log('token dashboard::', (this.user_session_data));
    this.userSessionData = JSON.parse(this.user_session_data);
    this.authService.setUserSessionData = this.userSessionData;
    this.translate.setDefaultLang(this.userSessionData.language);
  }

}
