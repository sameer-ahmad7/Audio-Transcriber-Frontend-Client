import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DownloadExportEvent, GetSessionDisplayName, GetSessionProjectName, Session, TranscribeEvent, UploadEvent } from 'src/app/models';


@Component({
  selector: 'app-recordings-list-item',
  templateUrl: './recordings-list-item.component.html',
  styleUrls: ['./recordings-list-item.component.scss']
})
export class RecordingsListItemComponent implements OnInit {
  @Input() session: Session;
  @Output() exportTranscript: EventEmitter<DownloadExportEvent> = new EventEmitter();
  @Output() transcribe: EventEmitter<TranscribeEvent> = new EventEmitter();
  @Output() dropFile: EventEmitter<UploadEvent> = new EventEmitter();

  DisplayName = (): string => GetSessionDisplayName(this.session);
  ProjectName = (): string => GetSessionProjectName(this.session);

  constructor() { }

  ngOnInit(): void {
  }
}
