import { Component, Input, OnInit } from '@angular/core';
import { Tenant } from 'src/app/models';

@Component({
  selector: 'app-tenant-type-icon',
  templateUrl: './tenant-type-icon.component.html',
  styleUrls: ['./tenant-type-icon.component.scss']
})
export class TenantTypeIconComponent implements OnInit {
  @Input() tenant: Tenant;
  @Input() size: string;

  constructor() { }

  ngOnInit(): void {}
}
