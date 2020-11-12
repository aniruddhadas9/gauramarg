import {Component, OnInit} from '@angular/core';
import {FormlyFieldConfig, FormlyFormOptions} from '@ngx-formly/core';
import {FormGroup} from '@angular/forms';
import {CourseService, Timestamp} from '../../../@restapi';
import {UserService} from '@candiman/website';

@Component({
  selector: 'gm-register-course',
  templateUrl: './register-course.component.html',
  styleUrls: ['./register-course.component.scss']
})
export class RegisterCourseComponent implements OnInit {

  form = new FormGroup({});
  model: any = {};
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[];

  constructor(
    private userService: UserService,
    private courseService: CourseService
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
      this.courseService.postUsingPOST1(model).subscribe( (response) => {
        console.log(response);
      });
    }
  }



}
