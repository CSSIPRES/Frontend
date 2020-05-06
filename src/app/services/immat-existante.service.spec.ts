import { TestBed } from '@angular/core/testing';

import { ImmatExistanteService } from './immat-existante.service';

describe('ImmatExistanteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ImmatExistanteService = TestBed.get(ImmatExistanteService);
    expect(service).toBeTruthy();
  });
});
