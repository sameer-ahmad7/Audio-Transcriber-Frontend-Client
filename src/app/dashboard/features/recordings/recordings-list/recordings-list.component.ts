import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DownloadExportEvent, TranscribeEvent, UploadEvent } from 'src/app/models';
import { Session } from 'src/app/models/session';

@Component({
  selector: 'app-recordings-list',
  templateUrl: './recordings-list.component.html',
  styleUrls: ['./recordings-list.component.scss']
})
export class RecordingsListComponent implements OnInit {
  @Input() sessions: Session[];
  @Input() loading: boolean = false;
  @Output() dropFiles: EventEmitter<UploadEvent[]> = new EventEmitter();
  @Output() transcribe: EventEmitter<TranscribeEvent> = new EventEmitter();
  @Output() exportTranscript: EventEmitter<DownloadExportEvent> = new EventEmitter();
  constructor() { }

  ngOnInit(): void { }
}
