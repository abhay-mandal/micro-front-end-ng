import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherBankAccountComponent } from './other-bank-account.component';

describe('OtherBankAccountComponent', () => {
  let component: OtherBankAccountComponent;
  let fixture: ComponentFixture<OtherBankAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherBankAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherBankAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
