import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'admin-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, MatButtonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent {
  leaves = signal([
    { id: 1, employeeName: 'Jane Smith', type: 'Paid leave', from: '2026-04-03', to: '2026-04-05', status: 'Pending' },
    { id: 2, employeeName: 'John Doe', type: 'Sick leave', from: '2026-03-30', to: '2026-04-01', status: 'Approved' },
    { id: 3, employeeName: 'Erin Lee', type: 'WFH', from: '2026-04-06', to: '2026-04-06', status: 'Pending' }
  ]);

  displayedColumns = ['employeeName', 'type', 'dates', 'status', 'action'];

  totalEmployees = computed(() => new Set(this.leaves().map(l => l.employeeName)).size);
  totalLeaveRequests = computed(() => this.leaves().length);
  pendingRequests = computed(() => this.leaves().filter(l => l.status === 'Pending').length);
  approvedRequests = computed(() => this.leaves().filter(l => l.status === 'Approved').length);

  selected = signal<any | null>(null);

  openModal(leave: any) {
    this.selected.set(leave);
  }

  closeModal() {
    this.selected.set(null);
  }
}
