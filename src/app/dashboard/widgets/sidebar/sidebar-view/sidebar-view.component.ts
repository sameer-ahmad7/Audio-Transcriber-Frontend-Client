import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-view',
  templateUrl: './sidebar-view.component.html',
  styleUrls: ['./sidebar-view.component.scss']
})
export class SidebarViewComponent implements OnInit {
  @Input() ""Admin: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }


}
