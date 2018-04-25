import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'gm-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  loading: boolean;
  newUserForm: FormGroup;
  saveMessage: string;
  deleteMessage: string;

  constructor(private httpClient: HttpClient, private formBuilder: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.newUserForm = this.formBuilder.group({
      email: [''],
      password: [''],
      firstName: [''],
      lastName: [''],
      phone: ['']
    });
  }

  onSubmit() {
    this.loading = true;
    this.saveMessage = null;
    this.httpClient
      .post(environment.restUrl + '/user/update', this.newUserForm.value)
      .subscribe((response: any) => {
        this.saveMessage = response.message;
        this.loading = false;
      }, (error) => {
        console.log('Error in new user creation|%o', error);
        this.loading = false;
      });
  }


}
