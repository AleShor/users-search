import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';

import { IUser } from '../interfaces/user.interface';
import { IPagination } from '../interfaces/pagination.interface';
import { ErrorService } from './error.service';
import { environment } from '../../environments/environment';

@Injectable()
/* API users requests  */
export class UsersService {

  // private usersUrl = '/api/users';
  // Link for check: 
  private usersUrl = 'http://www.json-generator.com/api/json/get/cgDtcAiEJe?indent=2';

  constructor(private http:HttpClient,
              private errorService:ErrorService) {}

  get(opts?:{searchTerm?:string, url?:string}):Observable<any> {
    const url = opts && opts.url || this.usersUrl;
    return this.http.get(`${environment.apiUrl}${url}`, {
      params: {
        searchTerm: opts && opts.searchTerm
      }
    }).catch(this.errorService.getHttpErrorHandler());
  }

}
