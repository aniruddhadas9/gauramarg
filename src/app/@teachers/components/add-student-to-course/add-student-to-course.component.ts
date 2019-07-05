import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormlyFieldConfig} from '@ngx-formly/core';
import {UserService} from '@candiman/website';
import {CourseRegistrationService} from '../../../@restapi';

@Component({
  selector: 'gm-add-student-to-course',
  templateUrl: './add-student-to-course.component.html',
  styleUrls: ['./add-student-to-course.component.scss']
})
export class AddStudentToCourseComponent implements OnInit {

  form = new FormGroup({});
  model = {};
  fields: FormlyFieldConfig[] = [
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
      key: 'name',
      type: 'input',
      templateOptions: {
        label: 'Name',
        placeholder: 'Enter name',
        required: true,
      }
    },
    {
      key: 'price',
      type: 'input',
      templateOptions: {
        label: 'Each student courses proce',
        placeholder: 'Enter per student courses price',
        required: true,
      }
    },
    {
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
      templateOptions: {
        label: 'Teacher ID (Email) address',
        placeholder: 'Enter teacher email',
        required: true,
      }
    },
  ];

  constructor(
    private userService: UserService,
    private courseRegistrationService: CourseRegistrationService
  ) { }

  ngOnInit() {
  }
  submit(model) {
    console.log(model);
    if (this.form.valid) {
      /*this.courseRegistrationService.postUsingPOST1(model).subscribe( (response) => {
        console.log(response);
      });*/
    }
  }


}
