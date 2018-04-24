import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'gm-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  results = [];
  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.httpClient.get(environment.restUrl + '/user').subscribe((response: any) => {
      this.results = response;
    });
  }

}
