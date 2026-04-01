import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveFormsComponent } from './leave-forms.component';

describe('LeaveFormsComponent', () => {
  let component: LeaveFormsComponent;
  let fixture: ComponentFixture<LeaveFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeaveFormsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeaveFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
