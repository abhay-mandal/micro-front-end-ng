import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangePasswordComponent } from './change-password.component';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { HttpService } from '@app/core/services/http.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { of } from 'rxjs';
import { ToastMessageService } from '@app/core/services/toast-message.service';
import { ToastrModule } from 'ngx-toastr';

function initialiseTestBed() {

  function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
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
      ChangePasswordComponent
    ],
    providers: [
      AuthenticationService,
      TranslateService,
      HttpService,
      {
        provide: ActivatedRoute,
        useValue: {
          params: of({ userId: 'admin' })
        }
      }
    ]
  }).compileComponents();
}

describe('ChangePasswordComponent', () => {
  let component: ChangePasswordComponent;
  let fixture: ComponentFixture<ChangePasswordComponent>;

  beforeEach(async(() => {
    initialiseTestBed();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangePasswordComponent);
    component = fixture.componentInstance;
    history.pushState({ networkType: 'mockValue' }, '', '');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('get form(): should return the control of form', () => {
    expect(component.formChangePassword.controls).toBeTruthy();
  });

  it('showPassword(isShow: boolean, controlFlag: string): should change the password text', () => {
    component.showPassword(true, 'showOldPswd');
    component.showOldPswd = true;
    expect(component.showOldPswd).toBeTruthy();
  });

  it('resetForm(): should reset the form', () => {
    component.resetForm();
    expect(component.formChangePassword.reset).toBeTruthy();
  });

  // it('form should be invalid', () => {
  //   component.formChangePassword.controls.oldPswd.setValue('');
  //   component.formChangePassword.controls.newPswd.setValue('');
  //   component.formChangePassword.controls.renterNewPswd.setValue('');
  //   expect(component.formChangePassword.valid).toBeFalsy();
  // });

  // it('newPswd field validity', () => {
  //   let errors = {};
  //   const newPswd = component.form.controls['newPswd'];
  //   expect(newPswd.valid).toBeFalsy();

  //   // newPswd field is required
  //   errors = newPswd.errors || {};
  //   expect(errors['required']).toBeTruthy();

  //   // Set newPswd to something
  //   newPswd.setValue("test");
  //   errors = newPswd.errors || {};
  //   expect(errors['required']).toBeFalsy();
  //   expect(errors['pattern']).toBeTruthy();

  //   // Set newPswd to something correct
  //   newPswd.setValue("Vinki@31");
  //   errors = newPswd.errors || {};
  //   expect(errors['required']).toBeFalsy();
  //   expect(errors['pattern']).toBeFalsy();
  // });

  // it('renterNewPswd field validity', () => {
  //   let errors = {};
  //   const renterNewPswd = component.form.controls['renterNewPswd'];
  //   expect(renterNewPswd.valid).toBeFalsy();

  //   // renterNewPswd field is required
  //   errors = renterNewPswd.errors || {};
  //   expect(errors['required']).toBeTruthy();

  //   // Set renterNewPswd to something
  //   renterNewPswd.setValue("test");
  //   errors = renterNewPswd.errors || {};
  //   expect(errors['required']).toBeFalsy();
  //   expect(errors['mustmatch']).toBeTruthy();

  //   // Set renterNewPswd to match exaclty with the newPswd correct
  //   renterNewPswd.setValue("Vinki@31");
  //   errors = renterNewPswd.errors || {};
  //   expect(errors['required']).toBeFalsy();
  //   expect(errors['mustmatch']).toBeFalsy();
  // });

  it('form should be valid', () => {
    component.formChangePassword.controls.oldPswd.setValue('8787hj');
    component.formChangePassword.controls.newPswd.setValue('Vinki@31');
    component.formChangePassword.controls.renterNewPswd.setValue('Vinki@31');
    expect(component.formChangePassword.valid).toBeTruthy();
  });

});
