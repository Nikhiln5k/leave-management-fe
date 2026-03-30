import { Component, Input, OnInit } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-nav-actions',
  imports: [ButtonComponent],
  templateUrl: './nav-actions.component.html',
  styleUrl: './nav-actions.component.scss'
})
export class NavActionsComponent implements OnInit{
  @Input() data:any;
  
  ngOnInit(): void {
  }
}
