import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-icon',
  templateUrl: './project-icon.component.html',
  styleUrls: ['./project-icon.component.scss']
})
export class ProjectIconComponent implements OnInit {
  @Input() size: string;

  constructor() { }

  ngOnInit(): void {
    this.size = "1x"
  }

}
