import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from './user.service';
import {environment} from '../../../environments/environment';

@Injectable()
export class NoAuthGuardService implements CanActivate {
  constructor(
    private currentUserService: UserService,
    private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> | Promise<boolean> {
    if (environment.useBasicAuth) {
      return true;
    } else {
      this.router.navigate(['/'], {
        replaceUrl: true,
      });
      return false;
    }
  }
}
