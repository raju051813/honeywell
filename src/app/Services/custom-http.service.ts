import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { environment } from './../../environments/environment';

@Injectable()
export class CustomHttpService {
    baseUrl = ""
    constructor(private httpClient: HttpClient) { 
        this.baseUrl = environment.baseRef
    }

    public makeGetRequest<T>(url: string): Observable<T> {
        return this.httpClient.get<T>(this.baseUrl+url, { observe: "response" }).pipe(
            map((res: HttpResponse<T>) => {
                return res.body as T; // Type assertion
            }),
            catchError((error: any) => {
                return throwError(error);
            })
        );
    }

    public makePostRequest<T>(url: string, body?: any): Observable<T> {
        return this.httpClient.post<T>(this.baseUrl+url, body, { observe: "response" }).pipe(
            map((res: HttpResponse<T>) => {
                return res.body as T; // Type assertion
            }),
            catchError((error: any) => {
                return throwError(error);
            })
        );
    }

    public makePutRequest<T>(url: string, body?: any): Observable<T> {
        return this.httpClient.put<T>(this.baseUrl+url, body, { observe: "response" }).pipe(
            map((res: HttpResponse<T>) => {
                return res.body as T; // Type assertion
            }),
            catchError((error: any) => {
                return throwError(error);
            })
        );
    }

    public makePatchRequest<T>(url: string, body?: any): Observable<T> {
        return this.httpClient.patch<T>(this.baseUrl+url, body, { observe: "response" }).pipe(
            map((res: HttpResponse<T>) => {
                return res.body as T; // Type assertion
            }),
            catchError((error: any) => {
                return throwError(error);
            })
        );
    }

    public makeDeleteRequest<T>(url: string, body?: any): Observable<T> {
        return this.httpClient
            .request<T>("delete", this.baseUrl+url, {
                body,
                observe: "response"
            })
            .pipe(
                map((res: HttpResponse<T>) => {
                    return res.body as T; // Type assertion
                }),
                catchError((error: any) => {
                    return throwError(error);
                })
            );
    }
}
