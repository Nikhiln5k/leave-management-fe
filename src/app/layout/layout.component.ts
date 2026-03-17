import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavActionsComponent } from '../shared/components/nav-actions/nav-actions.component';

@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, NavActionsComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
