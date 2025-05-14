import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UploadSessionsComponent } from 'src/app/dashboard/widgets/upload-sessions/upload-sessions.component';
import { DownloadExportEvent, TranscribeEvent, UploadEvent } from 'src/app/models';
import { Session } from 'src/app/models/session';
@Component({
  selector: 'app-recordings-view',
  templateUrl: './recordings-view.component.html',
  styleUrls: ['./recordings-view.component.scss']
})
export class RecordingsViewComponent implements OnInit {
  @Input() sessionsLoading: boolean = false;
  @Input() allSessions: Session[];
  @Input() readySessions: Session[]; // ready to transcribe
  @Input() finishedSessions: Session[]; // transcription complete
  @Input() workingSessions: Session[]; // sessions being transcribed
  @Input() errorSessions: Session[]; // transcription errors
  @Output() dropFiles: EventEmitter<UploadEvent[]> = new EventEmitter();
  @Output() transcribe: EventEmitter<TranscribeEvent> = new EventEmitter();
  @Output() exportTranscript: EventEmitter<DownloadExportEvent> = new EventEmitter();

  constructor(private modalSvc: NgbModal) { }

  ngOnInit(): void { }

  OnDrop(files: File[]) {
    const modalRef = this.modalSvc.open(UploadSessionsComponent, { size: 'xl' });
    modalRef.componentInstance.files = files;
  };
}
