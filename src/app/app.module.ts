import { BrowserModule } from '@angular/platform-browser';
import { NgModule, DoBootstrap, Injector } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { createCustomElement } from '@angular/elements';
import { AppComponent } from './app.component';
import { JeffBejosComponent } from './component/jeff-bejos/jeff-bejos.component';
import { PeopleComponent } from './component/people/people.component';
import { APP_BASE_HREF } from '@angular/common';
import { Router } from '@angular/router';

import { Location } from '@angular/common';
import { ElementZoneStrategyFactory } from 'elements-zone-strategy';

@NgModule({
  declarations: [
    AppComponent,
    JeffBejosComponent,
    PeopleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  // providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
  providers: [],
  // bootstrap: [AppComponent]
  entryComponents: [
    AppComponent,
    PeopleComponent
  ]
})

export class AppModule implements DoBootstrap {
  constructor(private injector: Injector,
    private router: Router,
    private location: Location
  ) {}

  ngDoBootstrap() {
    //init router with starting path
    this.router.navigateByUrl(this.location.path(true));
    //on every route change tell router to navigate to defined route
    this.location.subscribe(data => {
      this.router.navigateByUrl(data.url);
    });

    const strategyFactory = new ElementZoneStrategyFactory(AppComponent, this.injector);
    const el = createCustomElement(AppComponent, { injector: this.injector });
    // const el = createCustomElement(PeopleComponent, { injector: this.injector, strategyFactory });
    customElements.define('app-list-people', el);
    // customElements.get('app-list-people') || customElements.define('app-list-people', el);
    // this.router.initialNavigation();
  }
}
