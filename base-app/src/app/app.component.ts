import { Component } from '@angular/core';
import { ElementStateService } from './services/element-state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'base-app';
  isBaseAppRoutes: boolean = true;

  config = {
    "app-list-people": {
      loaded: false,
      path: 'app-list-people/main-es5.js',
      element: 'app-list-people'
    },
    "micro-app-login": {
      loaded: false,
      path: 'app-login/main-es5.js',
      element: 'micro-app-login'
    }
  };

  constructor(private stateService: ElementStateService,
    private router: Router
  ){  }

  ngOnInit() {
    console.log(this.router.url);
    const url: string = this.router.url;
    // if(url.includes('people')){

    // }

    this.load('app-list-people');
    this.load('micro-app-login');
  }

  load(name: string): void {
    const configItem = this.config[name];
    if (configItem.loaded) return;

    const content = document.getElementById('appContainer');

    const script = document.createElement('script');
    script.src = configItem.path;
    content.appendChild(script);
    
    const element: HTMLElement = document.createElement(configItem.element);
    content.appendChild(element);
    configItem.loaded = true;
    // element.setAttribute('state', 'init');

    script.onerror = () => console.error(`error loading ${configItem.path}`);

    this.stateService.registerClient(element);
  }
}
