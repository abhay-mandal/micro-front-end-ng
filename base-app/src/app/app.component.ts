import { Component, AfterViewInit, OnInit, HostListener } from '@angular/core';
import { ElementStateService } from '@app/core/services/element-state.service';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { AppConstants } from '@app/app.constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, AfterViewInit {
  isUserAuthorized = false;
  userSessionData = {};

  config = AppConstants.APP_CONFIG.CONFIGS;

  constructor(
    private stateService: ElementStateService,
    private authService: AuthenticationService
  ) { }

  // @HostListener('window:popstate', ['$event'])
  // onPopState(event) {
  //   this.logout();
  //   console.log('Back button pressed');
  // }

  ngOnInit() {
    this.authService.isUserLoggedIn().subscribe(data => {
      this.isUserAuthorized = data.isLogin;
      this.userSessionData = data?.loginData;
    });
  }

  ngAfterViewInit() {
    if (this.isUserAuthorized) {
      const hashPath = window.location.hash;
      if (hashPath.length && !hashPath.includes(AppConstants.APP_CONFIG.APP_LOGIN)) {
        const appHashPath = hashPath.split('/', 2).join('/');
        this.loadApp(this.loadAppByHashPath(appHashPath), hashPath);
      } else {
        this.loadApp(AppConstants.APP_CONFIG.APP_DASHBOARD);
      }
    } else {
      this.loadApp(AppConstants.APP_CONFIG.APP_LOGIN);
    }
  }

  /*
    @returns - Name of micro app
  */
  loadAppByHashPath(hashPath: string): string {
    for (const name in this.config) {
      if (this.config[name].url.includes(hashPath)) {
        return name;
      }
    }
  }

  loadApp(name: string, hashPath?: string): void {
    const configItem = this.config[name];
    if (configItem.loaded) {
      window.location.href = configItem.url;
      return;
    }
    const clients = this.stateService.getClients;
    const clientNames = Object.keys(clients);
    if (clientNames.length) {
      if (!clientNames.includes(configItem.element)) {
        this.appendScript(configItem);
      }
    } else {
      this.appendScript(configItem);
    }
    this.appendApp(configItem, hashPath);
  }

  // load app script src into header
  appendScript(configItem) {
    const script = document.createElement('script');
    script.src = configItem.srcPath;
    document.head.appendChild(script);
    script.onerror = () => console.error(`error loading ${configItem.srcPath}`);
  }

  // load app into container
  appendApp(configItem: any, hashPath?: string) {
    const container = document.getElementById(configItem.container);
    const element: HTMLElement = document.createElement(configItem.element);
    container.appendChild(element);
    const redirectionPath = hashPath || configItem.url;
    window.location.href = redirectionPath;
    configItem.loaded = true;

    if (this.isUserAuthorized) {
      element.setAttribute('user_session_data', JSON.stringify(this.userSessionData));
    }
    else {
      this.authService.setUserSessionData = '';
      element.addEventListener('loginEvent', userSessionData => this.handleLoginEvent(userSessionData));
    }
    this.stateService.registerClient(element);
  }

  handleLoginEvent(userSessionData) {
    this.authService.setUserSessionData = userSessionData.detail;
    setTimeout(() => {
      this.loadApp(AppConstants.APP_CONFIG.APP_DASHBOARD);
    });
  }

  logout() {
    this.authService.setUserSessionData = '';
    for (let configItem in this.config) {
      this.config[configItem].loaded = false;
    }

    setTimeout(() => {
      this.loadApp(AppConstants.APP_CONFIG.APP_LOGIN);
    });
  }

}
