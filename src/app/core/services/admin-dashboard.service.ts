import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { api_endpoint } from '../config/apiEndpoints';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService {
  apiEndpoint = api_endpoint.masters;

  private http = inject(HttpService);

  public dashboardList (): Observable<any> {
    return this.http.get(this.apiEndpoint.dashboardList);
  }
}
