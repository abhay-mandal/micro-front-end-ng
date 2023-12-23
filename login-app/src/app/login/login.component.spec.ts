import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from '@app/app.component';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { HttpService } from '@app/core/services/http.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { Router } from '@angular/router';

function initialiseTestBed() {

  function HttpLoaderFactory(http: HttpClient) {
    // return new TranslateHttpLoader(http);
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
  }

  TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      }),
      RouterTestingModule,
      ReactiveFormsModule,
      ToastrModule.forRoot({ positionClass: 'toast-bottom-left' })

    ],
    declarations: [
      LoginComponent
    ],
    providers: [
      AuthenticationService,
      TranslateService,
      HttpService
    ]
  }).compileComponents();

}

fdescribe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    initialiseTestBed();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('resetForm(): should reset the form', () => {
    component.resetForm();
    expect(component.loginForm.reset).toBeTruthy();
  });

  it('get form(): should get the control of form', () => {
    expect(component.loginForm.controls).toBeTruthy();
  });

  it('showLoginPassword(isShow: boolean, controlFlag: string): should change the password text', () => {
    component.showLoginPassword(true, 'showValue');
    component.showValue = 'true';
    expect(component.showValue).toBeTruthy();
  });

  it('onLogin: should authenticate all the data using different services', () => {
    // component.showLoginPassword(true, 'showValue');
    // component.showValue = 'true';
    // expect(component.showValue).toBeTruthy();
  });

  it(`forgotUserId(): should navigate to forgot username page on click`, inject(
    [Router], (router: Router) => {
      component.forgotUserId();
      spyOn(router, 'navigate').and.stub();
      expect(router.navigate).toHaveBeenCalledWith(['app-login/forgot-username']);
    })
  );

  it(`forgotPswd(): should navigate to forgot password page on click`, inject(
    [Router], (router: Router) => {
      component.forgotPswd();
      spyOn(router, 'navigate').and.stub();
      router.navigate(['app-login/forgot-password']);
      expect(router.navigate).toHaveBeenCalledWith(['app-login/forgot-password']);
    })
  );

});
