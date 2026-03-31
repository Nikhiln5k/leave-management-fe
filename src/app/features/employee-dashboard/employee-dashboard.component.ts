import { CommonModule } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'employee-dashboard',
  imports: [CommonModule, MatCardModule, MatTableModule, MatButtonModule],
  templateUrl: './employee-dashboard.component.html',
  styleUrl: './employee-dashboard.component.scss'
})
export class EmployeeDashboardComponent {
  leaves = signal([
    { id: 1, employeeName: 'John Doe', type: 'Paid leave', from: '2026-04-03', to: '2026-04-05', status: 'Pending' },
    { id: 2, employeeName: 'John Doe', type: 'Sick leave', from: '2026-03-30', to: '2026-04-01', status: 'Approved' },
    { id: 3, employeeName: 'John Doe', type: 'WFH', from: '2026-04-06', to: '2026-04-06', status: 'Pending' }
  ]);

  displayedColumns = ['Name', 'Type', 'Dates', 'Status', 'Action'];

  totalLeaves = 28;
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
