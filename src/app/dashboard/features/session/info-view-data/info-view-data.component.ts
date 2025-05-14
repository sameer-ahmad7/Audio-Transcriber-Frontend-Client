import { Component, Input, OnInit } from '@angular/core';
import { GetSessionDisplayName, GetSessionProjectName, GetSessionRecordingDuration, Session } from 'src/app/models';

@Component({
  selector: 'app-info-view-data',
  templateUrl: './info-view-data.component.html',
  styleUrls: ['./info-view-data.component.scss']
})
export class InfoViewDataComponent implements OnInit {
  @Input() session: Session;

  sessionName = (): string => { return GetSessionDisplayName(this.session); };
  projectName = (): string => { return GetSessionProjectName(this.session); };
  recordingTime = (): string => { return GetSessionRecordingDuration(this.session); };
  constructor() { }

  ngOnInit(): void {
  }

}
