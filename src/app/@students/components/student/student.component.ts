import { Component, OnInit } from '@angular/core';
import {UserService} from '@candiman/website';
import {User} from '../../../@restapi';

@Component({
  selector: 'gm-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss']
})
export class StudentComponent implements OnInit {
  menu: boolean;
  user: User;
  opened = true;
  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.user = this.userService.authorizedUser;
  }

}
