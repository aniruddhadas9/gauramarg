import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormlyFieldConfig, FormlyFormOptions} from '@ngx-formly/core';
import {UserService} from '@candiman/website';
import {CourseService, PaymentService, Timestamp} from '../../../@restapi';

export interface Payment11 {
  amount?: number;
  courseId?: string;
  id?: string;
  notes?: string;
  paymentTime?: Timestamp;
  paymentTimeString?: string;
  studentId?: string;
  teacherId?: string;
}

@Component({
  selector: 'gm-add-payment-by-teacher',
  templateUrl: './add-payment-by-teacher.component.html',
  styleUrls: ['./add-payment-by-teacher.component.scss']
})
export class AddPaymentByTeacherComponent implements OnInit {

  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];

  constructor(
    private userService: UserService,
    private paymentService: PaymentService
  ) {
    this.fields = [
      {
        key: 'name',
        type: 'input',
        templateOptions: {
          label: 'Name',
          placeholder: 'Enter name',
          required: true,
        }
      },
      {
        key: 'description',
        type: 'input',
        templateOptions: {
          label: 'Description',
          placeholder: 'Enter description',
          required: true,
        }
      },
      {
        key: 'location',
        type: 'input',
        templateOptions: {
          label: 'Location',
          placeholder: 'Enter location',
          required: true,
        }
      },
      {
        key: 'price',
        type: 'input',
        templateOptions: {
          type: 'number',
          label: 'Each student courses price',
          placeholder: 'Enter per student price',
          required: true,
        }
      },
      {
        key: 'status',
        type: 'input',
        templateOptions: {
          label: 'Status',
          placeholder: 'Enter status',
          required: true,
        }
      },
      {
        key: 'teacherId',
        type: 'input',
        defaultValue: this.userService.authorizedUser.email,
        hide: true,
        templateOptions: {
          type: 'email',
          label: 'Teacher ID (Email) address',
          placeholder: 'Enter teacher email',
          required: true,
        }
      },
      /*{
        key: 'startDate',
        type: 'input',
        templateOptions: {
          label: 'Start date',
          placeholder: 'Enter start date',
          required: false,
        }
      },
      {
        key: 'endDate',
        type: 'input',
        templateOptions: {
          label: 'End Date',
          placeholder: 'Enter end date',
          required: false,
        }
      },*/

    ];
  }

  ngOnInit() {
  }


  submit(model) {
    console.log(model);
    if (this.form.valid) {
      this.paymentService.postUsingPOST4(model).subscribe( (response) => {
        console.log(response);
      });
    }
  }

}
