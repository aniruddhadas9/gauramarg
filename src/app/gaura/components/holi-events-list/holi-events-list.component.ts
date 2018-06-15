import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {AlertService} from '../../../core/services/alert.service';
import {HoliService} from '../../services/holi.service';

@Component({
  selector: 'gm-holi-events-list',
  templateUrl: './holi-events-list.component.html',
  styleUrls: ['./holi-events-list.component.scss']
})
export class HoliEventsListComponent implements OnInit {

  results = [];
  static: any;
  searchText;
  constructor(
    private holiService: HoliService,
    private alertService: AlertService,
    private httpClient: HttpClient) { }

  ngOnInit() {
    this.getAllHoliEvent();
  }

  getAllHoliEvent() {
    return this.httpClient
      .get(environment.restUrl + '/holi')
      .subscribe((response: any) => {
        this.results = this.holiService.calculateAllCheckIns(response);
      });
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
        }
      );
  }

}
