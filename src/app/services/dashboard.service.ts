import { Injectable } from '@angular/core';
import { HttpGeneralService } from './http-general.service';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private _http: HttpGeneralService) { }

  createDataSource(payload: any): Observable<any> {
    return this._http.post(`/addDatasourceParameter`, payload)
      .pipe(map((response: any) => response));
  }

  getDataBaseParams(params: any): Observable<any> {
    return this._http.get(`/getDatabaseParams?database_type=${params}`)
      .pipe(map((response: any) => response));
  }

  getDatabases(): Observable<any> {
    return this._http.getDataBase(`/databases`)
      .pipe(map((response: any) => response));
  }
  

  getDatasoureList(): Observable<any> {
    return this._http.get(`/ListDataSource`)
      .pipe(map((response: any) => response));
  }

  getDatasourceParameter(params: any): Observable<any> {
    return this._http.get(`/getDatasourceParameter/${params}`)
      .pipe(map((response: any) => response));
  }

  editDatasourceParameter(id: any, payload: any): Observable<any> {
    return this._http.put(`/editDatasourceParameter/${Number(id)}`, payload)
      .pipe(map((response: any) => response));
  }

  deleteDatasourceParameter(params: any): Observable<any> {
    return this._http.delete(`/deleteDatasourceParameter/${Number(params)}`)
      .pipe(map((response: any) => response));
  }

  getDataSourceInfo(params: any): Observable<any> {
    return this._http.get(`/DataSourceInfo/${params}`)
      .pipe(map((response: any) => response));
  }
}
