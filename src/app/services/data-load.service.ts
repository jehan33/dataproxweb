import { Injectable } from '@angular/core';
import { HttpGeneralService } from './http-general.service';
import { map, Observable } from 'rxjs';
import { LoginService } from './login.service';


@Injectable({
  providedIn: 'root'
})
export class DataLoadService {

  constructor(
    private _http: HttpGeneralService,
    private loginService: LoginService
  ) { }
  getTables(db: any): Observable<any> {
    const tablesUrl = 
    `/tablesnames?host=${db?.Host}&database=${db?.Database}&user=${db?.Username}&password=${db?.Password}&port=${db?.Port}`;
    return this._http.get(`${tablesUrl}`)
      .pipe(map((response: any) => response));
  }

  getTableData(name: string, db: any): Observable<any> {
    const tablesUrl = 
    `/tabledata/${name}?host=${db?.Host}&database=${db?.Database}&user=${db?.Username}&password=${db?.Password}&port=${db?.Port}`;
   return this._http.get(`${tablesUrl}`)
      .pipe(map((response: any) => {
        this.setTableData(response);
        return response;
      }));
  }

  setTableData(data: any){
    this.loginService.currentTableData = data;
  }

}
