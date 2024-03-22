import { TestBed } from '@angular/core/testing';

import { MesServicesService } from './mes-services.service';

describe('MesServicesService', () => {
  let service: MesServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MesServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
