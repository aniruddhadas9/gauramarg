import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ReplaySubject} from 'rxjs/ReplaySubject';
import {Response, URLSearchParams} from '@angular/http';
import {ConfigService} from './config.service';
import {EncryptionService} from './encryption.service';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';


@Injectable()
export class UserService {
  private _user = new ReplaySubject();
  get user() {
    return this._user.asObservable();
  }

  get isAuthenticated() {
    return this.userAuthorizations && this.userAuthorizations.email;
  }

  // User info returned from Herd
  userAuthorizations;
  // encrypted user id
  encryptedUserIdentifier: string;

  constructor(
    // private currentUserApi,
    private encryptionService: EncryptionService,
    private conf: ConfigService,
    private httpClient: HttpClient
    //  private apiConf
  ) {
  }

  getCurrentUser(email?: string, password?: string): Observable<any> {
    return this.httpClient
      .post(environment.restUrl + '/user/login', {'email': email, 'password': password})
      .map((response) => {
        if (response[0]['email'] != null) {
          this.userAuthorizations = response[0];
          this._user.next(response[0]);
        }
        return response;
      });
  }

}
