import {Component, OnInit} from '@angular/core';
import {Course} from '../../../@restapi';
import {UserService} from '@candiman/website';
import {CoursesService} from '../../../@shared/services/courses/courses.service';

@Component({
  selector: 'gm-course',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {

  constructor(
    private userService: UserService,
    private coursesService: CoursesService
  ) {
  }

  course: Course;
  courses: Array<Course>;

  ngOnInit() {
    this.coursesService.getAllCoursesByTeacherId(this.userService.authorizedUser.email).subscribe((courses) => {
      console.log(courses);
      this.courses = courses;
    });

  }

}
