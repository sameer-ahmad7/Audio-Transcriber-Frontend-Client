import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DeleteReelEvent, EditReelEvent } from 'src/app/models';
import { SizzleReel } from 'src/app/models/sizzlereel';

@Component({
  selector: 'app-reel-list',
  templateUrl: './reel-list.component.html',
  styleUrls: ['./reel-list.component.scss']
})
export class ReelListComponent implements OnInit {

  @Input() Reels: SizzleReel[];

  @Input() ReelDeleting: boolean;

  @Input() ReelUpdating: boolean;

  @Output() editReel: EventEmitter<EditReelEvent> = new EventEmitter();

  @Output() deleteReel: EventEmitter<DeleteReelEvent> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
