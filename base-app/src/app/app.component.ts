import { Component } from '@angular/core';
import { ElementStateService } from './services/element-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'base-app';
  isBaseAppRoutes: boolean = true;

  config = {
    "app-people": {
      loaded: false,
      // path: 'app-list-people/main-es5.js',
      srcPath : 'http://127.0.0.1:8088/main-es2015.js',
      // path: 'http://localhost:4200/main.js', // don't work in dev as it need to have single bundle
      element: 'app-list-people',
      url: "#/app-people/people"
    },
    "app-login": {
      loaded: false,
      // path: 'app-login/main-es5.js',
      srcPath: 'http://127.0.0.1:8089/main-es2015.js',
      element: 'micro-app-login',
      url: "#/app-login/login"
    }
  };

  constructor(private stateService: ElementStateService
  ){  }

  ngOnInit() {
    // this.load('app-people');
    // this.load('app-login');
    const hashPath= window.location.hash;
    const appHashPath = hashPath.split('/', 2).join('/');
    if(hashPath.length){
      this.load(this.loadAppByHashPath(appHashPath), hashPath);
    }
  }

  loadAppByHashPath(hashPath: string):string {
    for(let name in this.config){
      if(this.config[name].url.includes(hashPath)){
        return name;
      }
    }
  }

  load(name: string, hashPath?: string): void {
    const configItem = this.config[name];
    if (configItem.loaded){
      window.location.href = configItem.url;
      return;
    }

    const content = document.getElementById('appContainer');
    const script = document.createElement('script');
    script.src = configItem.srcPath;
    content.appendChild(script);
    
    const element: HTMLElement = document.createElement(configItem.element);
    content.appendChild(element);
    const redirectionPath = hashPath || configItem.url;
    window.location.href = redirectionPath;
    configItem.loaded = true;

    // element.setAttribute('state', 'init');

    script.onerror = () => console.error(`error loading ${configItem.srcPath}`);

    this.stateService.registerClient(element);
  }
}
