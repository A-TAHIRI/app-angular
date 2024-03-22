import { TestBed } from '@angular/core/testing';

import { MvtstkService } from './mvtstk.service';

describe('MvtstkService', () => {
  let service: MvtstkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MvtstkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
