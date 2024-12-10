import { Injectable } from '@angular/core';
import { HttpGeneralService } from './http-general.service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfilesService {

  constructor(private _http: HttpGeneralService) { }

  getProfiles(): Observable<any> {
    return this._http.get('/ListProfiles')
      .pipe(map((response: any) => response));
  }

  addProfile(payload: any): Observable<any> {
    return this._http.post(`/CreateProfile`, payload)
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

  deleteProfile(userId: number): Observable<any> {
    return this._http.delete(`/DeleteProfile/${Number(userId)}`)
      .pipe(map((response: any) => response));
  }

  updateProfile(userId: string, payload: any): Observable<any> {
    return this._http.put(`/UpdateProfile/${Number(userId)}`, payload)
      .pipe(map((response: any) => response));
  }
}
