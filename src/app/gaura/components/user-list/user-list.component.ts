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
  loading: boolean;
  deleteMessage: string;
  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.getAllUser();
  }

  getAllUser() {
    this.httpClient.get(environment.restUrl + '/user').subscribe((response: any) => {
      this.results = response;
    });
  }

  updateUser(user, index) {
    this.deleteMessage = null;
    this.httpClient
      .post(environment.restUrl + '/user', user)
      .subscribe((response: any) => {
        this.results.splice(index, 1);
        this.deleteMessage = response.message;
        this.loading = false;
      }, (error) => {
        console.log('Error in new user creation|%o', error);
        this.loading = false;
      });
  }

  deleteUser(email, index) {
    this.deleteMessage = null;
    this.httpClient
      .post(environment.restUrl + '/user/delete', email)
      .subscribe((response: any) => {
        this.results.splice(index, 1);
        this.deleteMessage = response.message;
        this.loading = false;
      }, (error) => {
        console.log('Error in new user creation|%o', error);
        this.loading = false;
      });
  }

}
