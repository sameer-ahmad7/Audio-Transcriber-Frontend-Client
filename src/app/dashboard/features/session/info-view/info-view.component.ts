import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DownloadExportEvent, Session, TranscribeEvent } from 'src/app/models';

@Component({
  selector: 'app-info-view',
  templateUrl: './info-view.component.html',
  styleUrls: ['./info-view.component.scss']
})
export class InfoViewComponent implements OnInit {
  @Input() session: Session;
  @Output() transcribe: EventEmitter<TranscribeEvent> = new EventEmitter();
  @Output() exportTranscript: EventEmitter<DownloadExportEvent> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
