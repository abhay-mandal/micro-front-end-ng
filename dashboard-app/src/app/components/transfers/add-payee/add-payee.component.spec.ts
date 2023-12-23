import { async, ComponentFixture, inject, TestBed, getTestBed, } from '@angular/core/testing';
import { TransferNewPayeeComponent } from './add-payee.component';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { HttpService } from '@app/core/services/http.service';
import { NewPayeeService } from '@app/core/services/data-service';
import { DynamicFormComponent } from '@app/components/shared/dynamic-form/dynamic-form.component';
import { of } from 'rxjs';
import { AppConstants } from '@app/app.constants';
import { Router } from '@angular/router';
import { fakeAsync } from '@angular/core/testing';

function initialiseTestBed(routerSpy) {
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
      ReactiveFormsModule
    ],
    declarations: [
      TransferNewPayeeComponent,
      DynamicFormComponent
    ],
    providers: [
      AuthenticationService,
      TranslateService,
      HttpService,
      NewPayeeService,
      { provide: Router, useValue: routerSpy }
    ]
  }).compileComponents();

}

fdescribe('TransferNewPayeeComponent', () => {
  let component: TransferNewPayeeComponent;
  let fixture: ComponentFixture<TransferNewPayeeComponent>;
  let injector: TestBed;
  let httpService: HttpService;
  const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);

  beforeEach(async(() => {
    initialiseTestBed(routerSpy);

    injector = getTestBed();
    httpService = injector.inject(HttpService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferNewPayeeComponent);
    component = fixture.componentInstance;
    history.pushState({ networkType: 'mockValue' }, '', '');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call addPayeeAPI() and after API success Router.navigateByUrl("FUND_TRANSFER")', inject([Router], (router: Router) => {
    const payeeDetails = {
      networkType: 'networkType',
      network: 'network',
      payeeName: 'payeeName',
      nickName: 'nickName',
      payeeAccountNumber: 'accountNumber',
      payeeAccountType: 'accountType',
      payeeBankCode: 'bankCode',
    };
    const payeeResponse = {
      status: 'SUCCESS'
    };
    spyOn(httpService, 'post').and.returnValue(of(payeeResponse));
    component.addPayeeAPI(payeeDetails);
    mockFundTransfer();
  }));

  // it('getFlowsApi(), should return an  error, if server returns an error', () => {
  //   spyOn(service, 'get').and.returnValue(throwError(TestConstant.ERROR));
  //   component.getFlowsApi();
  //   expect(component.error).toBeDefined();
  //   expect(component.error).toEqual(TestConstant.ERROR);
  // });

  it('navigates to home when link is clicked', fakeAsync(() => {
    mockFundTransfer();
  }));

  function mockFundTransfer() {
    const expectedPath = `${AppConstants.APP_URLS.MAIN_URL}/${AppConstants.APP_URLS.SUB_URLS.FUND_TRANSFER}`;
    component.navigateToFundTransfer();
    const [actualPath] = routerSpy.navigateByUrl.calls.first().args;
    expect(actualPath).toBe(expectedPath);
  }

});
