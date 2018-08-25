import { TestBed, inject } from '@angular/core/testing';

import { NgxLocaleMaskService } from './ngx-locale-mask.service';

describe('NgxLocaleMaskService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NgxLocaleMaskService]
    });
  });

  it('should be created', inject([NgxLocaleMaskService], (service: NgxLocaleMaskService) => {
    expect(service).toBeTruthy();
  }));
});
