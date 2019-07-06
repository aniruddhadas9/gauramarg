import {Injectable} from '@angular/core';
import {Course, CourseRegistrationService as CourseRegistrationServiceAPI, CourseService as CourseServiceAPI} from '../../../@restapi';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  courses: Course[];

  constructor(
    private courseServiceAPI: CourseServiceAPI,
    private courseRegistrationServiceAPI: CourseRegistrationServiceAPI
  ) {
  }

  getAllCoursesByTeacherId(teacherId) {
    return this.courseServiceAPI.getByTeacherIdUsingGET1(teacherId).pipe(
      map((courses) => {
        this.courses = courses;
        return courses;
      }));
  }

  getAllCoursesByStudentId(studentId) {
    return this.courseRegistrationServiceAPI.getCoursesByStudentIdUsingGET(studentId).pipe(map((courses) => {
      this.courses = courses;
      return courses;
    }));

  }

}
