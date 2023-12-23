import { BrowserModule } from '@angular/platform-browser';
import { NgModule, DoBootstrap, Injector, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { createCustomElement } from '@angular/elements';
import { AppComponent } from './app.component';
import { Router } from '@angular/router';
import { ElementZoneStrategyFactory } from 'elements-zone-strategy';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { FundTransferComponent } from '@app/components/transfers/fund-transfer/fund-transfer.component';
import { TransferNewPayeeComponent } from '@app/components/transfers/add-payee/add-payee.component';
import { OtherBankAccountComponent } from './components/transfers/other-bank-account/other-bank-account.component';
import { NeftTransferComponent } from './components/transfers/neft-transfer/neft-transfer.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpInterceptorProviders } from '@app/core/interceptors';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DynamicFormComponent } from './components/shared/dynamic-form/dynamic-form.component';
import { LoaderComponent } from './components/shared/loader/loader.component';
import { TabinationComponent } from './components/tabination/tabination.component';
import { AngularFireModule } from '@angular/fire';
// import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { AngularFireRemoteConfigModule } from '@angular/fire/remote-config';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';


// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    FundTransferComponent,
    TransferNewPayeeComponent,
    OtherBankAccountComponent,
    NeftTransferComponent,
    DynamicFormComponent,
    LoaderComponent,
    TabinationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ReactiveFormsModule,
    ToastrModule.forRoot({ positionClass: 'toast-bottom-left' }),


    AngularFireModule.initializeApp(environment.firebase),
    // AngularFirestoreModule,
    AngularFireRemoteConfigModule

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    HttpInterceptorProviders,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  // bootstrap: [AppComponent],
  entryComponents: [
    AppComponent
  ]
})

export class AppModule implements DoBootstrap {
  constructor(
    private injector: Injector,
    private router: Router
  ) { }

  ngDoBootstrap() {
    const strategyFactory = new ElementZoneStrategyFactory(AppComponent, this.injector);
    const el = createCustomElement(AppComponent, { injector: this.injector, strategyFactory });
    // const el = createCustomElement(PeopleComponent, { injector: this.injector, strategyFactory });
    customElements.define('micro-app-dashboard', el);
    this.router.initialNavigation();
  }
}
