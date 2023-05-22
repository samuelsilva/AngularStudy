import { TestBed } from '@angular/core/testing';

import { ValoresMensaisService } from './valores-mensais.service';

describe('ValoresMensaisService', () => {
  let service: ValoresMensaisService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValoresMensaisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
