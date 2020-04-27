import { TestBed } from '@angular/core/testing';

import { CreationCompteService } from './creation-compte.service';

describe('CreationCompteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CreationCompteService = TestBed.get(CreationCompteService);
    expect(service).toBeTruthy();
  });
});
