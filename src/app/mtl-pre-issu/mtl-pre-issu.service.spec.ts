import { TestBed } from '@angular/core/testing';

import { MtlPreIssuService } from './mtl-pre-issu.service';

describe('MtlPreIssuService', () => {
  let service: MtlPreIssuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MtlPreIssuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
