import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DownloadExportEvent, Session } from 'src/app/models';

@Component({
  selector: 'app-transcripts-list',
  templateUrl: './transcripts-list.component.html',
  styleUrls: ['./transcripts-list.component.scss']
})
export class TranscriptsListComponent implements OnInit {
  @Input() sessions: Session[];
  @Input() loading: boolean = false;
  @Output() exportTranscript: EventEmitter<DownloadExportEvent> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
