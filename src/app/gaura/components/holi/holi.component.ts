import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {AlertService} from '../../../core/services/alert.service';
import {tick} from '@angular/core/testing';

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
          console.log('doorcode result:%o', response);
          this.results = response;

          return this.calculateAllCheckIns(response);
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
        return this.calculateAllCheckIns(response);
      });
  }

  phoneSearch() {
    this.httpClient
      .get(environment.restUrl + '/holi/phone/' + this.phone)
      .subscribe((response: any) => {
        console.log('doorcode result:%o', response);
        this.results = response;
        return this.calculateAllCheckIns(response);
      });
  }

  postcodeSearch() {
    this.httpClient
      .get(environment.restUrl + '/holi/postCode/' + this.postcode)
      .subscribe((response: any) => {
        console.log('doorcode result:%o', response);
        this.results = response;
        return this.calculateAllCheckIns(response);
      });
  }

  doorcodeSearch() {
    this.httpClient
      .get(environment.restUrl + '/holi/doorCode/02-' + this.doorcode)
      .subscribe((response: any) => {
        console.log('doorcode result:%o', response);
        this.results = response;
        return this.calculateAllCheckIns(response);
      });
  }

  barcodeSearch() {
    this.httpClient
      .get(environment.restUrl + '/holi/barCode/' + this.barcode)
      .subscribe((response: any) => {
        console.log('barcode result:%o', response);
        this.results = response;
        return this.calculateAllCheckIns(response);
      });
  }

  mobileSearch() {
    this.httpClient
      .get(environment.restUrl + '/holi/mobile/' + this.mobile)
      .subscribe((response: any) => {
        console.log('doorcode result:%o', response);
        this.results = response;
        return this.calculateAllCheckIns(response);
      });
  }

  calculateAllCheckIns(tickets) {
    return tickets.map((ticket) => {
      return this.calculateCheckIn(ticket)
    });
  }

  /**
   * old calculation
   * !((((result.generalAdmission + result.comboTicket) - result.entered) <= 0)
   * && (result.comboTicket > 0  && (result.colorTaken >= (result.comboTicket * 2))))
   * @param ticket
   * @returns {boolean}
   */
  calculateCheckIn(ticket): boolean {

    let entryOrColorLeft = 0;
    // if there is not color or entry bought. this case is only for parking users
    if (ticket.generalAdmission < 0 && ticket.comboTicket < 0) {
      return false;
    } else {
      if (ticket.generalAdmission > 0) {
        entryOrColorLeft += (ticket.generalAdmission - ticket.entered);
      }
      if (ticket.comboTicket > 0) {
        entryOrColorLeft += ((ticket.comboTicket * 2) - ticket.colorTaken);
      }
    }
    ticket.entryOrColorLeft = entryOrColorLeft;

    return ticket;
  }

}
