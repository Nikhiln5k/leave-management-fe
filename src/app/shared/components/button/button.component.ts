import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {
  @Input() type: 'button' | 'submit' = 'button';
  @Input() disabled = false;
  @Input() btnClass = 'btn-primary';

  @Output() click = new EventEmitter<Event>();
  onClick(event: Event) {
    if (this.disabled) {
      event.preventDefault();
      return;
    }
    this.click.emit(event);
  }
}
