import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../core/services/user.service';

@Component({
  selector: 'gm-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  loading: boolean;
  constructor(public userService: UserService) { }

  ngOnInit() {
  }

  logout() {
    this.userService.userAuthorizations = null;
  }
}
