import { Component, inject, OnInit } from '@angular/core';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-leave-forms',
  standalone: true,
  imports: [CommonModule, ButtonComponent, ReactiveFormsModule],
  templateUrl: './leave-forms.component.html',
})
export class LeaveFormsComponent implements OnInit {
  requestFrom!: FormGroup;

  private fb = inject(FormBuilder);

  ngOnInit() {
    this.requestFrom = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      reason: ['', Validators.required],
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    console.log('Selected file:', file);
  }

  submit() {
    console.log('Form submitted', this.requestFrom.value);
  }
}