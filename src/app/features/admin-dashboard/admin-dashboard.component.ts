import { Component, signal } from '@angular/core';

@Component({
  selector: 'admin-dashboard',
  imports: [],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {
  leaves = signal<any[]>([]);
  selected = signal<any | null>(null);

  openModal(leave: any) {
    this.selected.set(leave);
  }

  closeModal() {
    this.selected.set(null);
  }

}
