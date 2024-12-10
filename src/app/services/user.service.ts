import { Injectable } from '@angular/core';
import { HttpGeneralService } from './http-general.service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpGeneralService) { }
 
  addUserDetails(payload: any): Observable<any> {
    return this._http.post(`/adduser`, payload)
      .pipe(map((response: any) => response));
  }

  getUsers(): Observable<any> {
    return this._http.get('/getallusers')
      .pipe(map((response: any) => response));
  }

  getUserDetails(userId: number): Observable<any> {
    return this._http.post(`/getuser/${Number(userId)}`)
      .pipe(map((response: any) => response));
  }

  deleteUserDetails(userId: number): Observable<any> {
    return this._http.delete(`/deleteuser/${Number(userId)}`)
      .pipe(map((response: any) => response));
  }

  updateUserDetails(userId: string, payload: any): Observable<any> {
    return this._http.put(`/getuser/${Number(userId)}`, payload)
      .pipe(map((response: any) => response));
  }
}
