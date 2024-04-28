import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any = {};
  private baseUrl = ""

  private loginResponseSubject = new BehaviorSubject<any>({});

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) { 
    this.baseUrl = environment.baseRef
  }

  login(username: string, password: string): Observable<any> {
    const body = { username, password };
    console.log('hello', body);

    return this.http.post<any>(`${this.baseUrl}api/Common/login`, body);
  }

  getloginresponse(): any {
    return this.loginResponseSubject.value;
  }

  setloginresponse(obj: any) {
    this.loginResponseSubject.next(obj);
  }

}
