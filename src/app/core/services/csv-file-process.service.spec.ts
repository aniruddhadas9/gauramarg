import { TestBed, inject } from '@angular/core/testing';

import { CsvFileProcessService } from './csv-file-process.service';

describe('CsvFileProcessService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CsvFileProcessService]
    });
  });

  it('should be created', inject([CsvFileProcessService], (service: CsvFileProcessService) => {
    expect(service).toBeTruthy();
  }));
});
