import { TestBed } from '@angular/core/testing';

import { ElementStateService } from './element-state.service';

describe('ElementStateService', () => {
  let service: ElementStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ElementStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
