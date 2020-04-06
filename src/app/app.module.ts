import { BrowserModule } from '@angular/platform-browser';
import { NgModule, DoBootstrap, Injector } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { createCustomElement } from '@angular/elements';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  // bootstrap: [AppComponent]
})
export class AppModule implements DoBootstrap {
  constructor(private injector: Injector){
    
  }

  ngDoBootstrap(){
      const el = createCustomElement(AppComponent, {injector: this.injector});
      customElements.define('app-list-people', el);
  }
 }
