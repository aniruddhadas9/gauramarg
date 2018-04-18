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

  @ViewChild('doorEntry') doorEntry: any;
  @ViewChild('orderExport') orderExport: any;

  csvRecords = [];
  validation = {
    tokenDelimeter: ',',
    isHeaderPresentFlag: true,
    validateHeaderAndRecordLengthFlag: false,
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

  /**
   * Method called when user select orderexport file in the ui
   * @param $event
   */
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
      console.log('orderExport upload|csvRecordsArray:%O', csvRecordsArray);
      let headerLength = -1;
      if (this.validation.isHeaderPresentFlag) {
        const headersRow = this.csvFileProcessService.getHeaderArray(csvRecordsArray, this.validation.tokenDelimeter);
        headerLength = headersRow.length;
      }

      this.csvRecords = this.csvFileProcessService.getDataRecordsArrayFromCSVFile(csvRecordsArray,
        headerLength, this.validation.validateHeaderAndRecordLengthFlag, this.validation.tokenDelimeter);

      this.postAllData(this.getHoliFull(this.csvRecords));
      console.log('orderExport upload|holis:%O', this.csvRecords);
      if (this.csvRecords == null) {
        // If control reached here it means csv file contains error, reset file.
        this.fileReset();
      }
    };

    reader.onerror = function () {
      alert('Unable to read ' + input.files[0]);
    };
  }

  fileReset() {
    this.doorEntry.nativeElement.value = '';
    this.orderExport.nativeElement.value = '';
    this.csvRecords = [];
  }


  postAllData(holis) {
    this.httpClient.post(environment.restUrl + '/holi/allUpdate', holis).subscribe((result) => {
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
          'postCode': data[1],
          'doorCode': data[2],
          'generalAdmission': data[3],
          'comboTicket': data[4],
          'premiumParking': data[5],
        });
      }
    }
    return holi;
  }

  getHoliFull(holis) {
    const format = {
      '0': 'Name',
      '1': 'Email',
      '2': 'Mobile number',
      '3': 'Address 1',
      '4': 'Address 2',
      '5': 'Address 3',
      '6': 'Postcode',
      '7': 'Entry code',
      '8': 'Barcode',
      '9': 'Tickets purchased',
      '10': 'Currency',
      '11': 'Total paid',
      '12': 'Order date',
      '13': 'Payment method',
      '14': 'Transaction Id',
      '15': 'Event date',
      '16': 'Event name',
      '17': 'Referral Tag',
    };
    const holi = [];
    for (let i = 1; i < holis.length; i++) {
      const data = holis[i];
      if (data[0] && data[6] && data[7]) {
        holi.push({
          'id': data[7],
          'name': data[0],
          'email': data[1],
          'phone': data[2],
          'postCode': data[6],
          'doorCode': data[7],
          'address': data[3],
          'city': data[4],
          'state': data[5],
          'barCode': data[8],
          'ticketsPurchased': data[9],
          'paid': data[11],
        });
      }
    }
    return holi;


  }

}
