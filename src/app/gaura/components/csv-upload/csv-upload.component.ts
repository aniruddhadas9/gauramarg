import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {FileUploadService} from '../../services/file-upload.service';
import {map} from 'rxjs/operators';
import {AlertService} from '@candiman/website';

@Component({
  selector: 'gm-csv-upload',
  templateUrl: './csv-upload.component.html',
  styleUrls: ['./csv-upload.component.scss']
})
export class CsvUploadComponent implements OnInit {

  @ViewChild('doorEntry', {static: true}) doorEntry: ElementRef;
  @ViewChild('orderExport', {static: true}) orderExport: ElementRef;

  doorEntryLoading: boolean;
  orderExportLoading: boolean;

  loading = false;

  csvRecords = [];

  constructor(
    private httpClient: HttpClient,
    private alertService: AlertService,
    private fileUploadService: FileUploadService,
  ) {
  }

  ngOnInit() {
  }

  public uploadDoorListFile(event) {
    this.doorEntryLoading = true;
    const reader = new FileReader();
    reader.onloadend = (e) => {
      // reader.result is a String of the uploaded file
      const arrayOfCSV = this.fileUploadService.csvToArray(reader.result);
      const allHolis = this.fileUploadService.getHoli(arrayOfCSV);
      this.postAllData(allHolis).subscribe((response) => {
        this.doorEntryLoading = false;
        this.alertService.alert({
          title: 'Door List upload success',
          subTitle: 'All the door list uploaded',
          text: 'Proceed to upload exported order',
          type: 'success'
        });
      });
      // console.log('onloadend|result:%o', this.fileUploadService.getHoli(reader.result.split(/\r|\n|\r/)));
    };
    reader.readAsText(event.target.files[0]);
    // const allTextLines = reader.result.split(/\r|\n|\r/);
  }

  /**
   * Method called when user select orderexport file in the ui
   * @params $event
   */
  uploadOrderExportFile($event): void {
    this.orderExportLoading = true;
    const target = $event.target || $event.srcElement;
    const files = target.files;

    const input = $event.target;
    const reader = new FileReader();
    reader.readAsText(input.files[0]);

    reader.onload = (data) => {
      const csvData = reader.result;
      const csvRecordsArray = this.fileUploadService.csvToArray(reader.result);
      this.postAllData(this.fileUploadService.getHoliFull(csvRecordsArray)).subscribe((response) => {
        this.orderExportLoading = false;
        this.alertService.alert({
          title: 'Exported order details upload success',
          subTitle: 'All the exported order uploaded',
          text: 'Proceed to start taking guest and check in',
          type: 'success'
        });
      });
      console.log('orderExport upload|holis:%O', this.fileUploadService.getHoliFull(csvRecordsArray));
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
  }


  postAllData(holis) {
    return this.httpClient.post(environment.restUrl + '/holi/allUpdate', holis).pipe(
      map((result) => {
        console.log('all holi record processed:%o', result);
      })
    );
  }

}
