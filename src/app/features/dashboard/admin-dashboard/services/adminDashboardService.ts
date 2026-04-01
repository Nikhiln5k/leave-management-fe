import { Injectable, signal, computed, inject } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { api_endpoint } from '../../../../core/config/apiEndpoints';
import { HttpService } from '../../../../core/services/http.service';
import { StorageService } from '../../../../core/services/storage.service';

@Injectable({ providedIn: 'root' })
export class AdminDashboardService {
  apiEndpoint = api_endpoint.masters;

  private http = inject(HttpService);
  private storage = inject(StorageService);

  public dashboardList (): Observable<any> {
    return this.http.get(this.apiEndpoint.dashboardList);
  }
}
