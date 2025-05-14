import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { SizzleReel, Snippet } from 'src/app/models/sizzlereel';
import { ChangeSnippetNameEvent, CreateReelEvent, SnippetDropEvent } from 'src/app/models';

@Component({
  selector: 'app-compose-reel',
  templateUrl: './compose-reel.component.html',
  styleUrls: ['./compose-reel.component.scss'],
})
export class ComposeReelComponent implements OnInit {


  constructor(
    private router: Router, private modalSvc: NgbModal,
  ) {
  }

  ngOnInit(): void {
  }


  OnChangeSnippetName(ev: ChangeSnippetNameEvent) {
  }


  OnCreateReel(ev: CreateReelEvent) {
  }

  OnSnippetDrop(ev: SnippetDropEvent) {
  }

  OnCancelReel() {
    console.log('cancel reel');
    this.router.navigate(['/dashboard', { outlets: { reel: null } }], { queryParamsHandling: 'preserve' });
  }
}
