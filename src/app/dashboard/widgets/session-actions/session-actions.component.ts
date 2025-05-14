import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import {
  DownloadExportEvent,
  Session,
  TranscribeEvent,
  UploadEvent,
} from "src/app/models";
import { GeneralState, GetGeneralState } from "../../utils";

@Component({
  selector: "app-session-actions",
  templateUrl: "./session-actions.component.html",
  styleUrls: ["./session-actions.component.scss"],
})
export class SessionActionsComponent implements OnInit {
  @Input() session: Session;
  @Output() transcribe: EventEmitter<TranscribeEvent> = new EventEmitter();
  @Output() dropFile: EventEmitter<UploadEvent> = new EventEmitter();
  @Output() exportTranscript: EventEmitter<
    DownloadExportEvent
  > = new EventEmitter();

  GetGeneralState = GetGeneralState;
  GeneralState = GeneralState;

  constructor() {}

  ngOnInit(): void {}
}
