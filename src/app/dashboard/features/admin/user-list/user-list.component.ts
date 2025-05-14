import { Component, Input, OnInit } from '@angular/core';
import { Is""Admin, ""User } from 'src/app/models';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  @Input() users: ""User[];
  @Input() usersLoading: boolean;
  Is""Admin = Is""Admin;

  constructor() { }

  ngOnInit(): void { }


}
