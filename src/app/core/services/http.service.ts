import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import enviornment from '../../enviornments/enviornment';

@Injectable({ providedIn: 'root' })
export class HttpService {
  private http = inject(HttpClient);
  private readonly baseUrl = enviornment.apiUrl;

  private buildUrl(path: string) {
    // ensure there is exactly one `/` between baseUrl and path
    return `${this.baseUrl}/${path}`;
  }

  get<T>(path: string, params?: Record<string, any>, headers?: HttpHeaders): Observable<T> {
    return this.http.get<T>(this.buildUrl(path), {
      params: new HttpParams({ fromObject: params ?? {} }),
      headers
    });
  }

  post<T>(path: string, body: any, headers?: HttpHeaders): Observable<T> {
    return this.http.post<T>(this.buildUrl(path), body, { headers });
  }

  put<T>(path: string, body: any, headers?: HttpHeaders): Observable<T> {
    return this.http.put<T>(this.buildUrl(path), body, { headers });
  }

  delete<T>(path: string, params?: Record<string, any>, headers?: HttpHeaders): Observable<T> {
    return this.http.delete<T>(this.buildUrl(path), {
      params: new HttpParams({ fromObject: params ?? {} }),
      headers
    });
  }
}