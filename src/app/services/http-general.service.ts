import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpGeneralService {
  apiBaseUrl: string = '';

  constructor(public http: HttpClient) {
    this.apiBaseUrl = environment.serverApiBaseURL;
  }

  fileUpload(apiRoute: string, body: FormData) {
    return this.http.post(`${this.apiBaseUrl + apiRoute}`, body, { headers: this.getUploadHttpHeaders() });
  }

  fileDownload(apiRoute: string, body: any) {
    return this.http.post(`${this.apiBaseUrl + apiRoute}`, body, { headers: this.getDownloadHttpHeaders(), responseType: 'blob' });
  }

  fileDisplay(apiRoute: string, body: any) {
    return this.http.post(`${this.apiBaseUrl + apiRoute}`, body, { headers: this.getDownloadHttpHeaders()});
  }

  post(apiRoute: string, body?: any) {
    return this.http.post(`${this.apiBaseUrl + apiRoute}`, body, { headers: this.getPostHttpHeaders() });
  }

  get(apiRoute: string, options: any = {}) {
    const requestOptions: any = {
      headers: this.getGetHttpHeaders(),
      ...options
    };

    return this.http.get(`${this.apiBaseUrl + apiRoute}`, requestOptions);
  }

  getDataBase(apiRoute: string, options: any = {}) {
    const requestOptions: any = {
      headers: this.getGetHttpHeaders(),
      ...options
    };

    return this.http.get(`${this.apiBaseUrl + apiRoute}`, requestOptions);
  }

  getFile(apiRoute: string, options: any = {}) {
    const requestOptions: any = {
      headers: this.getGetHttpHeaders(),
      ...options
    };

    return this.http.get(apiRoute, requestOptions);
  }

  put(apiRoute: string, body: any) {
    return this.http.put(`${this.apiBaseUrl + apiRoute}`, body, { headers: this.getPutHttpHeaders() });
  }

  patch(apiRoute: string, body: any) {
    return this.http.patch(`${this.apiBaseUrl + apiRoute}`, body, { headers: this.getPostHttpHeaders() });
  }

  delete(apiRoute: string) {
    return this.http.delete(`${this.apiBaseUrl + apiRoute}`, { headers: this.getDeleteHttpHeaders() });
  }

  getUploadHttpHeaders(): HttpHeaders {
    return new HttpHeaders({
      "mimeType": "multipart/form-data",
    });
  }

  getDownloadHttpHeaders(): HttpHeaders {
    return new HttpHeaders({
      "Accept": "*/*",
      "Content-Type": "application/json",
    });
  }

  getPostHttpHeaders(): HttpHeaders {
    return new HttpHeaders();
  }

  getGetHttpHeaders(): HttpHeaders {
    return new HttpHeaders();
  }

  getPutHttpHeaders(): HttpHeaders {
    return new HttpHeaders().set("key", "value");
  }

  getDeleteHttpHeaders(): HttpHeaders {
    return new HttpHeaders().set("key", "value");
  }
}
