import {Component, OnInit} from '@angular/core';
import {Course, CourseService, Timestamp} from '../../../@restapi';
import {UserService} from '@candiman/website';

@Component({
  selector: 'gm-course',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  constructor(
    private userService: UserService,
    private courseService: CourseService
  ) {
  }

  course: Course;
  courses: Array<Course>;

  ngOnInit() {
    this.courseService.getByTeacherIdUsingGET1(this.userService.authorizedUser[0].email).subscribe((courses) => {
      console.log(courses);
      this.courses = courses;
    });

  }

}
