import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {CsvFileProcessService} from '../../../core/services/csv-file-process.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FileUploadService} from '../../../services/file-upload.service';
import {FileUploader} from 'ng2-file-upload';

@Component({
  selector: 'gm-csv-upload',
  templateUrl: './csv-upload.component.html',
  styleUrls: ['./csv-upload.component.scss']
})
export class CsvUploadComponent implements OnInit {

  @ViewChild('doorEntry') doorEntry: ElementRef;
  @ViewChild('orderExport') orderExport: ElementRef;
  @ViewChild('fileInput') fileInput: ElementRef;

  doorEntryLoading: boolean;
  orderExportLoading: boolean;

  form: FormGroup;
  loading: boolean = false;
  uploader:FileUploader = new FileUploader({url: environment.restUrl+'/file'});

  csvRecords = [];
  validation = {
    tokenDelimeter: ',',
    isHeaderPresentFlag: true,
    validateHeaderAndRecordLengthFlag: false,
    valildateFileExtenstionFlag: true
  };

  constructor(
    private httpClient: HttpClient,
    private csvFileProcessService: CsvFileProcessService,
    private fileUploadService: FileUploadService,
    private formBuilder: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit() {
  }

  public previewFile(event) {
    this.doorEntryLoading = true;
    const reader = new FileReader();
    reader.onloadend = (e) => {
      // reader.result is a String of the uploaded file
      const allHolis = this.fileUploadService.getHoli(reader.result.split(/\r|\n|\r/));
      this.postAllData(allHolis).subscribe((response) => {
        this.doorEntryLoading = false;
      });
      console.log('onloadend|result:%o', this.fileUploadService.getHoli(reader.result.split(/\r|\n|\r/)));
    };
    reader.readAsText(event.target.files[0]);
    const allTextLines = reader.result.split(/\r|\n|\r/);
  }

  /**
   * Method called when user select orderexport file in the ui
   * @param $event
   */
  fileChangeListener($event): void {
    this.orderExportLoading = true;
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

      this.postAllData(this.fileUploadService.getHoliFull(this.csvRecords)).subscribe((response) =>{
        this.orderExportLoading = false;
      });
      console.log('orderExport upload|holis:%O', this.fileUploadService.getHoliFull(this.csvRecords));
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
    return this.httpClient.post(environment.restUrl + '/holi/allUpdate', holis).map((result) => {
      console.log('all holi record processed:%o', result);
    });
  }


  createForm() {
    this.form = this.formBuilder.group({
      name: [''],
      avatar: null
    });
  }

  onFileChange(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {

        const formData: FormData = new FormData();
        formData.append('0', file, file.name);
        this.httpClient
          .post(environment.restUrl+'/file/upload', formData)
          .subscribe((response)=>{
            console.log('file upload success|%o', response);
            this.loading = false;
          }, (error) => {
            console.log('Error in uploading file|%o', error);
            this.loading = false;
          });


        this.form.get('avatar').setValue({
          filename: file.name,
          filetype: file.type,
          data: reader.result.split(',')[1]
        })
      };
    }
  }

  onSubmit() {
    const formModel = this.form.value;
    this.loading = true;
    // In a real-world app you'd have a http request / service call here like
    // this.http.post('apiUrl', formModel)
    this.httpClient
      .post(environment.restUrl+'/file', formModel)
      .subscribe((response)=>{
      console.log('file upload success|%o', response);
      this.loading = false;
      console.log(formModel);
    }, (error) => {
      console.log('Error in uploading file|%o', error);
      this.loading = false;
      console.log(formModel);
    });
  }

  clearFile() {
    this.form.get('avatar').setValue(null);
    this.fileInput.nativeElement.value = '';
  }

}
