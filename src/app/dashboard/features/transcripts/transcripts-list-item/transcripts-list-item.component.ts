import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { GetGeneralState, GeneralState } from 'src/app/dashboard/utils';
import { DownloadExportEvent, GetSessionDisplayName, Session } from 'src/app/models';
import { } from 'src/app/store/session/actions';

@Component({
  selector: 'app-transcripts-list-item',
  templateUrl: './transcripts-list-item.component.html',
  styleUrls: ['./transcripts-list-item.component.scss']
})
export class TranscriptsListItemComponent implements OnInit {
  GetGeneralState = GetGeneralState;
  GeneralState = GeneralState;
  @Input() session: Session;
  @Output() exportTranscript: EventEmitter<DownloadExportEvent> = new EventEmitter();

  DisplayName = (): string => GetSessionDisplayName(this.session);

  constructor() { }

  ngOnInit(): void {
  }

  onClick(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.exportTranscript.emit({
      SessionId: this.session.SessionId,
      Format: 'docx',
    });
  }
}
