import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Session } from 'src/app/models';
import { DownloadExportAction } from 'src/app/store/session/actions';

@Component({
  selector: 'app-transcripts-view',
  templateUrl: './transcripts-view.component.html',
  styleUrls: ['./transcripts-view.component.scss']
})
export class TranscriptsViewComponent implements OnInit {
  @Input() sessions: Session[];
  @Input() loading: boolean = false;
  @Output() exportTranscript: EventEmitter<DownloadExportAction> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
