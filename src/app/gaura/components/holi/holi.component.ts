import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'gm-holi',
  templateUrl: './holi.component.html',
  styleUrls: ['./holi.component.scss']
})
export class HoliComponent implements OnInit {

  public loading: boolean;
  results = [];
  entered: number;

  email: string;
  name: string;
  phone: string;
  postcode: string;
  doorcode: string;
  mobile: string;

  constructor(
    private httpClient: HttpClient
  ) {
  }

  ngOnInit() {
  }

  makeEntry(result, i) {
    this.loading = true;
    console.log(result);
    this.httpClient
      .post(environment.restUrl + '/holi/update', result)
      .subscribe((response: any) => {
          console.log('entered:%o', response);
          this.results[i] = response;
          this.loading = false;
        }, (error) => {
          console.log(error);
        }
      );
  }

  emailSearch() {
    this.httpClient
      .get(environment.restUrl + '/holi/email/' + this.email)
      .subscribe((response: any) => {
          console.log('doorcode result:%o', response);
          this.results = response;
          return response;
        }, (error) => {
          console.log(error);
        }
      );
  }

  nameSearch() {
    this.httpClient
      .get(environment.restUrl + '/holi/name/' + this.name)
      .subscribe((response: any) => {
        console.log('doorcode result:%o', response);
        this.results = response;
        return response;
      });
  }

  phoneSearch() {
    this.httpClient
      .get(environment.restUrl + '/holi/phone/' + this.phone)
      .subscribe((response: any) => {
        console.log('doorcode result:%o', response);
        this.results = response;
        return response;
      });
  }

  postcodeSearch() {
    this.httpClient
      .get(environment.restUrl + '/holi/postCode/' + this.postcode)
      .subscribe((response: any) => {
        console.log('doorcode result:%o', response);
        this.results = response;
        return response;
      });
  }

  doorcodeSearch() {
    this.httpClient
      .get(environment.restUrl + '/holi/doorCode/02-' + this.doorcode)
      .subscribe((response: any) => {
        console.log('doorcode result:%o', response);
        this.results = response;
        return response;
      });
  }

  mobileSearch() {
    this.httpClient
      .get(environment.restUrl + '/holi/mobile/' + this.mobile)
      .subscribe((response: any) => {
        console.log('doorcode result:%o', response);
        this.results = response;
        return response;
      });
  }

  calcilateCheckIn(ticket): boolean {

    // if there is not color or entry bought. this case is only for parking users
    if(ticket.generalAdmission < 0 && ticket.comboTicket < 0 ) return false;

    // all entry happen
    if( ((ticket.generalAdmission - ticket.entered) <= 0 ) && (ticket.comboTicket - ticket.colorTaken) <= 0 ) return false;

    //
  }

}
