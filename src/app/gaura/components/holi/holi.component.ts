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

  emailSearch() {
    this.httpClient
      .get(environment.restUrl + '/holi/email/' + this.email)
      .subscribe((response: any) => {
        console.log('doorcode result:%o', response);
        this.results = response;
        return response;
      });
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
      .get(environment.restUrl + '/holi/postcode/' + this.postcode)
      .subscribe((response: any) => {
        console.log('doorcode result:%o', response);
        this.results = response;
        return response;
      });
  }

  doorcodeSearch() {
    this.httpClient
      .get(environment.restUrl + '/holi/doorcode/02-' + this.doorcode)
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

}
