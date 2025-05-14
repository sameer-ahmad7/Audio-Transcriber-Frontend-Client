import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DownloadExportEvent, Session, SessionStatus, TranscribeEvent } from 'src/app/models';

@Component({
  selector: 'app-info-view-tools',
  templateUrl: './info-view-tools.component.html',
  styleUrls: ['./info-view-tools.component.scss']
})
export class InfoViewToolsComponent implements OnInit {
  @Input() session: Session;
  @Output() transcribe: EventEmitter<TranscribeEvent> = new EventEmitter();
  @Output() exportTranscript: EventEmitter<DownloadExportEvent> = new EventEmitter();

  SessionStatus = SessionStatus;

  constructor() { }

  ngOnInit(): void {
  }

}
