import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ButtonComponent } from '../../../shared/components/button/button.component';

@Component({
  selector: 'app-leave-forms',
  standalone: true,
  imports: [MatInputModule, MatButtonModule, MatFormFieldModule, ButtonComponent],
  templateUrl: './leave-forms.component.html',
})
export class LeaveFormsComponent {

  submit() {
    console.log('Form submitted');
  }
}