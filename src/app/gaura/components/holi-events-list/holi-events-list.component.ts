import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'gm-holi-events-list',
  templateUrl: './holi-events-list.component.html',
  styleUrls: ['./holi-events-list.component.scss']
})
export class HoliEventsListComponent implements OnInit {

  results = [];
  searchText;
  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.getAllHoliEvent();
  }

  getAllHoliEvent() {
    return this.httpClient
      .get(environment.restUrl + '/holi')
      .subscribe((response: any) => {
        this.results = response;
      });
  }

}
