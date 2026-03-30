import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { HttpService } from '../../core/services/http.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-leave',
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
  ],
  templateUrl: './leave.component.html',
  styleUrl: './leave.component.scss'
})
export class LeaveComponent implements OnInit {
  private httpService = inject(HttpService);
  private toastr = inject(ToastrService);
  leaveRequests: any[] = []
  displayedColumns: string[] = [
    'type',
    'dates',
    'status',
  ];
  ngOnInit(): void {
    this.getAllRequests();
  }

  getAllRequests () {
    this.httpService.get("/leave/leaveList").subscribe({
      next: (res: any) => {
        this.toastr.success(res.message)
        console.log(res.data)
        this.leaveRequests = res.data;
      },
      error: (err: any) => {
        this.toastr.error(err.message);
      }
    })
  }

}
