import { TestBed } from '@angular/core/testing';

import { DeclarationService } from './declaration.service';

describe('DeclarationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeclarationService = TestBed.get(DeclarationService);
    expect(service).toBeTruthy();
  });
});
