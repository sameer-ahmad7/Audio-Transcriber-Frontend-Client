import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UploadSessionsComponent } from '../upload-sessions/upload-sessions.component';

@Component({
  selector: 'app-drop-zone',
  templateUrl: './drop-zone.component.html',
  styleUrls: ['./drop-zone.component.scss']
})
export class DropZoneComponent implements OnInit {

  constructor(private modalSvc: NgbModal) { }

  ngOnInit(): void {
  }

  OnDrop(files: File[]) {
    const modalRef = this.modalSvc.open(UploadSessionsComponent, { size: 'xl' });
    modalRef.componentInstance.files = files;
  };

}
