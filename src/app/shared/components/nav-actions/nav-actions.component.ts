import { Component, Input } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { LeaveFormsComponent } from '../../../features/leaves/leave-forms/leave-forms.component';

@Component({
  selector: 'app-nav-actions',
  imports: [ButtonComponent, LeaveFormsComponent],
  templateUrl: './nav-actions.component.html',
})
export class NavActionsComponent {
  @Input() data: any;
}
