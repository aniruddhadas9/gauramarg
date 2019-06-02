import {Component, OnInit} from '@angular/core';
import {takeWhile} from 'rxjs/operators';

@Component({
  selector: 'gm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  alive = true;

  socialLinks: Array<object> = [
    {
      title: 'Google',
      url: 'https://accounts.google.com/o/oauth2/v2/auth',
      target: '_blank',
      icon: 'socicon-github',
    },
    {
      title: 'Facebook',
      url: 'https://www.facebook.com/akveo/',
      target: '_blank',
      icon: 'socicon-facebook',
    },
    {
      title: 'Twitter',
      url: 'https://twitter.com/akveo_inc',
      target: '_blank',
      icon: 'socicon-twitter',
    },
  ];


  ngOnInit() {
  }

}
