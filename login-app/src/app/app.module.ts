import { BrowserModule } from '@angular/platform-browser';
import { NgModule, DoBootstrap, Injector, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from '@app/login/login.component';
import { RegisterComponent } from '@app/register/register.component';
import { CommonModule } from '@angular/common';
import { ForgotUserNameComponent } from '@app/forgot-user-name/forgot-user-name.component';
import { ForgotPasswordComponent } from '@app/forgot-password/forgot-password.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { createCustomElement } from '@angular/elements';
import { ElementZoneStrategyFactory } from 'elements-zone-strategy';
import { HttpInterceptorProviders } from '@app/core/interceptors';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HeaderComponent } from '@app/common-components/header/header.component';
import { SharedComponent } from '@app/common-components/shared/shared.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { OpenNewAccountComponent } from './open-new-account/open-new-account.component';
import { LoaderComponent } from './loader/loader.component';
import { PasswordStrengthBarComponent } from './common-components/password-strength-bar/password-strength-bar.component';
import { ShowPasswordComponent } from './common-components/show-password/show-password.component';
import { DisableRightClickDirective } from './core/directives/disable-right-click.directive';
import { DisableCopyPasteDirective } from './core/directives/disable-copy-paste.directive';


// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ForgotUserNameComponent,
    ForgotPasswordComponent,
    SharedComponent,
    HeaderComponent,
    ChangePasswordComponent,
    OpenNewAccountComponent,
    LoaderComponent,
    PasswordStrengthBarComponent,
    ShowPasswordComponent,
    DisableRightClickDirective,
    DisableCopyPasteDirective
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    NgbModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({ positionClass: 'toast-bottom-left'})
  ],
  providers: [
    HttpInterceptorProviders
  ],
  // bootstrap: [AppComponent],
  entryComponents: [
    AppComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class AppModule implements DoBootstrap {
  constructor(
    private injector: Injector,
    private router: Router) { }

  ngDoBootstrap() {
    const strategyFactory = new ElementZoneStrategyFactory(AppComponent, this.injector);
    const el = createCustomElement(AppComponent, { injector: this.injector, strategyFactory });
    // const el = createCustomElement(AppComponent, { injector: this.injector });
    customElements.define('micro-app-login', el);
    this.router.initialNavigation();
  }
}
