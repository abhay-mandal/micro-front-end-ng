import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AuthenticationService } from './core/services/authentication.service';
import { TranslateService, TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpService } from './core/services/http.service';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


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
      RouterTestingModule
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

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    initialiseTestBed();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  // it('should render title', () => {
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement;
  //   expect(compiled.querySelector('.content span').textContent).toContain('App-login app is running!');
  // });

});

