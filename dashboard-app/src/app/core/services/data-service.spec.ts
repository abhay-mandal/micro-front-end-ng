import { TestBed } from '@angular/core/testing';

import { NewPayeeService } from './data-service';

describe('NewPayeeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NewPayeeService = TestBed.get(NewPayeeService);
    expect(service).toBeTruthy();
  });
});
