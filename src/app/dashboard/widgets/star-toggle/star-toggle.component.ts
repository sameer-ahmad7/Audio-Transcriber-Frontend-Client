import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToggleStarEvent } from 'src/app/models';

@Component({
  selector: 'app-star-toggle',
  templateUrl: './star-toggle.component.html',
  styleUrls: ['./star-toggle.component.scss']
})
export class StarToggleComponent implements OnInit {
  @Output() toggle: EventEmitter<ToggleStarEvent> = new EventEmitter();
  @Input() currentTennant: string;
  @Input() Starred: boolean;


  constructor() { }

  ngOnInit(): void {
  }

  ToggleStar() {
    this.toggle.emit({ Starred: !this.Starred, TennantId: this.currentTennant });
  }

}
