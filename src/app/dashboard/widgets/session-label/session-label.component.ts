import { Component, Input, OnInit } from '@angular/core';
import { GetSessionDisplayName, GetSessionProjectName, Session } from 'src/app/models';

export enum SessionLabelType {
  SessionName = 'name',
  ProjectName = 'project'
};

@Component({
  selector: 'app-session-label',
  templateUrl: './session-label.component.html',
  styleUrls: ['./session-label.component.scss']
})
export class SessionLabelComponent implements OnInit {
  @Input() session: Session;
  @Input() label: SessionLabelType;

  constructor() { }

  ngOnInit(): void { }

  Sprint(): string {
    switch (this.label) {
      case SessionLabelType.SessionName:
        return GetSessionDisplayName(this.session);
      case SessionLabelType.ProjectName:
        return GetSessionProjectName(this.session);
      default:
        console.error("app-session-label unknown label: ", this.label);
        return `Unknown Label! ${this.label}`;
    }
  }

}
