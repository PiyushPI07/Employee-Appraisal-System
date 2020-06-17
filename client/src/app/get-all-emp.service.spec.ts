import { TestBed } from '@angular/core/testing';

import { GetAllEmpService } from './get-all-emp.service';

describe('GetAllEmpService', () => {
  let service: GetAllEmpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAllEmpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
