import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {User} from '../../../@restapi';
import {UserService} from '@candiman/website';

@Component({
  selector: 'gm-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.scss']
})
export class TeacherComponent implements OnInit {

  @ViewChild('sidebar', {read: ElementRef, static: true}) sidebar: ElementRef;
  @ViewChild('content', {read: ElementRef, static: true}) content: ElementRef;
  menu: boolean;
  user: User;
  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.user = this.userService.authorizedUser[0];
  }

  toggle() {
    console.log(this.sidebar.nativeElement.testContent);
  }
}
