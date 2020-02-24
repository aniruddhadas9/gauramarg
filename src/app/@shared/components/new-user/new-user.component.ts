import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {User} from '../../../@restapi';

@Component({
  selector: 'gm-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  @Input() type: User.TypeEnum;
  loading: boolean;
  newUserForm: FormGroup;
  saveMessage: string;
  deleteMessage: string;

  constructor(private httpClient: HttpClient, private formBuilder: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
    if (this.type === undefined) {
      this.type = User.TypeEnum.Student;
    }
  }

  createForm() {
    this.newUserForm = this.formBuilder.group({
      email: [''],
      password: [''],
      firstName: [''],
      lastName: [''],
      type: [''],
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
