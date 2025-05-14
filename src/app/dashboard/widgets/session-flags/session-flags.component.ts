import { Component, Input, OnInit } from '@angular/core';
import { Session } from 'src/app/models';
import { GeneralState, GetGeneralState } from '../../utils';

@Component({
  selector: 'app-session-flags',
  templateUrl: './session-flags.component.html',
  styleUrls: ['./session-flags.component.scss']
})
export class SessionFlagsComponent implements OnInit {
  @Input() session: Session;

  GetGeneralState = GetGeneralState;
  GeneralState = GeneralState;



  constructor() { }

  ngOnInit(): void { }

}
