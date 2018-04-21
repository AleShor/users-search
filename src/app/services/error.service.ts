import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

@Injectable()
/* Handle API errors */
export class ErrorService {

  getHttpErrorHandler() {
    return (error:HttpErrorResponse):Observable<string> => {
      const errMsg = this.getErrorMessage(error);
      return Observable.throw(errMsg);
    }
  }

  getErrorMessage(error:HttpErrorResponse):string {
    if (error && error.error instanceof ErrorEvent) {
      if (error.status === 0) {
        return 'Could not connect to server: ' + error.statusText;

      } else {
        const body = JSON.parse(error as any);
        return body.error || body.message || error.toString();
      }

    } else {
      return error && (error.message || error.toString());
    }
  }

}