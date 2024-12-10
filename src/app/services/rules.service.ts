import { Injectable } from '@angular/core';
import { HttpGeneralService } from './http-general.service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RulesService {

  constructor(private _http: HttpGeneralService) { }

  addRuleDetails(payload: any): Observable<any> {
    return this._http.post(`/rules`, payload)
      .pipe(map((response: any) => response));
  }

  getRules(): Observable<any> {
    return this._http.get('/rules')
      .pipe(map((response: any) => response));
  }

  deleteRuleDetails(ruleId: number): Observable<any> {
    return this._http.delete(`/rules/${Number(ruleId)}`)
      .pipe(map((response: any) => response));
  }

  updateRuleDetails(ruleId: string, payload: any): Observable<any> {
    return this._http.put(`/rules/${Number(ruleId)}`, payload)
      .pipe(map((response: any) => response));
  }
}
