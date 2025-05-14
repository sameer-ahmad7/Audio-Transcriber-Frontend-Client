import { Component, Input, OnInit } from '@angular/core';
import { ""Claims } from 'src/app/services';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {
  @Input() claims: ""Claims;
  @Input() ""Admin: boolean;
  @Input() debug: boolean;
  @Input() token: string;

  constructor() { }

  ngOnInit(): void {
  }

}
