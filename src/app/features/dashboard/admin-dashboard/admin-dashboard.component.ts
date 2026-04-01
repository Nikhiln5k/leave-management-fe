import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';
import { AdminDashboardService } from '../../../core/services/admin-dashboard.service';

@Component({
  selector: 'admin-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, MatButtonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {
  dashData: any = {};
  
  dashService = inject(AdminDashboardService);
  toastr = inject(ToastrService);
  
  ngOnInit(): void {
    this.getDashboardData();
  }

  displayedColumns = ['employeeName', 'type', 'dates', 'status', 'action'];

  selected = signal<any | null>(null);

  getDashboardData() {
    this.dashService.dashboardList().subscribe({
      next: (res) => {
        this.dashData = res?.data || [];
        this.toastr.success(res.message)
      },
      error: (err) => {
        this.toastr.error('Failed to fetch dashboard data.');
      }
    })
  }

  openModal(leave: any) {
    this.selected.set(leave);
  }

  closeModal() {
    this.selected.set(null);
  }
}
