import {inject, TestBed} from '@angular/core/testing';

import {HoliService} from './holi.service';

describe('HoliService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HoliService]
    });
  });

  it('should be created', inject([HoliService], (service: HoliService) => {
    expect(service).toBeTruthy();
  }));
});
