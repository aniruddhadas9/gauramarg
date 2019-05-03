import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {AlertService} from '@candiman/website';

@Injectable()
export class HoliService {

  constructor(private alertService: AlertService, private httpClient: HttpClient) { }

  makeEntry(result, i) {
   return this.httpClient.post(environment.restUrl + '/holi/update', result);

  }

  emailSearch(email) {
    this.httpClient
      .get(environment.restUrl + '/holi/email/' + email)
      .subscribe((response: any) => {
          return this.calculateAllCheckIns(response);
        }, (error) => {
          console.log(error);
        }
      );
  }

  nameSearch(name) {
    this.httpClient
      .get(environment.restUrl + '/holi/name/' + name)
      .subscribe((response: any) => {
        return this.calculateAllCheckIns(response);
      });
  }

  phoneSearch(phone) {
    this.httpClient
      .get(environment.restUrl + '/holi/phone/' + phone)
      .subscribe((response: any) => {
        return this.calculateAllCheckIns(response);
      });
  }

  postcodeSearch(postcode) {
    this.httpClient
      .get(environment.restUrl + '/holi/postCode/' + postcode)
      .subscribe((response: any) => {
        return this.calculateAllCheckIns(response);
      });
  }

  doorcodeSearch(doorcode) {
    this.httpClient
      .get(environment.restUrl + '/holi/doorCode/02-' + doorcode)
      .subscribe((response: any) => {
        return this.calculateAllCheckIns(response);
      });
  }

  barcodeSearch(barcode) {
    this.httpClient
      .get(environment.restUrl + '/holi/barCode/' + barcode)
      .subscribe((response: any) => {
        return this.calculateAllCheckIns(response);
      });
  }

  mobileSearch(mobile) {
    return this.httpClient
      .get(environment.restUrl + '/holi/mobile/' + mobile)
      .pipe(map((response: any) => {
        return this.calculateAllCheckIns(response);
      }));
  }


  calculateAllCheckIns(tickets) {
    return tickets.map((ticket) => {
      return this.calculateCheckIn(ticket);
    });
  }

  calculateCheckIn(ticket) {
    let entryOrColorLeft = 0;
    if (ticket.generalAdmission > 0 || ticket.comboTicket > 0) {
      entryOrColorLeft += ((ticket.generalAdmission + ticket.comboTicket) - ticket.entered);
    }
    if (ticket.comboTicket > 0) {
      entryOrColorLeft += ((ticket.comboTicket * 2) - ticket.colorTaken);
    }

    if (+ticket.premiumParking > 0) {
      entryOrColorLeft += ((+ticket.premiumParking) - ticket.parked);
    }

    ticket.entryOrColorLeft = entryOrColorLeft;

    return ticket;
  }


  calculateStatics(results) {
    const returnValue = {
      totalEntry: 0,
      entered: 0,
      totalColor: 0,
      colorTaken: 0,
      totalParking: 0,
      parked: 0,
    };
    return results.reduce((acc, result) => {
      returnValue.totalEntry += (result.generalAdmission + result.comboTicket);
      returnValue.entered += result.entered;
      returnValue.totalColor += (result.comboTicket *  2);
      returnValue.colorTaken += result.colorTaken;
      returnValue.totalParking += +result.premiumParking;
      returnValue.parked += result.parked;

      return returnValue;
    }, returnValue);
  }
}
