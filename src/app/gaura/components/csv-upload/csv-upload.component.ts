import {Component, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {CsvFileProcessService} from '../../../core/services/csv-file-process.service';

@Component({
  selector: 'gm-csv-upload',
  templateUrl: './csv-upload.component.html',
  styleUrls: ['./csv-upload.component.scss']
})
export class CsvUploadComponent implements OnInit {

  @ViewChild('fileImportInput') fileImportInput: any;

  csvRecords = [];

  validation = {
    tokenDelimeter: ',',
    isHeaderPresentFlag: true,
    validateHeaderAndRecordLengthFlag: true,
    valildateFileExtenstionFlag: true
  };

  constructor(
    private httpClient: HttpClient,
    private csvFileProcessService: CsvFileProcessService
  ) {
  }

  ngOnInit() {
  }

  public previewFile(event) {
    const reader = new FileReader();
    reader.onloadend = (e) => {
      // reader.result is a String of the uploaded file
      const allHolis = this.getHoli(reader.result.split(/\r|\n|\r/));
      this.postAllData(allHolis);
      console.log('onloadend|result:%o', this.getHoli(reader.result.split(/\r|\n|\r/)));
    };
    reader.readAsText(event.target.files[0]);
    const allTextLines = reader.result.split(/\r|\n|\r/);
  }

  postAllData(holis) {
    this.httpClient.post(environment.restUrl + '/holi/all', holis).subscribe((result) => {
      console.log('all holi record processed:%o', result);
    });
  }

  getHoli(holis) {
    const holi = [];
    for (let i = 1; i < holis.length; i++) {
      const data = holis[i].split(',');
      if (data[0] && data[1] && data[2]) {
        holi.push({
          'id': data[2],
          'name': data[0],
          'postcode': data[1],
          'doorcode': data[2],
          'generalAdmission': data[3],
          'comboTicket': data[4],
          'premiumParking': data[5],
        });
      }
    }
    return holi;
  }


  // METHOD CALLED WHEN CSV FILE IS IMPORTED
  fileChangeListener($event): void {

    const text = [];
    const target = $event.target || $event.srcElement;
    const files = target.files;

    if (this.csvFileProcessService.validation.validateHeaderAndRecordLengthFlag) {
      if (!this.csvFileProcessService.isCSVFile(files[0])) {
        alert('Please import valid .csv file.');
        this.fileReset();
      }
    }

    const input = $event.target;
    const reader = new FileReader();
    reader.readAsText(input.files[0]);

    reader.onload = (data) => {
      const csvData = reader.result;
      const csvRecordsArray = csvData.split(/\r\n|\n/);

      let headerLength = -1;
      if (this.validation.isHeaderPresentFlag) {
        const headersRow = this.csvFileProcessService.getHeaderArray(csvRecordsArray, this.validation.tokenDelimeter);
        headerLength = headersRow.length;
      }

      this.csvRecords = this.csvFileProcessService.getDataRecordsArrayFromCSVFile(csvRecordsArray,
        headerLength, this.validation.validateHeaderAndRecordLengthFlag, this.validation.tokenDelimeter);

      if (this.csvRecords == null) {
        // If control reached here it means csv file contains error, reset file.
        this.fileReset();
      }
    };

    reader.onerror = function () {
      alert('Unable to read ' + input.files[0]);
    };
  };

  fileReset() {
    this.fileImportInput.nativeElement.value = '';
    this.csvRecords = [];
  }

}
