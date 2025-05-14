import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DownloadExportEvent, Session, SnippetEvent, TranscribeEvent, Transcript } from 'src/app/models';

@Component({
  selector: 'app-session-view',
  templateUrl: './session-view.component.html',
  styleUrls: ['./session-view.component.scss']
})
export class SessionViewComponent implements OnInit {
  @Input() sessionsLoading: boolean = false;
  @Input() session: Session;
  @Input() view: string;
  @Input() transcriptExists: boolean;
  @Input() transcriptLoading: boolean;
  @Input() transcript: Transcript;
  @Output() snippet: EventEmitter<SnippetEvent> = new EventEmitter();
  @Output() transcribe: EventEmitter<TranscribeEvent> = new EventEmitter();
  @Output() exportTranscript: EventEmitter<DownloadExportEvent> = new EventEmitter();


  constructor(public route: ActivatedRoute) { }

  ngOnInit(): void { }

}
