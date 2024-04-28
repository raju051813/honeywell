import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { environment } from './../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class HoneywellService {
  private responseDataSubject = new BehaviorSubject<any>(null);
  private baseUrl = ""

  responseData$ = this.responseDataSubject.asObservable();
  incidentTypeSelected = new EventEmitter<string>();
  fireStation = new EventEmitter<boolean>();
  responseData: any;
  setResponse: any;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) {
    this.baseUrl = environment.baseRef
  }

  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}api/Registration/registration`, (data), this.httpOptions).pipe(catchError(this.errorHandler));
  }

  // getPosts(): Observable<any> {
  //   return this.http.get('http://localhost:3000/posts');
  // }

  getData(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}api/Registration/data`);
  }

  getIncident(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}api/GoogleMaps/GoogleMaps`, data);
  }

  showIncidents(zipCode: string, region: string, fromDate: Date, toDate: Date): Observable<any> {
    const data = { zipCode, region, fromDate, toDate }; // Include fromDate and toDate in the data
    return this.http.post<any>(`${this.baseUrl}api/GoogleMaps/GoogleMaps`, data);
  }

  getZipRiskScore(selectedZipCodes: any): Observable<any> {
    let ZipCode = selectedZipCodes.zipCode
    const data = {
      ZipCode
    };
    console.log('getZipRiskScore', data)
    return this.http.post<any>(`${this.baseUrl}api/GoogleMaps/RiskScoreDetails`, data);
  }

  // Example method to post data to API
  postData(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}api/Registration/data`, data);
  }

  setResponseData(data: any): void {
    this.responseData = data;
  }

  getResponseData(): any {
    return this.responseData;
  }

  errorHandler(error: {
    error: {
      message: string;
    }; status: any; message: any;
  }) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

}
