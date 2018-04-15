import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'gm-csv-upload',
  templateUrl: './csv-upload.component.html',
  styleUrls: ['./csv-upload.component.scss']
})
export class CsvUploadComponent implements OnInit {

  constructor(
    private httpClient: HttpClient
  ) { }

  ngOnInit() {
  }

  public previewFile(event) {
    const reader = new FileReader();
    reader.onloadend = (e) => {
      //reader.result is a String of the uploaded file
      const allHolis = this.getHoli(reader.result.split(/\r|\n|\r/));
      this.postAllData(allHolis);
      console.log('onloadend|result:%o', this.getHoli(reader.result.split(/\r|\n|\r/)));
    };
    reader.readAsText(event.target.files[0]);
    let allTextLines = reader.result.split(/\r|\n|\r/);
  }

  postAllData(holis) {
    this.httpClient.post(environment.restUrl + '/holi/all', holis).subscribe((result) => {
      console.log('all holi record processed:%o', result);
    })
  }

  getHoli(holis) {
    const holi = [];
    for (let i = 1; i < holis.length; i++) {
      let data = holis[i].split(',');
      if(data[0] && data[1] && data[2]) {
        holi.push({
          'id': data[2],
          'name': data[0],
          'postcode': data[1],
          'doorcode': data[2],
          'generalAdmission': data[3],
          'comboTicket': data[4],
          'premiumParking': data[5],
        })
      }
    }
    return holi;
  }

}
