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

  constructor(private httpClient: HttpClient, private formBuilder: FormBuilder) {
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
    const formModel = this.newUserForm.value;
    this.loading = true;
    // In a real-world app you'd have a http request / service call here like
    // this.http.post('apiUrl', formModel)
    this.httpClient
      .post(environment.restUrl + '/user', formModel)
      .subscribe((response) => {
        console.log('new user create success|%o', response);
        this.loading = false;
        console.log(formModel);
      }, (error) => {
        console.log('Error in new user creation|%o', error);
        this.loading = false;
        console.log(formModel);
      });
  }


}
