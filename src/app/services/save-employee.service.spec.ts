import { TestBed } from '@angular/core/testing';

import { SaveEmployeeService } from './save-employee.service';

describe('SaveEmployeeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SaveEmployeeService = TestBed.get(SaveEmployeeService);
    expect(service).toBeTruthy();
  });
});
