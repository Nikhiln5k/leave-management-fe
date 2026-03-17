import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';

interface LeaveRequest {
  requester: string;
  type: string;
  start: Date;
  end: Date;
  status: 'Approved' | 'Pending' | 'Rejected';
}

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  totals = {
    total: 24,
    taken: 10,
    pending: 4,
  };

  displayedColumns: string[] = [
    'requester',
    'type',
    'dates',
    'status',
    // 'actions'
  ];

  leaveRequests: LeaveRequest[] = [
    {
      requester: 'Alice Johnson',
      type: 'Annual Leave',
      start: new Date(2026, 2, 10),
      end: new Date(2026, 2, 14),
      status: 'Approved',
    },
    {
      requester: 'Mark Lee',
      type: 'Sick Leave',
      start: new Date(2026, 2, 21),
      end: new Date(2026, 2, 22),
      status: 'Pending',
    },
    {
      requester: 'Priya Singh',
      type: 'Casual Leave',
      start: new Date(2026, 3, 2),
      end: new Date(2026, 3, 3),
      status: 'Rejected',
    },
  ];

  statusColor(status: LeaveRequest['status']) {
    switch (status) {
      case 'Approved': return 'primary';
      case 'Pending': return 'accent';
      case 'Rejected': return 'warn';
      default: return '';
    }
  }
}