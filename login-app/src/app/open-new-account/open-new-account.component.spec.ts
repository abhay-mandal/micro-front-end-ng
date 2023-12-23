import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenNewAccountComponent } from './open-new-account.component';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from '@app/app.component';
import { AuthenticationService } from '@app/core/services/authentication.service';
import { HttpService } from '@app/core/services/http.service';
import { ReactiveFormsModule } from '@angular/forms';

function initialiseTestBed() {
  function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
    // return new TranslateHttpLoader(http, './assets/i18n/', '.json');
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
      AppComponent
    ],
    providers: [
      AuthenticationService,
      TranslateService,
      HttpService
    ]
  }).compileComponents();
}

describe('OpenNewAccountComponent', () => {
  let component: OpenNewAccountComponent;
  let fixture: ComponentFixture<OpenNewAccountComponent>;

  beforeEach(async(() => {
    initialiseTestBed();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OpenNewAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
