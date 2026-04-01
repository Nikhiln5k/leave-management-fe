import { Injectable, signal, computed, inject } from '@angular/core';
import { User } from '../../../core/models/user.model';
import { StorageService } from '../../../core/services/storage.service';
import { Observable, tap } from 'rxjs';
import { HttpService } from '../../../core/services/http.service';
import { api_endpoint } from '../../../core/config/apiEndpoints';

@Injectable({ providedIn: 'root' })
export class AdminDashboardService {
  apiEndpoint = api_endpoint.masters;

  private http = inject(HttpService);
  private storage = inject(StorageService);

  public dashboardList (): Observable<any> {
    return this.http.get(this.apiEndpoint.dashboardList);
  }
}
