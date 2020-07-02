import { TestBed } from '@angular/core/testing';

import { DemandesServiceService } from './demandes-service.service';

describe('DemandesServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DemandesServiceService = TestBed.get(DemandesServiceService);
    expect(service).toBeTruthy();
  });
});
