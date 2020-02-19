import { TestBed } from '@angular/core/testing';

import { DecisionService } from './decision.service';

describe('DecisionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DecisionService = TestBed.get(DecisionService);
    expect(service).toBeTruthy();
  });
});
