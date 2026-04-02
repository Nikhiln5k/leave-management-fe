import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { api_endpoint } from '../../../core/config/apiEndpoints';
import { HttpService } from '../../../core/services/http.service';

@Component({
  selector: 'app-leave-lists',
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
  ],
  templateUrl: './leave-lists.component.html',
  styleUrl: './leave-lists.component.scss',
})
export class LeaveListsComponent implements OnInit {
  private httpService = inject(HttpService);
  private toastr = inject(ToastrService);
  leaveRequests: any[] = [];
  displayedColumns: string[] = ['type', 'dates', 'status'];
  ngOnInit(): void {
    this.getAllRequests();
  }

  getAllRequests() {
    this.httpService.get(api_endpoint.employee.leaveList).subscribe({
      next: (res: any) => {
        this.toastr.success(res.message);
        console.log(res.data);
        this.leaveRequests = res.data;
      },
      error: (err: any) => {
        this.toastr.error(err.message);
      },
    });
  }
}
