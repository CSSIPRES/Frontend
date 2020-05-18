import { TestBed } from '@angular/core/testing';

import { EmployeExistService } from './employe-exist.service';

describe('EmployeExistService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmployeExistService = TestBed.get(EmployeExistService);
    expect(service).toBeTruthy();
  });
});
