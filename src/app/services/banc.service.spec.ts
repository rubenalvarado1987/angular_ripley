import { TestBed } from '@angular/core/testing';

import { BancService } from './banc.service';

describe('BancService', () => {
  let service: BancService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BancService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
