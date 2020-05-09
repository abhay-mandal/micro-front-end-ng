import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JeffBejosComponent } from './jeff-bejos.component';

describe('JeffBejosComponent', () => {
  let component: JeffBejosComponent;
  let fixture: ComponentFixture<JeffBejosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JeffBejosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JeffBejosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
