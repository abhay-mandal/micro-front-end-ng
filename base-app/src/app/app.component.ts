import { Component } from '@angular/core';
import { ElementStateService } from './services/element-state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'base-app';

  config = {
    "app-list-people": {
      loaded: false,
      path: 'app-list-people/main-es5.js',
      element: 'app-list-people'
    },
    "app-login": {
      loaded: false,
      path: 'app-login/main-es5.js',
      element: 'app-login'
    }
  };

  constructor(private stateService: ElementStateService){  }

  ngOnInit() {
    this.load('app-list-people');
    // this.load('app-login');
  }

  load(name: string): void {
    const configItem = this.config[name];
    if (configItem.loaded) return;

    const content = document.getElementById('container');

    const script = document.createElement('script');
    script.src = configItem.path;
    content.appendChild(script);
    
    const element: HTMLElement = document.createElement(configItem.element);
    content.appendChild(element);
    element.setAttribute('state', 'init');

    script.onerror = () => console.error(`error loading ${configItem.path}`);

    this.stateService.registerClient(element);
  }
}
