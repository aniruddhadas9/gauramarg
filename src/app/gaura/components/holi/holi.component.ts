import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {AlertService} from '../../../core/services/alert.service';
import {HoliService} from '../../services/holi.service';

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
  barcode: string;
  mobile: string;

  constructor(
    private holiService: HoliService,
    private alertService: AlertService,
    private httpClient: HttpClient
  ) {
  }

  ngOnInit() {
  }

  makeEntry(result, i) {
    this.results[i].loading = true;
    console.log(result);
    this.httpClient
      .post(environment.restUrl + '/holi/update', result)
      .subscribe((response: any) => {
          this.alertService.alert({
            title: 'Check in success!',
            subTitle: 'Guest can enter to the event now.',
            text: response,
            type: 'success'
          });
          this.results[i] = this.holiService.calculateCheckIn(this.results[i]);
          this.results[i].message = response.message;
          this.results[i].loading = false;
        }, (error) => {
          this.alertService.alert({
            title: 'Unable to check in!',
            subTitle: 'Please try again or contact support team.',
            text: error,
            type: 'danger'
          });
          this.loading = false;
        }
      );
  }

  emailSearch() {
    this.httpClient
      .get(environment.restUrl + '/holi/email/' + this.email)
      .subscribe((response: any) => {
          this.results = this.holiService.calculateAllCheckIns(response);
        }, (error) => {
          console.log(error);
        }
      );
  }

  nameSearch() {
    this.httpClient
      .get(environment.restUrl + '/holi/name/' + this.name)
      .subscribe((response: any) => {
        this.results = this.holiService.calculateAllCheckIns(response);
      });
  }

  phoneSearch() {
    this.httpClient
      .get(environment.restUrl + '/holi/phone/' + this.phone)
      .subscribe((response: any) => {
        this.results = this.holiService.calculateAllCheckIns(response);
      });
  }

  postcodeSearch() {
    this.httpClient
      .get(environment.restUrl + '/holi/postCode/' + this.postcode)
      .subscribe((response: any) => {
        this.results = this.holiService.calculateAllCheckIns(response);
      });
  }

  doorcodeSearch() {
    this.httpClient
      .get(environment.restUrl + '/holi/doorCode/02-' + this.doorcode)
      .subscribe((response: any) => {
        this.results = this.holiService.calculateAllCheckIns(response);
      });
  }

  barcodeSearch() {
    this.httpClient
      .get(environment.restUrl + '/holi/barCode/' + this.barcode)
      .subscribe((response: any) => {
        this.results = this.holiService.calculateAllCheckIns(response);
      });
  }

  mobileSearch() {
    this.httpClient
      .get(environment.restUrl + '/holi/mobile/' + this.mobile)
      .subscribe((response: any) => {
        this.results = this.holiService.calculateAllCheckIns(response);
      });
  }

}
