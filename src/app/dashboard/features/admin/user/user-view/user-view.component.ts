import { Component, Input, OnInit } from '@angular/core';
import { Is""Admin, ""User } from 'src/app/models';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss']
})
export class UserViewComponent implements OnInit {
  @Input() user: ""User;
  @Input() loading: boolean;
  Is""Admin = Is""Admin;

  editing: boolean = false;

  constructor() { }

  ngOnInit(): void { }

  OnToggled(val) {
  }

  setEditMode(mode: boolean) {
    this.editing = mode;
  }

  save() { }
}
