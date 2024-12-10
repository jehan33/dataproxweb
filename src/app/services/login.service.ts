import { Injectable } from '@angular/core';
import { HttpGeneralService } from './http-general.service';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public message = new BehaviorSubject('');

  public currentTableData: any;

  constructor(private _http: HttpGeneralService) { }

  registerUser(payload: any): Observable<any> {
    return this._http.post(`/register`, payload)
      .pipe(map((response: any) => response));
  }
  
  loginUser(payload: any): Observable<any> {
    return this._http.post(`/login`, payload)
      .pipe(map((response: any) => response));
  }

  resetMessage(){
    setTimeout(() => { this.message.next(''); }, 2000);
  }

  getCurrentTableData(){
    return this.currentTableData;
  }

}
