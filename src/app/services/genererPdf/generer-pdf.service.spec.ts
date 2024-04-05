import { TestBed } from '@angular/core/testing';

import { GenererPdfService } from './generer-pdf.service';

describe('GenererPdfService', () => {
  let service: GenererPdfService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenererPdfService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
