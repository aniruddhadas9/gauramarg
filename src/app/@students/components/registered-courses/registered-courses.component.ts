import { Component, OnInit } from '@angular/core';
import {Course, CourseRegistrationService} from '../../../@restapi';
import {UserService} from '@candiman/website';

@Component({
  selector: 'gm-registered-courses',
  templateUrl: './registered-courses.component.html',
  styleUrls: ['./registered-courses.component.scss']
})
export class RegisteredCoursesComponent implements OnInit {

  courses: Array<Course>;
  constructor(
    private userService: UserService,
    private courseRegistrationService: CourseRegistrationService
  ) { }

  ngOnInit() {
    this.courseRegistrationService.getCoursesByStudentIdUsingGET(this.userService.authorizedUser[0].email).subscribe((courses) => {
      console.log('courses: %o', courses);
      this.courses = courses;
    });
  }

}
