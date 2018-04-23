import {Injectable} from '@angular/core';

@Injectable()
export class FileUploadService {

  constructor() {
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
