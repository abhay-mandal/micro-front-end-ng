import { Component, OnInit } from '@angular/core';
import { AppConstants } from '@app/app.constants';
import { AuthenticationService } from '@app/core/services/authentication.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  languages: any = AppConstants.LANGUAGES;
  selectedLanguage = '';

  constructor(
    private authService: AuthenticationService
  ) {
  }

  ngOnInit() {
    this.authService.$language.subscribe(lang => {
      this.selectedLanguage = lang;
    });
  }

  onLangChange(language) {
    this.authService.selectedLanguage = language;
  }

  asIsOrder(a, b) {
    return 1;
  }

}
