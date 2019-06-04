import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { empty } from 'rxjs';

@Injectable()
export class AjaxService {

  public static CONTEXT_PATH = '';
  public static isDebug = true;

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  doPost(url: string, body: any) {
    if (AjaxService.isDebug) {
      console.log('URL : ', AjaxService.CONTEXT_PATH + url);
      console.log('Params : ', body);
    }
    return this.httpClient.post(AjaxService.CONTEXT_PATH + url, body).pipe(
      map((response: any) => {
        return response;
      }),
      catchError((err, caught) => {
        if (err.status === 401 && 'security/user-profile' !== url) {
          window.location.reload();
          if (AjaxService.isDebug) {
            console.error('Redirect to LoginPage');
          }
        } else {
          if ('security/user-profile' === url) {
            this.router.navigate(['/login']);
          }
          if (err.status !== 401) {
            console.error('Message Error => ', err, caught);
          }
        }
        return empty();
      })
    );
  }

  doGet(url: string) {
    if (AjaxService.isDebug) {
      console.log('URL : ', AjaxService.CONTEXT_PATH + url);
    }
    return this.httpClient.get(AjaxService.CONTEXT_PATH + url).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.doHandleError)
    );
  }

  doPut(url: string, body: any) {
    if (AjaxService.isDebug) {
      console.log('URL : ', AjaxService.CONTEXT_PATH + url);
      console.log('Params : ', body);
    }
    return this.httpClient.put(AjaxService.CONTEXT_PATH + url, body).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.doHandleError)
    );
  }

  doDelete(url: string) {
    if (AjaxService.isDebug) {
      console.log('URL : ', AjaxService.CONTEXT_PATH + url);
    }
    return this.httpClient.delete(AjaxService.CONTEXT_PATH + url).pipe(
      map((response: any) => {
        return response;
      }),
      catchError(this.doHandleError)
    );
  }

  private doHandleError(err, caught) {
    if (err.status === 401) {
      window.location.reload();
      if (AjaxService.isDebug) {
        console.error('Redirect to LoginPage');
      }
    } else {
      if (AjaxService.isDebug) {
        console.error('Message Error => ', err, caught);
      }
    }
    return empty();
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}
