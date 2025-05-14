import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'toggle-switch',
  templateUrl: './toggle-switch.component.html',
  styleUrls: ['./toggle-switch.component.scss']
})
export class ToggleSwitchComponent implements OnInit {
  @Input() on: boolean;
  @Input() className: string;
  @Input() disabled: boolean;
  @Output() toggled: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {  }

  onClick() {
    this.on = !this.on;
    this.toggled.emit(this.on);
  }

}
